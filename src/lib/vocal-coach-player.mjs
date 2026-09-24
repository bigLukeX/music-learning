import { DRILLS, QUEUES, findDrill } from './vocal-coach-data.mjs';
import { compileDrill, renderWav, segmentAt, formatTime, requestMediaPlayback } from './vocal-coach-audio.mjs';

export class VocalCoach extends (globalThis.HTMLElement || class {}) {
  connectedCallback() {
    if (this.ready) return;
    this.ready = true; this.serial = 0; this.url = null; this.frame = 0; this.queue = []; this.index = 0;
    this.routine = this.dataset.routine || 'daily';
    this.audio = this.querySelector('[data-audio]');
    this.ui = {};
    for (const key of ['home','summary','start','test','screen','position','time','item','phase','current','instruction','notes','count','progress','transport','finish','next','next-label','status','audio-help','audio-status','pause','root','ceiling','tempo','loudness','bottle']) this.ui[key] = this.querySelector(`[data-${key}]`);
    this.listeners = new AbortController(); const options = { signal: this.listeners.signal };
    const on = (selector, event, fn) => this.querySelector(selector)?.addEventListener(event, fn, options);
    on('[data-start]', 'click', () => this.begin(QUEUES[this.routine]));
    on('[data-test]', 'click', () => this.testSound());
    on('[data-pause]', 'click', () => this.togglePause());
    on('[data-restart]', 'click', () => this.restartPhrase());
    on('[data-stop]', 'click', () => this.stop(true));
    on('[data-done]', 'click', () => this.stop(true));
    on('[data-again]', 'click', () => this.startItem(this.index));
    on('[data-next]', 'click', () => this.index + 1 < this.queue.length ? this.startItem(this.index + 1) : this.stop(true));
    on('[data-down]', 'click', () => this.transpose(-1));
    on('[data-up]', 'click', () => this.transpose(1));
    this.querySelectorAll('[data-drill]').forEach((button) => button.addEventListener('click', () => this.begin([button.dataset.drill]), options));
    for (const key of ['root','ceiling','tempo','loudness','bottle']) this.ui[key].addEventListener('change', () => this.settingsChanged(), options);
    this.audio.addEventListener('ended', () => this.complete(), options);
    this.audio.addEventListener('playing', () => { this.ui.pause.textContent = '暂停'; this.tick(); }, options);
    this.audio.addEventListener('pause', () => { cancelAnimationFrame(this.frame); if (this.plan && !this.audio.ended) this.ui.pause.textContent = '继续（先准备）'; }, options);
    this.audio.addEventListener('timeupdate', () => this.paint(), options);
    this.audio.addEventListener('error', () => { if (this.plan) this.fail('当前浏览器没能读取音轨。请重试，或在系统浏览器中打开。'); }, options);
    this.addEventListener('vocal-coach-stop', () => this.stop(false), options);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) { this.paint(); if (!this.audio.paused) this.tick(); } }, options);
    this.restoreSettings(); this.updateSummary();
  }
  disconnectedCallback() { this.stop(false); this.listeners?.abort(); this.ready = false; }
  settings() {
    return { root: Number(this.ui.root.value), ceiling: Number(this.ui.ceiling.value), tempo: Number(this.ui.tempo.value), loudness: Number(this.ui.loudness.value), bottle: this.ui.bottle.value === 'yes' };
  }
  restoreSettings() {
    try {
      const saved = JSON.parse(localStorage.getItem('music-vocal-coach-settings-v1') || '{}');
      for (const key of ['root','ceiling','tempo','loudness','bottle']) {
        const value = String(saved[key] ?? this.ui[key].value);
        if ([...this.ui[key].options].some((option) => option.value === value)) this.ui[key].value = value;
      }
    } catch { /* Storage is optional. */ }
  }
  settingsChanged() {
    this.stop(true);
    try { localStorage.setItem('music-vocal-coach-settings-v1', JSON.stringify(Object.fromEntries(['root','ceiling','tempo','loudness','bottle'].map((key) => [key, this.ui[key].value])))); } catch {}
    this.updateSummary();
    this.ui.status.textContent = '设置已更新。再按开始，会重新留出准备时间。';
  }
  transpose(delta) {
    const value = Number(this.ui.root.value) + delta;
    if ([...this.ui.root.options].some((option) => Number(option.value) === value)) { this.ui.root.value = String(value); this.settingsChanged(); }
  }
  updateSummary() {
    let valid = true, total = 0;
    for (const id of QUEUES[this.routine]) {
      try { total += compileDrill(findDrill(id), this.settings()).duration; } catch { valid = false; }
    }
    this.ui.start.disabled = !valid;
    this.ui.summary.textContent = valid ? `${QUEUES[this.routine].length} 个短练 · 约 ${formatTime(total)}，另留自行休息的时间` : '当前范围容纳不了默认流程。降低起音，或在单条库中选更短的练习。';
    this.querySelectorAll('[data-drill]').forEach((button) => {
      try {
        const plan = compileDrill(findDrill(button.dataset.drill), this.settings());
        button.disabled = false; this.querySelector(`[data-length="${button.dataset.drill}"]`).textContent = `约 ${formatTime(plan.duration)}`;
      } catch { button.disabled = true; this.querySelector(`[data-length="${button.dataset.drill}"]`).textContent = '超出当前上限，请降低起音'; }
    });
  }
  begin(ids) { this.queue = [...ids]; this.startItem(0); }
  stopOthers() {
    document.querySelectorAll('guided-vocal-trainer').forEach((node) => { if (node !== this) node.dispatchEvent(new Event('vocal-coach-stop')); });
    try { window.speechSynthesis?.cancel(); } catch {}
  }
  async startItem(index) {
    this.stop(false); this.stopOthers(); this.index = index; this.testing = false;
    const ex = findDrill(this.queue[index]); if (!ex) return;
    const token = this.serial;
    this.ui.home.hidden = true; this.ui.screen.hidden = false; this.ui.finish.hidden = true; this.ui.transport.hidden = false;
    this.ui.position.textContent = `第 ${index + 1} / ${this.queue.length} 项`;
    this.ui.item.textContent = ex.title; this.ui.phase.textContent = '准备音轨'; this.ui.current.textContent = ex.say;
    this.ui.instruction.textContent = '声音准备好之后才开始计时。'; this.ui.status.textContent = '';
    this.ui.screen.scrollIntoView({ behavior: 'auto', block: 'start' }); this.ui.screen.focus({ preventScroll: true });
    try {
      this.plan = compileDrill(ex, this.settings());
      const bytes = renderWav(this.plan, this.settings());
      this.installTrack(bytes);
      // play() is invoked inside the original click gesture (no async generation before it).
      await this.play(token);
    } catch (error) { if (token === this.serial) this.fail(error instanceof Error ? error.message : '无法开始，请重试。'); }
  }
  installTrack(bytes) {
    requestMediaPlayback();
    this.url = URL.createObjectURL(new Blob([bytes], { type: 'audio/wav' }));
    this.audio.src = this.url; this.audio.muted = false; this.audio.volume = 1;
    this.lastSegment = null;
    this.ui['audio-status'].textContent = '正在使用媒体音轨播放；音量由手机媒体音量控制。本页没有申请麦克风。';
    if ('mediaSession' in navigator) {
      try {
        if ('MediaMetadata' in window) navigator.mediaSession.metadata = new MediaMetadata({ title: this.plan.title, artist: '音乐学习 · 跟练', album: '声乐' });
        navigator.mediaSession.setActionHandler('play', () => this.resume());
        navigator.mediaSession.setActionHandler('pause', () => this.audio.pause());
        navigator.mediaSession.setActionHandler('stop', () => this.stop(true));
      } catch { /* Not all media-session actions are supported. */ }
    }
    this.paint();
  }
  async play(token = this.serial) {
    requestMediaPlayback();
    try {
      await this.audio.play();
      if (token !== this.serial) return;
      this.ui.pause.textContent = '暂停'; this.tick();
    } catch (error) {
      if (token !== this.serial) return;
      this.ui.pause.textContent = '点这里播放';
      this.fail(error?.name === 'NotAllowedError' ? '浏览器需要再点一次播放。点“点这里播放”，或展开下方系统播放器。' : '音轨暂时无法播放。请再试一次。');
    }
  }
  resume() {
    if (!this.plan) return;
    if (!this.testing) {
      const segment = segmentAt(this.plan, this.audio.currentTime);
      if (['sing','echo','manual','count','memory'].includes(segment.mode)) this.audio.currentTime = segment.restartAt;
    }
    return this.play();
  }
  togglePause() { if (!this.plan) return; if (this.audio.paused) this.resume(); else this.audio.pause(); }
  restartPhrase() {
    if (!this.plan) return;
    const segment = segmentAt(this.plan, this.audio.currentTime);
    this.audio.currentTime = Math.max(0, segment.restartAt); this.play();
  }
  tick() { cancelAnimationFrame(this.frame); this.paint(); if (this.plan && !this.audio.paused && !this.audio.ended) this.frame = requestAnimationFrame(() => this.tick()); }
  paint() {
    if (!this.plan || this.ui.screen.hidden) return;
    const t = Math.min(this.audio.currentTime || 0, this.plan.duration);
    const segment = segmentAt(this.plan, t); if (!segment) return;
    const local = t - segment.at;
    const stepIndex = segment.steps.findIndex((s) => local >= s.at && local < s.at + s.duration);
    const step = segment.steps[stepIndex];
    this.ui.time.textContent = `${formatTime(t)} / ${formatTime(this.plan.duration)}`;
    this.ui.progress.value = Math.min(100, t / this.plan.duration * 100);
    this.ui.phase.textContent = segment.title;
    this.ui.instruction.textContent = segment.instruction;
    const waiting = ['prepare','count','memory','rest'].includes(segment.mode);
    this.ui.current.textContent = segment.mode === 'count' ? String(Math.max(1, Math.ceil((segment.duration - local) / this.plan.beat)))
      : segment.mode === 'prepare' ? '先放好手机'
      : segment.mode === 'memory' ? '心里记，不出声'
      : segment.mode === 'rest' ? '现在不唱'
      : step?.label || (this.testing ? '测试声音' : '跟着做');
    this.ui.count.textContent = waiting ? `还有 ${Math.max(0, Math.ceil(segment.duration - local))} 秒` : segment.steps.length ? `第 ${Math.max(1, stepIndex + 1)} / ${segment.steps.length} 个位置` : '';
    if (this.lastSegment !== segment) {
      this.lastSegment = segment; this.ui.notes.replaceChildren();
      for (const item of segment.steps) { const node = document.createElement('span'); node.className = 'coach-note'; node.textContent = item.label; this.ui.notes.append(node); }
    }
    [...this.ui.notes.children].forEach((node, i) => node.classList.toggle('is-active', i === stepIndex));
  }
  complete() {
    cancelAnimationFrame(this.frame);
    if (!this.plan) return;
    if (this.testing) { this.stop(true); this.ui.status.textContent = '测试结束。听清以后直接点“开始今天的跟练”；仍小声时检查媒体音量和蓝牙输出。'; return; }
    this.ui.phase.textContent = '这项做完了'; this.ui.current.textContent = '歇好了，再继续'; this.ui.instruction.textContent = '完成播放不等于能力通关。不舒服时直接结束。';
    this.ui.count.textContent = ''; this.ui.notes.replaceChildren(); this.ui.progress.value = 100;
    this.ui.transport.hidden = true; this.ui.finish.hidden = false;
    const next = findDrill(this.queue[this.index + 1]);
    this.ui.next.textContent = next ? '准备好了，开始下一项' : '完成今天的跟练';
    this.ui['next-label'].textContent = next ? `下一项：${next.title} · 约 ${formatTime(compileDrill(next, this.settings()).duration)}。点击后还会重新给准备时间。` : '今天这套已经结束，不需要把练习库全部唱一遍。';
    this.ui.next.focus({ preventScroll: true });
  }
  testSound() {
    this.stop(false); this.stopOthers(); this.testing = true;
    this.ui.home.hidden = true; this.ui.screen.hidden = false; this.ui.finish.hidden = true; this.ui.transport.hidden = false;
    this.ui.position.textContent = '声音测试'; this.ui.item.textContent = '按手机音量键，调整媒体音量';
    this.plan = { id: 'sound-test', title: '跟练声音测试', duration: 3, beat: 1,
      segments: [{ mode:'demo',at:0,duration:3,title:'只听，不用唱',instruction:'这与正式跟练使用同一个媒体播放器。',restartAt:0,steps:[{at:0,duration:1,label:'听',note:0},{at:1,duration:1,label:'听',note:4},{at:2,duration:1,label:'听',note:7}] }],
      events: [0,4,7].map((n,i) => ({at:i,duration:.85,midi:48+n,kind:'piano',amp:.4})) };
    try { this.installTrack(renderWav(this.plan, this.settings())); this.play(); } catch (error) { this.fail(error.message); }
  }
  fail(message) { this.ui.status.textContent = message; this.ui['audio-help'].open = true; }
  stop(reset) {
    this.serial = (this.serial || 0) + 1; cancelAnimationFrame(this.frame);
    this.plan = null;
    if (this.audio) { this.audio.pause(); this.audio.removeAttribute('src'); this.audio.load(); }
    if (this.url) { URL.revokeObjectURL(this.url); this.url = null; }
    if (reset && this.ui) { this.ui.home.hidden = false; this.ui.screen.hidden = true; this.ui.finish.hidden = true; this.ui.status.textContent = '已停止。下次按开始即可，不需要补做。'; }
  }
}
export function installVocalCoach() {
  if (!customElements.get('guided-vocal-trainer')) customElements.define('guided-vocal-trainer', VocalCoach);
}
