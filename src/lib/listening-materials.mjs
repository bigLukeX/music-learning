// Original teaching material, authored for this project. Durations are quarter-note beats.
export const EAR_MATERIALS = {
  'ear-2': {
    title: 'E2-v1 · 原创两小节：级进、长音与休止', beats: 8,
    notes: [[48, 1], [50, 1], [52, 1], [55, 1], [52, 2], [null, 1], [48, 1]],
    question: '先拍出音头与静默，再哼轮廓；第 2 小节哪一拍完全没有声音？',
  },
  'ear-4': {
    title: 'E4-v1 · 原创四小节：重复与回答', beats: 16,
    notes: [[48, 1], [50, 1], [52, 1], [55, 1], [52, 2], [null, 1], [48, 1],
      [55, 1], [53, 1], [52, 1], [50, 1], [52, 1], [50, 1], [48, 2]],
    question: '先比较前后两句的方向，再标长音与休止；最后停在主音吗？',
  },
};

export const CASE_MELODY = [
  [60, 1], [64, 1], [67, 1], [64, 1],
  [64, 1], [64, 1], [60, 1], [null, 1],
  [65, 1], [64, 1], [62, 1], [60, 1],
  [62, 1], [67, 1], [65, 1], [62, 1],
  [64, 1], [67, 1], [69, 1], [67, 1],
  [64, 1], [60, 1], [62, 1], [64, 1],
  [65, 1], [69, 1], [67, 1], [65, 1],
  [62, 1], [59, 1], [60, 2],
];
// [start beat, duration, name, bass MIDI, triad voicing MIDI].
export const CASE_HARMONY = [
  [0, 4, 'C', 48, [48, 52, 55]], [4, 4, 'Am', 45, [48, 52, 57]],
  [8, 4, 'F', 41, [48, 53, 57]], [12, 4, 'G', 43, [47, 50, 55]],
  [16, 4, 'C', 48, [48, 52, 55]], [20, 4, 'Am', 45, [48, 52, 57]],
  [24, 4, 'F', 41, [48, 53, 57]], [28, 2, 'G', 43, [47, 50, 55]],
  [30, 2, 'C', 48, [48, 52, 55]],
];
export const midiHz = (midi) => 440 * 2 ** ((midi - 69) / 12);
export function noteName(midi) {
  if (midi === null) return '休止';
  return ['C', 'C♯', 'D', 'E♭', 'E', 'F', 'F♯', 'G', 'A♭', 'A', 'B♭', 'B'][((midi % 12) + 12) % 12] + (Math.floor(midi / 12) - 1);
}
export function describeNotes(notes, transpose = 0) {
  let offset = 0;
  return notes.map(([midi, beats]) => {
    const label = `第${Math.floor(offset / 4) + 1}小节第${offset % 4 + 1}拍：${noteName(midi === null ? null : midi + transpose)}，${beats}拍`;
    offset += beats;
    return label;
  });
}
const DRONES = { 'drone-c': 48, 'drone-a': 45, 'drone-e': 40, 'drone-f': 41 };

export function makeTimeline({ preset = 'ear-2', bpm = 60, transpose = 0, echo = true, part = 'full' } = {}) {
  if (![60, 72, 84].includes(bpm) || ![-12, -7, -5, 0, 5, 7, 12].includes(transpose)) throw new Error('无效的速度或移调设置');
  const events = [], phases = [];
  const beat = 60 / bpm;
  const tone = (hz, at, duration, volume = 0.08, rich = false) => events.push({ hz, at, duration, volume, rich });
  const click = (at, accent) => tone(accent ? 1200 : 900, at, 0.035, 0.035);
  const countIn = (at) => { for (let i = 0; i < 4; i++) click(at + i * beat, i === 0); };
  const notesAt = (notes, at, volume = 0.1) => {
    let pos = at;
    for (const [midi, n] of notes) {
      if (midi !== null) tone(midiHz(midi + transpose), pos, n * beat, volume, true);
      pos += n * beat;
    }
  };
  if (EAR_MATERIALS[preset]) {
    const m = EAR_MATERIALS[preset];
    let cursor = 0;
    for (const label of echo ? ['示范', '留空回唱', '核对'] : ['示范']) {
      phases.push({ at: cursor, label: `${label}前数四拍` }); countIn(cursor); cursor += 4 * beat;
      phases.push({ at: cursor, label });
      if (label === '留空回唱') {
        for (let i = 0; i < m.beats; i++) click(cursor + i * beat, i % 4 === 0);
      } else notesAt(m.notes, cursor);
      cursor += m.beats * beat;
    }
    return { events, phases, duration: cursor, info: m.question, answer: describeNotes(m.notes, transpose) };
  }
  if (preset === 'case') {
    countIn(0); const start = 4 * beat;
    phases.push({ at: 0, label: '准备：四拍倒数' });
    for (let b = 0; b < 8; b++) phases.push({ at: start + b * 4 * beat, label: `原创案例 · 第 ${b + 1} 小节` });
    if (['full', 'melody', 'arranged'].includes(part)) notesAt(CASE_MELODY, start, 0.08);
    for (const [at, length, name, bass, chord] of CASE_HARMONY) {
      if (part === 'bass' || part === 'full' || part === 'arranged') tone(midiHz(bass + transpose), start + at * beat, length * beat, 0.06, true);
      if (part === 'harmony' || part === 'full') for (const midi of chord) tone(midiHz(midi + transpose), start + at * beat, length * beat, 0.035, true);
      if (part === 'arranged') for (let n = 0; n < length; n++) tone(midiHz(chord[[0, 1, 2, 1][n % 4]] + transpose), start + (at + n) * beat, beat * 0.7, 0.04, true);
    }
    return { events, phases, duration: 36 * beat, info: 'CASE8-v1：八小节，4/4。时间点以倒数结束后的第一个音乐音为 00:00。', answer: describeNotes(CASE_MELODY, transpose) };
  }
  if (preset === 'beats') {
    tone(440, 0, 12, 0.10); tone(442, 0, 12, 0.10);
    return { events, phases: [{ at: 0, label: '440 + 442 Hz 同时播放：数每秒起伏' }], duration: 12, info: '理想拍频为 2 Hz。舒适音量听 6 秒，约有 12 次起伏；听不清先检查两个音是否同时播放。' };
  }
  if (preset === 'fifth-pure' || preset === 'fifth-equal') {
    const fifth = preset === 'fifth-pure' ? 330 : 220 * 2 ** (7 / 12);
    tone(220, 0, 12, 0.07, true); tone(fifth, 0, 12, 0.07, true);
    return { events, phases: [{ at: 0, label: preset === 'fifth-pure' ? '纯五度 · 220 + 330 Hz' : '平均律五度 · 220 + 329.628 Hz' }], duration: 12, info: '音色含第 2、3 谐波：比较 660 Hz 附近的部分音。平均律条件下差约 0.745 Hz；不是用两个基频相减得到这个慢拍。' };
  }
  if (DRONES[preset] !== undefined) {
    tone(midiHz(DRONES[preset]), 0, 20, 0.10, true);
    return { events, phases: [{ at: 0, label: `${noteName(DRONES[preset])} 持续主音` }], duration: 20, info: '只在舒适音区听、找或轻哼；可用八度等价的主音，不为追参考音挤压声音。20 秒后自动停止。' };
  }
  if (preset === 'center-c' || preset === 'center-a') {
    const root = preset === 'center-c' ? 48 : 45;
    tone(midiHz(root), 0, 16, 0.07, true);
    [60, 62, 64, 65, 67, 69, 71, 60, 71, 69, 67, 65, 64, 62].forEach((midi, i) => tone(midiHz(midi), 2 + i * 0.85, 0.65, 0.07, true));
    return { events, phases: [{ at: 0, label: `${noteName(root)} 中心 · 先听两秒持续音` }, { at: 2, label: '相同白键短句；仅低音中心不同' }], duration: 16, info: 'C4–B4 同一实际音集合、同一顺序与节奏；C3/A2 持续音是唯一变化。不同时改变旋律起音或移调。' };
  }
  throw new Error('未知实验');
}
