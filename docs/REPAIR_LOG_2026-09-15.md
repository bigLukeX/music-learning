# 全站修复记录 · 2026-09-15

## 范围与状态

用户要求修复此前所有教程、体系与交互问题，并提交部署；范围包括吉他、声乐、乐理、歌曲、口琴和共用网站功能。以下45个初审编号都有对应处理，Neo增补问题也一并纳入。保留原学习路线与已购课程主资源，个人进度没有自动通过。

真实歌曲页面现在有明确来源、任务与证据状态；完整可核验分析使用本项目原创CASE8-v1。四首商业作品的具体和弦、BPM、音域没有完成逐音听证，继续明确待验证；这部分不冒充已完成歌曲转录。原件路径图/App分段、个人声线和口琴型号也仍需实际资料核验。

## 验证结果

- 68页GitHub Pages子路径构建通过；7094处站内资源/页面/锚点引用无缺失。
- 9项Node回归通过，包含1386组声乐参数、五类改参停止、音频晚恢复及实验室断开/重连竞态。
- 68页在1440px与390px共136次浏览器渲染检查，无页面脚本异常、缺图、整页/正文横向溢出或未解析加粗。
- 实际浏览器验证：两个播放器启动与改参停止、折叠答案、实验参数、移动菜单aria展开/关闭、嵌套404返回正确；中文搜索在初审及修复验收中检查。
- 各模块另核查原创指法音名、拍值、源链接与MDX语法；原件没有修改或提交。
- GitHub Actions会重跑测试、构建与链接检查；部署结果须与最终提交的Actions运行对应。

## 逐项处理

| 编号 | 实施结果 | 主要位置 |
|---|---|---|
| SYS-01 | 后半程作品关卡、Neo余项取用、6A/6B与阶段7–9任务/回退 | [查看文件](../src/content/docs/guitar/post-16-gates.mdx) |
| SYS-02 | 阶段A必需项与可携带补练项分别定义，个人计划与网页同步 | [查看文件](guitar/NEXT_8_WEEKS.md) |
| SYS-03 | 原五项结果、0–9本轮任务和模块交接统一，不自动过关 | [查看文件](guitar/ROADMAP.md) |
| SYS-04 | 新增原创两/四小节音源、折叠答案、核验与异日复测 | [查看文件](../src/content/docs/listening-lab.mdx) |
| ROOT-01 | 404返回采用站点base，在嵌套错误URL下也返回首页/目录 | [查看文件](../src/content/docs/404.mdx) |
| ROOT-02 | 进度路径改为docs/guitar/PROGRESS.md，并给尚不会分流 | [查看文件](../src/content/docs/start-here.mdx) |
| ROOT-03 | 首页后续顺序同步理论→声乐→歌曲→口琴 | [查看文件](../src/content/docs/index.mdx) |
| ROOT-04 | 使用已验证的SEYDEL稳定地址，去掉失效尾斜线/会话链接 | [查看文件](../src/content/docs/sources-and-evidence.mdx) |
| SONG-01 | 增加可播放分轨、完整答案和编配的原创案例；四首真实歌曲补来源与首轮任务，精确听证字段保留待验证 | [查看文件](../src/content/docs/songs/worked-example.mdx) |
| SONG-02 | 核验可维持、修正或待验证，不再要求必须制造错误 | [查看文件](../src/content/docs/songs/evidence-and-versioning.mdx) |
| ROOT-05 | 应用层同步菜单按钮aria-expanded；保留框架样式/焦点行为 | [查看文件](../src/components/AccessibleMenuToggle.astro) |
| G01 | 加入尚不会/未测分流和两和弦原创起步曲，材料不足按实际数量练 | [查看文件](../src/content/docs/guitar/positioning-a.mdx) |
| G02 | 开放和弦弦品/指号/XO、TAB读法和完整拍值最小例子 | [查看文件](../src/content/docs/guitar/chords-and-transitions.mdx) |
| G03 | 实际低音与推断根音分栏，增加C/E等说明 | [查看文件](../src/content/docs/guitar/ear-and-transcription.mdx) |
| G04 | 七和弦听辨区分三度大小与减五度，不把半减七当小三底 | [查看文件](../src/content/docs/guitar/stage-b-weeks-9-16.mdx) |
| G05 | 明确起音/延音/主动消音，并用完整拍格作对照 | [查看文件](../src/content/docs/guitar/rhythm.mdx) |
| G06 | 增益定义与进入非线性后的失真/压缩效果分开 | [查看文件](../src/content/docs/guitar/tone-and-signal-chain.mdx) |
| G07 | 区分调内音级与和弦内构成音，给具体C/F/G对照 | [查看文件](../src/content/docs/guitar/fretboard.mdx) |
| G08 | 补击勾滑/推揉弦的两音动作、目标品位、次数和回退 | [查看文件](../src/content/docs/guitar/technique.mdx) |
| G09 | 使用已有Neo图的主题/PDF页及首轮选用说明，不重制整套地图 | [查看文件](../src/content/docs/guitar/fretboard.mdx) |
| G14 | 补三种实际C排列与低音说明，验收不再把织体数等同voicing数 | [查看文件](../src/content/docs/guitar/harmony.mdx) |
| VOC-01 | 五种参数变化都停止旧run；修音频晚恢复/试听竞态与按钮状态 | [查看文件](../src/components/VocalPracticePlayer.astro) |
| VOC-02 | 实际序列计算预计时间，正文区分自动时间与整次流程 | [查看文件](../src/content/docs/vocal/daily-practice.mdx) |
| VOC-03 | 嗓音异常一律休息；轻柔仅身体疲劳而声音正常时使用 | [查看文件](../src/content/docs/vocal/safe-practice.mdx) |
| VOC-04 | 八单元逐项映射自动/手动练习；弱唱/长音/英文/歌曲不再假称已有套餐 | [查看文件](../src/content/docs/vocal/first-8-weeks.mdx) |
| VOC-05 | 明确H/W音型、拍值、重复、回听信号和回退；不能判断动作时保留录音请教师校准 | [查看文件](../src/content/docs/vocal/high-notes-and-mix.mdx) |
| VOC-06 | E2-v1/E4-v1带节奏/休止的音源和答案，以及持续主音入口 | [查看文件](../src/content/docs/vocal/pitch-and-ear.mdx) |
| VOC-07 | 原创EN-1示范重读/弱读/连读/拍格，附读法提示和回退 | [查看文件](../src/content/docs/vocal/melody-and-english.mdx) |
| VOC-08 | VL-BASE-1固定材料、音域、BPM、版本和录音条件 | [查看文件](../src/content/docs/vocal/baseline.mdx) |
| VOC-09 | 当前每周1–2次可选维护；七项表改为轮换池，与正式单元区分 | [查看文件](../src/content/docs/vocal/index.mdx) |
| VOC-10 | 补课程所用音节中文近似/动作/用途和词典入口 | [查看文件](../src/components/VocalSyllableGuide.astro) |
| VOC-11 | 显示实际音域；提高上限不改变序列时给明确提示 | [查看文件](../src/components/VocalPracticePlayer.astro) |
| VOC-12 | 固定短句选调/比较/记录，连接歌曲与录音规范 | [查看文件](../src/content/docs/vocal/song-application.mdx) |
| TH01 | 大小三度对比改为-3'与-3，根音-2单独说明 | [查看文件](../src/content/docs/harmonica/blues-vocabulary.mdx) |
| TH02 | 三孔半音压与二级全音压区分，入口/摘要/计划统一 | [查看文件](../src/content/docs/harmonica/bending-and-blues-scale.mdx) |
| TH03 | 吸音过满时安排呼出，吹音与吸音失衡分开排查 | [查看文件](../src/content/docs/harmonica/twelve-bar-and-phrasing.mdx) |
| TH04 | 可播放的440/442、纯/平均律五度，明确接近部分音的慢拍条件 | [查看文件](../src/content/docs/theory/intonation-beats.mdx) |
| TH05 | 固定实际音集合/节奏，中心C/A作为唯一变化变量 | [查看文件](../src/content/docs/theory/intervals-and-scales.mdx) |
| TH06 | 概念/手上版先修分开，接已有Neo双页码，并补最小原创和声例 | [查看文件](../src/content/docs/theory/chords-and-harmony.mdx) |
| TH07 | 口琴首批短句使用完整4/4拍格与休止 | [查看文件](../src/content/docs/harmonica/second-position.mdx) |
| TH08 | 八训练阶段均有异日门槛/回退，压音未过保留自然音音乐任务 | [查看文件](../src/content/docs/harmonica/first-8-weeks.mdx) |
| TH09 | 默认先录吉他再吹口琴，给先修与不增加设备的路径 | [查看文件](../src/content/docs/harmonica/with-guitar.mdx) |
| TH10 | 限定四分音符为拍；2/4点击保持乐曲速度时正确减半点击 | [查看文件](../src/content/docs/theory/rhythm-and-groove.mdx) |
| TH11 | 弦刚度非谐性与拨/拾音位置的部分音权重分开 | [查看文件](../src/content/docs/theory/timbre-spectrum-envelope.mdx) |
| TH12 | Richter单音口琴与复音琴术语统一，型号仍待确认 | [查看文件](../src/content/docs/harmonica/instruments-and-keys.mdx) |

## Neo增补与集成检查

- 区分主题号、PDF页、印刷页；和声按已核主题/PDF页定位，未确认章号和App分段保留待核。
- 原课16与相邻两弦自编预备分开标注，不以预备通过抵销原课。
- 块2–7首轮取用与原课剩余形状/调/变体分开记录；指板24–31、36–39及和声后部已有材料接入后续关卡。
- 两个分支任选先做或交替，均保留本轮最低任务；无器材项目注明未测，推揉弦不作与6B本轮任务无关的前提。
- 两和弦起步曲按实际和弦数练；需要大/小或四和弦的独立任务使用给定的C/Am或C–Am–Fmaj7–G，避免新的先修死结。
- 原创案例的分解音序与文字统一为低–中–高–中；新增播放器的令牌在断开/重连后保持递增，旧音频请求不得影响新播放。

## 后续边界

全站结构和必要练习已补齐，内容仍可依据真实学习反馈继续改进。合成音与TTS不替代真人动作示范；不确定的发声动作需教师校准，资料待核不意味着可以猜测或自动通关。继续按既定关卡实践，记录新出现的具体问题，再小步修订。
