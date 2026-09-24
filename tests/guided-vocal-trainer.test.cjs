const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const root = path.resolve(__dirname, '..');
const load = name => import(pathToFileURL(path.join(root, 'src/lib', name)).href);
const modules = Promise.all([load('vocal-coach-data.mjs'), load('vocal-coach-audio.mjs')]);

test('all 38 existing drill IDs and seven queues remain valid', async () => {
  const [{ALL_DRILLS,QUEUES,findDrill},{compileDrill}] = await modules;
  assert.equal(ALL_DRILLS.length,38); assert.equal(new Set(ALL_DRILLS.map(d=>d.id)).size,38); assert.equal(Object.keys(QUEUES).length,7);
  for(const id of ['high-fixed-repeat','high-open-vowel','high-enter-hold-exit','soft-arc','ear-irregular-delay','english-pickup','foundation-lyric','song-ab']) assert(findDrill(id));
  for(const ids of Object.values(QUEUES)) for(const id of ids) assert(compileDrill(findDrill(id)).duration>0);
  for(const ex of ALL_DRILLS) for(const tempo of [50,60,72]) {
    const p=compileDrill(ex,{tempo}); assert.equal(p.segments[0].mode,'prepare'); assert(p.segments[0].duration>=8);
    assert.equal(p.segments.at(-1).mode,'rest'); assert(p.segments.at(-1).duration>=6);
    let t=0; for(const s of p.segments){assert(Math.abs(s.at-t)<1e-8);assert(s.duration>0);t+=s.duration;}
    assert(Math.abs(t-p.duration)<1e-8); assert(p.duration<180,ex.id);
    for(const e of p.events){assert(e.at>=0);assert(e.duration>0);assert(e.at+e.duration<=p.duration+1e-8,ex.id);}
  }
});

test('normal accompaniment starts after preparation, without mandatory listen/demo',async()=>{
  const [{ALL_DRILLS,QUEUES,findDrill},{compileDrill}]=await modules;
  assert(QUEUES.daily.every(id=>!['echo','manual'].includes(findDrill(id).type)));
  for(const ex of ALL_DRILLS.filter(ex=>!['echo','manual'].includes(ex.type))) {
    const p=compileDrill(ex), prep=p.segments[0], first=p.segments[1];
    assert(!p.segments.some(s=>s.mode==='demo'||s.mode==='verify'),ex.id);
    assert.equal(first.mode,'sing'); assert.equal(first.at,prep.duration);
    assert.equal(prep.count,4);
    const clicks=p.events.filter(e=>e.kind==='click'&&e.at>=prep.countAt-1e-8&&e.at<prep.at+prep.duration);
    assert.equal(clicks.length,4,ex.id);
    assert.equal(first.restartAt,0,'resume the first phrase from full preparation');
    for(const s of p.segments.filter(s=>s.mode==='sing').slice(1)) {
      const rest=p.segments.find(c=>c.at===s.restartAt);
      assert.equal(rest.mode,'count'); assert(rest.duration>=3.5*p.beat);
    }
  }
});

test('pitch AND beat are audible during singing and the following breath gap',async()=>{
  const [{ALL_DRILLS},{compileDrill}]=await modules;
  for(const ex of ALL_DRILLS.filter(ex=>['scale','sustain','dynamics','glide'].includes(ex.type))) {
    const p=compileDrill(ex);
    for(const s of p.segments.filter(s=>['sing','count'].includes(s.mode))) {
      for(let i=0;i<s.duration/p.beat-1e-8;i++) assert(p.events.some(e=>e.kind==='click'&&Math.abs(e.at-s.at-i*p.beat)<1e-8),`${ex.id}: missing beat ${i}`);
    }
    assert(p.events.some(e=>e.midi!==undefined));
  }
});

test('range and tempo are real inputs, fixed repeats and vowel transfer survive',async()=>{
  const [{ALL_DRILLS,findDrill},{compileDrill}]=await modules;
  for(const ex of ALL_DRILLS) for(const start of [36,45,48,60,65]) for(const ceiling of [52,60,64,69,76]) {
    try{const p=compileDrill(ex,{root:start,ceiling});assert(p.highest===null||p.highest<=ceiling,ex.id);}catch(e){assert.match(e.message,/上限|范围/);}
  }
  const ex=findDrill('foundation-mum');assert(compileDrill(ex,{tempo:50}).duration>compileDrill(ex,{tempo:72}).duration);
  assert.throws(()=>compileDrill(findDrill('daily-octave'),{root:60,ceiling:64}),/上限/);
  const fixed=compileDrill(findDrill('high-fixed-repeat'));assert.deepEqual(fixed.roots,[48]);assert.equal(fixed.segments.filter(s=>s.mode==='sing').length,3);
  const v=compileDrill(findDrill('high-open-vowel')).segments.filter(s=>s.mode==='sing');
  assert.deepEqual(v.map(s=>s.steps.map(x=>x.label)),[Array(5).fill('呜'),['呜','呜','啊','啊','啊'],Array(5).fill('啊')]);
  const p=compileDrill(findDrill('high-enter-hold-exit')),s=p.segments.find(s=>s.mode==='sing');
  const highs=p.events.filter(e=>e.at>=s.at&&e.at<s.at+s.duration&&e.midi===55);assert.equal(highs.length,1);assert(highs[0].duration>1.8);
});

test('ear-training retains genuine silence, hidden answers and verification',async()=>{
  const [{findDrill},{compileDrill}]=await modules;
  const p=compileDrill(findDrill('ear-irregular-delay')),mem=p.segments.filter(s=>s.mode==='memory');assert.equal(mem.length,3);
  for(const s of mem){assert.equal(s.duration,4);assert(!p.events.some(e=>e.at<s.at+s.duration&&e.at+e.duration>s.at));}
  for(const s of p.segments.filter(s=>s.mode==='echo'))assert(s.steps.every(x=>x.label==='•'));
  assert.equal(p.segments.filter(s=>s.mode==='verify').length,3);
  const d=p.segments.filter(s=>s.mode==='demo');assert.notDeepEqual(d[0].steps.map(s=>s.note),d[1].steps.map(s=>s.note));
});

test('pickup/count-in align; held vowels and high notes do not re-attack',async()=>{
  const [{findDrill},{compileDrill}]=await modules;
  for(const tempo of [50,60,72]){
    const p=compileDrill(findDrill('english-pickup'),{tempo}),lines=p.segments.filter(s=>s.mode==='sing');
    assert.equal(lines[0].steps[0].label,'and');assert.equal(lines[0].steps[1].label,'TAKE');
    const beatOne=lines[0].at+p.beat/2;
    assert(Math.abs(beatOne-(p.segments[0].countAt+4*p.beat))<1e-8);
    for(let i=1;i<lines.length;i++) assert(Math.abs((lines[i].at-lines[i-1].at)/p.beat-12)<1e-8,'pickup must not shift the beat every repeat');
  }
  const p=compileDrill(findDrill('english-melody')),s=p.segments.find(s=>s.mode==='sing');
  assert(p.events.find(e=>e.kind==='piano'&&Math.abs(e.at-s.at-3)<1e-9).duration>.9);
});

test('WAV is audible, bounded, valid and keeps the memory interval silent',async()=>{
  const [{findDrill},{compileDrill,renderWav}]=await modules;
  for(const id of ['daily-mum','soft-arc','ear-irregular-delay']) {
    const p=compileDrill(findDrill(id)),wav=renderWav(p,{sampleRate:8000}),v=new DataView(wav);
    assert.equal(Buffer.from(wav).subarray(0,4).toString(),'RIFF');assert.equal(v.getUint32(24,true),8000);assert.equal(v.getUint32(40,true),wav.byteLength-44);
    let peak=0,power=0,n=0;for(let i=44;i<wav.byteLength;i+=2){const a=v.getInt16(i,true)/32767;peak=Math.max(peak,Math.abs(a));if(Math.abs(a)>.001){power+=a*a;n++;}}
    assert(peak>.2&&peak<=.801);assert(Math.sqrt(power/n)>.08);
    for(const m of p.segments.filter(s=>s.mode==='memory'))for(let i=Math.ceil((m.at+.01)*8000);i<Math.floor((m.at+m.duration-.01)*8000);i++)assert.equal(v.getInt16(44+i*2,true),0);
  }
  assert.throws(()=>renderWav({duration:Infinity}),/长度/);
});

test('media output, transport and simple initial screen remain available',async()=>{
  const [,{requestMediaPlayback}]=await modules;
  const nav={audioSession:{type:'auto'}};assert(requestMediaPlayback(nav));assert.equal(nav.audioSession.type,'playback');assert.equal(requestMediaPlayback({}),false);
  const broken={};Object.defineProperty(broken,'audioSession',{get(){throw Error('unsupported')}});assert.equal(requestMediaPlayback(broken),false);
  const player=fs.readFileSync(path.join(root,'src/lib/vocal-coach-player.mjs'),'utf8');assert(player.includes("type: 'audio/wav'"));assert(player.includes('this.audio.play()'));assert(!player.includes('getUserMedia'));assert(!player.includes('new AudioContext'));
  const view=fs.readFileSync(path.join(root,'src/components/GuidedVocalTrainer.astro'),'utf8');
  assert(view.includes('<audio data-audio controls'));assert(view.includes('开始跟练'));assert(view.includes('先试声音'));assert(view.includes('data-beats'));
  assert.match(view,/<details[^>]*data-library>/);assert.match(view,/<details[^>]*data-settings>/);
  assert(!view.includes('data-library open'));assert(!view.includes('data-settings open'));
});
