const test = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const { pathToFileURL } = require('node:url');
const vm = require('node:vm');

// Run from the repository root. This executes the actual component methods;
// the fake browser only lets a pending AudioContext.resume settle on demand.
async function createHarness() {
  const root = process.cwd();
  const { makeTimeline } = await import(pathToFileURL(join(root, 'src/lib/listening-materials.mjs')).href);
  const astro = readFileSync(join(root, 'src/components/ListeningLab.astro'), 'utf8');
  const match = astro.match(/<script>([\s\S]*?)<\/script>/);
  assert.ok(match, 'ListeningLab must contain its browser script');
  const script = match[1].replace(/^\s*import\s+\{[^}]+\}\s+from\s+['"][^'"]+['"];?\s*$/gm, '');
  const contexts = [], scheduled = [], timers = new Map();
  let ListeningLab, nextTimer = 1;
  const field = (value = '') => ({
    value, disabled: false, textContent: '', hidden: false, open: false,
    addEventListener() {}, replaceChildren() {}, append() {},
  });
  class Element {
    constructor() {
      this.dataset = { initialPreset: 'ear-2' };
      this.isConnected = true;
      this.fields = {};
      const values = { preset: 'ear-2', bpm: '60', transpose: '0', echo: 'yes', part: 'full', start: '', stop: '', status: '', info: '', progress: '', answer: '', 'answer-list': '' };
      for (const [key, value] of Object.entries(values)) this.fields[key] = field(value);
    }
    querySelector(selector) { return this.fields[selector.match(/data-([^\]]+)/)[1]]; }
    querySelectorAll() { return ['preset', 'bpm', 'transpose', 'echo', 'part'].map(key => this.fields[key]); }
  }
  class AudioContext {
    constructor() { this.state = 'suspended'; this.currentTime = 0; this.destination = {}; contexts.push(this); }
    createGain() { return { gain: { value: 0 }, connect() {} }; }
    resume() {
      return new Promise((resolve, reject) => {
        this.resolveResume = () => { if (this.state === 'suspended') this.state = 'running'; resolve(); };
        this.rejectResume = reject;
      });
    }
    close() { this.state = 'closed'; return Promise.resolve(); }
  }
  const window = {
    AudioContext, addEventListener() {}, dispatchEvent() {},
    setInterval(callback) { const id = nextTimer++; timers.set(id, callback); return id; },
    clearInterval(id) { timers.delete(id); },
  };
  vm.runInNewContext(script, {
    HTMLElement: Element, AbortController, window,
    document: { hidden: false, addEventListener() {}, createElement: () => field() },
    CustomEvent: class { constructor(type, options) { this.type = type; this.detail = options.detail; } },
    customElements: { get() { return undefined; }, define(name, constructor) { ListeningLab = constructor; } },
    makeTimeline, Set, Number, Math, Error,
  });
  const lab = new ListeningLab();
  lab.connectedCallback();
  // Audio scheduling is observed, not reimplemented. The race is in start().
  lab.schedule = event => scheduled.push(event);
  return { lab, contexts, scheduled, timers };
}

for (const oldOutcome of ['resolve', 'reject']) {
  test(`reconnecting ignores ${oldOutcome} of an old pending resume`, async () => {
    const { lab, contexts, scheduled, timers } = await createHarness();
    const oldRun = lab.start();
    assert.equal(contexts.length, 1);
    lab.isConnected = false;
    lab.disconnectedCallback();
    lab.isConnected = true;
    lab.connectedCallback();
    lab.preset.value = 'beats';
    lab.preview();
    const newRun = lab.start();
    assert.equal(contexts.length, 2);
    contexts[1].resolveResume();
    await newRun;
    const newEvents = scheduled.length;
    assert.equal(newEvents, 2, 'new beat experiment should schedule exactly two tones');
    assert.equal(lab.startButton.disabled, true);
    assert.equal(timers.size, 1);
    const newStatus = lab.status.textContent;
    if (oldOutcome === 'resolve') contexts[0].resolveResume();
    else contexts[0].rejectResume(new Error('old closed context'));
    await oldRun;
    assert.equal(scheduled.length, newEvents, 'stale start must not schedule old notes into the new context');
    assert.equal(lab.startButton.disabled, true, 'stale rejection must not stop the new playback');
    assert.equal(lab.stopButton.disabled, false);
    assert.equal(lab.status.textContent, newStatus, 'stale rejection must not overwrite the new status');
    assert.equal(timers.size, 1, 'the new progress timer must remain active');
    lab.stop('test cleanup');
    assert.equal(timers.size, 0);
  });
}

test('stopping during resume prevents deferred scheduling', async () => {
  const { lab, contexts, scheduled, timers } = await createHarness();
  const run = lab.start();
  lab.stop('用户已停止');
  contexts[0].resolveResume();
  await run;
  assert.equal(scheduled.length, 0);
  assert.equal(timers.size, 0);
  assert.equal(lab.startButton.disabled, false);
  assert.equal(lab.stopButton.disabled, true);
  assert.equal(lab.status.textContent, '用户已停止');
});
