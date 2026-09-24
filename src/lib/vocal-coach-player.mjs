import { QUEUES, findDrill } from './vocal-coach-data.mjs';
import { compileDrill, renderWav, segmentAt, formatTime, noteName, requestMediaPlayback } from './vocal-coach-audio.mjs';

const degree = (n) => ({0:'1',2:'2',4:'3',5:'4',7:'5',9:'6',11:'7',12:'8'})[n] || String(n);
export class VocalCoach extends (globalThis.HTMLElement || class {}) {
  connectedCallback() {
    if (this.ready) return;
    this.ready = true; this.serial = 0; this.url = null; this.frame = 0; this.queue = []; this.index = 0;
    this.routine = this.dataset.routine || 'daily';
    this.audio = this.querySelector('[data-audio]');
    this.ui = {};
    for (const key of ['home','summary','start','test','screen','position','time','item','phase','current','instruction','notes','beats','count','progress','transport','finish','next','next-label','status','audio-help','audio-status','pause','root','ceiling','tempo','loudness','bottle']) this.ui[key] = this.querySelector(`[data-${key}]`);
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
    this.audio.addEventListener('pause', () => { cancelAnimationFrame(this.frame); if (this.plan && !this.audio.ended) this.ui.pause.textContent = '继续'; }, options);
    this.audio.addEventListener('timeupdate', () => this.paint(), options);
    this.audio.addEventListener('error', () => { if (this.plan) this.fail('音轨读取失败，请重试或用系统浏览器打开。'); }, options);
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
    this.ui.status.textContent = '设置已保存，再按开始。';
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
    this.ui.summary.textContent = valid ? `${QUEUES[this.routine].length} 项 · ${formatTime(total)} · 单项结束后手动继续` : '当前范围放不下这套音型，请降低起音或选单项。';
    this.querySelectorAll('[data-drill]').forEach((button) => {
      const label = this.querySelector(`[data-length="${button.dataset.drill}"]`);
      try { const plan = compileDrill(findDrill(button.dataset.drill), this.settings()); button.disabled = false; label.textContent = formatTime(plan.duration); }
      catch { button.disabled = true; label.textContent = '超出上限'; }
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
    this.ui.instruction.textContent = ''; this.ui.status.textContent = '';
    this.ui.screen.scrollIntoView({ behavior: 'auto', block: 'start' }); this.ui.screen.focus({ preventScroll: true });
    try {
      this.plan = compileDrill(ex, this.settings());
      const bytes = renderWav(this.plan, this.settings());
      this.installTrack(bytes);
      // Keep play() inside the original user gesture for mobile media playback.
      await this.play(token);
    } catch (error) { if (token === this.serial) this.fail(error instanceof Error ? error.message : '无法开始，请重试。'); }
  }
  installTrack(bytes) {
    requestMediaPlayback();
    this.url = URL.createObjectURL(new Blob([bytes], { type: 'audio/wav' }));
    this.audio.src = this.url; this.audio.muted = false; this.audio.volume = 1; this.lastSegment = null;
    this.ui['audio-status'].textContent = '使用普通媒体音轨播放；不申请麦克风。';
    if ('mediaSession' in navigator) {
      try {
        if ('MediaMetadata' in window) navigator.mediaSession.metadata = new MediaMetadata({ title: this.plan.title, artist: '音乐学习 · 跟练', album: '声乐' });
        navigator.mediaSession.setActionHandler('play', () => this.resume());
        navigator.mediaSession.setActionHandler('pause', () => this.audio.pause());
        navigator.mediaSession.setActionHandler('stop', () => this.stop(true));
      } catch { /* Some media-session actions are optional. */ }
    }
    this.paint();
  }
  async play(token = this.serial) {
    requestMediaPlayback();
    try { await this.audio.play(); if (token !== this.serial) return; this.ui.pause.textContent = '暂停'; this.tick(); }
    catch (error) {
      if (token !== this.serial) return;
      this.ui.pause.textContent = '点这里播放';
      this.fail(error?.name === 'NotAllowedError' ? '请再点一次播放，或展开下方系统播放器。' : '音轨暂时无法播放，请重试。');
    }
  }
  resume() {
    if (!this.plan) return;
    if (!this.testing) {
      const s = segmentAt(this.plan, this.audio.currentTime);
      if (['sing','echo','manual','count','memory'].includes(s.mode)) this.audio.currentTime = s.restartAt;
    }
    return this.play();
  }
  togglePause() { if (!this.plan) return; if (this.audio.paused) this.resume(); else this.audio.pause(); }
  restartPhrase() { if (!this.plan) return; this.audio.currentTime = Math.max(0, segmentAt(this.plan, this.audio.currentTime).restartAt); this.play(); }
  tick() { cancelAnimationFrame(this.frame); this.paint(); if (this.plan && !this.audio.paused && !this.audio.ended) this.frame = requestAnimationFrame(() => this.tick()); }
  paint() {
    if (!this.plan || this.ui.screen.hidden) return;
    const p = this.plan, t = Math.min(this.audio.currentTime || 0, p.duration), s = segmentAt(p, t);
    if (!s) return;
    const local = t - s.at;
    const stepIndex = s.steps.findIndex((x) => local >= x.at && local < x.at + x.duration);
    const step = s.steps[stepIndex];
    const isCount = s.mode === 'count' || (s.mode === 'prepare' && s.countAt !== undefined && t >= s.countAt);
    const notes = s.nextSteps || s.steps;
    this.ui.time.textContent = `${formatTime(t)} / ${formatTime(p.duration)}`;
    this.ui.progress.value = Math.min(100, t / p.duration * 100);
    this.ui.phase.textContent = s.mode === 'prepare' ? '准备' : s.mode === 'count' ? '换气' : s.mode === 'sing' ? '跟唱' : s.mode === 'demo' ? '先听' : s.mode === 'echo' ? '回唱' : s.mode === 'verify' ? '核对' : s.mode === 'memory' ? '记住旋律' : s.title;
    this.ui.current.textContent = isCount ? String(Math.max(1, Math.ceil((s.at + s.duration + (s.mode === 'prepare' && p.exerciseType === 'rhythm' && findDrill(p.id)?.pickup ? p.beat / 2 : 0) - t) / p.beat)))
      : s.mode === 'prepare' ? p.say || '准备'
      : s.mode === 'memory' ? '…'
      : s.mode === 'rest' ? '休息'
      : s.mode === 'demo' || s.mode === 'verify' ? '听'
      : s.mode === 'echo' ? '噜'
      : step?.label || p.say || '';
    const pitch = s.root !== undefined && step?.note !== null && step?.note !== undefined && !['echo','memory'].includes(s.mode) ? noteName(s.root + step.note) : '';
    this.ui.instruction.textContent = [pitch, `${p.bpm || 60} BPM`, s.round ? `第 ${s.round}/${s.totalRounds} 遍` : ''].filter(Boolean).join(' · ');
    this.ui.count.textContent = s.mode === 'prepare' && !isCount ? `${Math.ceil(s.duration - local)} 秒后开始` : s.mode === 'rest' ? `休息 ${Math.max(0, Math.ceil(s.duration - local))} 秒` : s.mode === 'count' ? (s.instruction || (s.root !== undefined ? `下一遍 · ${noteName(s.root)}` : '换气后继续')) : s.mode === 'memory' ? `${Math.ceil((s.duration - local) / p.beat)} 拍` : '';
    if (this.lastSegment !== s) {
      this.lastSegment = s; this.ui.notes.replaceChildren();
      for (const item of notes) {
        const node = document.createElement('span'); node.className = 'coach-note';
        node.textContent = ['scale','sustain'].includes(p.exerciseType) && item.note !== null && s.mode !== 'echo' && s.mode !== 'demo' && s.mode !== 'verify' ? degree(item.note) : item.label;
        this.ui.notes.append(node);
      }
    }
    [...this.ui.notes.children].forEach((node, i) => node.classList.toggle('is-active', s.mode !== 'count' && i === stepIndex));
    const pulseStart = isCount ? (s.countAt ?? s.at) : (s.pulseAt ?? s.at);
    const pulsing = isCount || ['sing','echo'].includes(s.mode);
    const pulse = pulsing && t >= pulseStart ? Math.floor((t - pulseStart) / p.beat + 1e-6) % 4 : -1;
    [...(this.ui.beats?.children || [])].forEach((node, i) => node.classList.toggle('is-active', i === pulse));
  }
  complete() {
    cancelAnimationFrame(this.frame); if (!this.plan) return;
    if (this.testing) { this.stop(true); this.ui.status.textContent = '声音测试结束，可以开始跟练。'; return; }
    this.ui.phase.textContent = '本项结束'; this.ui.current.textContent = '休息'; this.ui.instruction.textContent = '';
    this.ui.count.textContent = ''; this.ui.notes.replaceChildren(); this.ui.progress.value = 100;
    [...(this.ui.beats?.children || [])].forEach(node => node.classList.remove('is-active'));
    this.ui.transport.hidden = true; this.ui.finish.hidden = false;
    const next = findDrill(this.queue[this.index + 1]);
    this.ui.next.textContent = next ? '下一项' : '结束跟练';
    this.ui['next-label'].textContent = next ? `${next.title} · ${formatTime(compileDrill(next, this.settings()).duration)}` : '这套已完成。';
    this.ui.next.focus({ preventScroll: true });
  }
  testSound() {
    this.stop(false); this.stopOthers(); this.testing = true;
    this.ui.home.hidden = true; this.ui.screen.hidden = false; this.ui.finish.hidden = true; this.ui.transport.hidden = false;
    this.ui.position.textContent = '声音测试'; this.ui.item.textContent = '播放时调整手机媒体音量';
    this.plan = { id: 'sound-test', title: '跟练声音测试', duration: 3, beat: 1, bpm: 60,
      segments: [{ mode:'demo',at:0,duration:3,title:'只听',instruction:'',restartAt:0,steps:[{at:0,duration:1,label:'听',note:0},{at:1,duration:1,label:'听',note:4},{at:2,duration:1,label:'听',note:7}] }],
      events: [0,4,7].map((n,i) => ({at:i,duration:.85,midi:48+n,kind:'piano',amp:.4})) };
    try { this.installTrack(renderWav(this.plan, this.settings())); this.play(); } catch (error) { this.fail(error.message); }
  }
  fail(message) { this.ui.status.textContent = message; this.ui['audio-help'].open = true; }
  stop(reset) {
    this.serial = (this.serial || 0) + 1; cancelAnimationFrame(this.frame); this.plan = null;
    if (this.audio) { this.audio.pause(); this.audio.removeAttribute('src'); this.audio.load(); }
    if (this.url) { URL.revokeObjectURL(this.url); this.url = null; }
    // A second player must not leave the old player looking as though it is still singing.
    if (this.ui) { this.ui.home.hidden = false; this.ui.screen.hidden = true; this.ui.finish.hidden = true; }
    if (reset && this.ui) this.ui.status.textContent = '已停止。';
  }
}
export function installVocalCoach() {
  if (!customElements.get('guided-vocal-trainer')) customElements.define('guided-vocal-trainer', VocalCoach);
}
