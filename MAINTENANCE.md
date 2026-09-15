# 跨设备接管与维护

这份文件回答一个问题：在没有原聊天、没有原电脑缓存的情况下，只拉取 Git 仓库，怎样继续维护而不走偏。

## 新设备验收

环境要求：Git、Node.js `22.19` 或更新的 Node 22、npm。

```bash
git clone git@github.com:bigLukeX/music-learning.git
cd music-learning
npm ci
npm run build
npm run dev
```

生产构建应生成教程页面与 Pagefind 搜索索引。若构建失败，先检查 Node 版本与 `package-lock.json`，不要用删除锁文件来掩盖依赖问题。

## 唯一事实来源

| 内容 | 唯一事实来源 | 说明 |
|---|---|---|
| 稳定个人背景、目标、约束 | `PROJECT_CONTEXT.md` | 只写用户已确认且长期有效的信息 |
| 项目顺序与模块优先级 | `ROADMAP.md` | 吉他是当前学习主线，但不是唯一模块 |
| 吉他完整能力路线 | `docs/guitar/ROADMAP.md` | 不用新体系替换 |
| 吉他当前关卡和证据 | `docs/guitar/PROGRESS.md` | 只能根据真实练习结果更新 |
| NeoMusic 对应关系 | `docs/guitar/NEO_COURSE_MAP.md` | 只做能力映射，不复制课程正文 |
| 公开教程正文 | `src/content/docs/` | 网页讲解和公开练习以这里为准 |
| 待办与完成记录 | `docs/BACKLOG.md` | 任务完成后移入 Completed |
| 原聊天与资料覆盖范围 | `docs/CHAT_INDEX.md` | 不在索引中的旧聊天内容不可凭空引用 |
| 发布状态和隐私 | `DEPLOYMENT.md` | 发布前重新确认访问范围 |

`docs/` 与 `src/content/docs/` 的重叠不是两份同权正文：前者决定个人路线、状态和证据；后者决定公开课程如何讲解。若两者冲突，先修正个人事实来源，再同步公开页面中受影响的路线描述。

## 内容更新流程

1. 先确认这次修改属于个人状态、课程正文还是原始资料。
2. 原始资料只进入 `sources/`，并保持只读；受版权保护内容不搬进公开教程。
3. 新课程页至少包含：学习目标、底层模型、可执行练习、常见错误、通关标准。
4. 对具体歌曲、录音版本、调性、速度和课程编号标注“已确认 / 合理推断 / 待验证”。
5. 中文加粗标签必须写成 `**标签：** 正文`，结束标记后留一个空格；`**标签：**正文` 会被当前 MDX 解析器原样输出星号。
6. 结构改变后同步 `astro.config.mjs` 侧边栏和 `src/content/docs/course-outline.mdx`。
7. 运行 `npm test`、`npm run build`、`npm run check:links`，确认音频计划/取消回归、全部页面和搜索索引。模拟 Pages 时用 `GITHUB_ACTIONS=true GITHUB_REPOSITORY=bigLukeX/music-learning npm run build`，随后 `TEST_BASE=/music-learning/ npm run check:links`；工作流也执行这些检查。
8. 检查 `git diff`，确保没有录音、联系方式、私密进度或临时文件。

## 发布边界

- GitHub Pages 只发布 `src/content/docs/` 构建出的静态站点。
- `PROJECT_CONTEXT.md` 与 `docs/guitar/PROGRESS.md` 不会出现在教程导航，但若仓库公开，它们仍能在 GitHub 上被看到。
- `recordings/`、`private-progress/` 和音视频文件默认不进入 Git。
- 当前站点公开；更改仓库可见性、托管服务或访问控制前必须再次得到用户确认。

## 接管后的第一句话

新的 Codex 应能准确复述：当前个人学习停在吉他定位练习 A；课程网站可以继续扩写所有模块，但不能据此跳过个人学习关卡。

## 音源与共享交互

`src/lib/listening-materials.mjs` 是原创 E2-v1、E4-v1、CASE8-v1 的音高/拍值来源，听觉实验和答案共用它。更改材料时同步页面中的固定答案、时长、版本 ID 与回归测试，不把商业歌曲音频或 Neo 原谱放入这个文件。

`AccessibleMenuToggle.astro` 只同步当前 Starlight 移动菜单按钮的辅助技术状态；样式、焦点和 Esc 仍由框架组件处理。升级依赖时复核该适配是否仍需要，不直接改 `node_modules`。
