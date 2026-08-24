# 个人音乐学习系统

这是一个从 ChatGPT“音乐”项目迁移出来、由 Codex 持续维护的个人音乐学习仓库。

项目的核心不是囤积聊天记录，而是把长期讨论沉淀为可复习、可练习、可验证、可继续扩展的知识体系。当前第一目标是**把歌唱好**；乐理、吉他、歌曲分析与布鲁斯口琴为相互支持的学习支线。

## 当前状态

- 已根据“音乐”项目中的 10 个相关聊天建立第一版上下文。
- 已整理出声乐、数学物理乐理、吉他、口琴与歌曲分析五条内容线。
- 原聊天没有整段复制进仓库；已将关键信息沉淀为结构化文档。
- `sources/` 预留给用户明确加入的原始资料，Codex 将其视为只读输入。
- Neo 课程资料、完整录音与其他附件尚未进入可携带的仓库资料。

## 从这里开始

1. 阅读 [`PROJECT_CONTEXT.md`](PROJECT_CONTEXT.md)，了解学习背景与已确认需求。
2. 阅读 [`ROADMAP.md`](ROADMAP.md)，选择当前阶段。
3. 从 [`docs/BACKLOG.md`](docs/BACKLOG.md) 领取一个小而明确的任务。
4. 新资料先登记到 [`docs/CHAT_INDEX.md`](docs/CHAT_INDEX.md)，再沉淀到对应主题文档。

交给 Codex 时可以直接说：

> 先阅读 README.md、PROJECT_CONTEXT.md、ROADMAP.md 和 AGENTS.override.md。根据 BACKLOG 选择当前最高优先级任务，先说明你依据了哪些已确认信息，再完成内容并更新进度。

## 内容结构

```text
.
├── README.md
├── AGENTS.override.md        # Codex 接管规则
├── PROJECT_CONTEXT.md        # 稳定的个人背景、目标与约束
├── ROADMAP.md                # 项目阶段与学习主线
├── docs/
│   ├── BACKLOG.md            # 可执行任务队列
│   ├── CHAT_INDEX.md         # 对话来源与待补资料
│   ├── theory/README.md      # 数学物理视角乐理
│   ├── vocal/README.md       # 声乐训练
│   ├── guitar/README.md      # 吉他学习
│   ├── harmonica/README.md   # 布鲁斯口琴
│   └── songs/README.md       # 歌曲练习与分析
├── archive/README.md         # 原始资料归档约定
└── sources/                  # 用户加入的原始资料，只读
```

## 项目原则

- 用底层模型帮助理解，但每个概念最终都要落到听觉、演奏或歌唱练习。
- 区分“能碰到的音”“能唱出的音”和“能稳定表演的音”。
- 不高估当前吉他水平；路线要从真实起点逐步推进。
- 歌曲文档以结构、练法、和声和演唱处理为主，不保存未授权的完整歌词或乐谱。
- 新结论区分为：已确认、合理推断、待验证。
