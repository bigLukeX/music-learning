# 全站教程与教学体系审查 · 2026-09-15

> 此文保留审查时的发现与证据。随后用户已授权修复并部署，当前逐项处理与验收见[全站修复记录](REPAIR_LOG_2026-09-15.md)。下文“尚未修复”等措辞属于修复前快照，不代表最新代码状态。

**结论（Neo 原件复核后）：既定路线方向成立，已拥有的 Neo 课件提供了大量图谱、练法和应用。个人体系的主要短板应定位为教材到网站任务的准确接入、后半程执行与通关衔接；公开网站独立使用时的基础示例和反馈材料仍需补齐。**

本报告保留全站初审与收到 Neo 原件后的复核记录。已更新本报告、资料索引与课程映射的证据说明，新增[原件对照报告](guitar/NEO_SOURCE_CHECK_2026-09-15.md)；公开教程正文、播放器、学习顺序、个人进度、依赖和部署尚未修复或变更。

**原件复核修订：** G09 降为 P3 的资源定位问题；G14、TH06 等收窄为已有材料的接入与验收不足，不再推断用户缺少地图、转位或和声示范。相关条目已标注更新；新发现的课号/页码边界、项目自编预备与后续材料覆盖见原件对照报告。

## 1. 范围与完成情况

- 审查基准：Git `4eba7c685937db7bb775728066ede739a1c98433`，开始时工作区干净。
- 全部 **65 个 MDX 页面、3621 行源码**均完成内容审读，并逐页留下结论。包含 6 个全站/辅助页、吉他 15 页、声乐 11 页、乐理 11 页、歌曲 10 页、口琴 12 页。
- 另审声乐播放器、音节指引及共享布局组件，核对根路线、吉他路线、Neo 映射、练习计划、进度模板和维护边界。
- 按 GitHub Pages 的 `/music-learning/` base 构建成功：65 页及 Pagefind 索引生成；6247 处站内页面、资源与锚点引用无缺失。
- 浏览器逐页完成 **1440×1000 浅色桌面、390×844 深色手机，共 130 次渲染检查**；检查整页 DOM 的标题、正文、溢出与图片，保存并目视检查全部首屏截图。长表格、播放器、搜索、移动菜单与深层 404 另做交互/局部检查。视觉检查覆盖首屏和这些重点区域，长页全文另外通过源码审读。
- 两种布局均未发现整页横向溢出、缺失图片或页面未捕获脚本异常。中文搜索“五度”能返回对应教程与章节。移动菜单正常开合、Esc 能关闭；辅助技术状态另见 ROOT-05。
- 播放器执行原始控制流，替换 DOM、音频输出与等待以检查序列；1386 组参数中 1107 组可播放、279 组因范围不容纳音型而拒绝；固定设置不越界。动态改上限错误、套餐时长与上限不改变实际序列的问题已复现。计时为算法等待总和，未据此测量浏览器时序或主观音质。

### 核验边界

专业争议点对照制造商、声学教学、音乐理论及 NIDCD 等一手资料，相关条目附来源。全站初审时未取得 Neo 原件；随后用户提供三份 PDF，本次已经检索其全部 262 页并视觉核对相关整页。PDF 中可见的主题号与页码已核查；三门交错路径图及 App 本轮仍未再次取得，不能据 PDF 再认证章界或视频课号。四首歌没有绑定目标录音，本轮不会代造调性、和弦或声部。未校准用户实际声线、手部动作、口琴型号；未把钢琴/TTS 当成真人动作示范，也未声学验收不同系统的 TTS 发音。

制造商外链中 `/positions/` 本次返回 404，`/positions` 可访问；带旧 SessionID 的 SEYDEL 长链接本次超时，保留为访问未验证，不认定永久失效。

初审保留 **45 条追踪事项**（原件复核已收窄相关条目并下调 G09，另见对照报告；以下分类不代表全部都是教材缺失）：课程体系／推进规则缺口 9 条；设计建议 1 条；确定错误或内部矛盾 12 条；教学材料／可执行性缺口 21 条；措辞或适用条件澄清 2 条。这不是“所有页面都有错误”的计数，多个页面可以对应同一根因。P1 优先处理，P2 影响学习闭环，P3 为局部澄清或体验问题。

## 2. 对整个体系的判断

### 2.1 应保留的骨架

- 既定阶段 0–9 与 A–D 训练量路线方向一致：基本操作和节奏、技术、指板和声、扒歌、分支、即兴编曲；无需重建体系。
- 前 16 个训练周的节奏、技术、指板、耳朵四线并行真实落实到时间表，歌曲每次负责迁移整合。
- 训练周与自然周有明确换算、漏练顺延、回归方案、局部补练和升降速规则，未把原一年估算当刚性期限。
- NeoMusic 七个官方块及深入路线均在映射文档保留；不应指控官方路线被删除，也不应要求复制受版权保护的课件来补公开内容。真正问题是块 7 和顺延内容未连接到后续执行。
- PROJECT_CONTEXT.md 第 15 行及 MAINTENANCE.md 明确分开网站内容建设和个人能力完成，个人进度仍为空白定位状态，没有已确认的“网页存在就自动过关”混淆。
- 理论课程明确物理量、感知与音乐意义的边界；声乐、口琴入口普遍有定位和状态限制；吉他相关理论和歌曲分析获准按需穿插，未发现必须学完理论才能开始听力的循环依赖。
- 歌曲和录音方法有版本锁定、单变量复盘、不同日期重复标准；这些是可保留的反馈框架，缺的是初学者可校准的少量实例材料。

### 2.2 各阶段能否沿现有教程继续走

| 原定阶段／用途 | 现有支撑 | 审查判断 |
|---|---|---|
| 定位 → 阶段 0 | 定位 A/B、基本操作、开放和弦 | 定位假设已会歌和 riff；尚不会者没有完整分流，基础指法材料缺失。 |
| 节奏、技术与基础指板 | 第 1–8 训练周 + 主题页 + 已拥有 Neo 课件 | 时间表细致、四线并行；原件已有图谱。需补精确取用、原课/自编预备的区分、声音停止的验收与独立核验。 |
| 指板、和声与音阶 | 第 9–16 训练周 + Neo 块 2–6 映射 | 主题先后大体连贯；音级参照、转位和三种 voicing 的实例/验收不足；第 8 周多数条件需拆必要项。 |
| 系统扒歌与阶段 C/D | 六层方法、录音复盘、四首歌曲提纲 | 方法成立，但没有一个完整已验证案例；第 17 训练周后的课程余量与任务需接回执行。 |
| 阶段 6A/6B | 木/电分支概览、音色页 | 分支名称保留，PIMA/Travis/声部组合等尚缺从零示范到交付的训练链。 |
| 阶段 7–9 | 即兴、编曲与高阶整合概览 | 目标音、动机和留白原则可用；逐级作品任务和本轮结课边界未完成。 |
| 吉他 → 后续模块 | 根路线规定理论、声乐、歌曲、口琴的顺序 | “吉他完成”没有统一验收定义；需明确阶段与分支范围，避免后续模块无限延期。 |
| 按需穿插乐理／听力 | 物理实验、听唱与扒歌 | 方向正确；具体实验需明确音源、参数与先修，缺手上能力时给概念版替代。 |
| 后续声乐／口琴 | 各自定位、首轮计划与主题页 | 基础模型大体成立；声乐套餐与周目标错配、口琴时值与回退、单人合流流程仍需闭合。 |

这里没有建议把理论全部前置、取消其他模块或换掉 Neo 顺序。修复目标是让既定路线每一段都有可执行入口、示例、反馈与出口。

### 2.3 体系级发现

<a id="sys-01"></a>

#### SYS-01 · P1 · 第 17 训练周后的既定路线仍是大纲，尚未形成可持续执行的后半程课程

**Neo 原件复核：** 原件已有大量后段内容。此处“仍是大纲”指项目的后半程执行/交付安排；修复优先承接现有教材，不要求再生产同等规模教材，也不改变块 5–7 与扒歌/编配的并行关系。

**类别：** 课程体系／推进规则缺口。

**证据：** [src/content/docs/guitar/stage-b-weeks-9-16.mdx](../src/content/docs/guitar/stage-b-weeks-9-16.mdx)（第 160 行）；[docs/guitar/NEO_COURSE_MAP.md](../docs/guitar/NEO_COURSE_MAP.md)（第 37 行）；[docs/guitar/NEO_COURSE_MAP.md](../docs/guitar/NEO_COURSE_MAP.md)（第 24 行）；[src/content/docs/guitar/acoustic-and-electric.mdx](../src/content/docs/guitar/acoustic-and-electric.mdx)（第 14 行）；[src/content/docs/guitar/improvisation-and-arrangement.mdx](../src/content/docs/guitar/improvisation-and-arrangement.mdx)（第 44 行）。

**影响：** 确定的覆盖断档。前 16 个训练周有逐次任务和出关规则；完成后只得到“继续块 5–6、与扒歌并行”。Neo 映射确实保留了块 7（和声第二/三章），但没有把这块的开始条件、最小音乐任务、结束证据和未完内容追踪接回执行路线。阶段 6A 的 PIMA、Travis、旋律加低音只列名称；阶段 7–9 合并成一页概览，9 阶段的内容只剩一段名词清单。学习者到第 17 训练周后必须重新请人设计计划，不能沿现有页面一直练到原定终点。这不意味着框架错误，也不要求一次写完所有高阶细节，但当前不能称为全程已可照做的完整教程。

**修复方向：** 保留阶段 0–9 和 Neo 官方顺序，先补一张“阶段 0–9 ↔ A–D ↔ Neo 块 ↔ 已有教学页 ↔ 出关证据”的对照表；补第 17 训练周后的首个可执行循环，以及块 5–7 未完成项目的继续入口；为 6A/6B、7、8、9 各补最低任务与门槛。其余深入主题明确标待建设，避免把概览等同于成课。

<a id="sys-02"></a>

#### SYS-02 · P2 · 阶段 A 以“多数条件”升级，使尚未通过的基础能力也能被整体放行

**类别：** 课程体系／推进规则缺口。

**证据：** [src/content/docs/guitar/first-8-weeks.mdx](../src/content/docs/guitar/first-8-weeks.mdx)（第 180 行）；[docs/guitar/NEXT_8_WEEKS.md](../docs/guitar/NEXT_8_WEEKS.md)（第 539 行）；[src/content/docs/guitar/positioning-b.mdx](../src/content/docs/guitar/positioning-b.mdx)（第 94 行）；[src/content/docs/guitar/stage-b-weeks-9-16.mdx](../src/content/docs/guitar/stage-b-weeks-9-16.mdx)（第 47 行）。

**影响：** 确定的推进规则冲突。入口要求从第一个未通过关卡开始，不能用强项跳过其他基础线；A 阶段结尾却允许六条条件过多数即进 B。例如节奏、技术、听前先哼的习惯和完整录音四条成立，但音名仍只能逐品数且不能完成短扒带，也符合文字上的“多数”。B 阶段马上要求不看图重建和弦、先唱和弦音、辨认声部，未通过的能力没有明确补练状态与复测时点。

**修复方向：** 把六条拆成进入 B 所必需的最低能力与允许带入 B 继续补强的能力。所有必需项均有证据后推进；允许带入的项目逐项记录补练任务及复测点。同步公开页面和个人路线，避免只把“多数”机械改为更难的全优标准。

<a id="sys-03"></a>

#### SYS-03 · P2 · “吉他完成后”转入后续模块的结束条件没有统一定义

**类别：** 课程体系／推进规则缺口。

**证据：** [PROJECT_CONTEXT.md](../PROJECT_CONTEXT.md)（第 11 行）；[ROADMAP.md](../ROADMAP.md)（第 67 行）；[docs/guitar/PROGRESS.md](../docs/guitar/PROGRESS.md)（第 49 行）；[docs/guitar/ROADMAP.md](../docs/guitar/ROADMAP.md)（第 152 行）；[src/content/docs/vocal/index.mdx](../src/content/docs/vocal/index.mdx)（第 50 行）。

**影响：** 确定的决策缺口，非已发生的学习跳关。根路线列五个完整路线结果，进度表却要求记录阶段 0–9 和两个分支；阶段 9 的终点是开放式的高阶能力描述，未说明与五项结果及后续模块切换的关系。学会完整扒歌、三版编配和稳定弹唱后，仍无法判断是否必须先完成全指板、drop voicing、复节奏乃至两个分支才能正式进入声乐/口琴。既定“吉他之后继续其他模块”的承诺因而没有可执行的交接点。

**修复方向：** 在唯一事实来源中定义一次可验证的“吉他模块交接验收”：明确哪些原定阶段、哪种分支范围、哪些录音/转录/编配证据必须达到，以及阶段 9 的本轮边界；写清验收后依次进入哪个模块、吉他如何维持。保留完整 0–9 框架，不自行取消高阶内容，也不擅自把后续模块提前。

<a id="sys-04"></a>

#### SYS-04 · P2 · 耳训的自主校准材料不足，记录与重复尚不能可靠证明听对了

**Neo 原件复核：** 原件已有听力练习方法和可自弹/自唱的图谱；设计建议限于补独立核验与反馈入口，不应理解为现有耳训资源完全空白。

**类别：** 设计建议。

**证据：** [src/content/docs/guitar/positioning-b.mdx](../src/content/docs/guitar/positioning-b.mdx)（第 48 行）；[src/content/docs/guitar/ear-and-transcription.mdx](../src/content/docs/guitar/ear-and-transcription.mdx)（第 19 行）；[src/content/docs/guitar/stage-b-weeks-9-16.mdx](../src/content/docs/guitar/stage-b-weeks-9-16.mdx)（第 64 行）；[src/content/docs/practice-and-progress.mdx](../src/content/docs/practice-and-progress.mdx)（第 6 行）。

**影响：** 教学设计建议，非声称 A/B 回听完全无用。现有方法强调先听后找、记录确认/推断、与原曲比较，这些做法正确；但前期耳扒关卡甚至只要求“留下节奏和主要落点”，配套尚无一组具有确定答案的原创短听辨材料和明确核验步骤。刚起步、尚不能判断音程或拍点的人可能稳定复现同一个错误，却仍把它记为确认；Codex 只收到文字自评也无法替他核实音高和拍点。

**修复方向：** 先补很小的校准包即可：原创 1–2 小节单音与节奏音频，先隐藏后揭示的音名/TAB 和拍格，示范如何做原音/自己的录音/目标音三方比对；通关记录分别写“是否完成流程”和“哪些音、节奏已核验”。真实歌曲仍允许不确定项，卡住时保留目标音频版本、时间点与自己的录音供复核，不要求每次都获得专业评分。

## 3. 页面与功能问题明细

SYS-01 合并了吉他分支、阶段 7–9、第 17 训练周/Neo 余量的同源缺口；SYS-02 合并了两份计划中的多数条件问题，下文不重复计数。

### 全站入口、来源与歌曲

<a id="root-01"></a>

#### ROOT-01 · P2 · 深层 404 页的返回链接继续指向不存在的目录

**类别：** 确定错误或内部矛盾。

**证据：** [src/content/docs/404.mdx](../src/content/docs/404.mdx)（第 11 行）；[src/content/docs/404.mdx](../src/content/docs/404.mdx)（第 14 行）。

**影响：** 本地按 GitHub Pages 的 404 回退方式复现：访问 /music-learning/guitar/missing-test/，返回首页解析为原错误地址，完整目录解析为该错误地址下的 course-outline/。静态检查 /404.html 自身时两条链接存在，因此上一轮站内扫描没有捕获这个运行情境。

**修复方向：** 使用包含站点 base 的站点根路径生成两条返回链接；验收至少覆盖顶层与多级不存在地址。

<a id="root-02"></a>

#### ROOT-02 · P3 · 使用说明将个人进度文件指向不存在的根目录位置

**类别：** 确定错误或内部矛盾。

**证据：** [src/content/docs/start-here.mdx](../src/content/docs/start-here.mdx)（第 27 行）。

**影响：** 实际唯一进度文件为 docs/guitar/PROGRESS.md，页面却要求更新根目录的 PROGRESS.md。按文字接管时可能新建第二份状态，破坏唯一事实来源。

**修复方向：** 改为 docs/guitar/PROGRESS.md，并与 MAINTENANCE.md 的事实来源一致。

<a id="root-03"></a>

#### ROOT-03 · P3 · 首页对后续模块的表述顺序与总路线不一致

**类别：** 教学材料／可执行性缺口。

**证据：** [src/content/docs/index.mdx](../src/content/docs/index.mdx)（第 28 行）；[ROADMAP.md](../ROADMAP.md)（第 77 行）；[src/content/docs/course-outline.mdx](../src/content/docs/course-outline.mdx)（第 18 行）。

**影响：** 总路线与目录将完整数学物理乐理放在正式声乐之前，首页总结却先列声乐再列乐理。页面都同时宣称按顺序执行，首次进入时不容易确定后续先后；这只是文案漂移，不表示实际已跳关。

**修复方向：** 按 ROADMAP.md 同步首页顺序；区别导航展示顺序与个人执行顺序。

<a id="root-04"></a>

#### ROOT-04 · P3 · 来源页 SEYDEL 的带尾斜线地址返回 404

**类别：** 确定错误或内部矛盾。

**证据：** [src/content/docs/sources-and-evidence.mdx](../src/content/docs/sources-and-evidence.mdx)（第 23 行）。

**影响：** 2026-09-15 查询 /positions/ 返回 404，而口琴入口使用的不带尾斜线 /positions 可访问。压音页另一个含 SessionID 的长地址本次超时，仅记为未验证，不能据此断言永久失效。

**修复方向：** 来源页统一使用制造商可访问的 /positions 地址；压音页替换为支持具体音阶结论的稳定资源地址，替换前核对正文。

**核验来源：** [www.seydel1847.de · positions](https://www.seydel1847.de/positions)。

<a id="song-01"></a>

#### SONG-01 · P2 · 四首歌曲案例缺少实际版本与分析示范

**类别：** 教学材料／可执行性缺口。

**证据：** [src/content/docs/songs/index.mdx](../src/content/docs/songs/index.mdx)（第 12 行）；[src/content/docs/songs/dont-look-back-in-anger.mdx](../src/content/docs/songs/dont-look-back-in-anger.mdx)（第 16 行）；[src/content/docs/songs/falling-slowly.mdx](../src/content/docs/songs/falling-slowly.mdx)（第 15 行）；[src/content/docs/songs/where-weve-been.mdx](../src/content/docs/songs/where-weve-been.mdx)（第 15 行）；[src/content/docs/songs/when-you-sleep.mdx](../src/content/docs/songs/when-you-sleep.mdx)（第 8 行）。

**影响：** 四页都给训练目标和流程，却都没有实际来源链接、版本卡、段落时间点或一段已经完成的原创分析。读者要先自行完成本模块应教的版本选择、听辨和编配，才能执行其最低版本。它们可以作为个人任务提纲，但首页“方法课+四首案例”容易让人以为已有可仿照的示范。缺数据时不编造的原则正确。

**修复方向：** 先将页面标为待验证案例/练习项目；选择一首明确版本，补一个可回听时间点的2–4小节原创分析、最小演奏方案与一次修正示范。其余三首按同一模版逐个补齐，不复制完整歌词/TAB。

<a id="song-02"></a>

#### SONG-02 · P3 · 证据关卡要求必须修正错误，未允许核验后原判断成立

**类别：** 教学材料／可执行性缺口。

**证据：** [src/content/docs/songs/evidence-and-versioning.mdx](../src/content/docs/songs/evidence-and-versioning.mdx)（第 67 行）；[src/content/docs/songs/transcription-lab.mdx](../src/content/docs/songs/transcription-lab.mdx)（第 67 行）。

**影响：** “至少一个被修正的旧假设”“至少修正一次细节”把发现错误作为过关必要条件。第一次分析已得到正确结果，或没有旧假设的读者没有合理的提交方式。训练应要求核验过程，不要求人为制造错误。

**修复方向：** 改为提交一次有证据的核验，结果可以是维持、修正或保留待验证；实际出错时再记录修正。

<a id="root-05"></a>

#### ROOT-05 · P3 · 移动菜单展开后按钮仍向辅助技术报告折叠状态

**类别：** 确定错误或内部矛盾。

**证据：** [node_modules/@astrojs/starlight/components/MobileMenuToggle.astro](../node_modules/@astrojs/starlight/components/MobileMenuToggle.astro)（第 37 行）；[astro.config.mjs](../astro.config.mjs)（第 12 行）。

**影响：** 390px视口中点击菜单，实际侧栏正常显示，宿主元素 aria-expanded=true，但有可访问名称“菜单”的 button 仍是 aria-expanded=false；会给屏幕阅读器错误的展开状态。定位到当前已安装 Starlight 的 setExpanded 把属性写在宿主而非按钮，属于依赖输出的问题，不是教程正文错误。

**修复方向：** 后续在应用层覆盖组件或采用已核实修复的依赖版本，同步按钮 aria-expanded；复测点击、Esc及视口切换。不直接修改 node_modules，也不在本次审查中升级依赖。

**核验来源：** [www.w3.org · disclosure](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)。

### 吉他

<a id="g01"></a>

#### G01 · P2 · 定位入口预设已经会歌和 riff，却没有“尚不会”分支

**类别：** 课程体系／推进规则缺口。

**证据：** [src/content/docs/guitar/index.mdx](../src/content/docs/guitar/index.mdx)（第 10 行）；[src/content/docs/guitar/positioning-a.mdx](../src/content/docs/guitar/positioning-a.mdx)（第 19 行）；[src/content/docs/guitar/positioning-a.mdx](../src/content/docs/guitar/positioning-a.mdx)（第 74 行）；[src/content/docs/guitar/positioning-b.mdx](../src/content/docs/guitar/positioning-b.mdx)（第 17 行）；[src/content/docs/guitar/positioning-b.mdx](../src/content/docs/guitar/positioning-b.mdx)（第 94 行）。

**影响：** 只会空弦或少量和弦的读者无法准备 A 的完整歌曲/熟悉四和弦，也无法准备 B 的熟悉 riff；站点仍把 A/B 完成作为进入训练的前提。这里缺的不是更低的通过分，而是允许记录未具备测试能力的路径。现有定位也未把具体失败项明确映射到阶段 0 或对应训练周。

**修复方向：** 保留 A/B 定位，增加“会／部分会／尚不会／未测”记录，以及空弦节拍、两个和弦、单弦两音的最低基线；明确无法完成整曲时进入阶段 0 的哪一课，之后何时复测。给节奏、技术、指板、耳朵各一条失败项→补课页/训练周映射，仍保持四线并行。

<a id="g02"></a>

#### G02 · P2 · 基础课缺少和弦图、指法和可实际阅读的短谱

**Neo 原件复核：** 原件中的中阶 CAGED 图不等于从零解释手指编号、和弦图和 TAB 时值；本条保留入门材料缺口，但不扩大为中阶课程无图。

**类别：** 教学材料／可执行性缺口。

**证据：** [src/content/docs/guitar/foundations-and-setup.mdx](../src/content/docs/guitar/foundations-and-setup.mdx)（第 8 行）；[src/content/docs/guitar/foundations-and-setup.mdx](../src/content/docs/guitar/foundations-and-setup.mdx)（第 38 行）；[src/content/docs/guitar/foundations-and-setup.mdx](../src/content/docs/guitar/foundations-and-setup.mdx)（第 40 行）；[src/content/docs/guitar/foundations-and-setup.mdx](../src/content/docs/guitar/foundations-and-setup.mdx)（第 56 行）；[src/content/docs/guitar/chords-and-transitions.mdx](../src/content/docs/guitar/chords-and-transitions.mdx)（第 12 行）；[src/content/docs/guitar/chords-and-transitions.mdx](../src/content/docs/guitar/chords-and-transitions.mdx)（第 33 行）；[src/content/docs/guitar/chords-and-transitions.mdx](../src/content/docs/guitar/chords-and-transitions.mdx)（第 49 行）。

**影响：** 基础页宣称教会 TAB 与和弦图，实际只有一张垂直对齐的 C 和弦 TAB；练习却要求读两小节 TAB。开放和弦页直接练 G–D–Em–C、F/Bm 渐进版，没有弦品、指号、禁弹弦或任何和弦图。全站搜索未发现可接上的这些指法。新手不能只靠这些页面完成第一组练习和“指出不应弹的弦”的关卡。

**修复方向：** 补原创最小材料：和弦图读法、X/O/指号说明、一组开放和弦图、一个 F 或 Bm 简化版及逐弦检查；补带拍点/时值的原创两小节 TAB，明确竖直对齐音同时发声。为 1–2–3–4 品练习指定弦、手指、起止和休息。

<a id="g03"></a>

#### G03 · P2 · 扒歌流程未区分实际低音与推断的和弦根音

**Neo 原件复核：** 《玩转和声》PDF 第 28 页已有正确的转位/低音示例。保留网页将 Bass 与根音混写的问题；修复可以直接连接已拥有的示范。

**类别：** 教学材料／可执行性缺口。

**证据：** [src/content/docs/guitar/ear-and-transcription.mdx](../src/content/docs/guitar/ear-and-transcription.mdx)（第 8 行）；[src/content/docs/guitar/ear-and-transcription.mdx](../src/content/docs/guitar/ear-and-transcription.mdx)（第 28 行）；[src/content/docs/guitar/harmony.mdx](../src/content/docs/guitar/harmony.mdx)（第 28 行）；[docs/guitar/ROADMAP.md](../docs/guitar/ROADMAP.md)（第 104 行）。

**影响：** “Bass / 根音运动”及“先听最低音……若根音正确”的写法把两种信息连成同一步，却没有转位的反例。读者遇到 C/E 时可能把低音 E 直接当和弦根音，从而误判为 E 和弦，连带写错级数。并非先听低音的顺序有错，而是根音识别所需的区分未教。

**修复方向：** 保留六层顺序，第一层分别写“确认听到的低音”和“待验证的根音”；加入 C→C/E→C/G 的小例子，用上方音验证根音，再记录转位/斜线和弦。

**核验来源：** [2012.musictheory.net · 42](https://2012.musictheory.net/lessons/42)；[open-musictheory.github.io · triads](https://open-musictheory.github.io/docs/fundamentals/triads/)。

<a id="g04"></a>

#### G04 · P2 · 半减七和弦被纳入“大三底／小三底”的不完整二分法

**类别：** 确定错误或内部矛盾。

**证据：** [src/content/docs/guitar/stage-b-weeks-9-16.mdx](../src/content/docs/guitar/stage-b-weeks-9-16.mdx)（第 75 行）；[src/content/docs/guitar/stage-b-weeks-9-16.mdx](../src/content/docs/guitar/stage-b-weeks-9-16.mdx)（第 81 行）；[src/content/docs/guitar/stage-b-weeks-9-16.mdx](../src/content/docs/guitar/stage-b-weeks-9-16.mdx)（第 83 行）。

**影响：** 第 11 周 D2 的半减七构造步骤本身正确，但 D4 要求四种七和弦只判断“大三底/小三底”。半减七的三和弦基础是减三和弦，例如 B–D–F–A 中 B–D–F 为减三和弦，不是 B–D–F# 的小三和弦。听辨分类会遗漏刚学习的降五音差异。

**修复方向：** 若判断三和弦基础，分“大三／小三／减三”；若只判断根音到三音的间隔，明确称“大三度／小三度”，然后补一个纯五度与减五度的单独听辨步骤。

**核验来源：** [open-musictheory.github.io · triads](https://open-musictheory.github.io/docs/fundamentals/triads/)；[viva.pressbooks.pub · seventh-chords](https://viva.pressbooks.pub/openmusictheory/chapter/seventh-chords/)。

<a id="g05"></a>

#### G05 · P2 · 休止练习只检查空扫，没有教会在指定拍点停止声音

**Neo 原件复核：** 《练功房》主题 2（PDF 第 4 页）已有完整休止谱例。问题限于网页的停止声音动作、原课取用和验收说明；不再以缺少原谱为修复前提。

**类别：** 教学材料／可执行性缺口。

**证据：** [src/content/docs/guitar/rhythm.mdx](../src/content/docs/guitar/rhythm.mdx)（第 16 行）；[src/content/docs/guitar/first-8-weeks.mdx](../src/content/docs/guitar/first-8-weeks.mdx)（第 89 行）；[src/content/docs/guitar/first-8-weeks.mdx](../src/content/docs/guitar/first-8-weeks.mdx)（第 90 行）；[src/content/docs/guitar/first-8-weeks.mdx](../src/content/docs/guitar/first-8-weeks.mdx)（第 96 行）；[src/content/docs/guitar/stage-b-weeks-9-16.mdx](../src/content/docs/guitar/stage-b-weeks-9-16.mdx)（第 112 行）；[src/content/docs/guitar/technique.mdx](../src/content/docs/guitar/technique.mdx)（第 35 行）。

**影响：** 第 2 周以休止为目标，却用“去掉一个 &”“保留空扫”“手继续细分”作为主要执行与过线条件。跳过一次触弦不会自动让前一个和弦停止，可能得到延音或切分而非休止。技术页虽提到松压力终止音，没有把该动作连到这个休止练习。

**修复方向：** 用同一节奏做 A/B：A 不再拨弦但继续延音；B 在指定格消音并保持静默。标清起音、延音、停止三个符号与主动消音动作，把“休止段确实安静、下一次起音按拍出现”加入关卡，之后再和连音线比较。

**核验来源：** [open-musictheory.github.io · rhythmic-values](https://open-musictheory.github.io/docs/fundamentals/rhythmic-values/)。

<a id="g06"></a>

#### G06 · P3 · Gain 的定义需限定在会进入失真的信号链中

**类别：** 措辞或适用条件澄清。

**证据：** [src/content/docs/guitar/tone-and-signal-chain.mdx](../src/content/docs/guitar/tone-and-signal-chain.mdx)（第 20 行）；[src/content/docs/guitar/tone-and-signal-chain.mdx](../src/content/docs/guitar/tone-and-signal-chain.mdx)（第 52 行）。

**影响：** 在电吉他音箱/失真语境中这一段有实际意义；但“增益升高会增加谐波和压缩”没有注明非线性前提。使用干净前级或 clean boost 时，线性范围内提高增益不会必然产生这些变化。应作为适用条件澄清，不据此认定整页音色知识错误。

**修复方向：** 先定义增益为信号放大量，再注明某些音箱/失真效果的 Gain 旋钮会把后级推入非线性区域，这时才出现谐波与压缩变化。将干净增益与 drive 做对照，并保持监听音量适当。

**核验来源：** [content-files.shure.com · us_pro_audiosignalprocessor_ea.pdf](https://content-files.shure.com/Pubs/asp-selection-and-operation-of-audio-signal-processors/us_pro_audiosignalprocessor_ea.pdf)；[articles.boss.info · the-complete-guide-to-boost-and-preamp-pedals](https://articles.boss.info/the-complete-guide-to-boost-and-preamp-pedals/)。

<a id="g07"></a>

#### G07 · P2 · 调内音级和当前和弦音级共用 1/3/5，未说明参照点

**类别：** 教学材料／可执行性缺口。

**证据：** [src/content/docs/guitar/fretboard.mdx](../src/content/docs/guitar/fretboard.mdx)（第 21 行）；[src/content/docs/guitar/fretboard.mdx](../src/content/docs/guitar/fretboard.mdx)（第 23 行）；[src/content/docs/guitar/fretboard.mdx](../src/content/docs/guitar/fretboard.mdx)（第 34 行）；[src/content/docs/guitar/stage-b-weeks-9-16.mdx](../src/content/docs/guitar/stage-b-weeks-9-16.mdx)（第 47 行）；[src/content/docs/guitar/improvisation-and-arrangement.mdx](../src/content/docs/guitar/improvisation-and-arrangement.mdx)（第 14 行）。

**影响：** 指板页先说“给定调性”，随后把 1 称为根音，并马上转入当前和弦的和弦音。初学者无法区分调的主音和每个和弦的根音。例如 C 大调中的 F 和弦，F 是调内 4 级，却是该和弦的根音；两种编号的切换决定即兴能否真正跟随和弦。

**修复方向：** 增加双栏例子，固定 C 调分别标 C、F、G 和弦的实际音名、调内音级与和弦内 1/3/5；用“主音/调内音级”和“和弦根音/和弦构成音”区分参照。

**核验来源：** [open-musictheory.github.io · scales](https://open-musictheory.github.io/docs/fundamentals/scales/)；[open-musictheory.github.io · triads](https://open-musictheory.github.io/docs/fundamentals/triads/)。

<a id="g08"></a>

#### G08 · P2 · 新增单音技术没有足以照做的动作实例，推揉弦尤其悬空

**Neo 原件复核：** 已有课件的具体谱例、项目自编预备与尚未核对的视频动作示范应分别记录。网页未展示不等于原件没有；第 3 周的两弦预备与原课主题 16 并非同一原谱，见 NEO-02。

**类别：** 教学材料／可执行性缺口。

**证据：** [src/content/docs/guitar/technique.mdx](../src/content/docs/guitar/technique.mdx)（第 12 行）；[src/content/docs/guitar/technique.mdx](../src/content/docs/guitar/technique.mdx)（第 16 行）；[src/content/docs/guitar/technique.mdx](../src/content/docs/guitar/technique.mdx)（第 20 行）；[src/content/docs/guitar/technique.mdx](../src/content/docs/guitar/technique.mdx)（第 22 行）；[src/content/docs/guitar/first-8-weeks.mdx](../src/content/docs/guitar/first-8-weeks.mdx)（第 89 行）；[src/content/docs/guitar/first-8-weeks.mdx](../src/content/docs/guitar/first-8-weeks.mdx)（第 156 行）；[src/content/docs/guitar/first-8-weeks.mdx](../src/content/docs/guitar/first-8-weeks.mdx)（第 160 行）。

**影响：** 击、勾、滑、推、揉仅有一两句原则，没有指定弦品、按弦手指、预先保留的低音指、目标音示例与示范。第 2 周已经要求三种连音；第 7 周明确这些技术不在 Neo 当前基础块且不看新课，因此此处不是简单依赖已有课件就能补上的内容。读者知道要达到什么声音，却没有可复现的起始动作。

**修复方向：** 保持原训练周顺序，每种技术各补一个原创两音/两小节实例及图示或可核对的示范资源；推弦示例明确起始弦品和目标品位，揉弦先指定采用的动作类型。保留既有无痛、休息、慢速要求，并把动作不清楚时退回示例作为出口。

<a id="g09"></a>

#### G09 · P3 · 已有指板地图的定位和首轮选用范围需要更清楚

**类别：** 教学材料／可执行性缺口。

**证据：** [src/content/docs/guitar/fretboard.mdx](../src/content/docs/guitar/fretboard.mdx)（第 17 行）；[src/content/docs/guitar/fretboard.mdx](../src/content/docs/guitar/fretboard.mdx)（第 30 行）；[src/content/docs/guitar/fretboard.mdx](../src/content/docs/guitar/fretboard.mdx)（第 34 行）；[src/content/docs/guitar/fretboard.mdx](../src/content/docs/guitar/fretboard.mdx)（第 41 行）；[src/content/docs/guitar/first-8-weeks.mdx](../src/content/docs/guitar/first-8-weeks.mdx)（第 91 行）；[src/content/docs/guitar/stage-b-weeks-9-16.mdx](../src/content/docs/guitar/stage-b-weeks-9-16.mdx)（第 46 行）。

**影响（修订）：** 《指板》原件已提供八度、音程、CAGED、五声与自然音阶地图；前 16 周先看课再练的流程及多数主题编号可以成立。因此撤回“个人体系缺少这套地图”的 P2 判断。公开主题页单独阅读时仍缺指向原件的明确页码及“本轮只用哪个区域”的说明，属于资源定位/取用范围问题。

**修复方向（修订）：** 优先补“原件主题号＋PDF 页＋本轮区域/任务”，直接使用已拥有课件；若公开站要独立服务没有 Neo 的读者，再补最小原创示例。无需为个人学习重画整套图，也不把五形一次塞进前 8 周。

<a id="g14"></a>

#### G14 · P2 · 和声课与已有转位/voicing 材料的接入及验收不足

**Neo 原件复核：** 《指板》主题 7、28–29，以及《和声》PDF 第 28–34 页已有声部排列、转位和应用；材料本身并不缺这些实例。本条保留网站到原件的接入、最低音说明及“三种 voicing”验收问题。

**类别：** 教学材料／可执行性缺口。

**证据：** [src/content/docs/guitar/harmony.mdx](../src/content/docs/guitar/harmony.mdx)（第 28 行）；[src/content/docs/guitar/harmony.mdx](../src/content/docs/guitar/harmony.mdx)（第 30 行）；[src/content/docs/guitar/harmony.mdx](../src/content/docs/guitar/harmony.mdx)（第 39 行）；[src/content/docs/guitar/harmony.mdx](../src/content/docs/guitar/harmony.mdx)（第 46 行）；[src/content/docs/guitar/stage-b-weeks-9-16.mdx](../src/content/docs/guitar/stage-b-weeks-9-16.mdx)（第 102 行）；[src/content/docs/guitar/stage-b-weeks-9-16.mdx](../src/content/docs/guitar/stage-b-weeks-9-16.mdx)（第 158 行）；[docs/BACKLOG.md](../docs/BACKLOG.md)（第 24 行）。

**影响：** 大调三和弦质量顺序基本正确，但“Voicing 与转位”只列选配因素，没有解释最低音决定转位，也没有展示任一和弦的三种实际排列；sus/add/slash/借用/副属仅列名。第 16 周交付开放、移动/琶音两版，其中琶音是发音顺序，未必是新的 voicing，因此不能据此验证 Backlog 和路线要求的“三种 voicing”。这是教学覆盖和验收承接缺口，不是必须在第 11 周一次学完。

**修复方向（修订）：** 从已有课件选择同一三和弦的实际排列与低音变化，补上明确取用位置、网站术语说明和证据要求；色彩和弦按原路线接入后续关卡。记录阶段 B 尚未通过的三种 voicing 任务，不以伴奏织体数量代替。只有需要公开站独立示范时再增加最小原创例子。

**核验来源：** [2012.musictheory.net · 42](https://2012.musictheory.net/lessons/42)；[open-musictheory.github.io · triads](https://open-musictheory.github.io/docs/fundamentals/triads/)。

### 声乐与跟练工具

<a id="voc-01"></a>

#### VOC-01 · P1 · 播放中降低最高音上限不会改变正在播放的音序列

**类别：** 确定错误或内部矛盾。

**证据：** [src/components/VocalPracticePlayer.astro](../src/components/VocalPracticePlayer.astro)（第 210 行）；[src/components/VocalPracticePlayer.astro](../src/components/VocalPracticePlayer.astro)（第 252 行）；[src/components/VocalPracticePlayer.astro](../src/components/VocalPracticePlayer.astro)（第 410 行）；[src/content/docs/vocal/daily-practice.mdx](../src/content/docs/vocal/daily-practice.mdx)（第 43 行）。

**影响：** C3/E4/72 BPM 开始常规套餐后，把天花板改为 C4，界面立即声称最高不超过 C4，且重新启用开始按钮；原 run 仍使用已捕获的 settings 和 rootsBySection，随后播放 5 个超过 C4 的音，最高 D4。读者为了不适而降低上限时，界面与实际跟唱要求相反。固定设置下边界算法本身正确，问题仅在运行期间改参数。

**修复方向：** 修改起音、天花板、套餐、器材时停止当前 run 并明确提示重新开始，或安全重算剩余序列；不要让预览函数覆盖运行状态和按钮状态。速度也需明确何时生效。保留 ceiling 作为停止线。

<a id="voc-02"></a>

#### VOC-02 · P2 · 播放器套餐标称时长与真实音序列时长不一致

**类别：** 确定错误或内部矛盾。

**证据：** [src/components/VocalPracticePlayer.astro](../src/components/VocalPracticePlayer.astro)（第 38 行）；[src/components/VocalPracticePlayer.astro](../src/components/VocalPracticePlayer.astro)（第 238 行）；[src/components/VocalPracticePlayer.astro](../src/components/VocalPracticePlayer.astro)（第 431 行）；[src/content/docs/vocal/daily-practice.mdx](../src/content/docs/vocal/daily-practice.mdx)（第 108 行）；[src/content/docs/vocal/daily-practice.mdx](../src/content/docs/vocal/daily-practice.mdx)（第 161 行）。

**影响：** 默认 C3/E4/72 BPM 的常规套餐为 631.67 秒（10:32），轻柔为 310 秒，头声为 301.67 秒，混声为 303.33 秒，元音为 310 秒，转音为 341.67 秒；界面分别标成 20、8、10、10、10、10 分钟。常规 F3/C4 仅 221.67 秒。文字流程另称半闭合 3 分钟加其余自动音型 11–13 分钟；轻柔正文却写播放器约 5 分钟。读者无法一致地安排练习、记录完成量或理解需补多少手动练习。

**修复方向：** 从实际根音数量、音型长度、回声轮次和 BPM 计算当前预计时长；分别标明自动播放、状态检查、歌词迁移的时间。按真实练习剂量统一页面与选项，不为凑数盲目添加唱的重复次数。

<a id="voc-03"></a>

#### VOC-03 · P2 · 连续嗓音下降后的轻柔版选项与停止原则冲突

**类别：** 确定错误或内部矛盾。

**证据：** [src/content/docs/vocal/daily-practice.mdx](../src/content/docs/vocal/daily-practice.mdx)（第 156 行）；[src/content/docs/vocal/daily-practice.mdx](../src/content/docs/vocal/daily-practice.mdx)（第 28 行）；[src/content/docs/vocal/safe-practice.mdx](../src/content/docs/vocal/safe-practice.mdx)（第 29 行）。

**影响：** 7 天轮换末尾允许连续两天声音明显下降时，下一天选择休息或 8 分钟轻柔版；同页前文要求明显沙、低、费力时停止。读者只按轮换表执行，会把嗓音下降当成继续唱轻柔版的条件。NIDCD 官方建议在声音沙哑或疲劳时避免继续唱。

**修复方向：** 嗓音异常或明显下降时统一进入休息/恢复后的复查分支；轻柔版限定为身体疲劳、但说话与舒适轻哼仍正常。持续异常遵循安全页专业评估规则，不将轻柔套餐写成异常嗓音的恢复治疗。

**核验来源：** [www.nidcd.nih.gov · taking-care-your-voice](https://www.nidcd.nih.gov/health/taking-care-your-voice)；[www.nidcd.nih.gov · hoarseness](https://www.nidcd.nih.gov/health/hoarseness)。

<a id="voc-04"></a>

#### VOC-04 · P2 · 前 8 周要求选择的对应专项有多项在播放器中不存在

**类别：** 课程体系／推进规则缺口。

**证据：** [src/content/docs/vocal/first-8-weeks.mdx](../src/content/docs/vocal/first-8-weeks.mdx)（第 14 行）；[src/content/docs/vocal/first-8-weeks.mdx](../src/content/docs/vocal/first-8-weeks.mdx)（第 25 行）；[src/content/docs/vocal/first-8-weeks.mdx](../src/content/docs/vocal/first-8-weeks.mdx)（第 43 行）；[src/content/docs/vocal/first-8-weeks.mdx](../src/content/docs/vocal/first-8-weeks.mdx)（第 57 行）；[src/components/VocalPracticePlayer.astro](../src/components/VocalPracticePlayer.astro)（第 37 行）；[src/components/VocalPracticePlayer.astro](../src/components/VocalPracticePlayer.astro)（第 381 行）。

**影响：** 8 周页让每次先做常规，再直接选择本周对应的 10 分钟套餐。实际只有头声、混声、元音、转音、回声；第 5 周的弱唱/动态、第 7 周英文及第 4/8 周歌曲迁移没有对应项。第 2 周要求 3–5 秒长音，播放器每个音只持续一拍，也没有动态变化提示。正常完成当前菜单不等于完成这些周目标。

**修复方向：** 建立逐周任务→现有播放器段落→手动练习→证据的映射表。对长音、弱唱、英文和歌曲迁移给可单独执行的短练习；播放器仅承接它实际提供的伴奏任务。不要为了统一菜单把缺失能力省略。

<a id="voc-05"></a>

#### VOC-05 · P2 · 高音与弱唱页面仍是原则提纲，缺少自学所需的示例与纠错闭环

**类别：** 教学材料／可执行性缺口。

**证据：** [src/content/docs/vocal/high-notes-and-mix.mdx](../src/content/docs/vocal/high-notes-and-mix.mdx)（第 12 行）；[src/content/docs/vocal/high-notes-and-mix.mdx](../src/content/docs/vocal/high-notes-and-mix.mdx)（第 22 行）；[src/content/docs/vocal/high-notes-and-mix.mdx](../src/content/docs/vocal/high-notes-and-mix.mdx)（第 26 行）；[src/content/docs/vocal/soft-singing.mdx](../src/content/docs/vocal/soft-singing.mdx)（第 12 行）；[src/content/docs/vocal/soft-singing.mdx](../src/content/docs/vocal/soft-singing.mdx)（第 24 行）；[src/components/VocalSyllableGuide.astro](../src/components/VocalSyllableGuide.astro)（第 91 行）；[src/content/docs/vocal/daily-practice.mdx](../src/content/docs/vocal/daily-practice.mdx)（第 190 行）。

**影响：** 对尚不能区分轻声、漏气、挤压和元音改变的读者，按“三到五音短型”“轻而清楚”“适度闭合”仍不知道该做哪个音型、持续多久、怎样听出成功。两页没有一个完整指定音型/拍值/重复与休息的范例，也没有正反例声音；“质量接近”“保留大部分协调”的关卡只重复目标。TTS 明确仅示意读法，钢琴明确不判断声音，因此没有其他组件填补这条反馈链。问题是教学完整度，并非断言其减重原则或基础声学错误。

**修复方向：** 每页至少增加一个舒适范围内的具体短练习（音型、拍值、次数、休息、音量意图）、合法可用的声音参考或教师示范链接，以及按可听结果选择的回退分支。把“闭合/减重/混声”分成感知提示、可观察表现和不能仅凭自感确认的机制；从本站安全页直接提供停止/求助入口。

**核验来源：** [phys.unsw.edu.au · voice.html](https://phys.unsw.edu.au/jw/voice.html)。

<a id="voc-06"></a>

#### VOC-06 · P2 · 耳训路线缺少带答案的素材和持续主音入口，现有回声不能覆盖课程目标

**类别：** 教学材料／可执行性缺口。

**证据：** [src/content/docs/vocal/pitch-and-ear.mdx](../src/content/docs/vocal/pitch-and-ear.mdx)（第 14 行）；[src/content/docs/vocal/pitch-and-ear.mdx](../src/content/docs/vocal/pitch-and-ear.mdx)（第 31 行）；[src/content/docs/vocal/pitch-and-ear.mdx](../src/content/docs/vocal/pitch-and-ear.mdx)（第 49 行）；[src/content/docs/vocal/melody-and-english.mdx](../src/content/docs/vocal/melody-and-english.mdx)（第 10 行）；[src/components/VocalPracticePlayer.astro](../src/components/VocalPracticePlayer.astro)（第 168 行）。

**影响：** 耳训页要求主音 drone、2–4 小节听唱、关键音核对及隔日复现，但没有一个带节奏、参考音名/音级与可播放素材的练习。播放器没有持续主音模式，耳训只有固定 3 音回声和一个 5 音等时模板，反复移调；不会产生 2–4 小节节奏变化或素材答案。已经觉得旋律模糊的读者需要自行找题、定难度并判答案，难以区分记熟固定模板与迁移到新旋律。

**修复方向：** 补一组原创短素材：先 3–5 音回声，再 2 小节、4 小节含长短音和休止的乐句；提供播放、留空、延迟展开的节奏/关键音答案和简短评分方法。说明如何在现有乐器/App生成持续主音，或提供可控 drone。已能自主选片段后再迁移到歌曲。

<a id="voc-07"></a>

#### VOC-07 · P2 · 英文节奏课没有演示从文字到歌唱节奏的完整实例

**类别：** 教学材料／可执行性缺口。

**证据：** [src/content/docs/vocal/melody-and-english.mdx](../src/content/docs/vocal/melody-and-english.mdx)（第 19 行）；[src/content/docs/vocal/melody-and-english.mdx](../src/content/docs/vocal/melody-and-english.mdx)（第 21 行）；[src/content/docs/vocal/melody-and-english.mdx](../src/content/docs/vocal/melody-and-english.mdx)（第 25 行）；[src/content/docs/vocal/first-8-weeks.mdx](../src/content/docs/vocal/first-8-weeks.mdx)（第 59 行）。

**影响：** 页面只要求圈重读词、弱读功能词、把辅音放在时值末端，但没有一个标注音节重音、弱读元音、连读边界、拍位和词尾释放时刻的完整短句，也没有声音核对。中文母语初学者必须先拥有本课要教的英文节奏判断，才能执行和自评。还需说明自然说话重音与歌曲实际旋律重音的关系，以免机械地把所有功能词弱化或改动原有切分。

**修复方向：** 使用原创或已获授权的短句，完整示范正常说→重读骨架→补弱读→固定拍位→唱旋律；给一个有意强调功能词的对照，并说明以所选歌曲版本的实际节奏为准。附慢速参考、练习速度、重复次数和明确的录音核对点。

**核验来源：** [www.teachingenglish.org.uk · weak-forms](https://www.teachingenglish.org.uk/professional-development/teachers/teaching-knowledge-database/t-w/weak-forms)；[www.teachingenglish.org.uk · connected-speech-part-1](https://www.teachingenglish.org.uk/professional-development/teachers/knowing-subject/connected-speech-part-1)。

<a id="voc-08"></a>

#### VOC-08 · P2 · 声乐基线没有固定测试材料与设置，复测难以比较

**类别：** 教学材料／可执行性缺口。

**证据：** [src/content/docs/vocal/baseline.mdx](../src/content/docs/vocal/baseline.mdx)（第 19 行）；[src/content/docs/vocal/baseline.mdx](../src/content/docs/vocal/baseline.mdx)（第 27 行）；[src/content/docs/vocal/baseline.mdx](../src/content/docs/vocal/baseline.mdx)（第 43 行）；[src/content/docs/vocal/baseline.mdx](../src/content/docs/vocal/baseline.mdx)（第 51 行）；[src/content/docs/vocal/index.mdx](../src/content/docs/vocal/index.mdx)（第 42 行）。

**影响：** 基线允许任选五音短型、三到五音滑音和陌生 2–4 小节片段。提交模板记录表现，但未固定这些练习的音型、起止音、BPM、素材版本/片段位置和录音距离。下次更换更简单的题目或录音条件，也可能被解释成音准、重复性或弱唱进步；这削弱后续跨日期比较和首个未通过能力的定位。

**修复方向：** 提供固定的测试包或要求保存明确的测试 ID、音符/节奏、起音与上限、素材时间点及录音条件。复测先用同题同设置比较，再加一条陌生同难度迁移题。复用歌曲模块已有的版本/录音条件规范，而不是另造完整记录体系。

<a id="voc-09"></a>

#### VOC-09 · P3 · 吉他阶段声乐维护的频率在入口和日常表中不一致

**类别：** 课程体系／推进规则缺口。

**证据：** [src/content/docs/vocal/index.mdx](../src/content/docs/vocal/index.mdx)（第 50 行）；[src/content/docs/vocal/daily-practice.mdx](../src/content/docs/vocal/daily-practice.mdx)（第 12 行）；[src/content/docs/vocal/daily-practice.mdx](../src/content/docs/vocal/daily-practice.mdx)（第 144 行）；[src/content/docs/vocal/first-8-weeks.mdx](../src/content/docs/vocal/first-8-weeks.mdx)（第 12 行）。

**影响：** 入口说吉他阶段只做每周 1–2 次短维护；同样标为吉他阶段维护的日常页提供每周 6 次发声、其中 3 次可加专项的表；正式首轮则每周 4 次。虽然日常页说明不必全做，读者仍没有一个明确当前默认课表，且维护版看起来比正式主线更密集。

**修复方向：** 明确入口、日常轮换表和正式 8 周各自适用条件。将 7 天表解释为可选项目轮换池，或统一当前维护频率；保留吉他优先和正式声乐先定位的既定决定，不擅自增加固定负担。

<a id="voc-10"></a>

#### VOC-10 · P3 · 发声音节字典没有覆盖课程实际使用的音节

**类别：** 教学材料／可执行性缺口。

**证据：** [src/content/docs/vocal/breath-phonation-resonance.mdx](../src/content/docs/vocal/breath-phonation-resonance.mdx)（第 16 行）；[src/content/docs/vocal/breath-phonation-resonance.mdx](../src/content/docs/vocal/breath-phonation-resonance.mdx)（第 24 行）；[src/content/docs/vocal/soft-singing.mdx](../src/content/docs/vocal/soft-singing.mdx)（第 12 行）；[src/components/VocalSyllableGuide.astro](../src/components/VocalSyllableGuide.astro)（第 2 行）。

**影响：** 稳定发声课引入 zz、noo、vee，弱唱课引入 no、gee；日常页的字典只有 mm/ng/wu/mum/gug/vv/da/ya/lu/元音链，没有上述音节的中文读法、动作或播放入口，而且这两课不直接链接字典。读者被要求使用尚未解释的音节来解决起音问题。字典现有文字说明没有发现需要上报的确定性语音学错误；不同系统 TTS 的实际发音尚未声学验收。

**修复方向：** 统一课程的音节词表，优先复用已解释的音节；确需新增时补中文近似、发音动作、用途和可验证读法，并从各课直接链接到相应条目。TTS 保持“读法示意”的边界，不替代真人唱法示范。

<a id="voc-11"></a>

#### VOC-11 · P3 · 播放器没有显示实际最高音，升天花板的推进说明可能没有实际效果

**类别：** 教学材料／可执行性缺口。

**证据：** [src/content/docs/vocal/daily-practice.mdx](../src/content/docs/vocal/daily-practice.mdx)（第 43 行）；[src/components/VocalPracticePlayer.astro](../src/components/VocalPracticePlayer.astro)（第 131 行）；[src/components/VocalPracticePlayer.astro](../src/components/VocalPracticePlayer.astro)（第 238 行）；[src/components/VocalPracticePlayer.astro](../src/components/VocalPracticePlayer.astro)（第 262 行）。

**影响：** C3 起音时常规套餐实际最高为 D4；将天花板从 E4 升到 F4 或 A4 后，固定 span 先限制移调次数，完整 MIDI 序列完全不变。页面教连续三次稳定后从 E4 升到 F4，却没有说明这个改动可能不会提高实际练习音高。页面已正确说明天花板不是必须达到的目标，因此这不是越界或必达目标错误，而是进度解释缺口。

**修复方向：** 显示当前套餐实际最低/最高音及预计时长；上限变化未改变音序列时明确提示。正式换区训练应根据已定位的舒适区安排具体音型与实际最高音，不把提高上限控件当成通过新音区的证据。

<a id="voc-12"></a>

#### VOC-12 · P3 · 选调与歌曲落地页缺少通向已有记录方法的具体练习连接

**类别：** 教学材料／可执行性缺口。

**证据：** [src/content/docs/vocal/song-application.mdx](../src/content/docs/vocal/song-application.mdx)（第 8 行）；[src/content/docs/vocal/song-application.mdx](../src/content/docs/vocal/song-application.mdx)（第 21 行）；[src/content/docs/vocal/song-application.mdx](../src/content/docs/vocal/song-application.mdx)（第 25 行）；[src/content/docs/vocal/song-application.mdx](../src/content/docs/vocal/song-application.mdx)（第 30 行）。

**影响：** 声乐结课页要求读者记录最低/最高音、比较调性、改旋律并完整演唱，但没有一个从句子选择、相邻调比较、数据记录到选定版本的完整例子，也没有链接到歌曲模块现有 Falling Slowly 选调实验和 recording-review 的一致录音条件。作为整合检查表合理，作为独立自学课程的最后一课仍需要读者自行补齐操作。

**修复方向：** 复用并直接链接歌曲模块的选调实验与录音命名/复盘规范，给一份原创示范记录：固定一句、两个或三个舒适调、每调次数、歌词与音高核对、停止条件、最终选择理由。避免复制整首歌词或谱。

### 乐理与口琴

<a id="th01"></a>

#### TH01 · P2 · 大小三度对比练习的终点写成了根音

**类别：** 确定错误或内部矛盾；确定。

**证据：** [src/content/docs/harmonica/blues-vocabulary.mdx](../src/content/docs/harmonica/blues-vocabulary.mdx)（第 46 行）。

**影响：** 确定错误。-3'→-2 在 A 琴是 G→E、Bb 琴是 Ab→F，比较的是小三度音与根音，没有出现要求对比的大三度。学生照谱无法完成听觉目标。

**修复方向：** 改为 -3'→-3 的释放压音，或对比 -3' -2 与 -3 -2 两个乐句，并写出 b3/3/1 功能。

**核验来源：** [my.hohner.de · 1263](https://my.hohner.de/t/harmonica-terminology-2-cross-harp-straight-harp-and-positions/1263)。

<a id="th02"></a>

#### TH02 · P2 · 入口路线与摘要把蓝调小三度的半音压写成全音压

**类别：** 确定错误或内部矛盾；确定。

**证据：** [src/content/docs/harmonica/index.mdx](../src/content/docs/harmonica/index.mdx)（第 26 行）；[src/content/docs/harmonica/bending-and-blues-scale.mdx](../src/content/docs/harmonica/bending-and-blues-scale.mdx)（第 3 行）；[src/content/docs/harmonica/bending-and-blues-scale.mdx](../src/content/docs/harmonica/bending-and-blues-scale.mdx)（第 15 行）；[src/content/docs/harmonica/first-8-weeks.mdx](../src/content/docs/harmonica/first-8-weeks.mdx)（第 42 行）。

**影响：** 确定内部矛盾。入口要求先控制 3 孔全音压再组成蓝调音阶，但正文与第六周正确说明 -3' 半音压才是 b3，-3'' 全音压是 2。按入口或摘要推进会瞄准错误音高或增加不必要先修。

**修复方向：** 入口与 description 统一为 3 孔吸音半音压；全音压另列后续音级扩展。

**核验来源：** [my.hohner.de · 1263](https://my.hohner.de/t/harmonica-terminology-2-cross-harp-straight-harp-and-positions/1263)。

<a id="th03"></a>

#### TH03 · P2 · 把吸音密集导致的气量过多写成空气不足

**类别：** 确定错误或内部矛盾；确定。

**证据：** [src/content/docs/harmonica/twelve-bar-and-phrasing.mdx](../src/content/docs/harmonica/twelve-bar-and-phrasing.mdx)（第 39 行）。

**影响：** 确定错误。第二把位连续吸音通常会使吸入多于呼出、肺内气量过多而不能继续吸；原文的空气不足会让初学者把恢复理解成继续补气。

**修复方向：** 分别说明吸音多时需要安排轻松呼出、吹音多时可能需要吸入；用休止和吹音平衡，不把任何吸不动都解释为缺气。

**核验来源：** [www.bluesharmonica.com · challenges_i_want_you_me](https://www.bluesharmonica.com/challenges_i_want_you_me)；[www.bluesharmonica.com · draw_duration](https://www.bluesharmonica.com/draw_duration)。

<a id="th04"></a>

#### TH04 · P2 · 纯律与拍频实验缺少决定能否观察到目标现象的设置

**类别：** 教学材料／可执行性缺口；确定（缺少设置），现象依据已核实。

**证据：** [src/content/docs/theory/first-8-labs.mdx](../src/content/docs/theory/first-8-labs.mdx)（第 34 行）；[src/content/docs/theory/first-8-labs.mdx](../src/content/docs/theory/first-8-labs.mdx)（第 35 行）；[src/content/docs/theory/intonation-beats.mdx](../src/content/docs/theory/intonation-beats.mdx)（第 46 行）；[src/content/docs/theory/intonation-beats.mdx](../src/content/docs/theory/intonation-beats.mdx)（第 48 行）；[src/content/docs/theory/index.mdx](../src/content/docs/theory/index.mdx)（第 32 行）。

**影响：** 确定的可执行性缺口。现有工具清单没有说明如何设置非平均律频率；用默认键盘无法得到准确纯五度。只播放两个相隔五度的正弦基音也不会出现预期的慢拍：慢拍需要接近的频率/部分音。大三度 drone 实验同样未指定谐波丰富的持续音和要追踪的部分音，听不到拍动时无法区分设置问题与演唱问题。

**修复方向：** 补一份可运行的最小配方或音源：先将 440/442 Hz 两正弦叠加并计数；比较纯/平均律五度可直接叠加 330 与 329.628 Hz，约 0.372 次/秒，或用谐波丰富的 220 Hz 与两种五度比较其第 3/第 2 部分音。固定时长、混合播放方式与音量，并允许听觉不可辨时记录结果。声乐调纯律放在合成音验证和稳定长音之后。

**核验来源：** [www.animations.physics.unsw.edu.au · beats.htm](https://www.animations.physics.unsw.edu.au/jw/beats.htm)；[phys.unsw.edu.au · musFAQ.html](https://phys.unsw.edu.au/jw/musFAQ.html)；[manual.audacityteam.org · tone.html](https://manual.audacityteam.org/man/tone.html)。

<a id="th05"></a>

#### TH05 · P2 · 音程与中心实验没有固定音集合和伴奏条件

**类别：** 教学材料／可执行性缺口；确定。

**证据：** [src/content/docs/theory/intervals-and-scales.mdx](../src/content/docs/theory/intervals-and-scales.mdx)（第 30 行）；[src/content/docs/theory/first-8-labs.mdx](../src/content/docs/theory/first-8-labs.mdx)（第 40 行）；[src/content/docs/theory/first-8-labs.mdx](../src/content/docs/theory/first-8-labs.mdx)（第 42 行）。

**影响：** 确定的实验设计缺口。使用固定单音或任意循环和弦会引入不同的和弦冲突；换中心复测同样半音集合未说明保持实际音高集合，还是连同中心一起移调。前者改变功能，后者保持关系，两种操作检验的是不同问题，学生可按不同解释得到不相容的记录。

**修复方向：** 给出两项独立示例：固定一个低音，仅换 3/b3、7/b7；另保持同一组实际音名，分别用两个不同主音建立中心。列明音名、音区、每音时长、伴奏是否有三音以及记录问题，再开放自由选调。

<a id="th06"></a>

#### TH06 · P2 · 和声实验没有接到已有课件与明确的先修任务

**Neo 原件复核：** 撤回“用户没有和声示范”的推断：原件已有顺阶构造、转位和歌曲应用。本条改为网站应把实验接到明确主题/PDF 页及取用任务，并区分早期概念版与阶段 B 的手上演奏版。

**类别：** 课程体系／推进规则缺口；确定（站内示例和依赖标注不足）。

**证据：** [src/content/docs/theory/chords-and-harmony.mdx](../src/content/docs/theory/chords-and-harmony.mdx)（第 25 行）；[src/content/docs/theory/chords-and-harmony.mdx](../src/content/docs/theory/chords-and-harmony.mdx)（第 33 行）；[src/content/docs/theory/first-8-labs.mdx](../src/content/docs/theory/first-8-labs.mdx)（第 47 行）；[src/content/docs/theory/index.mdx](../src/content/docs/theory/index.mdx)（第 49 行）；[src/content/docs/guitar/harmony.mdx](../src/content/docs/guitar/harmony.mdx)（第 29 行）；[src/content/docs/guitar/fretboard.mdx](../src/content/docs/guitar/fretboard.mdx)（第 29 行）。

**影响（修订）：** 第六实验要求构造七个调内三和弦并演奏高音弦最近移动；Neo 原件已能提供相关结构、谱例和应用，不能再把缺口归为没有教材。网站尚未说明应取原件哪页、哪项及需要先通过什么。早期按需穿插乐理者可能在手上实现之前被实验卡住，仍需要先修或替代入口。

**修复方向（修订）：** 保留阶段 B 顺序；把手上演奏版接到第 9–12 训练周相关关卡和已拥有的原件示例，注明主题、PDF 页与选用任务。暂未通过者先在键盘或音名上完成概念版。公开站若需独立使用，再补少量原创示例。

<a id="th07"></a>

#### TH07 · P2 · 口琴首批短句没有写出能够跟拍的小节时值

**类别：** 教学材料／可执行性缺口；确定（记谱信息不足）；不武断认定所有竖线都已定义为小节线。

**证据：** [src/content/docs/harmonica/second-position.mdx](../src/content/docs/harmonica/second-position.mdx)（第 22 行）；[src/content/docs/harmonica/second-position.mdx](../src/content/docs/harmonica/second-position.mdx)（第 24 行）；[src/content/docs/harmonica/second-position.mdx](../src/content/docs/harmonica/second-position.mdx)（第 26 行）；[src/content/docs/harmonica/first-8-weeks.mdx](../src/content/docs/harmonica/first-8-weeks.mdx)（第 30 行）。

**影响：** 确定缺少拍号/时值。页面让初学者先用四分音符，而第一条竖线前 3 音、后 1 音加空两拍，按 4/4 都只有 3 拍；第二条是 4 音与 3 音。竖线若表示小节则无法直接接入后续 12 小节练习，若只表示句界也未说明。

**修复方向：** 给第一组短句补 4/4、起拍、时值与休止，例如以四格拍号网格表达两小节；如竖线只是句界则明确声明并另给可跟伴奏的版本。其余自由创作动机无需全部谱写。

<a id="th08"></a>

#### TH08 · P2 · 口琴首轮课程未闭合失败回退与阶段通关

**类别：** 课程体系／推进规则缺口；确定。

**证据：** [src/content/docs/harmonica/first-8-weeks.mdx](../src/content/docs/harmonica/first-8-weeks.mdx)（第 8 行）；[src/content/docs/harmonica/first-8-weeks.mdx](../src/content/docs/harmonica/first-8-weeks.mdx)（第 38 行）；[src/content/docs/harmonica/first-8-weeks.mdx](../src/content/docs/harmonica/first-8-weeks.mdx)（第 44 行）；[src/content/docs/harmonica/first-8-weeks.mdx](../src/content/docs/harmonica/first-8-weeks.mdx)（第 48 行）；[src/content/docs/harmonica/first-8-weeks.mdx](../src/content/docs/harmonica/first-8-weeks.mdx)（第 54 行）；[src/content/docs/harmonica/bending-and-blues-scale.mdx](../src/content/docs/harmonica/bending-and-blues-scale.mdx)（第 42 行）。

**影响：** 确定的路线执行缺口。第 5/6 周以多次接近为通过但没有固定次数/保持时长或可记录的误差范围；第 7 周没有通过条件，第 8 周只有交付清单。页面没有说明未通过如何保留单音、节奏与自然音短句，以及何时重测。按日历标题执行会把尚不稳定的压音塞入第 7/8 周，违背项目按关卡推进的规则。

**修复方向：** 说明周号代表可重复阶段；每阶段设一个可复测的最低成功条件和对应回退。压音未过时继续无压音问答/根音 12 小节，单独短练目标音；最终明确独立完成、录音连续性、呼吸舒适和 A/Bb 复测标准，不将统一 cents 数值冒充适用于所有人的专业门槛。

<a id="th09"></a>

#### TH09 · P2 · 吉他与口琴合流任务缺少单人实现方式与先修检查

**类别：** 课程体系／推进规则缺口；确定（可执行路径未写明）。

**证据：** [src/content/docs/harmonica/with-guitar.mdx](../src/content/docs/harmonica/with-guitar.mdx)（第 8 行）；[src/content/docs/harmonica/with-guitar.mdx](../src/content/docs/harmonica/with-guitar.mdx)（第 20 行）；[src/content/docs/harmonica/with-guitar.mdx](../src/content/docs/harmonica/with-guitar.mdx)（第 28 行）；[src/content/docs/harmonica/with-guitar.mdx](../src/content/docs/harmonica/with-guitar.mdx)（第 36 行）；[src/content/docs/harmonica/first-8-weeks.mdx](../src/content/docs/harmonica/first-8-weeks.mdx)（第 52 行）。

**影响：** 确定的器材/流程缺口。目标要求吉他保持和弦时口琴回答，但这是个人学习系统；页面没有选择双人、先录吉他再吹口琴、循环器或口琴架中的具体路径，口琴架反而放在以后。仅凭手持口琴和吉他难以按描述同时演奏与录制；shuffle 伴奏也没有对应先修入口。

**修复方向：** 默认给无需新增设备的流程：先录一轮带口数的 E 调吉他伴奏，播放该录音做口琴回答；另列双人和口琴架的可选版本。明确吉他先通过稳定 shuffle/12 小节、口琴先通过单音/12 小节根音关卡，再做合流。F 调可给变调夹 1 品使用 E/A/B 形或现成合法伴奏的实现。

<a id="th10"></a>

#### TH10 · P3 · 节奏通用定义遗漏拍单位，2/4 拍点击实验也没有说明节拍器换算

**类别：** 教学材料／可执行性缺口；确定（适用条件与操作缺省；4/4 本身公式正确）。

**证据：** [src/content/docs/theory/rhythm-and-groove.mdx](../src/content/docs/theory/rhythm-and-groove.mdx)（第 12 行）；[src/content/docs/theory/rhythm-and-groove.mdx](../src/content/docs/theory/rhythm-and-groove.mdx)（第 20 行）；[src/content/docs/theory/measurement-and-hearing.mdx](../src/content/docs/theory/measurement-and-hearing.mdx)（第 47 行）。

**影响：** 确定适用条件缺失。八分等于半拍只适用于四分音符为拍的情况；6/8 常以附点四分为一拍时，一个八分是三分之一拍。实验从 60 BPM 四分拍改成点击在 2、4 拍时，若仍用 60 点击且没有重新定义目标速度，音乐脉冲会变成 120 BPM，无法保持同条件比较。

**修复方向：** 明确本页例子均以四分音符为一拍；给出一个 6/8 的反例。节拍器实验写明保持音乐速度 60 BPM 时将点击设为 30 BPM（或静音 1/3 拍），以及如何预先数拍定位。

**核验来源：** [2012.musictheory.net · 15](https://2012.musictheory.net/lessons/15)。

<a id="th11"></a>

#### TH11 · P3 · 把拾音位置与泛音频率偏差放在同一句，容易混淆振幅与非谐性

**类别：** 措辞或适用条件澄清；疑似歧义，建议澄清；不能据此断言整页物理模型错误。

**证据：** [src/content/docs/theory/timbre-spectrum-envelope.mdx](../src/content/docs/theory/timbre-spectrum-envelope.mdx)（第 12 行）；[src/content/docs/theory/timbre-spectrum-envelope.mdx](../src/content/docs/theory/timbre-spectrum-envelope.mdx)（第 29 行）。

**影响：** 需澄清的专业措辞。现句先谈基频整数倍，再说刚度、拾音位置与动作造成偏差，容易被理解为改变拾音位置会改变谐波的频率比。在线性取样模型中位置主要改变各模式的权重；弦刚度等才使自由振动模态偏离整数倍。本页第 29 行其实已经正确说明位置影响强调/抵消。

**修复方向：** 拆句：理想弦模态是精确整数倍；现实刚度导致模态非谐性；拨弦/拾音位置主要改变部分音的强弱。若要谈磁拉力等对频率的影响，须另给条件，不能混在普通位置音色说明中。

**核验来源：** [newt.phys.unsw.edu.au · harmonics.html](https://newt.phys.unsw.edu.au/jw/harmonics.html)；[www.phys.unsw.edu.au · Fletcher1999a.pdf](https://www.phys.unsw.edu.au/music/people/publications/Fletcher1999a.pdf)。

<a id="th12"></a>

#### TH12 · P3 · 器材确认处使用复音簧片这个混淆型号的称呼

**类别：** 确定错误或内部矛盾；确定（术语冲突）。

**证据：** [src/content/docs/harmonica/instruments-and-keys.mdx](../src/content/docs/harmonica/instruments-and-keys.mdx)（第 8 行）；[src/content/docs/harmonica/baseline.mdx](../src/content/docs/harmonica/baseline.mdx)（第 8 行）。

**影响：** 确定术语问题。开头一面要求 Richter 排列的复音簧片布鲁斯口琴，一面排除复音口琴；初学者核对自己乐器时会遇到同一句自相矛盾的中文类别。普通十孔 Richter 的吹/吸两片簧不等同复音口琴的一音双簧效果。

**修复方向：** 改为标准十孔 Richter 调音的单音布鲁斯口琴（diatonic harmonica），必要时说明每孔有吹簧和吸簧，并与 tremolo/复音区分；与 baseline 用语统一。

**核验来源：** [hohner.de · complete.pdf](https://hohner.de/fileadmin/cat/2020/catalogs/Harmonicas/pdf/complete.pdf)；[www.hohner-cshop.de · HOHNER_instructions_ordering_reeds_en.pdf](https://www.hohner-cshop.de/out/media/HOHNER_instructions_ordering_reeds_en.pdf)。

## 4. 65 页逐页覆盖记录

每行表示正文已审读且已完成上述桌面/手机渲染检查；“未发现确定问题”不等于对所有未来情形作保证。行数不含文件末尾空行。问题编号链接到本报告明细。ROOT-05 是共享移动菜单问题，适用于有侧栏的页面，不在每行重复列出。

逐页表的直接评价对象是公开网页；Neo 原件已能提供的图谱、谱例和练法，以顶部复核说明、修订后的 G09/G14/TH06 及[原件对照报告](guitar/NEO_SOURCE_CHECK_2026-09-15.md)为准。不能把某页不自含示例再推断为用户没有相关学习材料。

### 全站与辅助页（6 页）

| 页面 | 行数 | 内容审查结论 | 对应事项 |
|---|---:|---|---|
| [页面不存在](../src/content/docs/404.mdx) | 18 | 错误页文字与页面结构可用；在嵌套缺失URL下两个返回链接错误，正常/404.html扫描无法覆盖该场景。 | [ROOT-01](#root-01) |
| [完整课程目录](../src/content/docs/course-outline.mdx) | 71 | 五模块和吉他阶段0–9都列出，强调网页存在不等于通过；后半程对应教程和吉他交接定义不完整。 | [SYS-01](#sys-01)、[SYS-03](#sys-03) |
| [个人音乐学习教程](../src/content/docs/index.mdx) | 52 | 首页、五模块卡片和定位入口清楚，公开内容与学习进度有说明；顺序文案小幅漂移，案例成熟度需如实标注，零基础入口受定位前提约束。 | [ROOT-03](#root-03)、[SONG-01](#song-01)、[G01](#g01) |
| [练习、证据与进度](../src/content/docs/practice-and-progress.mdx) | 43 | 最小记录、单变量回听、跨日期证据和回退原则合理；对初学者的独立听觉校准仍需少量标准材料。 | [SYS-04](#sys-04) |
| [资料来源与证据边界](../src/content/docs/sources-and-evidence.mdx) | 45 | 版权、证据等级、原始材料与原创讲解边界清楚；一个制造商链接返回404，另会话链接核验受限；不把缺失原课件当作已复查。 | [ROOT-04](#root-04) |
| [使用说明](../src/content/docs/start-here.mdx) | 29 | 四步学习与当前/路线/参考区分合理；定位前提断点和进度文件路径错误需修。 | [ROOT-02](#root-02)、[G01](#g01) |

### 吉他（15 页）

| 页面 | 行数 | 内容审查结论 | 对应事项 |
|---|---:|---|---|
| [木吉他与电吉他分支](../src/content/docs/guitar/acoustic-and-electric.mdx) | 42 | 共同先修与分支顺序和原路线一致，保持标准调弦基础后再按歌曲引入特殊调弦的方向合理。作为路线概览可用，作为阶段 6 教程缺定义、示例、逐步练习与通关/回退。30 行信号链箭头还应注明是示意，不能把学习模块当唯一接线顺序。 | [SYS-01](#sys-01) |
| [开放和弦、切换与变调夹](../src/content/docs/guitar/chords-and-transitions.mdx) | 69 | 关于逐弦检查、不断拍切换、分阶段横按、power chord 不含三音、夹 2 品 G 形实际 A 的说明未发现确定知识错误；25 分钟练习与关卡基本对应。主要缺口是所有被练手型的可操作表示，F/Bm 渐进版也未给具体版本。 | [G02](#g02) |
| [耳朵与扒歌](../src/content/docs/guitar/ear-and-transcription.mdx) | 39 | 短片段先拍再哼再找、记录证据等级的过程清楚，目标与关卡对应。六层顺序符合原框架；缺低音/根音分离与至少一个完整做过的示例。独立自评仍受学员听辨水平限制，未把“自己认为确认”当作外部校验。 | [G03](#g03) |
| [吉他前 8 个训练周：每周 3 练照做表](../src/content/docs/guitar/first-8-weeks.mdx) | 186 | 四线与歌曲在日常配比中保留，训练周/自然周换算、漏练处理、升降速与停止条件清楚；与个人 NEXT_8_WEEKS 大体一致，是吉他部分最接近执行手册的页面。休止的声学结果、新技术示例及末尾多数通关规则未闭合；有日表不等于相应动作已经教会。 | [G05](#g05)、[G08](#g08)、[SYS-02](#sys-02) |
| [持琴、调音、记谱与第一批声音](../src/content/docs/guitar/foundations-and-setup.mdx) | 69 | 持琴、品丝附近按弦、六弦音名、微调与无痛要求总体合理，20 分钟模板有检查项。声明的和弦图/两小节读谱目标没有实际材料支撑；所给 TAB 是单个和弦，不足以检验时间顺序读谱。调音未列八度编号属于可改进细节，本次不据此判定存在已发生的调音安全错误。 | [G02](#g02) |
| [指板、音阶与 CAGED](../src/content/docs/guitar/fretboard.mdx) | 41 | 6/5 弦自然音品位逐项核对正确，先锚点再随机找音的练法合理；后续八度、CAGED、音阶只有原则和目标，没有图示及可复现路线。音阶度数与和弦构成音的参照混用需澄清，避免把和弦根音都理解为调内 1。 | [G07](#g07)、[G09](#g09) |
| [和弦与和声](../src/content/docs/guitar/harmony.mdx) | 46 | 大小三和弦与大调调内三和弦质量顺序正确，功能标签后保留语境限制，未把每个和弦功能绝对化。作为和声摘要可用；转位、三种 voicing、色彩和弦的教学内容与关卡承接不足。没有完整独立练习模板，不能把列出的主题视作已讲授完成。 | [G14](#g14) |
| [即兴、编曲与高阶整合](../src/content/docs/guitar/improvisation-and-arrangement.mdx) | 44 | 目标音、动机、留白、声部分工与原阶段 7–9 一致，未来阶段提示存在；未发现这些原则的确定知识错误。局限是三个阶段合成一篇原则清单，没有示例作品、分级练习或能证实阶段完成的验收。 | [G07](#g07)、[SYS-01](#sys-01) |
| [吉他完整路线](../src/content/docs/guitar/index.mdx) | 71 | 阶段 0–9、四线并行、每周三练以及 Neo 为主资源均与个人路线一致，路线本身不应另起体系。入口固定为需先会歌的定位，缺真正初学者分支；页面覆盖了终点名称，但不能作为阶段 6–9 已建成的证据。 | [G01](#g01)、[SYS-01](#sys-01) |
| [定位练习 A：节奏与歌曲](../src/content/docs/guitar/positioning-a.mdx) | 74 | 一遍到底、错误恢复、分离唱弹干扰和记录模板适合作为已有曲目的诊断，目标与观察项对应。它是诊断而非教学，不能要求事先把能力练会再测；缺歌曲/四和弦尚不会时的记录与回退出口，也未给具体失败项到阶段 0 的映射。 | [G01](#g01) |
| [定位练习 B：技术、指板与耳朵](../src/content/docs/guitar/positioning-b.mdx) | 94 | 三条基础线的观察方式清楚，耳扒有 20 分钟上限、音名区分直接/锚点/逐品数，未发现确定专业事实错误。已会 riff、会用自然音清单和能自行挑未看谱片段的预设对初学者仍缺兜底；“第一个未通过关卡”到具体补练内容没有判定表。 | [G01](#g01) |
| [节奏与 Groove](../src/content/docs/guitar/rhythm.mdx) | 45 | 脉冲/细分/图案分层、八分/十六分口令与慢速迁移合理，三连音按官方块放后面不构成路线错误。没有实际标声长的切分谱例，空扫与静默未区分；前 8 周执行表补了时长与速度，却不能补上这一区别。基础拍号与时值可通过 Neo 学习，但本页缺明确示例锚点。 | [G05](#g05) |
| [第 9–16 训练周：和弦、和声、节奏与音阶入口](../src/content/docs/guitar/stage-b-weeks-9-16.mdx) | 162 | 第 9–16 周顺序与仓库 Neo 映射块 2–6 一致，课程量控制和未过只重复相关周合理；自然大/小调从五声补音、四类七和弦构造公式核对基本正确。D4 七和弦分类有错误，形状/转位缺实际例子，块 5–7 余量和三种 voicing 没有后续可执行闭环。Neo 编号本身未重新核对原件。 | [G04](#g04)、[G09](#g09)、[SYS-01](#sys-01)、[G14](#g14) |
| [单音技术与消音](../src/content/docs/guitar/technique.mdx) | 39 | 用音头、同步、音长、杂音和紧张程度评估技术，比单纯速度目标更合理；两手消音的分工可用。技术定义过短，缺动作示范与指定弦品实例；揉弦“围绕中心音”未限定动作类型，不能据此严格判所有揉弦都应对称上下变音，本次将其列为说明局限而非独立事实错误。 | [G08](#g08) |
| [电吉他音色与信号链](../src/content/docs/guitar/tone-and-signal-chain.mdx) | 56 | 效果家族、干声基线、声部 EQ 与逐层增加效果的方向合理，8 小节对照和通关项目基本对应。Gain 描述缺线性/非线性条件。三遍重新演奏也会改变输入表现，未要求输出电平匹配，因此其单变量对照只宜视作定性练习；本次未把此局限升级成独立缺陷。 | [G06](#g06) |

### 声乐（11 页）

| 页面 | 行数 | 内容审查结论 | 对应事项 |
|---|---:|---|---|
| [声乐定位与个人基线](../src/content/docs/vocal/baseline.mdx) | 72 | 定位维度全面，可以作为基线清单；固定材料与复测规范不足。 有三次重复和模板，也有按问题进入课程的分流；跨次对比受自由选题和未记录设置影响。 正式主线入口明确在吉他之后；能独立做基础观察，难凭本页建立标准化基线。 | [VOC-08](#voc-08) |
| [气流、声带振动与声道](../src/content/docs/vocal/breath-phonation-resonance.mdx) | 63 | 模块中相对完整的基础讲解与练习页；可作为有少量经验者的短练习。 四轮和三次成功可操作，有降低音量/音高的回退；三到五音型没有给具体音级/BPM，20分钟分配不等于发声净时长。 新音节 zz/noo/vee 未进入字典。配合已解释音节和教师已教动作可使用；纯新手仍缺声音校准。 | [VOC-10](#voc-10) |
| [日常练声与自动钢琴](../src/content/docs/vocal/daily-practice.mdx) | 205 | 维护入口、器材选择、中文音节与结束复查齐全，是可操作性最高的正文；被播放器错误和多套时间/频率冲突影响。 有时长、三次重复、初始设置和退出标准；实际自动时间不符，升上限可能不改变音序列。 吉他维护与正式定位区分原则存在，但每周1–2次和六日轮换需统一。适合跟做已会动作，不能仅凭它首次学会混声/弱唱。 | [VOC-01](#voc-01)、[VOC-02](#voc-02)、[VOC-03](#voc-03)、[VOC-09](#voc-09)、[VOC-11](#voc-11) |
| [声乐前 8 周](../src/content/docs/vocal/first-8-weeks.mdx) | 77 | 作为首轮课程大纲合理；尚不是每次拿来直接执行的完整8周课表。 声称每周25–35分钟和对应10分钟套餐；缺失菜单使弱唱/英文等专项不能按同一入口完成。未通过保留薄弱任务，具体回退课次不足。 定位先修明确；需要把每周任务映射到已存在的能力课、可用播放器段落和手动练习。 | [VOC-02](#voc-02)、[VOC-04](#voc-04)、[VOC-05](#voc-05)、[VOC-06](#voc-06)、[VOC-07](#voc-07) |
| [高音、换区与混声协调](../src/content/docs/vocal/high-notes-and-mix.mdx) | 30 | 方向正确的换区原则摘要；不足以独立教授混声。 三次关卡和气声回低区有帮助；其余“质量接近/保留协调”需要示例才能自评。 依赖已能唱轻而清楚的中音、识别主要元音并听出用力；只给钢琴与TTS不能首次建立这些判断。 | [VOC-05](#voc-05) |
| [声乐完整路线](../src/content/docs/vocal/index.mdx) | 51 | 模块路线和结果导向合理，未删除后续声乐；需要协调维护入口频率。 推荐跨日可重复，正式阶段由定位进入；维护每周1–2次与日常页轮换表不统一。 链接覆盖11页完整；主题连续不代表专项已经具备独立自学材料。 | [VOC-09](#voc-09) |
| [旋律线与英文节奏](../src/content/docs/vocal/melody-and-english.mdx) | 32 | 旋律拆分与英文语流的步骤摘要；最缺带标注的具体例子。 1–2秒循环与2–4小节目标有层级；未给从找不到重音或跟不上节奏时的减负分支与示范答案。 读者必须自己找片段并判断英文重读、弱读才能执行本课；缺从未知到可自评的桥。 | [VOC-06](#voc-06)、[VOC-07](#voc-07) |
| [音准、听唱与旋律记忆](../src/content/docs/vocal/pitch-and-ear.mdx) | 53 | 听唱训练顺序合理，能供有基础者组织练习；素材、工具入口和答案不足。 先拍、再哼、上琴核对、隔日复测形成良好思路；没有提供第一套可核对答案。 自动钢琴链接只能承担固定等时回声，不能自动承担drone与2–4小节迁移测试。 | [VOC-06](#voc-06) |
| [安全练习与声音基线](../src/content/docs/vocal/safe-practice.mdx) | 43 | 安全页基本可靠，所引NIDCD内容与链接已核对。 越练越费力就结束，专业求助边界清楚；与日常页156行存在跨页冲突，错误定位在日常页。 可以独立阅读执行停止与求助判断；不是诊断或医学治疗方案。 | [VOC-03](#voc-03) |
| [弱唱与音色控制](../src/content/docs/vocal/soft-singing.mdx) | 27 | 弱唱原则提纲，训练细化明显不足。 “同一句音量相近、音高不塌、三级动态”的结果清楚，但缺失败分流和可校准反馈。 本来不会弱唱的读者，仅靠mum/no/gee和钢琴不能确认是否已得到清楚的弱声；no/gee也未在词表解释。 | [VOC-05](#voc-05)、[VOC-10](#voc-10) |
| [选调、改编与歌曲落地](../src/content/docs/vocal/song-application.mdx) | 30 | 合理的结课检查表；缺一次完整示例和到既有歌曲实践页的连接。 从说节奏到整曲的步序合理；需具体选择短句、试调次数、记录字段和失败返回哪一步。 歌曲模块已有Falling Slowly三调比较与录音复盘规范，本页应复用并链接，避免独立形成第二套泛化清单。 | [VOC-12](#voc-12) |

### 数学物理乐理（11 页）

| 页面 | 行数 | 内容审查结论 | 对应事项 |
|---|---:|---|---|
| [和弦、功能与声部连接](../src/content/docs/theory/chords-and-harmony.mdx) | 33 | 和弦结构表正确，功能说明没有把和弦类别绝对化；voice leading、借用、副属只有定义和目标，没有具体音名进行验证；唯一实践需要高音弦 triad 转位，先修和示例不在页内也未链接；缺少学生能据以判对错的最低门槛/降级任务。核心缺口是从知道结构到能构造与比较的操作桥梁。 | [TH06](#th06) |
| [八节数学物理乐理实验](../src/content/docs/theory/first-8-labs.mdx) | 80 | 八节预测—操作—记录—迁移主线合理，每条件三次和承认边界值得保留；第 1/2/3 节能用基本吉他和录音开始；第 4 节音源和拍频观察条件不足，第 5 节变量定义不清，第 6 节 triad 和声先修缺桥梁；第 7/8 节需要节奏/编配能力，未映射吉他关卡；统一报告模板有用，不能代替每节失败后下一步。 | [TH04](#th04)、[TH05](#th05)、[TH06](#th06) |
| [曲式、张力与编曲密度](../src/content/docs/theory/form-tension-arrangement.mdx) | 62 | 目标、五变量表、段落记录模板、四和弦三版本和声部避让形成较完整练习；明确语境非绝对、观察先于情绪解释，因果边界较好；有通关，可用自选歌曲执行，需先有基本录音和和弦能力；缺少一份完成示例但不阻止已有吉他阶段 D 能力者实践；回退可先做密度单变量，属于教学增强建议。未发现确定错误。 | 未发现需单列的确定问题 |
| [数学物理乐理路线](../src/content/docs/theory/index.mdx) | 49 | 目标和整体次序清楚，强调模型边界与乐器证据；例子以课程地图为主，作为入口合理；明确逐页实验后前进，但未区分吉他早期能做与需要阶段 B、声乐长音或多轨操作的实验；通关依赖后页，回退/替代路径不足。地图中的和弦外音尚没有对应教学与实验。 | [TH04](#th04)、[TH06](#th06) |
| [音程、音阶与调式](../src/content/docs/theory/intervals-and-scales.mdx) | 30 | 目标涵盖音程、大小五声音阶和调式；大调全半结构、Dorian 大六度、Mixolydian 小七度准确，中心与文化语境边界合理；没有完整音名推导或音程/音级符号示例，对已有吉他音级基础者可读；唯一实验没固定调性、音集合及伴奏，无法保证复测同一问题；无具体通过或回退，建议先补最小可执行中心对照。 | [TH05](#th05)、[TH06](#th06) |
| [音准、音分与拍频](../src/content/docs/theory/intonation-beats.mdx) | 56 | 音分公式、440/442 的拍频、平均律和乐器限制准确；三个实验里同音附近拍频和 12 品比对方向正确；纯律演唱实验需要指定 drone 的谐波、连续微调和观察条件，不能只靠任意键盘；有知识与听觉通关，但无听不到拍频的排错/合成音替代。 | [TH04](#th04) |
| [测量、听觉与模型边界](../src/content/docs/theory/measurement-and-hearing.mdx) | 64 | 目标、三层问题和工具局限清楚；同设备/距离重复三次、观察与解释分离可取；周期和拨弦盲比能够实施，但需要可放大到毫秒的波形工具，普通手机录音显示不一定够；节拍器实验缺少速度换算；有通关，盲听不一致时有回查变量，未听见/看不清周期时无降级实例。核心事实无确定错误。 | [TH10](#th10) |
| [音高、八度与十二平均律](../src/content/docs/theory/pitch-and-temperament.mdx) | 36 | 目标、倍频例子、十二平均律公式与纯律取舍正确；公式有计算路径但没有一个完整 n=7 数值校验，属可改进而非错误；12 品按压力实验可实施，却主要验证真实乐器音准而非等比分割，平均律的计算实验在第 4 节补充；无独立通过/回退，需和音分页关联。未发现确定错误。 | 未发现需单列的确定问题 |
| [节拍、细分与 Groove](../src/content/docs/theory/rhythm-and-groove.mdx) | 35 | 区分拍号、节奏型、重音和微时值的方向合理，60/BPM 公式正确；八分/十六分等于固定拍分数缺少四分为拍的限定；跨模块例子是任务方向，未给具体网格/重音位置/时长与对照；结尾三个乐器共享脉冲不宜理解为早期乐理通关的硬条件；无独立回退，可链接吉他节奏基础并允许先选一种乐器。 | [TH10](#th10) |
| [声音、波与泛音](../src/content/docs/theory/sound-and-harmonics.mdx) | 41 | 目标聚焦周期、振幅、弦和泛音；f=1/T、100 Hz 例子和理想弦公式正确，变量与现实边界已注明；空弦/12 品泛音/拨弦位置构成合适实验；练习没有独立次数与结果表，可继承模块每条件三次的规则；无独立关卡/失败回退，但低影响单概念页可由实验记录判断。未发现必须报错的知识问题。 | 未发现需单列的确定问题 |
| [音色、频谱与时间包络](../src/content/docs/theory/timbre-spectrum-envelope.mdx) | 62 | 覆盖频谱、包络、噪声、演奏位置、声道与失真；ADSR 明确只是辅助模型，未误称声学乐器全符合；同音单变量和前 100 毫秒/后续比较具体，有记录模板与通关；需要说明窗口长度影响频率分辨率，但本页主要比相对谱形，暂不列独立严重问题；泛音频率与拾音位置的措辞存在歧义。 | [TH11](#th11) |

### 歌曲（10 页）

| 页面 | 行数 | 内容审查结论 | 对应事项 |
|---|---:|---|---|
| [一把吉他与人声的编配](../src/content/docs/songs/arrangement-lab.mdx) | 58 | 骨架/段落/个性三版的先后、音区与留白原则合理；读者仍缺一组相同材料的实际前后示例，案例建设统一承接。 | [SONG-01](#song-01) |
| [Don't Look Back in Anger](../src/content/docs/songs/dont-look-back-in-anger.mdx) | 36 | 目标、分离唱弹和重复标准合理；没有目标版本、段落时间点、和声骨架或英文处理示范，G4/A4也未绑定选调版本。 | [SONG-01](#song-01) |
| [版本锁定与证据笔记](../src/content/docs/songs/evidence-and-versioning.mdx) | 68 | 版本卡、时间点笔记、三档证据和冲突处理可执行；通关应允许核验后维持正确判断。 | [SONG-02](#song-02) |
| [Falling Slowly](../src/content/docs/songs/falling-slowly.mdx) | 32 | 三个相邻调的对比和高潮备选方案可以作为练习方法；缺具体版本、短句和示范记录，不能单独教会作品。 | [SONG-01](#song-01) |
| [歌曲练习与分析](../src/content/docs/songs/index.mdx) | 43 | 歌曲整合作用与统一结构合理；所列四个案例未达到页面自己定义的版本/结构/和声示范结构。 | [SONG-01](#song-01) |
| [录音、复盘与版本迭代](../src/content/docs/songs/recording-review.mdx) | 64 | 录音条件、三遍回听、时间点实验与跨日期比较完整，模板可复用；未发现需要单独报告的确定问题。 | 未发现需单列的确定问题 |
| [扒歌实验室](../src/content/docs/songs/transcription-lab.mdx) | 67 | 六层拆分与60分钟分配自洽，已提醒Bass可能不是根音；仍需带音频/答案的短案例，关卡不应强制存在错误。 | [SONG-01](#song-01)、[SONG-02](#song-02)、[SYS-04](#sys-04) |
| [When You Sleep · Friko 版本](../src/content/docs/songs/when-you-sleep.mdx) | 32 | 明确区分原曲与Friko翻唱，声部取舍原则合理；未锁定翻唱来源及时间点，无已分析的短声部示范。 | [SONG-01](#song-01) |
| [Where We've Been](../src/content/docs/songs/where-weve-been.mdx) | 31 | 保留旧结论需重新验证的边界，未编造和弦；实际是复核任务清单，来源、段落与编配示例未落实。 | [SONG-01](#song-01) |
| [一首歌的完整工作流](../src/content/docs/songs/workflow.mdx) | 32 | 七步流程覆盖版本、结构、声部、演出和复盘；作为方法总览未发现确定事实错误，具体操作需由案例承接。 | [SONG-01](#song-01) |

### 口琴（12 页）

| 页面 | 行数 | 内容审查结论 | 对应事项 |
|---|---:|---|---|
| [口琴定位与第一天](../src/content/docs/harmonica/baseline.mdx) | 51 | 器材确认、单音、-2、节奏、I/IV/V 和换琴都有定位记录；自然音目标正确；低音排错先动作后乐器以及不适停止适当；A/B 有次数，C 有 60 BPM；D/E 没有量化速度但定位性质可接受；明确按首个失稳项进入相应页，属于本模块回退做得较好的页面。无新确定缺陷。 | 未发现需单列的确定问题 |
| [压音与蓝调音阶](../src/content/docs/harmonica/bending-and-blues-scale.mdx) | 42 | 正文两种关键压音和 1-b3-4-b5-5-b7-1 的整套孔位正确，双簧耦合、轻气流和先小片段方向合理；description 仍错写全音压；先听目标音的步骤没给 A/Bb 实际带组别目标，读者需自行从自然音表和半音规则计算，可补 G4/Bb4 与 Ab4/B4 的目标表；次数、停留时长和判定/失败分支缺，详见阶段系统问题。 | [TH02](#th02)、[TH08](#th08) |
| [蓝调语言：Motif、问答与落点](../src/content/docs/harmonica/blues-vocabulary.mdx) | 64 | motif、问答、随和弦结尾、限制变量三轮与通关相互对应；自然音和功能表正确，I/IV/V 根音建议合理；唯一确定音高错误为小/大三度对比写成 -3'→-2；已有压音不到位退回自然音句子的明确回退，可作为前八周补写的范式。 | [TH01](#th01) |
| [清洁、保存与故障排查](../src/content/docs/harmonica/care-and-troubleshooting.mdx) | 64 | 轻拍排水、擦干晾干、材质/型号差异和先排动作/水分再考虑故障的顺序合理；没有通用浸泡/调簧步骤，能保护未确认型号；记录模板与可重复维护关卡齐全；不要自行拆琴清单后有拆卸前拍照一般建议，读者或可理解成自行拆卸许可，但上下文没有具体操作，不列确定问题；无新确定缺陷。 | 未发现需单列的确定问题 |
| [口琴前 8 周](../src/content/docs/harmonica/first-8-weeks.mdx) | 54 | 主琴/移调复测、单音→根音→结构→自然句→4/3 孔压音→合流的主线合理；第 6 周正确强调半音压；缺 12 小节伴奏的提供/自制方法与具体节奏模板；前几周有结果门槛，压音的多次接近过于难以复测，第 7/8 周缺结束/失败决策；未把周号明确成可重复阶段；单人吉他问答路径缺省。 | [TH07](#th07)、[TH08](#th08)、[TH09](#th09) |
| [布鲁斯口琴完整路线](../src/content/docs/harmonica/index.mdx) | 56 | A→E、Bb→F、-2 根音、-5 小七度及记谱表正确，课程地图覆盖单音到合流和维护；总路线第 6 步仍写三孔全音压，与正文和记谱对不上；入口以乐器确认开始合理；路线需要依赖前八周的明确关卡和回退才能闭合。 | [TH02](#th02)、[TH08](#th08) |
| [两把琴、调性与第二把位](../src/content/docs/harmonica/instruments-and-keys.mdx) | 38 | A 与 Bb 两张标准 Richter 自然音表逐孔核对正确，I/IV/V 与半音移调关系正确；型号不明先核对、低调琴动作不可照搬 C 琴力度合理；标题附近复音簧片用语错误；音表只给音名无八度，可在压音目标页补带组别的实际音高和调音器等音名，作为便利性改进；此页是参考页，无独立练习关卡可接受。 | [TH12](#th12) |
| [第二把位入门](../src/content/docs/harmonica/second-position.mdx) | 37 | 根音、I/IV/V、自然三度与吸吹和弦均正确；先根音伴奏再少量自然音符合能力顺序；两条首批短句缺拍号和完整时值，四分逐音执行与 4/4 十二小节的接轨不明确；通关含四次短句重复与一轮十二小节，失败时可回根音但未显式链接。 | [TH07](#th07) |
| [单音、含琴与呼吸](../src/content/docs/harmonica/single-notes-and-breath.mdx) | 39 | 含琴、轻呼吸、中音区到 -2 的顺序与初学故障逻辑合理；4–6 孔吹吸谱、两拍/四拍和五次成功给出具体练法；有 -2 五步回退和头晕等停止条件；'通常说明换气过度'应保持工作解释而非个体诊断，原文有通常限定，未作为确定错误；没有新增值得单列的问题。 | 未发现需单列的确定问题 |
| [音色、吐音与手腔效果](../src/content/docs/harmonica/tone-articulation-hands.mdx) | 60 | 目标涵盖音头/音长/手腔；辅音只作动作提示而非发声、手腔与气流分开、先长音再效果顺序合理；四拍录音、20 分钟五段和通关使练习可执行；例谱是音长示意，标长短的上下文足以解释，不同于正式两小节缺拍问题；已有降低速度力度、先稳长音的回退。无确定知识错误。 | 未发现需单列的确定问题 |
| [12 小节、短句与留白](../src/content/docs/harmonica/twelve-bar-and-phrasing.mdx) | 46 | 十二小节 I/IV/V 布局与 A/Bb 实际调对应正确，承认 quick change/turnaround 变体；只根音→问答→换落点递进清楚，有留白和不看表的通关；呼吸气量方向写反；需明确默认 4/4 和每小节四拍以协助和短句谱连接。 | [TH03](#th03)、[TH07](#th07) |
| [口琴与吉他连接](../src/content/docs/harmonica/with-guitar.mdx) | 41 | E/F 调对应、稀疏伴奏、在人声空隙进入、音量用距离调节和先两两组合的原则合理；有两版完整录音目标但缺默认单人制作路径及吉他 shuffle 先修，用户可能需要临时购置口琴架/寻找他人才能按描述执行；F 调可用变调夹与 E 形但未给位置；完成判定主要为复盘维度，需从前八周共享最低门槛。 | [TH09](#th09) |

### 交互组件

| 组件 | 审查结论 | 对应事项 |
|---|---|---|
| [src/components/VocalPracticePlayer.astro](../src/components/VocalPracticePlayer.astro) | 能提供基础参考音、半音移调和固定回声；控制状态及时长有确定性缺陷。 有停止按钮和进度；完成度只是音序列走完，不是能力通关。没有按段选择、长音动态、drone和2–4小节素材；请勿把完成套餐视为完成所有周目标。 可作为已经会动作的伴奏；本审查执行原script的无浏览器模拟，未宣称验收真实音色、后台计时、音频权限或手机锁屏表现。 | [VOC-01](#voc-01)、[VOC-02](#voc-02)、[VOC-04](#voc-04)、[VOC-06](#voc-06)、[VOC-11](#voc-11) |
| [src/components/VocalSyllableGuide.astro](../src/components/VocalSyllableGuide.astro) | 中文近似、口腔动作和用途降低英文缩写门槛，定位为读法示意适当；词表覆盖不完整。 不支持语音时有中文备用，播放失败有明确提示；尚无自动化/听觉验收确保每个平台读出预期练声音素。 可教常见音节近似读法，不能验证混声/头声动作；zz/noo/vee/no/gee未覆盖，相关课也未链接到字典。 | [VOC-10](#voc-10) |

## 5. 建议修复顺序与验收

| 批次 | 小任务 | 完成证据 |
|---|---|---|
| 1 · 纠正会误导练习的内容 | 修播放器动态上限、声乐异常停止分支；改半减七分类、口琴孔位/压音/呼吸/型号术语。 | 动态降上限不会再有越界音；正文与入口一致；相同音乐任务能产生宣称的音级对比。 |
| 2 · 打通吉他起点 | 补尚不会定位分支、必要的开放和弦/记谱入门例子；八度与中阶内容优先接原件页码。连音/消音/推揉弦明确原课取用或自编预备。 | 读者不依赖自己已有的整首歌或指法记忆，也能执行阶段0并留下可核验结果。 |
| 3 · 统一规则 | 为阶段 A 区分必需门槛与可携带补练项；给吉他模块交接验收；统一维护频率和源文件路径。 | 给同一组通过/未通过记录，能够唯一决定下一课与补练项；不凭空修改个人进度。 |
| 4 · 补校准材料与课程衔接 | 补节奏/短旋律核验题及答案；和声/voicing 优先接到现有原件。给拍频和中心实验可运行参数；将声乐周目标映射到自动/手动任务。 | 能先做题后核验；更换音色/中心时知道控制什么；不会把菜单完成误当专项完成。 |
| 5 · 接完既定后半程 | 补齐第17训练周后的执行计划，将Neo块5–7余量与扒歌/编配按既定关系并行安排，并为6A/6B、7、8、9逐段补任务；补一首完整示范案例。 | 每段都有入口、示例、练习、作品交付和回退；最终交接与根路线一致，后续模块不会无期限等候。 |
| 6 · 全站收尾 | 修深层404返回、外链、移动菜单辅助状态；按真实时长显示套餐。 | 相同Pages base下复测嵌套404、中文搜索和移动菜单；套餐显示随上下限/BPM更新。 |

修复应按小批次进行，不以本报告事项数量制造新的日历压力。每批完成才更新相应待办；个人能力仍由真实练习证据决定。

## 6. 可复查的关键复现

### 播放器

默认 C3/E4/72 BPM：常规 631.67 秒、轻柔 310 秒、头声 301.67 秒、混声 303.33 秒、元音 310 秒、转音 341.67 秒、回声 328.33 秒。常规 F3/C4/72 BPM 为 221.67 秒。

播放中将最高音改 C4：预览文字声称新上限，开始按钮重新启用，但旧序列继续；复现时随后有 5 个高于 C4 的音，最高 D4。固定 C3 起音，将常规上限 E4 改到 A4，因 span 限制，实际序列不变，最高仍是 D4。后者是说明缺口，不是算法越界。

### 404 与菜单

将构建生成的 404.html 作为缺失请求响应，保留浏览器请求地址 `/music-learning/guitar/missing-test/`：两个返回链接解析为原错误地址及其子目录。移动菜单打开时宿主的 aria-expanded 为 true，但按钮仍是 false；Esc 能正常关闭视觉菜单。

### 外部材料与验收限制

本报告附件只保留可追溯路径和原创审查，没有复制课程原件、完整歌词、整曲转录或个人录音。浏览器截图、逐次渲染结果和播放器复现脚本保留在本次会话临时目录，不放入公开教程。报告本身可以在未来修订时逐项对照；不要把临时工具文件当作长期课程依赖。
