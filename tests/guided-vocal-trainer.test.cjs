const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');

const root = process.argv[2] || path.resolve(__dirname, '..');
const file = path.join(root, 'src/components/GuidedVocalTrainer.astro');
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

assert(classes.has('guided-vocal-trainer'), 'guided vocal trainer custom element was not registered');
for (const routine of ['high','soft','ear','english','song']) {
  assert(source.includes(routine + ':'), 'missing guided routine: ' + routine);
}
for (const behavior of ['先听', '准备', '休息', 'data-choice="repeat"', 'data-choice="stop"']) {
  assert(source.includes(behavior), 'missing guided-practice behavior: ' + behavior);
}
console.log(JSON.stringify({result:'PASS',component:'GuidedVocalTrainer',routines:5}, null, 2));
