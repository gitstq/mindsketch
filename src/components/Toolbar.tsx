import React from 'react';
import { motion } from 'framer-motion';
import {
  MousePointer2,
  Hand,
  Square,
  Circle,
  Minus,
  Type,
  Pencil,
  Eraser,
  GitBranch,
  Workflow,
  Undo2,
  Redo2,
  Trash2,
  Copy,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize,
} from 'lucide-react';
import { useCanvasStore } from '@/stores';
import type { ToolType } from '@/types';

const tools: { type: ToolType; icon: React.ReactNode; label: string; shortcut: string }[] = [
  { type: 'select', icon: <MousePointer2 size={20} />, label: '选择', shortcut: 'V' },
  { type: 'hand', icon: <Hand size={20} />, label: '手型', shortcut: 'H' },
  { type: 'rectangle', icon: <Square size={20} />, label: '矩形', shortcut: 'R' },
  { type: 'circle', icon: <Circle size={20} />, label: '圆形', shortcut: 'C' },
  { type: 'line', icon: <Minus size={20} />, label: '线条', shortcut: 'L' },
  { type: 'text', icon: <Type size={20} />, label: '文本', shortcut: 'T' },
  { type: 'pencil', icon: <Pencil size={20} />, label: '画笔', shortcut: 'P' },
  { type: 'eraser', icon: <Eraser size={20} />, label: '橡皮', shortcut: 'E' },
  { type: 'mindmap', icon: <GitBranch size={20} />, label: '思维导图', shortcut: 'M' },
  { type: 'flowchart', icon: <Workflow size={20} />, label: '流程图', shortcut: 'F' },
];

export const Toolbar: React.FC = () => {
  const {
    currentTool,
    setTool,
    undo,
    redo,
    deleteSelected,
    duplicateSelected,
    zoom,
    zoomIn,
    zoomOut,
    resetView,
    selectedIds,
    bringToFront,
    sendToBack,
  } = useCanvasStore();

  return (
    <div className="flex flex-col gap-2 p-2 bg-white rounded-xl shadow-lg border border-gray-200">
      {/* Tools */}
      <div className="flex flex-col gap-1">
        {tools.map((tool) => (
          <motion.button
            key={tool.type}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTool(tool.type)}
            className={`toolbar-btn ${currentTool === tool.type ? 'active' : ''}`}
            title={`${tool.label} (${tool.shortcut})`}
          >
            {tool.icon}
          </motion.button>
        ))}
      </div>

      <div className="h-px bg-gray-200 my-1" />

      {/* Actions */}
      <div className="flex flex-col gap-1">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={undo}
          className="toolbar-btn"
          title="撤销 (Ctrl+Z)"
        >
          <Undo2 size={20} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={redo}
          className="toolbar-btn"
          title="重做 (Ctrl+Shift+Z)"
        >
          <Redo2 size={20} />
        </motion.button>
      </div>

      <div className="h-px bg-gray-200 my-1" />

      {/* Selection Actions */}
      <div className="flex flex-col gap-1">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={duplicateSelected}
          disabled={selectedIds.length === 0}
          className="toolbar-btn disabled:opacity-30"
          title="复制 (Ctrl+D)"
        >
          <Copy size={20} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={deleteSelected}
          disabled={selectedIds.length === 0}
          className="toolbar-btn disabled:opacity-30"
          title="删除 (Delete)"
        >
          <Trash2 size={20} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={bringToFront}
          disabled={selectedIds.length === 0}
          className="toolbar-btn disabled:opacity-30"
          title="置于顶层"
        >
          <Layers size={20} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={sendToBack}
          disabled={selectedIds.length === 0}
          className="toolbar-btn disabled:opacity-30 rotate-180"
          title="置于底层"
        >
          <Layers size={20} />
        </motion.button>
      </div>

      <div className="h-px bg-gray-200 my-1" />

      {/* Zoom */}
      <div className="flex flex-col gap-1">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={zoomIn}
          className="toolbar-btn"
          title="放大"
        >
          <ZoomIn size={20} />
        </motion.button>
        <div className="text-center text-xs text-gray-500 py-1">
          {Math.round(zoom * 100)}%
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={zoomOut}
          className="toolbar-btn"
          title="缩小"
        >
          <ZoomOut size={20} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetView}
          className="toolbar-btn"
          title="重置视图"
        >
          <Maximize size={20} />
        </motion.button>
      </div>
    </div>
  );
};
