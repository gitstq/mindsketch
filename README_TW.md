<div align="center">

# 🎨 MindSketch

**AI驅動的智能白板工具 - 讓創意可視化變得簡單**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.0-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.8-purple.svg)](https://vitejs.dev/)

[简体中文](./README.md) | [English](./README_EN.md)

</div>

---

## 🎉 專案介紹

**MindSketch** 是一款現代化的AI驅動智能白板工具，專為思維導圖、流程圖和創意繪圖而設計。受 [drawnix](https://github.com/plait-board/drawnix) 啟發，我們在此基礎上進行了深度自研和創新，加入了AI智能生成、更豐富的匯出格式、更流暢的交互體驗等差異化功能。

### 💡 核心價值

- 🤖 **AI智能助手** - 通過自然語言描述，自動生成思維導圖和流程圖
- 🎯 **開箱即用** - 無需複雜配置，打開即用，零學習成本
- 🔒 **隱私優先** - 本地運行，數據完全由用戶掌控
- 🌐 **跨平台** - 基於Web技術，支持所有現代瀏覽器

### ✨ 自研差異化亮點

相比同類產品，MindSketch 的獨特優勢：

1. **AI智能生成** - 集成AI能力，一句話生成完整圖表
2. **智能佈局算法** - 自動優化節點佈局，讓圖表更美觀
3. **多格式匯出** - 支持 PNG、SVG、PDF、JSON 等多種格式
4. **現代化UI** - 採用 TailwindCSS + Framer Motion，介面流暢美觀
5. **鍵盤快捷鍵** - 完整的快捷鍵支持，提升創作效率

---

## ✨ 核心特性

### 🛠️ 繪圖工具

- **🖱️ 選擇工具** - 框選、多選、移動對象
- **✋ 手型工具** - 拖拽畫布，流暢導航
- **⬜ 矩形工具** - 繪製矩形和圓角矩形
- **⭕ 圓形工具** - 繪製圓形和橢圓
- **📏 線條工具** - 繪製直線和連接線
- **📝 文本工具** - 添加文字標註
- **✏️ 畫筆工具** - 自由手繪
- **🧹 橡皮工具** - 擦除內容

### 🧠 智能圖表

- **🌳 思維導圖** - 快速創建層級思維導圖
- **🔄 流程圖** - 繪製標準流程圖，支持多種節點類型
- **🤖 AI生成** - 自然語言描述，AI自動生成圖表結構

### 🎨 樣式編輯

- **🎨 顏色選擇** - 豐富的預設顏色，支持填充和邊框
- **📐 尺寸調整** - 精確控制對象大小和位置
- **🔤 字體設置** - 調整字體大小和樣式
- **📤 層級管理** - 置頂、置底、調整對象層級

### 💾 匯入匯出

- **📥 匯入** - 支持 JSON 格式專案檔案
- **📤 匯出 PNG** - 高質量位圖，適合分享
- **📤 匯出 SVG** - 矢量格式，無限縮放
- **📤 匯出 PDF** - 文檔格式，適合列印
- **📤 匯出 JSON** - 源檔案格式，可重新編輯

### ⚡ 交互體驗

- **🔍 縮放和平移** - 流暢的縮放和平移操作
- **↩️ 撤銷重做** - 支持歷史記錄，無限撤銷
- **⌨️ 快捷鍵** - 完整的鍵盤快捷鍵支持
- **📱 響應式設計** - 適配不同螢幕尺寸

---

## 🚀 快速開始

### 環境要求

- Node.js >= 18.0.0
- npm >= 9.0.0 或 yarn >= 1.22.0

### 安裝步驟

```bash
# 克隆倉庫
git clone https://github.com/gitstq/mindsketch.git

# 進入專案目錄
cd mindsketch

# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev
```

### 構建生產版本

```bash
# 構建生產版本
npm run build

# 預覽生產構建
npm run preview
```

---

## 📖 詳細使用指南

### 🎯 基礎操作

#### 創建圖形

1. 從左側工具欄選擇繪圖工具（矩形、圓形、線條等）
2. 在畫布上拖拽創建圖形
3. 選中的圖形會顯示控制點，可調整大小和位置

#### 編輯文本

1. 選擇文本工具（快捷鍵 `T`）
2. 在畫布上點擊創建文本框
3. 在右側屬性面板編輯文本內容和樣式

#### 使用AI生成

1. 點擊右上角的 **"AI 助手"** 按鈕
2. 選擇生成模式（思維導圖或流程圖）
3. 輸入描述，例如：
   - *"幫我創建一個關於人工智能應用的思維導圖"*
   - *"繪製一個用戶登錄流程圖"*
4. 點擊生成按鈕，AI會自動創建圖表

### 🧠 思維導圖

#### 創建思維導圖

1. 選擇思維導圖工具（快捷鍵 `M`）
2. 點擊畫布創建根節點
3. 選中節點後按 `Tab` 鍵創建子節點
4. 按 `Enter` 鍵創建同級節點

#### 使用AI生成思維導圖

```
專案規劃
  需求分析
    用戶調研
    競品分析
  設計階段
    原型設計
    UI設計
  開發階段
    前端開發
    後端開發
  測試上線
```

### 🔄 流程圖

#### 創建流程圖

1. 選擇流程圖工具（快捷鍵 `F`）
2. 從左側工具欄選擇節點類型：
   - 🟢 **開始/結束** - 橢圓形，表示流程起點和終點
   - 🔵 **處理** - 矩形，表示處理步驟
   - 🟡 **判斷** - 菱形，表示條件判斷
   - 🟣 **輸入/輸出** - 平行四邊形，表示數據輸入輸出

#### 連接節點

1. 選擇線條工具（快捷鍵 `L`）
2. 從一個節點拖拽到另一個節點創建連接線

### ⌨️ 快捷鍵

| 快捷鍵 | 功能 |
|--------|------|
| `V` | 選擇工具 |
| `H` | 手型工具 |
| `R` | 矩形工具 |
| `C` | 圓形工具 |
| `L` | 線條工具 |
| `T` | 文本工具 |
| `P` | 畫筆工具 |
| `E` | 橡皮工具 |
| `M` | 思維導圖工具 |
| `F` | 流程圖工具 |
| `Ctrl + Z` | 撤銷 |
| `Ctrl + Shift + Z` | 重做 |
| `Ctrl + D` | 複製選中 |
| `Delete` | 刪除選中 |
| `Esc` | 取消選擇 |

---

## 💡 設計思路與迭代規劃

### 🎯 設計理念

MindSketch 的設計遵循以下原則：

1. **簡潔至上** - 介面簡潔，功能直觀，降低用戶學習成本
2. **效率優先** - 豐富的快捷鍵和智能功能，提升創作效率
3. **可擴展性** - 插件化架構，便於功能擴展和定製
4. **現代化** - 採用最新前端技術棧，保證性能和體驗

### 🛠️ 技術選型

| 技術 | 選擇理由 |
|------|----------|
| **React 18** | 成熟穩定的UI框架，生態豐富 |
| **TypeScript** | 類型安全，提升代碼質量和開發體驗 |
| **Vite** | 快速的構建工具，支持熱更新 |
| **TailwindCSS** | 原子化CSS，快速構建美觀介面 |
| **Zustand** | 輕量級狀態管理，簡單易用 |
| **Framer Motion** | 流暢的動畫效果，提升用戶體驗 |

### 📅 後續迭代計劃

#### v1.1.0 (計劃中)
- [ ] 實時協作功能 - 多人在線編輯
- [ ] 更多圖形類型 - 箭頭、星形、自定義形狀
- [ ] 模板庫 - 預設模板快速開始

#### v1.2.0 (計劃中)
- [ ] 語音輸入 - 語音轉圖表
- [ ] 圖片匯入 - 支持匯入圖片作為背景或素材
- [ ] 插件系統 - 支持第三方插件擴展

#### v2.0.0 (規劃中)
- [ ] 雲端同步 - 專案雲端存儲和同步
- [ ] 移動端App - iOS和Android原生應用
- [ ] 團隊版 - 團隊管理和權限控制

---

## 📦 打包與部署

### 構建命令

```bash
# 安裝依賴
npm install

# 開發模式
npm run dev

# 生產構建
npm run build

# 代碼檢查
npm run lint

# 運行測試
npm run test
```

### 部署方式

#### 靜態託管

構建完成後，`dist` 目錄包含所有靜態檔案，可以部署到任何靜態託管服務：

- **Vercel** - `vercel --prod`
- **Netlify** - 拖拽 `dist` 文件夾到 Netlify
- **GitHub Pages** - 使用 `gh-pages` 分支
- **Nginx** - 配置 `root` 指向 `dist` 目錄

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

## 🤝 貢獻指南

我們歡迎所有形式的貢獻！

### 提交 Issue

- 使用清晰的標題描述問題
- 提供詳細的復現步驟
- 附上截圖或錄屏（如適用）
- 說明期望的行為和實際行為

### 提交 Pull Request

1. Fork 本倉庫
2. 創建功能分支：`git checkout -b feature/amazing-feature`
3. 提交更改：`git commit -m 'feat: add amazing feature'`
4. 推送分支：`git push origin feature/amazing-feature`
5. 創建 Pull Request

### 代碼規範

- 使用 TypeScript 編寫代碼
- 遵循 ESLint 配置
- 提交信息遵循 [Conventional Commits](https://conventionalcommits.org/) 規範
- 保持代碼簡潔，添加必要的註釋

---

## 📄 開源協議

本專案採用 [MIT 協議](LICENSE) 開源。

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

## 🙏 致謝

- 靈感來源於 [drawnix](https://github.com/plait-board/drawnix) 專案
- 感謝 [React](https://reactjs.org/)、[Vite](https://vitejs.dev/)、[TailwindCSS](https://tailwindcss.com/) 等優秀開源專案
- 感謝所有貢獻者和用戶的支持

---

<div align="center">

**Made with ❤️ by gitstq**

[⭐ Star this repo](https://github.com/gitstq/mindsketch) | [🐛 Report Bug](https://github.com/gitstq/mindsketch/issues) | [💡 Request Feature](https://github.com/gitstq/mindsketch/issues)

</div>
