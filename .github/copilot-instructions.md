# Workspace Instructions

## Markdown 文档生成工作流

每当你（Copilot）生成 Markdown 文档，必须严格按以下流程执行，不得跳过：

### 步骤

1. **按模块保存 Markdown**：根据下方模块映射表，将 `.md` 文件写入对应子目录
2. **执行转换流水线**（在 workspace 根目录执行）：
   ```bash
   bash tools/md_to_pdf.sh docs/<module>/<name>.md
   ```
   该脚本自动完成：`md → docx（中间文件）→ pdf`，并删除 `.docx`
3. **确认**：验证 `pdfdocs/<module>/<name>.pdf` 已生成，再向用户报告完成

### 模块 → 子目录映射

| 涉及模块 | Markdown 路径 | PDF 输出路径 |
|---------|--------------|-------------|
| backend（Dart 服务端） | `docs/backend/<name>.md` | `pdfdocs/backend/<name>.pdf` |
| frontend（Flutter 客户端） | `docs/frontend/<name>.md` | `pdfdocs/frontend/<name>.pdf` |
| ibookjoy.com | `docs/ibookjoy/<name>.md` | `pdfdocs/ibookjoy/<name>.pdf` |
| sangogame.com | `docs/sangogame/<name>.md` | `pdfdocs/sangogame/<name>.pdf` |
| ycwithyou.com | `docs/ycwithyou/<name>.md` | `pdfdocs/ycwithyou/<name>.pdf` |
| 跨模块 / 通用 | `docs/<name>.md` | `pdfdocs/<name>.pdf` |

### 路径规范

| 类型 | 目录 |
|------|------|
| Markdown 源文件 | `docs/<module>/` 或 `docs/` |
| 中间 Word 文件 | 与 md 同目录（脚本自动删除） |
| 最终 PDF 输出 | `pdfdocs/<module>/`（自动镜像 docs 子目录结构） |

### 注意

- 不要手动调用 `md2word.py` 或 `docx2pdf.py`，统一使用 `tools/md_to_pdf.sh`
- 如果 `pdfdocs/` 目录不存在，脚本会自动创建
- 批量生成时支持 `bash tools/md_to_pdf.sh docs/<module>/*.md`

---

## Frontend UI 页面开发规范

在 `frontend/` 目录下创建或修改任何 UI 页面、组件时，必须严格遵循 `frontend/lib/app/theme/THEME_GUIDE.md` 中的主题系统规范。

### 颜色

- 必须使用 `Theme.of(context).colorScheme.*`，禁止硬编码颜色值（如 `Color(0xFF2196F3)`）

### 文字样式

- 必须使用 `Theme.of(context).textTheme.*` 预定义样式
- 如需微调，使用 `.copyWith()` 在主题样式基础上修改
- 禁止直接指定 `fontFamily`（特殊情况使用 `AppFonts` 常量）

### 组件

- AppBar、Card、Button、TextField 等组件直接使用，不得重复设置主题已配置的属性（如圆角、颜色、间距）

### 禁止行为

- 禁止硬编码字体：`TextStyle(fontFamily: 'PingFang SC')` ❌
- 禁止硬编码颜色：`color: Color(0xFF...)` ❌
- 禁止在组件上重复设置主题已统一管理的样式 ❌
