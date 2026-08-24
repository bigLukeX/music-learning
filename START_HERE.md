# 让 Codex 接管：下一步怎么做

## 最简单的做法（Codex 桌面应用）

1. 从 GitHub 拉取 `bigLukeX/music-learning`；也可以解压已有的完整仓库压缩包。
2. 按 [`MAINTENANCE.md`](MAINTENANCE.md) 完成 `npm ci` 与 `npm run build` 验收。
3. 在 Codex 中选择“打开文件夹 / 添加本地项目”，选择 **`music-learning` 文件夹本身**，不要只打开某个 Markdown 文件。
4. 确认项目入口能看到 `.git`、`README.md`、`AGENTS.override.md` 和 `docs/`。
5. 在这个本地项目中新建任务，发送下面的接管提示。

> 接管这个仓库。先读 README.md、PROJECT_CONTEXT.md、ROADMAP.md、AGENTS.override.md，以及 docs/guitar/ 下的四份核心文件。当前先完成吉他部分，严格沿用已有路线；吉他完成后还要继续建设其他音乐模块。先带我完成 NEXT_8_WEEKS.md 的定位练习 A；根据结果更新 PROGRESS.md，不要直接跳到后面的高级内容。

这一步完成后，不需要每次重新粘贴旧聊天。Codex 会从仓库文件恢复稳定上下文；新的任务只需说明这次要完成的具体结果。

## 以后怎么开任务

一个任务只处理一个明确结果，例如：

- “带我完成第 1 周第 1 次练习，并记录结果。”
- “根据我的录音复盘右手节奏，只更新进度和下一次练习。”
- “把 NeoMusic 今天这节课映射到四条基础线，生成 20 分钟巩固练习。”
- “陪我扒这两小节 riff，先听节奏，再找音高。”

## Codex 如何算真正接管

- 它的工作目录是 `music-learning` Git 仓库。
- 开始任务时能复述当前阶段和第一个未通过关卡。
- 完成任务后更新 `PROGRESS.md` 或相关知识页。
- 变化通过 Git 提交保存，而不是只留在聊天里。

## 命令行方式（可选）

若使用 Codex CLI，从仓库目录启动，或用 `codex -C <music-learning 的路径>` 指定项目目录。桌面应用用户不需要这一步。
