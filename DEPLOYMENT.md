# 发布与隐私

更新时间：2026-08-25

## 当前状态

- 仓库当前只存在于本地。
- 没有配置 GitHub remote。
- 已建立 Astro + Starlight 教程站，并加入 GitHub Pages Actions 工作流。
- 本地生产构建已经成功生成 41 个页面和全文搜索索引。
- 因为尚未创建/连接 GitHub 远程仓库，也没有推送，所以当前内容**仍未发布到互联网**。

## 用户的隐私要求

用户先提出只希望自己访问，随后又要求仿照其公开摄影教程部署到 GitHub Pages。两项要求不能在普通个人 GitHub Pages 上同时满足，因此发布前必须明确选择公开性。默认策略：

1. 不启用公开 GitHub Pages。
2. 仓库保持本地；若推送 GitHub，则仓库设为 private。
3. 在确定身份验证方案前，不把个人背景、训练记录、录音或课程笔记发布为网页。
4. 远程推送已获原则授权，但在用户明确确认“接受公开网页”或改选身份验证方案前，不执行最终发布。

## 当前可发布内容

- 公开教程只从 `src/content/docs/` 构建。
- 个人 `docs/guitar/PROGRESS.md`、录音、嗓音状态和私密练习证据不进入站点内容目录。
- `recordings/`、`private-progress/` 与常见音视频格式已加入 `.gitignore`。
- 发布前仍需人工检查正文是否含不希望公开的个人信息。

## 可选访问方式

### A. 只在本机访问（默认推荐）

在本地生成或预览网站。没有公网 URL，Mac 关闭后无法访问，但隐私最简单可靠。

### B. 私有 GitHub 仓库中查看 Markdown

将仓库推送为 private，不启用 Pages。登录 GitHub 后阅读文件；它不是完整教程网站，但无需额外身份验证系统。

### C. 带身份验证的私人站点

使用支持身份验证/访问策略的托管方案，例如在 Cloudflare Access 后部署，并只允许用户自己的邮箱。实施前需要确认域名、账户、费用和恢复方案。

### D. GitHub Enterprise Cloud 私有 Pages

GitHub 官方的私有 Pages 访问控制要求由使用 Enterprise Cloud 的组织托管，通常不适合单人学习项目。

## GitHub Pages 发布步骤

1. 确认网站可以公开访问。
2. 登录 GitHub，创建目标仓库并连接为 `origin`。
3. 推送 `main` 分支。
4. 在仓库 Pages 设置中把 Source 设为 **GitHub Actions**。
5. 检查 Actions 构建成功与最终 Pages 地址。

工作流会根据实际仓库名自动生成正确的子路径，不依赖固定仓库名称。

## 禁止的“伪隐私”方案

- 仅把 GitHub 仓库设为 private，却假设 Pages 页面也自动私有。
- 在静态网页 JavaScript 中写一个前端密码；源码和内容仍可能被获取。
- 只依赖难猜 URL、`robots.txt` 或禁止搜索引擎索引。
