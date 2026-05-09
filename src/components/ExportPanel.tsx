import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  Upload,
  X,
  Image as ImageIcon,
  FileText,
  FileCode,
  FileType,
  Check,
} from 'lucide-react';
import { useCanvasStore } from '@/stores';
import { exportCanvas, importFromJSON } from '@/utils/export';
import type { ExportFormat } from '@/types';

const exportOptions: {
  format: ExportFormat;
  icon: React.ReactNode;
  label: string;
  description: string;
}[] = [
  {
    format: 'png',
    icon: <ImageIcon size={20} />,
    label: 'PNG 图片',
    description: '高质量位图格式，适合分享和嵌入',
  },
  {
    format: 'svg',
    icon: <FileCode size={20} />,
    label: 'SVG 矢量',
    description: '可缩放矢量图形，适合打印和编辑',
  },
  {
    format: 'pdf',
    icon: <FileType size={20} />,
    label: 'PDF 文档',
    description: '便携式文档格式，适合存档和打印',
  },
  {
    format: 'json',
    icon: <FileText size={20} />,
    label: 'JSON 数据',
    description: '项目源文件，可重新导入编辑',
  },
];

export const ExportPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [exporting, setExporting] = useState<ExportFormat | null>(null);
  const [success, setSuccess] = useState<ExportFormat | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { objects } = useCanvasStore();

  const handleExport = async (format: ExportFormat) => {
    setExporting(format);
    setSuccess(null);

    try {
      // Create a temporary container for export
      const tempContainer = document.createElement('div');
      tempContainer.style.width = '1200px';
      tempContainer.style.height = '800px';
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.background = 'white';
      document.body.appendChild(tempContainer);

      await exportCanvas(format, tempContainer, objects, `mindsketch_${Date.now()}`);

      document.body.removeChild(tempContainer);

      setSuccess(format);
      setTimeout(() => setSuccess(null), 2000);
    } catch (error) {
      console.error('Export failed:', error);
      alert('导出失败，请重试');
    } finally {
      setExporting(null);
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const objects = await importFromJSON(file);
      useCanvasStore.getState().loadCanvas(objects);
      setIsOpen(false);
      alert('导入成功！');
    } catch (error) {
      console.error('Import failed:', error);
      alert('导入失败，请检查文件格式');
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed right-4 bottom-4 z-50 flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-full shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
      >
        <Download size={18} />
        <span className="font-medium">导出 / 导入</span>
      </motion.button>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleImport}
        className="hidden"
      />

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed right-4 bottom-20 w-96 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="font-semibold text-gray-900">导出与导入</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={18} className="text-gray-500" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 space-y-4">
                {/* Import Section */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-700">导入项目</h3>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex items-center gap-3 p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                  >
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Upload size={20} className="text-blue-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900 text-sm">
                        导入 JSON 文件
                      </div>
                      <div className="text-xs text-gray-500">
                        支持从本地加载项目文件
                      </div>
                    </div>
                  </button>
                </div>

                <div className="h-px bg-gray-200" />

                {/* Export Section */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-700">导出项目</h3>
                  <div className="grid gap-2">
                    {exportOptions.map((option) => (
                      <button
                        key={option.format}
                        onClick={() => handleExport(option.format)}
                        disabled={exporting !== null}
                        className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50"
                      >
                        <div className="p-2 bg-gray-100 rounded-lg">
                          {success === option.format ? (
                            <Check size={20} className="text-green-600" />
                          ) : (
                            <span className="text-gray-600">{option.icon}</span>
                          )}
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-medium text-gray-900 text-sm">
                            {option.label}
                          </div>
                          <div className="text-xs text-gray-500">
                            {option.description}
                          </div>
                        </div>
                        {exporting === option.format && (
                          <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tips */}
                <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
                  <div className="text-xs text-amber-700">
                    <strong>提示：</strong> 建议定期导出 JSON 格式备份，以便随时恢复编辑状态。
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
