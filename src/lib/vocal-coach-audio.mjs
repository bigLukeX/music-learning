// One timeline drives both audible PCM and the screen. No per-note browser timers.
export const noteName = (n) => ['C','C♯','D','E♭','E','F','F♯','G','A♭','A','B♭','B'][((n % 12) + 12) % 12] + (Math.floor(n / 12) - 1);
export const formatTime = (seconds) => `${Math.floor(Math.ceil(seconds) / 60)}:${String(Math.ceil(seconds) % 60).padStart(2, '0')}`;
const sum = (xs) => xs.reduce((a, b) => a + b, 0);
const finite = (value, fallback) => Number.isFinite(Number(value)) ? Number(value) : fallback;

export function compileDrill(ex, settings = {}) {
  if (!ex) throw new Error('找不到这条练习。');
  const root = Math.round(finite(settings.root, 48));
  const ceiling = Math.round(finite(settings.ceiling, 64));
  const bpm = Math.max(40, Math.min(100, finite(settings.tempo || ex.bpm, 60)));
  const beat = 60 / bpm;
  const allNotes = [...(ex.notes || []), ...(ex.variants || []).flat(), ...(ex.tones || [])].filter(Number.isFinite);
  const pitched = ex.type !== 'manual' && !(ex.type === 'rhythm' && !ex.tones);
  const max = allNotes.length ? Math.max(...allNotes) : 0;
  const min = allNotes.length ? Math.min(...allNotes) : 0;
  if (root < 36 || root > 72 || ceiling < 36 || ceiling > 84 || (pitched && root + max > ceiling)) {
    throw new Error('这条旋律超出当前上限。请降低起音，或换更短的练习；不要勉强升高上限。');
  }
  const span = pitched ? Math.max(0, Math.min(ex.span || 0, ceiling - root - max)) : 0;
  const up = Array.from({ length: span + 1 }, (_, i) => root + i);
  const roots = ex.updown && span ? [...up, ...up.slice(0, -1).reverse()] : up;
  const segments = [], events = [];
  let clock = 0;
  const add = (mode, seconds, title, instruction = '', steps = [], restartAt = clock) => {
    const segment = { mode, at: clock, duration: seconds, title, instruction, steps, restartAt };
    segments.push(segment); clock += seconds; return segment;
  };
  const tone = (at, duration, midi, extra = {}) => events.push({ at, duration, midi, kind: 'piano', amp: .4, ...extra });
  const click = (at, accent = false) => events.push({ at, duration: .055, kind: 'click', amp: accent ? .15 : .09, accent });
  const count = (n, instruction, pitch = null, first = false) => {
    const s = add('count', n * beat, first ? '准备' : '换气', instruction);
    for (let i = 0; i < n; i++) click(s.at + i * beat, i === 0);
    if (pitch !== null) tone(s.at, Math.min(.65, beat * .7), pitch, { amp: .25 });
    s.count = n; s.countAt = s.at; return s.at;
  };
  const pattern = (notes, r, mode, labels, hint, restartAt, beats = null) => {
    const lengths = beats || notes.map(() => 1);
    let offset = 0;
    const steps = notes.map((n, i) => {
      const item = { at: offset, duration: lengths[i] * beat, label: mode === 'echo' ? '•' : n === null ? '停' : labels?.[i] || ex.say, note: n };
      offset += item.duration; return item;
    });
    const s = add(mode, offset, mode === 'demo' ? '先听，不用唱' : mode === 'verify' ? '核对' : '跟唱', hint, steps, restartAt);
    if (mode !== 'echo') steps.forEach((step) => {
      if (step.note !== null) tone(s.at + step.at, step.duration * .95, r + step.note);
    });
    else steps.forEach((step, i) => click(s.at + step.at, i === 0));
    // Keep a steady pulse under the reference pitches, not only during rests.
    if (mode === 'sing') for (let i = 0; i < offset / beat - 1e-8; i++) click(s.at + i * beat, i % 4 === 0);
    return s;
  };
  const sustained = (r, mode, restartAt) => {
    const levels = ex.levels || [ex.say];
    const lengths = ex.levelBeats || ex.beats || [4];
    const steps = []; let offset = 0;
    levels.forEach((label, i) => {
      steps.push({ at: offset, duration: lengths[i] * beat, label, note: 0 }); offset += lengths[i] * beat;
      if (ex.between && i < levels.length - 1) { steps.push({ at: offset, duration: ex.between * beat, label: '休息', note: null }); offset += ex.between * beat; }
    });
    const s = add(mode, offset, mode === 'demo' ? '先听音高和长短' : '跟唱', ex.hint || '音量不用大，保持轻松。', steps, restartAt);
    if (ex.type === 'dynamics' && !ex.between) {
      tone(s.at, s.duration, r, { kind: 'sustain', levels: levels.map((v) => /小|弱/.test(v) ? .48 : 1), levelSeconds: lengths.map((n) => n * beat) });
    } else {
      steps.forEach((step) => { if (step.note !== null) tone(s.at + step.at, step.duration, r, { kind: 'sustain', amp: /小|弱/.test(step.label) ? .22 : .4 }); });
    }
    if (mode === 'sing') for (let i = 0; i < offset / beat - 1e-8; i++) click(s.at + i * beat, i % 4 === 0);
    return s;
  };
  const glide = (r, mode, restartAt) => {
    const lengths = ex.beats || [3,3];
    const s = add(mode, sum(lengths) * beat, mode === 'demo' ? '先听滑动的路线' : '跟唱', '', [
      { at: 0, duration: lengths[0] * beat, label: '呜 ↗', note: 0 },
      { at: lengths[0] * beat, duration: lengths[1] * beat, label: '呜 ↘', note: 7 },
    ], restartAt);
    tone(s.at, lengths[0] * beat, r, { kind: 'glide', endMidi: r + 7 });
    tone(s.at + lengths[0] * beat, lengths[1] * beat, r + 7, { kind: 'glide', endMidi: r });
    if (mode === 'sing') for (let i = 0; i < s.duration / beat - 1e-8; i++) click(s.at + i * beat, i % 4 === 0);
    return s;
  };
  const grid = (mode, restartAt) => {
    const shift = ex.pickup ? beat / 2 : 0;
    const tokens = ex.pickup ? [ex.pickup, ...ex.tokens] : ex.tokens;
    const steps = tokens.map((label, i) => ({ at: i * beat / 2, duration: beat / 2, label: label === '·' ? '停' : label === '—' ? '延长' : label, note: null }));
    const s = add(mode, (ex.tokens.length / 2) * beat + shift, mode === 'demo' ? '先听节奏，跟着看' : ex.tones ? '现在轻唱' : '现在轻声读', ex.hint || '亮到哪个音节，就读到哪里。', steps, restartAt);
    for (let i = 0; i < ex.tokens.length / 2; i++) click(s.at + shift + i * beat, i % 4 === 0);
    if (ex.pickup) click(s.at, false);
    ex.tokens.forEach((label, i) => {
      if (label === '·' || label === '—') return;
      const at = s.at + shift + i * beat / 2;
      let units = 1; while (ex.tokens[i + units] === '—') units++;
      if (ex.tones) tone(at, units * beat / 2 * .95, root + ex.tones[i], { amp: .3 });
      else if (mode === 'demo') click(at, label === label.toUpperCase());
    });
    return s;
  };

  const preparation = add('prepare', Math.max(8, 4 * beat, ex.prep || 8), '准备', '');
  if (pitched) tone(.6, .9, root + (ex.notes?.find(Number.isFinite) || 0), { amp: .24 });
  if (ex.type === 'manual') {
    for (const [label, seconds] of ex.phases) {
      const rest = /休息|回听/.test(label);
      const restart = rest ? clock : count(4, `接下来：${label}`);
      add(rest ? 'rest' : 'manual', seconds, label, '只处理已经选好的同一句，不从整首开头重唱。', [], restart);
    }
  } else if (ex.type === 'echo') {
    roots.forEach((r) => {
      for (let round = 0; round < (ex.repeats || 1); round++) {
        const notes = ex.variants?.[round % ex.variants.length] || ex.notes;
        pattern(notes, r, 'demo', notes.map(() => '听'), '听完整句，不用跟唱。', clock);
        let restart;
        if (ex.delay) {
          const s = add('memory', ex.delay * beat, '安静记住旋律', '没有提示音；倒数结束再唱。'); s.count = ex.delay; restart = s.at;
        } else restart = count(4, '轮到你唱“噜”，接下来钢琴留空。');
        pattern(notes, r, 'echo', null, '凭记忆唱“噜”；小圆点只表示节奏，不显示答案。', restart);
        if (ex.verify) { add('rest', 2 * beat, '先停下', '接下来只听核对，不补唱。'); pattern(notes, r, 'verify', notes.map(() => '听'), '比较自己的旋律和钢琴。', clock); }
        add('rest', 4 * beat, '休息', '下一句仍然先听。');
      }
    });
  } else {
    const labelsFor = (round) => ex.roundSyllables?.[round] || ex.syllables || (ex.notes || []).map(() => ex.tool ? (settings.bottle ? '练声瓶' : 'v——') : ex.say);
    const perform = (r, mode, restart, round = 0) => {
      if (ex.type === 'sustain' || ex.type === 'dynamics') return sustained(r, mode, restart);
      if (ex.type === 'glide') return glide(r, mode, restart);
      if (ex.type === 'rhythm') return grid(mode, restart);
      return pattern(ex.notes, r, mode, labelsFor(round), ex.roundHints?.[round] || ex.hint || '跟着亮起的字唱，保持轻松。', restart, ex.beats);
    };
    // These are accompaniment drills for an already-known action, not a lesson.
    // The first four-beat count-in lives INSIDE the preparation, with no forced demo.
    const pickup = ex.type === 'rhythm' && ex.pickup ? beat / 2 : 0;
    preparation.count = 4;
    preparation.countAt = preparation.at + preparation.duration + pickup - 4 * beat;
    for (let i = 0; i < 4; i++) click(preparation.countAt + i * beat, i === 0);
    let iteration = 0;
    roots.forEach((r) => {
      for (let round = 0; round < (ex.repeats || 1); round++) {
        const hint = ex.roundHints?.[round] || '';
        // A pickup occupies the last half beat before beat one, rather than
        // pushing the next phrase's beat one half a beat late on every repeat.
        const gap = Math.max(4, ex.rest || 4) - pickup / beat;
        const restart = iteration ? count(gap, hint, pitched ? r + (ex.notes?.find(Number.isFinite) || 0) : null) : preparation.at;
        const segment = perform(r, 'sing', restart, round);
        segment.root = r;
        segment.round = iteration + 1;
        segment.totalRounds = roots.length * (ex.repeats || 1);
        segment.pulseAt = segment.at + pickup;
        segment.instruction = hint;
        if (iteration) {
          const gapSegment = segments[segments.length - 2];
          gapSegment.nextSteps = segment.steps;
          gapSegment.root = r;
          gapSegment.round = segment.round;
          gapSegment.totalRounds = segment.totalRounds;
        }
        iteration++;
      }
    });
  }
  add('rest', ex.post || 6, '休息', '');
  return { id: ex.id, title: ex.title, say: ex.tool ? settings.bottle ? '练声瓶' : 'v——' : ex.say, exerciseType: ex.type, bpm, beat, root, roots, lowest: pitched ? root + min : null, highest: pitched ? Math.max(...roots) + max : null, segments, events, duration: clock };
}

export function segmentAt(plan, time) {
  return plan.segments.find((s) => time >= s.at && time < s.at + s.duration) || plan.segments.at(-1);
}

// PCM WAV is played by a real <audio> element, not by AudioContext.destination.
// It therefore uses the normal media-element audio session even without Audio Session API.
export function renderWav(plan, { sampleRate = 22050, loudness = .8 } = {}) {
  if (!Number.isFinite(plan.duration) || plan.duration <= 0 || plan.duration > 600) throw new Error('音轨长度无效。');
  loudness = Math.max(.15, Math.min(1, finite(loudness, .8)));
  const data = new Float32Array(Math.ceil((plan.duration + .04) * sampleRate));
  for (const event of plan.events) {
    const start = Math.round(event.at * sampleRate);
    const count = Math.max(1, Math.floor(event.duration * sampleRate));
    const frequency = event.kind === 'click' ? event.accent ? 1200 : 850 : 440 * 2 ** ((event.midi - 69) / 12);
    let phase = 0;
    for (let j = 0; j < count && start + j < data.length; j++) {
      const t = j / sampleRate, p = j / count;
      const f = event.endMidi === undefined ? frequency : frequency * 2 ** ((event.endMidi - event.midi) * p / 12);
      phase += 2 * Math.PI * f / sampleRate;
      let wave, envelope;
      if (event.kind === 'click') { wave = Math.sin(phase); envelope = Math.exp(-t * 70); }
      else {
        wave = (Math.sin(phase) + .46 * Math.sin(2 * phase) + .22 * Math.sin(3 * phase) + .12 * Math.sin(4 * phase)) / 1.8;
        envelope = event.kind === 'piano' ? .25 + .75 * Math.exp(-t * 3.2) : .9;
      }
      envelope *= Math.min(1, t / .008, (event.duration - t) / .025);
      if (event.levels) {
        let cursor = 0, k = 0;
        while (k < event.levelSeconds.length - 1 && t >= cursor + event.levelSeconds[k]) cursor += event.levelSeconds[k++];
        const duration = event.levelSeconds[k];
        const blend = k < event.levels.length - 1 ? Math.max(0, (t - cursor - duration + .25) / .25) : 0;
        envelope *= event.levels[k] * (1 - blend) + (event.levels[k + 1] || event.levels[k]) * blend;
      }
      data[start + j] += wave * Math.max(0, envelope) * event.amp;
    }
  }
  let peak = 0, power = 0, active = 0;
  for (const v of data) { peak = Math.max(peak, Math.abs(v)); if (Math.abs(v) > .0001) { power += v * v; active++; } }
  const rms = active ? Math.sqrt(power / active) : 0;
  const gain = peak ? Math.min(.8 / peak, rms ? .18 / rms : 1) * loudness : 1;
  const bytes = new ArrayBuffer(44 + data.length * 2), view = new DataView(bytes);
  const ascii = (offset, value) => [...value].forEach((c, i) => view.setUint8(offset + i, c.charCodeAt(0)));
  ascii(0, 'RIFF'); view.setUint32(4, bytes.byteLength - 8, true); ascii(8, 'WAVE'); ascii(12, 'fmt ');
  view.setUint32(16, 16, true); view.setUint16(20, 1, true); view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true); view.setUint32(28, sampleRate * 2, true); view.setUint16(32, 2, true); view.setUint16(34, 16, true);
  ascii(36, 'data'); view.setUint32(40, data.length * 2, true);
  for (let i = 0; i < data.length; i++) view.setInt16(44 + i * 2, Math.round(Math.max(-.95, Math.min(.95, data[i] * gain)) * 32767), true);
  return bytes;
}

export function requestMediaPlayback(nav = globalThis.navigator) {
  try { if (nav?.audioSession) { nav.audioSession.type = 'playback'; return nav.audioSession.type === 'playback'; } } catch { /* Optional API: <audio> is still the primary output. */ }
  return false;
}
