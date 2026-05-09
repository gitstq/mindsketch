<div align="center">

# 🎨 MindSketch

**AI-Powered Intelligent Whiteboard - Making Visual Creativity Simple**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.0-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.8-purple.svg)](https://vitejs.dev/)

[简体中文](./README.md) | [繁體中文](./README_TW.md)

</div>

---

## 🎉 Introduction

**MindSketch** is a modern AI-powered intelligent whiteboard tool designed for mind mapping, flowcharts, and creative drawing. Inspired by [drawnix](https://github.com/plait-board/drawnix), we've built upon it with deep independent research and innovation, adding AI smart generation, richer export formats, and smoother interaction experiences.

### 💡 Core Values

- 🤖 **AI Smart Assistant** - Automatically generate mind maps and flowcharts from natural language descriptions
- 🎯 **Ready to Use** - No complex configuration needed, open and use immediately with zero learning curve
- 🔒 **Privacy First** - Runs locally, data is completely controlled by the user
- 🌐 **Cross-Platform** - Based on web technology, supports all modern browsers

### ✨ Differentiation Highlights

Compared to similar products, MindSketch's unique advantages:

1. **AI Smart Generation** - Integrated AI capabilities, generate complete charts with one sentence
2. **Smart Layout Algorithm** - Automatically optimize node layout for more beautiful charts
3. **Multi-Format Export** - Support PNG, SVG, PDF, JSON and other formats
4. **Modern UI** - Using TailwindCSS + Framer Motion for smooth and beautiful interface
5. **Keyboard Shortcuts** - Complete shortcut support to improve creation efficiency

---

## ✨ Key Features

### 🛠️ Drawing Tools

- **🖱️ Select Tool** - Box selection, multi-selection, move objects
- **✋ Hand Tool** - Drag canvas for smooth navigation
- **⬜ Rectangle Tool** - Draw rectangles and rounded rectangles
- **⭕ Circle Tool** - Draw circles and ellipses
- **📏 Line Tool** - Draw straight lines and connectors
- **📝 Text Tool** - Add text annotations
- **✏️ Pencil Tool** - Freehand drawing
- **🧹 Eraser Tool** - Erase content

### 🧠 Smart Charts

- **🌳 Mind Map** - Quickly create hierarchical mind maps
- **🔄 Flowchart** - Draw standard flowcharts with multiple node types
- **🤖 AI Generation** - Natural language description, AI automatically generates chart structure

### 🎨 Style Editing

- **🎨 Color Selection** - Rich preset colors, support fill and border
- **📐 Size Adjustment** - Precise control of object size and position
- **🔤 Font Settings** - Adjust font size and style
- **📤 Layer Management** - Bring to front, send to back, adjust object layers

### 💾 Import & Export

- **📥 Import** - Support JSON format project files
- **📤 Export PNG** - High-quality bitmap, suitable for sharing
- **📤 Export SVG** - Vector format, infinite scaling
- **📤 Export PDF** - Document format, suitable for printing
- **📤 Export JSON** - Source file format, editable again

### ⚡ Interaction Experience

- **🔍 Zoom & Pan** - Smooth zoom and pan operations
- **↩️ Undo & Redo** - Support history, unlimited undo
- **⌨️ Shortcuts** - Complete keyboard shortcut support
- **📱 Responsive Design** - Adapt to different screen sizes

---

## 🚀 Quick Start

### Requirements

- Node.js >= 18.0.0
- npm >= 9.0.0 or yarn >= 1.22.0

### Installation

```bash
# Clone the repository
git clone https://github.com/gitstq/mindsketch.git

# Enter project directory
cd mindsketch

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📖 Detailed Usage Guide

### 🎯 Basic Operations

#### Creating Shapes

1. Select drawing tool from left toolbar (rectangle, circle, line, etc.)
2. Drag on canvas to create shapes
3. Selected shapes show control points for resizing and positioning

#### Editing Text

1. Select text tool (shortcut `T`)
2. Click on canvas to create text box
3. Edit text content and style in right properties panel

#### Using AI Generation

1. Click **"AI Assistant"** button in top right
2. Select generation mode (mind map or flowchart)
3. Enter description, e.g.:
   - *"Help me create a mind map about AI applications"*
   - *"Draw a user login flowchart"*
4. Click generate button, AI will automatically create the chart

### 🧠 Mind Maps

#### Creating Mind Maps

1. Select mind map tool (shortcut `M`)
2. Click canvas to create root node
3. Press `Tab` to create child node when node is selected
4. Press `Enter` to create sibling node

#### Using AI to Generate Mind Maps

```
Project Planning
  Requirements Analysis
    User Research
    Competitor Analysis
  Design Phase
    Prototype Design
    UI Design
  Development Phase
    Frontend Development
    Backend Development
  Testing & Launch
```

### 🔄 Flowcharts

#### Creating Flowcharts

1. Select flowchart tool (shortcut `F`)
2. Select node type from left toolbar:
   - 🟢 **Start/End** - Oval, represents start and end points
   - 🔵 **Process** - Rectangle, represents processing steps
   - 🟡 **Decision** - Diamond, represents conditional decisions
   - 🟣 **Input/Output** - Parallelogram, represents data input/output

#### Connecting Nodes

1. Select line tool (shortcut `L`)
2. Drag from one node to another to create connection line

### ⌨️ Keyboard Shortcuts

| Shortcut | Function |
|----------|----------|
| `V` | Select Tool |
| `H` | Hand Tool |
| `R` | Rectangle Tool |
| `C` | Circle Tool |
| `L` | Line Tool |
| `T` | Text Tool |
| `P` | Pencil Tool |
| `E` | Eraser Tool |
| `M` | Mind Map Tool |
| `F` | Flowchart Tool |
| `Ctrl + Z` | Undo |
| `Ctrl + Shift + Z` | Redo |
| `Ctrl + D` | Duplicate Selection |
| `Delete` | Delete Selection |
| `Esc` | Deselect |

---

## 💡 Design Philosophy & Roadmap

### 🎯 Design Principles

MindSketch follows these principles:

1. **Simplicity First** - Clean interface, intuitive functions, low learning curve
2. **Efficiency Priority** - Rich shortcuts and smart features to improve creation efficiency
3. **Extensibility** - Plugin architecture for easy feature expansion and customization
4. **Modernization** - Latest frontend tech stack for performance and experience

### 🛠️ Technology Stack

| Technology | Reason |
|------------|--------|
| **React 18** | Mature and stable UI framework with rich ecosystem |
| **TypeScript** | Type safety, improved code quality and development experience |
| **Vite** | Fast build tool with hot reload support |
| **TailwindCSS** | Atomic CSS for quickly building beautiful interfaces |
| **Zustand** | Lightweight state management, simple and easy to use |
| **Framer Motion** | Smooth animation effects to enhance user experience |

### 📅 Future Roadmap

#### v1.1.0 (Planned)
- [ ] Real-time collaboration - Multiplayer online editing
- [ ] More shape types - Arrows, stars, custom shapes
- [ ] Template library - Preset templates for quick start

#### v1.2.0 (Planned)
- [ ] Voice input - Voice to chart conversion
- [ ] Image import - Support importing images as background or assets
- [ ] Plugin system - Support third-party plugin extensions

#### v2.0.0 (In Planning)
- [ ] Cloud sync - Project cloud storage and sync
- [ ] Mobile App - iOS and Android native apps
- [ ] Team Edition - Team management and permission control

---

## 📦 Build & Deploy

### Build Commands

```bash
# Install dependencies
npm install

# Development mode
npm run dev

# Production build
npm run build

# Lint code
npm run lint

# Run tests
npm run test
```

### Deployment Methods

#### Static Hosting

After building, the `dist` directory contains all static files and can be deployed to any static hosting service:

- **Vercel** - `vercel --prod`
- **Netlify** - Drag `dist` folder to Netlify
- **GitHub Pages** - Use `gh-pages` branch
- **Nginx** - Configure `root` to point to `dist` directory

#### Docker Deployment

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

## 🤝 Contributing

We welcome all forms of contributions!

### Submitting Issues

- Use clear titles to describe problems
- Provide detailed reproduction steps
- Attach screenshots or recordings (if applicable)
- Describe expected vs actual behavior

### Submitting Pull Requests

1. Fork this repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'feat: add amazing feature'`
4. Push branch: `git push origin feature/amazing-feature`
5. Create Pull Request

### Code Standards

- Write code in TypeScript
- Follow ESLint configuration
- Commit messages follow [Conventional Commits](https://conventionalcommits.org/) specification
- Keep code clean, add necessary comments

---

## 📄 License

This project is open source under the [MIT License](LICENSE).

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

## 🙏 Acknowledgments

- Inspired by [drawnix](https://github.com/plait-board/drawnix) project
- Thanks to excellent open source projects like [React](https://reactjs.org/), [Vite](https://vitejs.dev/), [TailwindCSS](https://tailwindcss.com/)
- Thanks to all contributors and users for their support

---

<div align="center">

**Made with ❤️ by gitstq**

[⭐ Star this repo](https://github.com/gitstq/mindsketch) | [🐛 Report Bug](https://github.com/gitstq/mindsketch/issues) | [💡 Request Feature](https://github.com/gitstq/mindsketch/issues)

</div>
