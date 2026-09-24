// Original practice material. IDs remain stable so existing lesson links/records survive.
const THREE = [0, 2, 4, 2, 0];
const FIVE = [0, 2, 4, 5, 7, 5, 4, 2, 0];
const ARP = [0, 4, 7, 4, 0];
const EN = ['TAKE','a','LIT','tle','TIME','with','ME','—','LET','the','MORN','ing','CAR','ry','YOU','—'];
const EN_TONES = [0,0,2,2,4,2,0,0,0,0,2,2,4,2,0,0];
const scale = (id, title, say, notes = THREE, extra = {}) => ({
  id, title, say, type: 'scale', notes, bpm: 60, span: 3, updown: true,
  beats: notes.length > 8 ? notes.map((_, i) => i === notes.length - 1 ? 1 : .5) : undefined,
  prep: 8, rest: 4, post: 6, repeats: 1, demo: true, ...extra,
});
const hold = (id, title, say, extra = {}) => scale(id, title, say, [0], {
  type: 'sustain', beats: [4], span: 0, repeats: 4, ...extra,
});
const echo = (id, title, notes, extra = {}) => scale(id, title, '噜', notes, {
  type: 'echo', span: 2, ...extra,
});
const rhythm = (id, title, extra = {}) => scale(id, title, '轻声读', [0], {
  type: 'rhythm', tokens: EN, tones: null, span: 0, repeats: 4, ...extra,
});

export const DRILLS = {
  foundation: [
    hold('foundation-vv', '有声 v：轻轻延长', 'v——', { hint: '像 very 开头的 v；不要用力吹气。' }),
    scale('foundation-mum', '轻声“马姆”唱三音', '马姆', THREE, { span: 0, repeats: 4, rest: 5 }),
    scale('foundation-vowels', '同一个音，换五个元音', '衣—诶—啊—哦—乌', [0,0,0,0,0], {
      span: 0, repeats: 4, rest: 5, syllables: ['衣','诶','啊','哦','乌'],
    }),
    scale('foundation-lyric', '把元音接回一句话', '今天慢慢唱', THREE, {
      span: 0, repeats: 3, rest: 6, roundSyllables: [Array(5).fill('啊'), ['今','天','慢','慢','唱'], ['今','天','慢','慢','唱']],
      roundHints: ['先用“啊”唱旋律', '同一旋律，加回“今天慢慢唱”', '再唱同一句，不加大声音'],
      hint: '使用本站原创五字短句“今天慢慢唱”，不用先找歌。',
    }),
  ],
  daily: [
    scale('daily-sovt', '轻松热身：唇颤或有声 v', 'v——', THREE, { tool: true, span: 4, prep: 10 }),
    scale('daily-hum', '闭嘴，轻轻哼“嗯”', '嗯', FIVE, { hint: '嘴唇轻闭，牙齿不要咬紧。' }),
    scale('daily-vowels', '同一个音，换五个元音', '衣—诶—啊—哦—乌', [0,0,0,0,0], {
      span: 0, repeats: 4, syllables: ['衣','诶','啊','哦','乌'],
    }),
    scale('daily-glide', '用“呜”滑上去，再滑回来', '呜', [0,7,0], { type: 'glide', span: 3, beats: [3,3] }),
    scale('daily-mum', '轻声“马姆”：跳音连接', '马姆', ARP, { span: 4 }),
    scale('daily-agility', '轻声“哒”：均匀换音', '哒', FIVE, { bpm: 72 }),
    scale('daily-octave', '轻声“哒”：八度音阶', '哒', [0,2,4,5,7,9,11,12,11,9,7,5,4,2,0], { span: 1, prep: 10, post: 8 }),
  ],
  high: [
    scale('high-sovt', '先用轻松的热身音型', 'v——', FIVE, { tool: true, span: 3, prep: 10 }),
    scale('high-wu-12321', '用“呜”轻轻上去再回来', '呜', THREE, { span: 4 }),
    scale('high-fixed-repeat', '同一句，稳稳唱三遍', '呜', THREE, { span: 0, repeats: 3, rest: 5, post: 8, hint: '三遍保持同一个调，不自动升高。' }),
    scale('high-open-vowel', '从“呜”慢慢换成“啊”', '呜 → 啊', THREE, {
      span: 0, repeats: 3, rest: 5, post: 8,
      roundSyllables: [Array(5).fill('呜'), ['呜','呜','啊','啊','啊'], Array(5).fill('啊')],
      roundHints: ['这一遍全部唱“呜”', '到最高的那个音，换成轻“啊”', '这一遍全部轻声唱“啊”'],
    }),
    scale('high-enter-hold-exit', '上去，停两拍，再下来', '马姆', [4,5,7,5,4], {
      beats: [1,1,2,1,1], span: 2, hint: '最高音连续停两拍，不要重新撞一下音头。', post: 8,
    }),
    scale('high-descend', '从轻的声音落回来', 'ng → 乌', [7,4,0], { syllables: ['ng','乌','乌'] }),
    scale('high-wu-glide', '用“呜”连续滑上滑下', '呜', [0,7,0], { type: 'glide', beats: [3,3] }),
    scale('high-mum-13531', '“马姆”：连接跳进音程', '马姆', ARP, { span: 4 }),
    scale('high-gug', '轻轻的 gug：换音不喊', 'gug', FIVE, { hint: 'g 短而轻；不熟悉时先用“马姆”。' }),
  ],
  soft: [
    hold('soft-sustain', '小声唱，保持四拍', '呜', { post: 8 }),
    hold('soft-medium-soft', '正常音量，再小一点', '呜', {
      type: 'dynamics', levels: ['正常音量','小一点'], levelBeats: [4,4], between: 4, repeats: 3, post: 8,
    }),
    hold('soft-arc', '小声 → 正常 → 小声', '呜', {
      type: 'dynamics', levels: ['小声','正常音量','小声'], levelBeats: [2,2,2], between: 0, repeats: 3, post: 8,
      hint: '音量只改变一点；不是耳语，也不用喊。',
    }),
    hold('soft-decrescendo', '保持两拍，慢慢变小', '呜', {
      type: 'dynamics', levels: ['正常音量','稍微变小'], levelBeats: [2,2], between: 0, repeats: 4, post: 8,
    }),
    scale('soft-vv-u', '从有声 v 接到“乌”', 'v → 乌', THREE, { syllables: ['v→乌','乌','乌','乌','乌'] }),
  ],
  ear: [
    echo('ear-121', '听一句，再唱一句：小步上行', [0,2,0]),
    echo('ear-131', '听一句，再唱一句：三度', [0,4,0]),
    echo('ear-151', '听一句，再唱一句：五度', [0,7,0]),
    echo('ear-melody', '听完短旋律，自己唱回来', THREE, { span: 1 }),
    echo('ear-irregular-delay', '记住旋律，等四拍再唱', [0,4,2,7,4], {
      span: 0, repeats: 3, delay: 4, verify: true,
      variants: [[0,4,2,7,4], [4,2,0,2,7], [0,4,null,2,7,4]],
      hint: '三句不同；记忆时没有钢琴提示，回唱后再核对。',
    }),
  ],
  english: [
    rhythm('english-stress', '先把重读的词放进拍子', { tokens: ['TAKE','·','LIT','·','TIME','·','ME','—','LET','·','MORN','·','CAR','·','YOU','—'] }),
    rhythm('english-full', '把轻的音节加回去'),
    rhythm('english-one-note', '同一个音，唱完整句子', { tones: Array(16).fill(0) }),
    rhythm('english-melody', '带着旋律唱，不拖拍', { notes: [0,2,4], tones: EN_TONES }),
    rhythm('english-pickup', '从弱拍进来，不抢第一拍', { pickup: 'and', hint: '倒数最后一拍的后半拍读 and，下一拍读 TAKE。' }),
  ],
  song: [
    scale('song-vowels', '先唱“啊”，再加回歌词', '今天慢慢唱', THREE, {
      span: 0, repeats: 4, rest: 6, roundSyllables: [Array(5).fill('啊'), Array(5).fill('啊'), ['今','天','慢','慢','唱'], ['今','天','慢','慢','唱']],
      roundHints: ['先唱“啊”', '同一旋律，再唱“啊”', '加回“今天慢慢唱”', '原词再唱一遍'],
      hint: '先用原创示例“今天慢慢唱”。自选歌曲的 A/B 另在单条库里。',
    }),
    { id: 'song-ab', title: '自选歌曲：比较两个调', say: '自己选好的难句', type: 'manual', prep: 10, post: 8,
      hint: '流程辅助，不含歌曲伴奏；准备好同一句的两个调再开始。',
      phases: [['版本 A：唱一句',8], ['休息，准备版本 B',25], ['版本 B：唱同一句',8], ['现在回听两个版本',25]],
    },
    { id: 'song-layer', title: '自选歌曲：从说话接到歌词', say: '自己选好的难句', type: 'manual', prep: 10, post: 8,
      hint: '流程辅助，不含歌曲伴奏；先准备一条熟悉的短句。',
      phases: [['只说节奏',6], ['休息',10], ['单音吟唱',6], ['休息',10], ['只唱元音',6], ['休息',10], ['唱原词',6]],
    },
  ],
};
export const ALL_DRILLS = Object.values(DRILLS).flat();
export const findDrill = (id) => ALL_DRILLS.find((drill) => drill.id === id);
export const QUEUES = {
  daily: ['daily-hum','foundation-mum','high-fixed-repeat','soft-arc','ear-irregular-delay'],
  foundation: ['foundation-vv','foundation-mum','foundation-vowels','foundation-lyric'],
  high: ['daily-hum','high-fixed-repeat','high-open-vowel','high-enter-hold-exit'],
  soft: ['soft-sustain','soft-medium-soft','soft-arc'],
  ear: ['ear-121','ear-131','ear-irregular-delay'],
  english: ['english-stress','english-full','english-one-note','english-pickup'],
  song: ['song-vowels'],
};
export const ROUTINE_NAMES = {
  daily: '今天的跟练', foundation: '基础发声跟练', high: '换区与稳定性跟练',
  soft: '小声歌唱跟练', ear: '旋律听唱跟练', english: '英文节奏跟练', song: '把声音接回歌词',
};
