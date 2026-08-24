# 发布与隐私

更新时间：2026-08-25

## 当前状态

- 公开仓库：<https://github.com/bigLukeX/music-learning>
- GitHub Pages：<https://biglukex.github.io/music-learning/>
- 已建立 Astro + Starlight 教程站，并加入 GitHub Pages Actions 工作流。
- 本地与 GitHub Actions 生产构建均成功生成 41 个页面和全文搜索索引。
- 2026-08-25 已启用公开 GitHub Pages；首页及五个模块目录均完成公网 `200` 检查。

## 用户的隐私要求

用户先提出只希望自己访问，随后明确授权创建公开仓库并部署到 GitHub Pages。当前站点因此是公开网页。后续默认策略：

1. 教程正文可以公开持续更新。
2. 不把个人录音、嗓音状态、联系方式或未经筛选的学习日志加入公开站点。
3. 若以后恢复“只有自己访问”的要求，需要迁移到身份验证托管；仅把仓库改为 private 不会自动保护已发布网页。
4. 修改仓库可见性、域名或访问控制前再次确认。

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

## GitHub Pages 发布流程

1. 本地提交后推送 `main` 分支。
2. `.github/workflows/deploy.yml` 自动安装依赖并构建。
3. 构建产物上传到 GitHub Pages。
4. 等待 Actions 的 `build` 与 `deploy` 均成功。
5. 检查线上首页和模块目录。

工作流会根据实际仓库名自动生成正确的子路径，不依赖固定仓库名称。

## 禁止的“伪隐私”方案

- 仅把 GitHub 仓库设为 private，却假设 Pages 页面也自动私有。
- 在静态网页 JavaScript 中写一个前端密码；源码和内容仍可能被获取。
- 只依赖难猜 URL、`robots.txt` 或禁止搜索引擎索引。
