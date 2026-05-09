import React from 'react';
import { useCanvas } from '@/hooks';
import { useCanvasStore } from '@/stores';

export const Canvas: React.FC = () => {
  const { canvasRef, containerRef, handleMouseDown, handleMouseMove, handleMouseUp, handleWheel } = useCanvas();
  const { zoom, pan } = useCanvasStore();

  return (
    <div
      ref={containerRef}
      className="canvas-container"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      <canvas
        ref={canvasRef}
        className="block"
        style={{
          cursor: useCanvasStore.getState().currentTool === 'hand' ? 'grab' : 'default',
        }}
      />
      
      {/* Grid Info */}
      <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur rounded-lg shadow-sm border border-gray-200 text-xs text-gray-600">
        缩放: {Math.round(zoom * 100)}% | 位置: ({Math.round(pan.x)}, {Math.round(pan.y)})
      </div>
    </div>
  );
};
