# 发布与隐私

更新时间：2026-08-24

## 当前状态

- 仓库只存在于本地，并已打包为本地 ZIP。
- 没有配置 GitHub remote。
- 没有 GitHub Pages 分支、`CNAME`、Jekyll/VitePress 构建配置或 Pages Actions 工作流。
- 因此当前内容**没有发布到互联网**。

## 用户的隐私要求

用户只希望自己访问页面，不希望公开给其他人。默认策略：

1. 不启用公开 GitHub Pages。
2. 仓库保持本地；若推送 GitHub，则仓库设为 private。
3. 在确定身份验证方案前，不把个人背景、训练记录、录音或课程笔记发布为网页。
4. 任何部署、远程推送或访问权限变更都必须先获得用户确认。

## 可选访问方式

### A. 只在本机访问（默认推荐）

在本地生成或预览网站。没有公网 URL，Mac 关闭后无法访问，但隐私最简单可靠。

### B. 私有 GitHub 仓库中查看 Markdown

将仓库推送为 private，不启用 Pages。登录 GitHub 后阅读文件；它不是完整教程网站，但无需额外身份验证系统。

### C. 带身份验证的私人站点

使用支持身份验证/访问策略的托管方案，例如在 Cloudflare Access 后部署，并只允许用户自己的邮箱。实施前需要确认域名、账户、费用和恢复方案。

### D. GitHub Enterprise Cloud 私有 Pages

GitHub 官方的私有 Pages 访问控制要求由使用 Enterprise Cloud 的组织托管，通常不适合单人学习项目。

## 禁止的“伪隐私”方案

- 仅把 GitHub 仓库设为 private，却假设 Pages 页面也自动私有。
- 在静态网页 JavaScript 中写一个前端密码；源码和内容仍可能被获取。
- 只依赖难猜 URL、`robots.txt` 或禁止搜索引擎索引。

