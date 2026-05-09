import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Loader2, Brain, Workflow, Lightbulb } from 'lucide-react';
import { useAIStore, useCanvasStore } from '@/stores';
import { mindMapToCanvasObjects, createMindMapFromText } from '@/utils/mindmap';
import { flowchartToCanvasObjects, createFlowchartFromMermaid } from '@/utils/flowchart';

export const AIPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [mode, setMode] = useState<'mindmap' | 'flowchart'>('mindmap');
  
  const { isProcessing, generateMindMap, generateFlowchart, error, clearError } = useAIStore();
  const { loadCanvas } = useCanvasStore();

  const handleGenerate = async () => {
    if (!prompt.trim() || isProcessing) return;

    clearError();

    try {
      if (mode === 'mindmap') {
        const nodes = await generateMindMap(prompt);
        const objects = mindMapToCanvasObjects(nodes);
        loadCanvas(objects);
      } else {
        const nodes = await generateFlowchart(prompt);
        const objects = flowchartToCanvasObjects(nodes);
        loadCanvas(objects);
      }
      setPrompt('');
    } catch (err) {
      console.error('AI generation failed:', err);
    }
  };

  const handleQuickGenerate = async (type: 'mindmap' | 'flowchart', template: string) => {
    if (isProcessing) return;
    
    clearError();
    
    try {
      if (type === 'mindmap') {
        const nodes = createMindMapFromText(template);
        const objects = mindMapToCanvasObjects(nodes);
        loadCanvas(objects);
      } else {
        const nodes = createFlowchartFromMermaid(template);
        const objects = flowchartToCanvasObjects(nodes);
        loadCanvas(objects);
      }
    } catch (err) {
      console.error('Quick generation failed:', err);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed right-4 top-4 z-50 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
      >
        <Sparkles size={18} />
        <span className="font-medium">AI 助手</span>
      </motion.button>

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
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
                    <Sparkles size={20} className="text-white" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">AI 智能助手</h2>
                    <p className="text-xs text-gray-500">自然语言生成图表</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Mode Selection */}
                <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
                  <button
                    onClick={() => setMode('mindmap')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md transition-all ${
                      mode === 'mindmap'
                        ? 'bg-white text-purple-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Brain size={16} />
                    <span className="text-sm font-medium">思维导图</span>
                  </button>
                  <button
                    onClick={() => setMode('flowchart')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md transition-all ${
                      mode === 'flowchart'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Workflow size={16} />
                    <span className="text-sm font-medium">流程图</span>
                  </button>
                </div>

                {/* Prompt Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    描述你的想法
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={
                      mode === 'mindmap'
                        ? '例如：帮我创建一个关于"人工智能应用"的思维导图，包含机器学习、深度学习、自然语言处理等分支...'
                        : '例如：创建一个用户登录流程图，包含输入用户名密码、验证、成功/失败处理等步骤...'
                    }
                    className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  />
                  <button
                    onClick={handleGenerate}
                    disabled={!prompt.trim() || isProcessing}
                    className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        生成中...
                      </>
                    ) : (
                      <>
                        <Sparkles size={18} />
                        生成{mode === 'mindmap' ? '思维导图' : '流程图'}
                      </>
                    )}
                  </button>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                    {error}
                  </div>
                )}

                {/* Quick Templates */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Lightbulb size={16} className="text-amber-500" />
                    快速模板
                  </div>
                  
                  {mode === 'mindmap' ? (
                    <div className="grid gap-2">
                      {[
                        { name: '项目规划', desc: '项目管理的完整思维导图' },
                        { name: '学习笔记', desc: '知识整理的思维导图' },
                        { name: '会议记录', desc: '会议要点的思维导图' },
                        { name: '产品分析', desc: '产品功能的思维导图' },
                      ].map((template) => (
                        <button
                          key={template.name}
                          onClick={() =>
                            handleQuickGenerate(
                              'mindmap',
                              `${template.name}\n  核心概念\n    要点1\n    要点2\n  应用场景\n    场景1\n    场景2\n  最佳实践`
                            )
                          }
                          className="p-3 text-left border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
                        >
                          <div className="font-medium text-gray-900 text-sm">
                            {template.name}
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            {template.desc}
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="grid gap-2">
                      {[
                        { name: '用户注册流程', desc: '完整的用户注册流程图' },
                        { name: '订单处理流程', desc: '电商订单处理流程图' },
                        { name: '审批流程', desc: '通用审批流程图' },
                        { name: '数据同步流程', desc: '系统数据同步流程图' },
                      ].map((template) => (
                        <button
                          key={template.name}
                          onClick={() =>
                            handleQuickGenerate(
                              'flowchart',
                              `flowchart TD\n    A([开始]) --> B[${template.name}]\n    B --> C{判断条件}\n    C -->|是| D[处理步骤]\n    C -->|否| E[错误处理]\n    D --> F([结束])\n    E --> F`
                            )
                          }
                          className="p-3 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                        >
                          <div className="font-medium text-gray-900 text-sm">
                            {template.name}
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            {template.desc}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Tips */}
                <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                  <div className="text-xs text-blue-700">
                    <strong>提示：</strong>
                    {mode === 'mindmap'
                      ? ' 输入主题和关键词，AI会自动生成结构化的思维导图。支持多层级的节点嵌套。'
                      : ' 描述业务流程，AI会自动生成对应的流程图。包含开始、处理、判断、结束等节点类型。'}
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
