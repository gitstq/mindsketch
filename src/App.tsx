import React, { useEffect } from 'react';
import { Header, Toolbar, Canvas, AIPanel, ExportPanel, PropertiesPanel } from '@/components';
import { useKeyboard } from '@/hooks';
import { useCanvasStore } from '@/stores';

function App() {
  // Initialize keyboard shortcuts
  useKeyboard();

  // Initialize canvas with sample data on first load
  useEffect(() => {
    const { objects, loadCanvas } = useCanvasStore.getState();
    if (objects.length === 0) {
      // Add a welcome text
      const welcomeObjects = [
        {
          id: 'welcome-text',
          type: 'text' as const,
          x: 400,
          y: 300,
          width: 400,
          height: 100,
          text: '欢迎使用 MindSketch!\n点击左侧工具栏开始创作',
          fontSize: 24,
          fontFamily: 'Arial',
          fill: '#1f2937',
        },
        {
          id: 'welcome-rect',
          type: 'rectangle' as const,
          x: 350,
          y: 250,
          width: 500,
          height: 200,
          fill: 'transparent',
          stroke: '#3b82f6',
          strokeWidth: 2,
        },
      ];
      loadCanvas(welcomeObjects);
    }
  }, []);

  return (
    <div className="w-full h-screen bg-gray-50 overflow-hidden">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="pt-14 h-full flex">
        {/* Left Toolbar */}
        <div className="absolute left-4 top-20 z-30">
          <Toolbar />
        </div>

        {/* Canvas Area */}
        <div className="flex-1 relative">
          <Canvas />
        </div>

        {/* Right Properties Panel */}
        <PropertiesPanel />
      </div>

      {/* AI Panel Toggle */}
      <AIPanel />

      {/* Export Panel Toggle */}
      <ExportPanel />
    </div>
  );
}

export default App;
