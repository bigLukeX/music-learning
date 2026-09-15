// Dependency-free regression checks against the original component script.
// Usage: npm test (or node tests/vocal-player.test.cjs [repository-directory])
// DOM/Web Audio are stubbed; wait() sums scheduled time instead of sleeping.
// Browser timing, sound quality and real vocal technique are outside these checks.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = process.argv[2] || path.resolve(__dirname, '..');
const file = path.join(root, 'src/components/VocalPracticePlayer.astro');
const script = fs.readFileSync(file, 'utf8').split('<script>')[1].split('</script>')[0];
const classes = new Map();
vm.runInNewContext(script, { Error, HTMLElement: class {}, customElements: { get: k => classes.get(k), define: (k, v) => classes.set(k, v) }, window: {}, document: {} }, { filename: file });
const Player = classes.get('vocal-practice-player');
function element(value) {
  return { value: String(value ?? ''), textContent: '', listeners: {}, addEventListener(name, fn) { this.listeners[name] = fn; }, dispatch(name) { assert(this.listeners[name], `Missing ${name} listener`); this.listeners[name](); } };
}
function player(routine='daily20', start=48, ceiling=64, bpm=72) {
  const p = new Player();
  const fields = {
    '[data-routine]': element(routine), '[data-sovt-tool]': element('bottle'),
    '[data-start-note]': element(start), '[data-ceiling-note]': element(ceiling), '[data-bpm]': element(bpm),
  };
  for (const field of ['play','stop','preview-start','preview-ceiling','section','cue','note','degrees','progress','message','plan']) fields[`[data-${field}]`] = element();
  p.querySelector = selector => fields[selector];
  p.setDegrees = () => {};
  p.ensureAudio = async () => {};
  p.scheduleClick = () => {};
  p.notes = []; p.ms = 0;
  p.schedulePiano = midi => p.notes.push({midi, at: p.ms});
  p.wait = async ms => { p.ms += ms; };
  p.connectedCallback();
  return p;
}
async function main() {
  const durations = {};
  for (const routine of ['daily20','gentle','head','mix','vowels','agility','ear']) {
    const p = player(routine); const expected = p.getPlan();
    assert.match(p.planOutput.textContent, /自动播放预计/);
    await p.start();
    assert(Math.abs(p.ms - expected.seconds * 1000) < 0.001, `Inaccurate estimate ${routine}`);
    assert.equal(p.progress.value, 100);
    assert.equal(p.isRunning, false);
    assert.equal(p.stopButton.disabled, true);
    assert.equal(p.playButton.disabled, false);
    assert.equal(Math.max(...p.notes.map(n=>n.midi)), expected.highest);
    assert.equal(Math.min(...p.notes.map(n=>n.midi)), expected.lowest);
    durations[routine] = +expected.seconds.toFixed(3);
  }
  const changedControls = [['ceilingSelect','60'],['startSelect','50'],['routineSelect','gentle'],['sovtSelect','no-bottle'],['bpmSelect','60']];
  for (const [field, value] of changedControls) {
    const p = player(); let waits=0, countAtChange=-1, stoppedSource=0;
    p.wait = async ms => {
      p.ms += ms;
      if (++waits === 10) {
        p.activeSources.add({stop(){stoppedSource++;}});
        countAtChange = p.notes.length;
        p[field].value=value; p[field].dispatch('change');
        assert.equal(p.isRunning, false, `${field}: still running`);
        assert.equal(p.stopButton.disabled, true, `${field}: stop state`);
        assert.equal(p.playButton.disabled, !p.getPlan().valid, `${field}: start state`);
        assert.match(p.message.textContent, /已立即停止/);
      }
    };
    await p.start();
    assert(countAtChange>=0);
    assert.equal(p.notes.length,countAtChange,`${field}: old sequence continued`);
    assert.equal(stoppedSource,1,`${field}: active source not stopped`);
    assert.equal(p.progress.value,0,`${field}: old run updated progress`);
  }
  const unchanged=player();
  unchanged.ceilingSelect.value='69'; unchanged.ceilingSelect.dispatch('change');
  assert.equal(unchanged.getPlan().highest,62);
  assert.match(unchanged.message.textContent,/上限变化没有改变实际音序列/);

  const invalid=player('daily20',60,60);
  assert.equal(invalid.playButton.disabled,true);
  invalid.stop('Stopped');
  assert.equal(invalid.playButton.disabled,true,'Stop incorrectly enables invalid plan');
  await invalid.start(); assert.equal(invalid.notes.length,0);
  assert.match(invalid.message.textContent,/不要为了启动套餐/);

  // A late AudioContext.resume() must not restart an already stopped run/preview.
  for (const mode of ['run','preview']) {
    const p=player();let resolveAudio;
    p.ensureAudio=()=>new Promise(resolve=>{resolveAudio=resolve;});
    const pending=mode==='run' ? p.start() : p.previewPitch('ceiling');
    assert.equal(p.playButton.disabled,true);
    assert.equal(p.stopButton.disabled,false);
    p.ceilingSelect.value='60';p.ceilingSelect.dispatch('change');
    resolveAudio();await pending;
    assert.equal(p.notes.length,0,`${mode}: late audio started after stop`);
    assert.equal(p.stopButton.disabled,true);
    assert.match(p.sectionOutput.textContent,/等待重启/);
  }
  const failure=player(); failure.ensureAudio=async()=>{throw new Error('Audio unavailable');};
  await failure.start();
  assert.equal(failure.isRunning,false); assert.equal(failure.playButton.disabled,false);
  assert.equal(failure.stopButton.disabled,true);assert.equal(failure.message.textContent,'Audio unavailable');

  let valid=0,rejected=0;
  for(const routine of ['daily20','gentle','head','mix','vowels','agility','ear'])
  for(const start of [45,46,47,48,50,52,53,55,57,59,60])
  for(const ceiling of [60,62,64,65,67,69])
  for(const bpm of [60,72,84]) {
    const p=player(routine,start,ceiling,bpm);const expected=p.getPlan();
    await p.start();
    if(!expected.valid){rejected++;assert.equal(p.notes.length,0);assert.equal(p.playButton.disabled,true);continue;}
    valid++;
    assert(p.notes.every(n=>n.midi>=start&&n.midi<=ceiling),'Pitch bounds');
    assert(Math.abs(p.ms-expected.seconds*1000)<0.01,'Estimate drift');
    assert.equal(p.progress.value,100);
  }
  console.log(JSON.stringify({result:'PASS',defaultSeconds:durations,changedControls:changedControls.map(x=>x[0]),lateResumeCases:2,combinations:valid+rejected,valid,rejected},null,2));
}
main().catch(error=>{console.error(error);process.exitCode=1;});
