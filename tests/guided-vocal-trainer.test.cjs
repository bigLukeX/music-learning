const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const root = path.resolve(__dirname, '..');
const load = (name) => import(pathToFileURL(path.join(root, 'src/lib', name)).href);
const modules = Promise.all([load('vocal-coach-data.mjs'), load('vocal-coach-audio.mjs')]);

test('all existing vocal IDs and every default queue are retained and valid', async () => {
  const [{ ALL_DRILLS, QUEUES, findDrill }, { compileDrill }] = await modules;
  assert.equal(ALL_DRILLS.length, 38);
  assert.equal(new Set(ALL_DRILLS.map((d) => d.id)).size, ALL_DRILLS.length);
  for (const id of ['high-fixed-repeat','high-open-vowel','high-enter-hold-exit','soft-arc','ear-irregular-delay','english-pickup','foundation-lyric','song-ab']) assert(findDrill(id));
  for (const [routine, ids] of Object.entries(QUEUES)) {
    assert(ids.length > 0, routine);
    for (const id of ids) { assert(findDrill(id), id); assert(compileDrill(findDrill(id)).duration > 0); }
  }
  for (const ex of ALL_DRILLS) {
    const p = compileDrill(ex); assert.equal(p.segments[0].mode, 'prepare'); assert(p.segments[0].duration >= 8);
    assert.equal(p.segments.at(-1).mode, 'rest'); assert(p.segments.at(-1).duration >= 6);
    let t = 0;
    for (const s of p.segments) { assert(Math.abs(s.at - t) < 1e-8); assert(s.duration > 0); t += s.duration; }
    assert(Math.abs(t - p.duration) < 1e-8); assert(p.duration < 180, ex.id);
    for (const e of p.events) { assert(e.at >= 0); assert(e.duration > 0); assert(e.at + e.duration <= p.duration + 1e-8); }
  }
});

test('range limits and tempo are real plan inputs, not cosmetic controls', async () => {
  const [{ ALL_DRILLS, findDrill }, { compileDrill }] = await modules;
  for (const ex of ALL_DRILLS) for (const root of [36,45,48,60,65]) for (const ceiling of [52,60,64,69,76]) {
    try { const p = compileDrill(ex, {root,ceiling}); assert(p.highest === null || p.highest <= ceiling, ex.id); }
    catch (e) { assert.match(e.message, /上限|范围/); }
  }
  const ex = findDrill('foundation-mum'); assert(compileDrill(ex, {tempo:50}).duration > compileDrill(ex, {tempo:72}).duration);
  assert.throws(() => compileDrill(findDrill('daily-octave'), {root:60,ceiling:64}), /上限/);
});

test('fixed repeats, staged vowels and genuinely held high note', async () => {
  const [{ findDrill }, { compileDrill }] = await modules;
  const fixed = compileDrill(findDrill('high-fixed-repeat'));
  assert.deepEqual(fixed.roots, [48]); assert.equal(fixed.segments.filter(s => s.mode === 'sing').length, 3);
  const vowel = compileDrill(findDrill('high-open-vowel')).segments.filter(s => s.mode === 'sing');
  assert.deepEqual(vowel[0].steps.map(s => s.label), ['呜','呜','呜','呜','呜']);
  assert.deepEqual(vowel[1].steps.map(s => s.label), ['呜','呜','啊','啊','啊']);
  assert.deepEqual(vowel[2].steps.map(s => s.label), ['啊','啊','啊','啊','啊']);
  const held = compileDrill(findDrill('high-enter-hold-exit'));
  const phrase = held.segments.find(s => s.mode === 'sing');
  const highEvents = held.events.filter(e => e.at >= phrase.at && e.at < phrase.at + phrase.duration && e.midi === 55);
  assert.equal(highEvents.length, 1); assert(highEvents[0].duration > 1.8);
});

test('delayed recall is actually silent and does not show pitch answers', async () => {
  const [{ findDrill }, { compileDrill }] = await modules;
  const plan = compileDrill(findDrill('ear-irregular-delay'));
  const memories = plan.segments.filter(s => s.mode === 'memory'); assert.equal(memories.length, 3);
  for (const m of memories) {
    assert.equal(m.duration, 4);
    assert(!plan.events.some(e => e.at < m.at + m.duration && e.at + e.duration > m.at));
  }
  for (const s of plan.segments.filter(s => s.mode === 'echo')) assert(s.steps.every(step => step.label === '•'));
  assert.equal(plan.segments.filter(s => s.mode === 'verify').length, 3);
  assert.notDeepEqual(plan.segments.filter(s => s.mode === 'demo')[0].steps.map(s => s.note), plan.segments.filter(s => s.mode === 'demo')[1].steps.map(s => s.note));
});

test('English pickup precedes beat one and held vowels are not re-attacked', async () => {
  const [{ findDrill }, { compileDrill }] = await modules;
  const pickup = compileDrill(findDrill('english-pickup')).segments.find(s => s.mode === 'sing');
  assert.equal(pickup.steps[0].label, 'and'); assert.equal(pickup.steps[1].label, 'TAKE'); assert.equal(pickup.steps[1].at, .5);
  const p = compileDrill(findDrill('english-melody')); const s = p.segments.find(s => s.mode === 'sing');
  const note = p.events.find(e => e.kind === 'piano' && Math.abs(e.at - s.at - 3) < 1e-9);
  assert(note.duration > .9);
});

test('WAV is valid, audible, bounded and preserves silence', async () => {
  const [{ findDrill }, { compileDrill, renderWav }] = await modules;
  const p = compileDrill(findDrill('ear-irregular-delay'));
  const wav = renderWav(p, {sampleRate:8000}); const v = new DataView(wav);
  assert.equal(Buffer.from(wav).subarray(0,4).toString(), 'RIFF'); assert.equal(v.getUint32(24,true),8000);
  assert.equal(v.getUint32(40,true), wav.byteLength - 44);
  let peak = 0, power = 0, n = 0;
  for(let i=44;i<wav.byteLength;i+=2){const a=v.getInt16(i,true)/32767;peak=Math.max(peak,Math.abs(a));if(Math.abs(a)>.001){power+=a*a;n++;}}
  assert(peak>.2 && peak<=.801); assert(Math.sqrt(power/n)>.08);
  const m = p.segments.find(s => s.mode === 'memory');
  for(let i=Math.ceil((m.at+.01)*8000);i<Math.floor((m.at+m.duration-.01)*8000);i++) assert.equal(v.getInt16(44+i*2,true),0);
  assert.throws(()=>renderWav({duration:Infinity}), /长度/);
});

test('playback mode is feature-detected, never requests microphone', async () => {
  const [, {requestMediaPlayback}] = await modules;
  const nav={audioSession:{type:'auto'}}; assert.equal(requestMediaPlayback(nav),true); assert.equal(nav.audioSession.type,'playback');
  assert.equal(requestMediaPlayback({}),false);
  const broken={};Object.defineProperty(broken,'audioSession',{get(){throw Error('unsupported')}});assert.equal(requestMediaPlayback(broken),false);
  const player=fs.readFileSync(path.join(root,'src/lib/vocal-coach-player.mjs'),'utf8');
  assert(player.includes("type: 'audio/wav'")); assert(player.includes('this.audio.play()'));
  assert(!player.includes('getUserMedia'));assert(!player.includes('new AudioContext'));
  const view=fs.readFileSync(path.join(root,'src/components/GuidedVocalTrainer.astro'),'utf8');
  assert(view.includes('<audio data-audio controls'));assert(view.includes('开始今天的跟练'));assert(view.includes('先试声音'));
  assert.match(view, /<details[^>]*data-library>/);assert.match(view, /<details[^>]*data-settings>/);
  assert(!view.includes('data-library open'));assert(!view.includes('data-settings open'));
});
