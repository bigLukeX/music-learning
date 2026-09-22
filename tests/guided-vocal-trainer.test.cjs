const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');

const rootDir = process.argv[2] || path.resolve(__dirname, '..');
const file = path.join(rootDir, 'src/components/GuidedVocalTrainer.astro');
const source = fs.readFileSync(file, 'utf8');
const script = source.split('<script>')[1].split('</script>')[0];
const classes = new Map();

vm.runInNewContext(script, {
  Error,
  HTMLElement: class {},
  customElements: {
    get: key => classes.get(key),
    define: (key, value) => classes.set(key, value),
  },
  window: {},
  document: {},
}, { filename: file });

const Trainer = classes.get('guided-vocal-trainer');
assert(Trainer, 'guided vocal trainer custom element was not registered');

for (const routine of ['foundation','daily','high','soft','ear','english','song']) {
  assert(source.includes(routine + ':'), 'missing exercise set: ' + routine);
}

for (const card of [
  'foundation-vv','foundation-mum','daily-sovt','daily-hum','daily-agility','daily-octave',
  'high-sovt','high-wu-glide','high-mum-13531','high-gug',
  'soft-medium-soft','soft-decrescendo','ear-121','ear-melody',
  'english-one-note','english-melody','song-vowels','song-layer'
]) assert(source.includes(card), 'missing core vocal card: ' + card);

for (const behavior of ['专项短跟练','开始这条','下一条','下一条不会自动开始','准备','换调准备','结束休息']) {
  assert(source.includes(behavior), 'missing short-practice behavior: ' + behavior);
}
assert(!source.includes('data-choice="repeat"'), 'old mid-exercise decision UI still exists');

const trainer = new Trainer();
trainer.root = () => 48;
trainer.ceiling = () => 64;

const scale = {
  type:'scale', pattern:[0,2,4,2,0], bpm:60, span:5, direction:'updown',
  prep:6, gap:2, response:3, post:6, demo:true,
};
assert.equal(trainer.rootsFor(scale).length, 11);
assert.equal(trainer.estimateSeconds(scale), 95, 'scale timing estimate drift');

const repeatedScale = {
  type:'scale', pattern:[0,2,4,2,0], bpm:60, span:0, direction:'up',
  repeats:4, repeatGap:5, prep:6, response:3, post:6, demo:true,
};
assert.equal(trainer.estimateSeconds(repeatedScale), 55, 'same-key repeated scale timing drift');

const sustain = {
  type:'sustain', bpm:60, beats:4, restBeats:4, rounds:4, prep:6, post:6,
};
assert.equal(trainer.estimateSeconds(sustain), 44, 'sustain timing estimate drift');

const rhythm = {
  type:'rhythm', bpm:60, repeats:6, prep:8, gap:2, post:4,
};
assert.equal(trainer.estimateSeconds(rhythm), 70, 'rhythm timing estimate drift');

const manual = {
  type:'manual', prep:8, post:10, phases:[['唱',6],['休息',12],['唱',6]],
};
assert.equal(trainer.estimateSeconds(manual), 42, 'manual timing estimate drift');

console.log(JSON.stringify({
  result:'PASS',
  component:'GuidedVocalTrainer',
  sets:7,
  scaleSeconds:trainer.estimateSeconds(scale),
  repeatedScaleSeconds:trainer.estimateSeconds(repeatedScale),
  sustainSeconds:trainer.estimateSeconds(sustain),
  rhythmSeconds:trainer.estimateSeconds(rhythm),
  manualSeconds:trainer.estimateSeconds(manual),
}, null, 2));
