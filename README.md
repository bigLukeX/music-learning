# 个人音乐学习系统

这是一个从 ChatGPT“音乐”项目迁移出来、由 Codex 持续维护的个人音乐学习仓库。

项目的核心不是囤积聊天记录，而是把长期讨论沉淀为可复习、可练习、可验证、可继续扩展的知识体系。**内容建设按顺序推进，当前先把吉他部分做完整、做细**：沿用已经确定的路线，覆盖节奏、技术、指板、耳朵、和声、扒歌、民谣/电吉他分支、即兴和编曲。吉他部分完成后，继续建设声乐、数学物理乐理、歌曲分析和布鲁斯口琴；它们不是被取消。

## 当前状态

- 已根据“音乐”项目中的 10 个相关聊天建立第一版上下文。
- 已整理出声乐、数学物理乐理、吉他、口琴与歌曲分析五条内容线。
- 原聊天没有整段复制进仓库；已将关键信息沉淀为结构化文档。
- `sources/` 预留给用户明确加入的原始资料，Codex 将其视为只读输入。
- Neo 课程资料、完整录音与其他附件尚未进入可携带的仓库资料。
- 当前没有 GitHub 远程仓库，也没有 GitHub Pages 部署；隐私与发布决定见 [`DEPLOYMENT.md`](DEPLOYMENT.md)。

## 从这里开始

1. 第一次交给 Codex：阅读 [`START_HERE.md`](START_HERE.md)。
2. 学习总顺序：阅读 [`ROADMAP.md`](ROADMAP.md)。
3. 吉他详细路线：阅读 [`docs/guitar/ROADMAP.md`](docs/guitar/ROADMAP.md)。
4. NeoMusic 课程对应关系：阅读 [`docs/guitar/NEO_COURSE_MAP.md`](docs/guitar/NEO_COURSE_MAP.md)。
5. 真正开始练：从 [`docs/guitar/NEXT_8_WEEKS.md`](docs/guitar/NEXT_8_WEEKS.md) 的定位测试开始。

交给 Codex 时可以直接说：

> 接管这个仓库。先读 START_HERE.md、PROJECT_CONTEXT.md、ROADMAP.md、AGENTS.override.md 和 docs/guitar/ 下的路线文件。当前先完成吉他部分，严格沿用已有路线；吉他之后还要继续建设其他音乐模块，不要删除或永久搁置。先执行定位测试，再从第一个未通过的关卡开始。

## 内容结构

```text
.
├── README.md
├── START_HERE.md             # 如何让 Codex 接管
├── DEPLOYMENT.md             # 当前发布状态与隐私规则
├── AGENTS.override.md        # Codex 接管规则
├── PROJECT_CONTEXT.md        # 稳定的个人背景、目标与约束
├── ROADMAP.md                # 项目阶段与学习主线
├── docs/
│   ├── BACKLOG.md            # 可执行任务队列
│   ├── CHAT_INDEX.md         # 对话来源与待补资料
│   ├── theory/README.md      # 数学物理视角乐理
│   ├── vocal/README.md       # 声乐训练
│   ├── guitar/               # 当前主线：路线、课程映射与训练计划
│   ├── harmonica/README.md   # 布鲁斯口琴
│   └── songs/README.md       # 歌曲练习与分析
├── archive/README.md         # 原始资料归档约定
└── sources/                  # 用户加入的原始资料，只读
```

## 项目原则

- 用底层模型帮助理解，但每个概念最终都要落到听觉、演奏或歌唱练习。
- 当前内容建设和学习执行优先完成吉他；完成后按项目路线继续其他模块。
- 区分“能碰到的音”“能唱出的音”和“能稳定表演的音”。
- 不高估当前吉他水平；路线要从真实起点逐步推进。
- 歌曲文档以结构、练法、和声和演唱处理为主，不保存未授权的完整歌词或乐谱。
- 新结论区分为：已确认、合理推断、待验证。
