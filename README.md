<div align="center">

# 🎨 MindSketch

**AI驱动的智能白板工具 - 让创意可视化变得简单**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.0-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.8-purple.svg)](https://vitejs.dev/)

[English](./README_EN.md) | [繁體中文](./README_TW.md)

</div>

---

## 🎉 项目介绍

**MindSketch** 是一款现代化的AI驱动智能白板工具，专为思维导图、流程图和创意绘图而设计。受 [drawnix](https://github.com/plait-board/drawnix) 启发，我们在此基础上进行了深度自研和创新，加入了AI智能生成、更丰富的导出格式、更流畅的交互体验等差异化功能。

### 💡 核心价值

- 🤖 **AI智能助手** - 通过自然语言描述，自动生成思维导图和流程图
- 🎯 **开箱即用** - 无需复杂配置，打开即用，零学习成本
- 🔒 **隐私优先** - 本地运行，数据完全由用户掌控
- 🌐 **跨平台** - 基于Web技术，支持所有现代浏览器

### ✨ 自研差异化亮点

相比同类产品，MindSketch 的独特优势：

1. **AI智能生成** - 集成AI能力，一句话生成完整图表
2. **智能布局算法** - 自动优化节点布局，让图表更美观
3. **多格式导出** - 支持 PNG、SVG、PDF、JSON 等多种格式
4. **现代化UI** - 采用 TailwindCSS + Framer Motion，界面流畅美观
5. **键盘快捷键** - 完整的快捷键支持，提升创作效率

---

## ✨ 核心特性

### 🛠️ 绘图工具

- **🖱️ 选择工具** - 框选、多选、移动对象
- **✋ 手型工具** - 拖拽画布，流畅导航
- **⬜ 矩形工具** - 绘制矩形和圆角矩形
- **⭕ 圆形工具** - 绘制圆形和椭圆
- **📏 线条工具** - 绘制直线和连接线
- **📝 文本工具** - 添加文字标注
- **✏️ 画笔工具** - 自由手绘
- **🧹 橡皮工具** - 擦除内容

### 🧠 智能图表

- **🌳 思维导图** - 快速创建层级思维导图
- **🔄 流程图** - 绘制标准流程图，支持多种节点类型
- **🤖 AI生成** - 自然语言描述，AI自动生成图表结构

### 🎨 样式编辑

- **🎨 颜色选择** - 丰富的预设颜色，支持填充和边框
- **📐 尺寸调整** - 精确控制对象大小和位置
- **🔤 字体设置** - 调整字体大小和样式
- **📤 层级管理** - 置顶、置底、调整对象层级

### 💾 导入导出

- **📥 导入** - 支持 JSON 格式项目文件
- **📤 导出 PNG** - 高质量位图，适合分享
- **📤 导出 SVG** - 矢量格式，无限缩放
- **📤 导出 PDF** - 文档格式，适合打印
- **📤 导出 JSON** - 源文件格式，可重新编辑

### ⚡ 交互体验

- **🔍 缩放和平移** - 流畅的缩放和平移操作
- **↩️ 撤销重做** - 支持历史记录，无限撤销
- **⌨️ 快捷键** - 完整的键盘快捷键支持
- **📱 响应式设计** - 适配不同屏幕尺寸

---

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0 或 yarn >= 1.22.0

### 安装步骤

```bash
# 克隆仓库
git clone https://github.com/gitstq/mindsketch.git

# 进入项目目录
cd mindsketch

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 构建生产版本

```bash
# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

---

## 📖 详细使用指南

### 🎯 基础操作

#### 创建图形

1. 从左侧工具栏选择绘图工具（矩形、圆形、线条等）
2. 在画布上拖拽创建图形
3. 选中的图形会显示控制点，可调整大小和位置

#### 编辑文本

1. 选择文本工具（快捷键 `T`）
2. 在画布上点击创建文本框
3. 在右侧属性面板编辑文本内容和样式

#### 使用AI生成

1. 点击右上角的 **"AI 助手"** 按钮
2. 选择生成模式（思维导图或流程图）
3. 输入描述，例如：
   - *"帮我创建一个关于人工智能应用的思维导图"*
   - *"绘制一个用户登录流程图"*
4. 点击生成按钮，AI会自动创建图表

### 🧠 思维导图

#### 创建思维导图

1. 选择思维导图工具（快捷键 `M`）
2. 点击画布创建根节点
3. 选中节点后按 `Tab` 键创建子节点
4. 按 `Enter` 键创建同级节点

#### 使用AI生成思维导图

```
项目规划
  需求分析
    用户调研
    竞品分析
  设计阶段
    原型设计
    UI设计
  开发阶段
    前端开发
    后端开发
  测试上线
```

### 🔄 流程图

#### 创建流程图

1. 选择流程图工具（快捷键 `F`）
2. 从左侧工具栏选择节点类型：
   - 🟢 **开始/结束** - 椭圆形，表示流程起点和终点
   - 🔵 **处理** - 矩形，表示处理步骤
   - 🟡 **判断** - 菱形，表示条件判断
   - 🟣 **输入/输出** - 平行四边形，表示数据输入输出

#### 连接节点

1. 选择线条工具（快捷键 `L`）
2. 从一个节点拖拽到另一个节点创建连接线

### ⌨️ 快捷键

| 快捷键 | 功能 |
|--------|------|
| `V` | 选择工具 |
| `H` | 手型工具 |
| `R` | 矩形工具 |
| `C` | 圆形工具 |
| `L` | 线条工具 |
| `T` | 文本工具 |
| `P` | 画笔工具 |
| `E` | 橡皮工具 |
| `M` | 思维导图工具 |
| `F` | 流程图工具 |
| `Ctrl + Z` | 撤销 |
| `Ctrl + Shift + Z` | 重做 |
| `Ctrl + D` | 复制选中 |
| `Delete` | 删除选中 |
| `Esc` | 取消选择 |

---

## 💡 设计思路与迭代规划

### 🎯 设计理念

MindSketch 的设计遵循以下原则：

1. **简洁至上** - 界面简洁，功能直观，降低用户学习成本
2. **效率优先** - 丰富的快捷键和智能功能，提升创作效率
3. **可扩展性** - 插件化架构，便于功能扩展和定制
4. **现代化** - 采用最新前端技术栈，保证性能和体验

### 🛠️ 技术选型

| 技术 | 选择理由 |
|------|----------|
| **React 18** | 成熟稳定的UI框架，生态丰富 |
| **TypeScript** | 类型安全，提升代码质量和开发体验 |
| **Vite** | 快速的构建工具，支持热更新 |
| **TailwindCSS** | 原子化CSS，快速构建美观界面 |
| **Zustand** | 轻量级状态管理，简单易用 |
| **Framer Motion** | 流畅的动画效果，提升用户体验 |

### 📅 后续迭代计划

#### v1.1.0 (计划中)
- [ ] 实时协作功能 - 多人在线编辑
- [ ] 更多图形类型 - 箭头、星形、自定义形状
- [ ] 模板库 - 预设模板快速开始

#### v1.2.0 (计划中)
- [ ] 语音输入 - 语音转图表
- [ ] 图片导入 - 支持导入图片作为背景或素材
- [ ] 插件系统 - 支持第三方插件扩展

#### v2.0.0 (规划中)
- [ ] 云端同步 - 项目云端存储和同步
- [ ] 移动端App - iOS和Android原生应用
- [ ] 团队版 - 团队管理和权限控制

---

## 📦 打包与部署

### 构建命令

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 生产构建
npm run build

# 代码检查
npm run lint

# 运行测试
npm run test
```

### 部署方式

#### 静态托管

构建完成后，`dist` 目录包含所有静态文件，可以部署到任何静态托管服务：

- **Vercel** - `vercel --prod`
- **Netlify** - 拖拽 `dist` 文件夹到 Netlify
- **GitHub Pages** - 使用 `gh-pages` 分支
- **Nginx** - 配置 `root` 指向 `dist` 目录

#### Docker 部署

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
```

---

## 🤝 贡献指南

我们欢迎所有形式的贡献！

### 提交 Issue

- 使用清晰的标题描述问题
- 提供详细的复现步骤
- 附上截图或录屏（如适用）
- 说明期望的行为和实际行为

### 提交 Pull Request

1. Fork 本仓库
2. 创建功能分支：`git checkout -b feature/amazing-feature`
3. 提交更改：`git commit -m 'feat: add amazing feature'`
4. 推送分支：`git push origin feature/amazing-feature`
5. 创建 Pull Request

### 代码规范

- 使用 TypeScript 编写代码
- 遵循 ESLint 配置
- 提交信息遵循 [Conventional Commits](https://conventionalcommits.org/) 规范
- 保持代码简洁，添加必要的注释

---

## 📄 开源协议

本项目采用 [MIT 协议](LICENSE) 开源。

```
MIT License

Copyright (c) 2026 gitstq

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 🙏 致谢

- 灵感来源于 [drawnix](https://github.com/plait-board/drawnix) 项目
- 感谢 [React](https://reactjs.org/)、[Vite](https://vitejs.dev/)、[TailwindCSS](https://tailwindcss.com/) 等优秀开源项目
- 感谢所有贡献者和用户的支持

---

<div align="center">

**Made with ❤️ by gitstq**

[⭐ Star this repo](https://github.com/gitstq/mindsketch) | [🐛 Report Bug](https://github.com/gitstq/mindsketch/issues) | [💡 Request Feature](https://github.com/gitstq/mindsketch/issues)

</div>
