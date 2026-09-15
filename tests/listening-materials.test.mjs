import test from 'node:test';
import assert from 'node:assert/strict';
import { EAR_MATERIALS, CASE_MELODY, CASE_HARMONY, makeTimeline, midiHz } from '../src/lib/listening-materials.mjs';

test('ear-training phrases preserve complete 4/4 bars and a real rest', () => {
  for (const material of Object.values(EAR_MATERIALS)) {
    assert.equal(material.notes.reduce((sum, [, duration]) => sum + duration, 0), material.beats);
    assert.equal(material.beats % 4, 0);
    assert.ok(material.notes.some(([note]) => note === null));
  }
  const plan = makeTimeline({ preset: 'ear-2', bpm: 60, echo: false });
  assert.equal(plan.duration, 12); // Four preparation beats + two complete bars.
  assert.ok(!plan.events.some(event => event.at <= 10.5 && event.at + event.duration > 10.5));
  assert.match(plan.answer[5], /第2小节第3拍：休止，1拍/);
});

test('echo leaves one phrase of clicks with no pitched melody', () => {
  const plan = makeTimeline({ preset: 'ear-2', bpm: 60, echo: true });
  assert.equal(plan.duration, 36);
  const response = plan.events.filter(e => e.at >= 16 && e.at < 24);
  assert.equal(response.length, 8);
  assert.ok(response.every(e => e.hz === 900 || e.hz === 1200));
});

test('case melody and harmony end together, with G to C halfway through bar 8', () => {
  assert.equal(CASE_MELODY.reduce((s, [, beats]) => s + beats, 0), 32);
  assert.deepEqual(CASE_HARMONY.slice(-2).map(([at, beats, name]) => [at, beats, name]), [[28, 2, 'G'], [30, 2, 'C']]);
  const arpeggio = makeTimeline({ preset: 'case', part: 'arranged' }).events.filter(e => e.volume === 0.04).slice(0, 4);
  assert.deepEqual(arpeggio.map(e => e.hz), [48, 52, 55, 52].map(midiHz));
  for (const bpm of [60, 72, 84]) {
    for (const part of ['full', 'melody', 'bass', 'harmony', 'arranged']) {
      const plan = makeTimeline({ preset: 'case', bpm, part });
      assert.equal(plan.duration, 36 * 60 / bpm);
      assert.ok(plan.events.every(e => e.at >= 0 && e.duration > 0 && e.at + e.duration <= plan.duration + 1e-9));
    }
  }
});

test('pitch transposition changes notes while keeping timing and labels aligned', () => {
  const normal = makeTimeline({ preset: 'ear-4', transpose: 0 });
  const low = makeTimeline({ preset: 'ear-4', transpose: -12 });
  const musical = x => x.events.filter(e => e.rich);
  musical(normal).forEach((event, i) => {
    assert.equal(musical(low)[i].at, event.at);
    assert.ok(Math.abs(musical(low)[i].hz - event.hz / 2) < 1e-10);
  });
  assert.match(low.answer[0], /C2/);
});

test('physics experiments preserve stated frequency conditions', () => {
  assert.deepEqual(makeTimeline({ preset: 'beats' }).events.map(e => e.hz), [440, 442]);
  assert.deepEqual(makeTimeline({ preset: 'fifth-pure' }).events.map(e => e.hz), [220, 330]);
  const equal = makeTimeline({ preset: 'fifth-equal' }).events;
  assert.equal(equal[0].hz, 220);
  assert.ok(Math.abs(equal[1].hz - 329.62755691287) < 1e-8);
  assert.ok(equal.every(e => e.rich));
  const c = makeTimeline({ preset: 'center-c' }), a = makeTimeline({ preset: 'center-a' });
  assert.deepEqual(c.events.slice(1), a.events.slice(1));
  assert.equal(c.events[0].hz, midiHz(48)); assert.equal(a.events[0].hz, midiHz(45));
  for (const preset of ['drone-c', 'drone-a', 'drone-e', 'drone-f']) assert.equal(makeTimeline({ preset }).duration, 20);
});
