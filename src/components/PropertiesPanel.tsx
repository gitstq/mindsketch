import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Palette, Type, Layout, Settings2 } from 'lucide-react';
import { useCanvasStore } from '@/stores';
// Component for editing properties of selected canvas objects

const colors = [
  '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
  '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1',
  '#000000', '#ffffff', '#6b7280', '#9ca3af', '#d1d5db',
];

const fontSizes = [12, 14, 16, 18, 20, 24, 28, 32];
const strokeWidths = [1, 2, 3, 4, 5, 6, 8, 10];

export const PropertiesPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedIds, objects, updateObject } = useCanvasStore();
  
  const selectedObjects = objects.filter((obj) => selectedIds.includes(obj.id));
  const hasSelection = selectedObjects.length > 0;

  // Auto open when selection changes
  useEffect(() => {
    if (hasSelection) {
      setIsOpen(true);
    }
  }, [hasSelection]);

  const handleColorChange = (color: string) => {
    selectedObjects.forEach((obj) => {
      updateObject(obj.id, { fill: color });
    });
  };

  const handleStrokeColorChange = (color: string) => {
    selectedObjects.forEach((obj) => {
      updateObject(obj.id, { stroke: color });
    });
  };

  const handleStrokeWidthChange = (width: number) => {
    selectedObjects.forEach((obj) => {
      updateObject(obj.id, { strokeWidth: width });
    });
  };

  const handleFontSizeChange = (size: number) => {
    selectedObjects.forEach((obj) => {
      if (obj.type === 'text') {
        updateObject(obj.id, { fontSize: size });
      }
    });
  };

  const handleTextChange = (text: string) => {
    selectedObjects.forEach((obj) => {
      if (obj.type === 'text') {
        updateObject(obj.id, { text });
      }
    });
  };

  if (!hasSelection) return null;

  const firstObject = selectedObjects[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed right-0 top-20 h-[calc(100vh-6rem)] w-80 bg-white shadow-xl border-l border-gray-200 z-40 overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white">
            <div className="flex items-center gap-2">
              <Settings2 size={18} className="text-gray-500" />
              <h2 className="font-semibold text-gray-900">
                属性
                {selectedObjects.length > 1 && (
                  <span className="ml-2 text-sm text-gray-500">
                    ({selectedObjects.length} 个选中)
                  </span>
                )}
              </h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={18} className="text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 space-y-6">
            {/* Fill Color */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Palette size={16} />
                填充颜色
              </div>
              <div className="grid grid-cols-5 gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorChange(color)}
                    className={`w-8 h-8 rounded-lg border-2 transition-all ${
                      firstObject.fill === color
                        ? 'border-gray-900 scale-110'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Stroke Color */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Layout size={16} />
                边框颜色
              </div>
              <div className="grid grid-cols-5 gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleStrokeColorChange(color)}
                    className={`w-8 h-8 rounded-lg border-2 transition-all ${
                      firstObject.stroke === color
                        ? 'border-gray-900 scale-110'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Stroke Width */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Layout size={16} />
                边框粗细
              </div>
              <div className="flex flex-wrap gap-2">
                {strokeWidths.map((width) => (
                  <button
                    key={width}
                    onClick={() => handleStrokeWidthChange(width)}
                    className={`px-3 py-1.5 rounded-lg border text-sm transition-all ${
                      firstObject.strokeWidth === width
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {width}px
                  </button>
                ))}
              </div>
            </div>

            {/* Text Properties */}
            {firstObject.type === 'text' && (
              <>
                <div className="h-px bg-gray-200" />
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Type size={16} />
                    文本内容
                  </div>
                  <textarea
                    value={firstObject.text || ''}
                    onChange={(e) => handleTextChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Type size={16} />
                    字体大小
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {fontSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => handleFontSizeChange(size)}
                        className={`px-3 py-1.5 rounded-lg border text-sm transition-all ${
                          firstObject.fontSize === size
                            ? 'border-blue-500 bg-blue-50 text-blue-600'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {size}px
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Position & Size */}
            <div className="h-px bg-gray-200" />
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Layout size={16} />
                位置与尺寸
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-500">X 坐标</div>
                  <div className="font-medium text-gray-900">
                    {Math.round(firstObject.x)}px
                  </div>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-500">Y 坐标</div>
                  <div className="font-medium text-gray-900">
                    {Math.round(firstObject.y)}px
                  </div>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-500">宽度</div>
                  <div className="font-medium text-gray-900">
                    {Math.round(firstObject.width)}px
                  </div>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-500">高度</div>
                  <div className="font-medium text-gray-900">
                    {Math.round(firstObject.height)}px
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
