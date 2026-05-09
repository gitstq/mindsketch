import { useRef, useCallback, useEffect, useState } from 'react';
import { useCanvasStore } from '@/stores';
import type { Point, ToolType, CanvasObject } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<Point | null>(null);
  const [currentShape, setCurrentShape] = useState<CanvasObject | null>(null);

  const {
    objects,
    selectedIds,
    zoom,
    pan,
    currentTool,
    addObject,

    selectObject,
    clearSelection,
    setPan,
  } = useCanvasStore();

  // Get canvas coordinates from mouse event
  const getCanvasPoint = useCallback(
    (e: React.MouseEvent | MouseEvent): Point => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0 };

      const rect = canvas.getBoundingClientRect();
      return {
        x: (e.clientX - rect.left - pan.x) / zoom,
        y: (e.clientY - rect.top - pan.y) / zoom,
      };
    },
    [zoom, pan]
  );

  // Handle mouse down
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const point = getCanvasPoint(e);

      if (currentTool === 'hand' || e.button === 1) {
        // Pan mode
        setStartPoint(point);
        return;
      }

      if (currentTool === 'select') {
        // Check if clicking on an object
        const clickedObject = objects.find((obj) => isPointInObject(point, obj));
        if (clickedObject) {
          selectObject(clickedObject.id, e.shiftKey);
        } else {
          clearSelection();
        }
        return;
      }

      // Start drawing
      setIsDrawing(true);
      setStartPoint(point);

      const newObject: CanvasObject = {
        id: uuidv4(),
        type: currentTool,
        x: point.x,
        y: point.y,
        width: 0,
        height: 0,
        fill: getDefaultFill(currentTool),
        stroke: '#000000',
        strokeWidth: 2,
      };

      setCurrentShape(newObject);
    },
    [currentTool, objects, getCanvasPoint, selectObject, clearSelection]
  );

  // Handle mouse move
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const point = getCanvasPoint(e);

      if (currentTool === 'hand' && startPoint && e.buttons === 1) {
        // Panning
        const dx = e.clientX - startPoint.x * zoom - pan.x;
        const dy = e.clientY - startPoint.y * zoom - pan.y;
        setPan({
          x: pan.x + dx,
          y: pan.y + dy,
        });
        return;
      }

      if (!isDrawing || !startPoint || !currentShape) return;

      const width = Math.abs(point.x - startPoint.x);
      const height = Math.abs(point.y - startPoint.y);
      const x = Math.min(point.x, startPoint.x);
      const y = Math.min(point.y, startPoint.y);

      setCurrentShape({
        ...currentShape,
        x,
        y,
        width,
        height,
        points:
          currentTool === 'line'
            ? [startPoint, point]
            : currentTool === 'pencil'
            ? [...(currentShape.points || []), point]
            : undefined,
      });
    },
    [isDrawing, startPoint, currentShape, currentTool, getCanvasPoint, pan, setPan]
  );

  // Handle mouse up
  const handleMouseUp = useCallback(() => {
    if (currentTool === 'hand') {
      setStartPoint(null);
      return;
    }

    if (isDrawing && currentShape) {
      if (currentShape.width > 5 || currentShape.height > 5 || currentShape.points) {
        addObject(currentShape);
      }
      setIsDrawing(false);
      setCurrentShape(null);
      setStartPoint(null);
    }
  }, [isDrawing, currentShape, currentTool, addObject]);

  // Handle wheel for zoom
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      const newZoom = Math.max(0.1, Math.min(5, zoom * delta));
      
      // Zoom towards mouse position
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        const newPan = {
          x: mouseX - (mouseX - pan.x) * (newZoom / zoom),
          y: mouseY - (mouseY - pan.y) * (newZoom / zoom),
        };
        
        useCanvasStore.setState({ zoom: newZoom, pan: newPan });
      }
    },
    [zoom, pan]
  );

  // Draw on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Save context
    ctx.save();

    // Apply zoom and pan
    ctx.translate(pan.x, pan.y);
    ctx.scale(zoom, zoom);

    // Draw grid
    drawGrid(ctx, canvas.width / zoom, canvas.height / zoom);

    // Draw all objects
    objects.forEach((obj) => {
      drawObject(ctx, obj, selectedIds.includes(obj.id));
    });

    // Draw current shape
    if (currentShape) {
      drawObject(ctx, currentShape, false);
    }

    // Restore context
    ctx.restore();
  }, [objects, currentShape, selectedIds, zoom, pan]);

  // Resize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return {
    canvasRef,
    containerRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleWheel,
  };
};

// Helper functions
const isPointInObject = (point: Point, obj: CanvasObject): boolean => {
  switch (obj.type) {
    case 'rectangle':
      return (
        point.x >= obj.x &&
        point.x <= obj.x + obj.width &&
        point.y >= obj.y &&
        point.y <= obj.y + obj.height
      );
    case 'circle':
      const radius = Math.min(obj.width, obj.height) / 2;
      const centerX = obj.x + radius;
      const centerY = obj.y + radius;
      const distance = Math.sqrt(
        Math.pow(point.x - centerX, 2) + Math.pow(point.y - centerY, 2)
      );
      return distance <= radius;
    case 'line':
      if (!obj.points || obj.points.length < 2) return false;
      return isPointNearLine(point, obj.points[0], obj.points[1], 5);
    default:
      return (
        point.x >= obj.x &&
        point.x <= obj.x + obj.width &&
        point.y >= obj.y &&
        point.y <= obj.y + obj.height
      );
  }
};

const isPointNearLine = (point: Point, start: Point, end: Point, threshold: number): boolean => {
  const A = point.x - start.x;
  const B = point.y - start.y;
  const C = end.x - start.x;
  const D = end.y - start.y;

  const dot = A * C + B * D;
  const lenSq = C * C + D * D;
  let param = -1;

  if (lenSq !== 0) {
    param = dot / lenSq;
  }

  let xx, yy;

  if (param < 0) {
    xx = start.x;
    yy = start.y;
  } else if (param > 1) {
    xx = end.x;
    yy = end.y;
  } else {
    xx = start.x + param * C;
    yy = start.y + param * D;
  }

  const dx = point.x - xx;
  const dy = point.y - yy;

  return Math.sqrt(dx * dx + dy * dy) < threshold;
};

const getDefaultFill = (tool: ToolType): string | undefined => {
  switch (tool) {
    case 'rectangle':
    case 'circle':
      return '#3b82f6';
    case 'text':
      return '#000000';
    default:
      return undefined;
  }
};

const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1;

  const gridSize = 20;

  for (let x = 0; x <= width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  for (let y = 0; y <= height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
};

const drawObject = (
  ctx: CanvasRenderingContext2D,
  obj: CanvasObject,
  isSelected: boolean
) => {
  ctx.save();

  if (isSelected) {
    ctx.shadowColor = '#3b82f6';
    ctx.shadowBlur = 10;
  }

  switch (obj.type) {
    case 'rectangle':
      ctx.fillStyle = obj.fill || 'transparent';
      ctx.strokeStyle = obj.stroke || '#000';
      ctx.lineWidth = obj.strokeWidth || 1;
      ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
      ctx.strokeRect(obj.x, obj.y, obj.width, obj.height);
      break;

    case 'circle':
      ctx.fillStyle = obj.fill || 'transparent';
      ctx.strokeStyle = obj.stroke || '#000';
      ctx.lineWidth = obj.strokeWidth || 1;
      ctx.beginPath();
      ctx.ellipse(
        obj.x + obj.width / 2,
        obj.y + obj.height / 2,
        obj.width / 2,
        obj.height / 2,
        0,
        0,
        2 * Math.PI
      );
      ctx.fill();
      ctx.stroke();
      break;

    case 'line':
      if (obj.points && obj.points.length >= 2) {
        ctx.strokeStyle = obj.stroke || '#000';
        ctx.lineWidth = obj.strokeWidth || 1;
        ctx.beginPath();
        ctx.moveTo(obj.points[0].x, obj.points[0].y);
        ctx.lineTo(obj.points[1].x, obj.points[1].y);
        ctx.stroke();
      }
      break;

    case 'text':
      ctx.fillStyle = obj.fill || '#000';
      ctx.font = `${obj.fontSize || 16}px ${obj.fontFamily || 'Arial'}`;
      if (obj.text) {
        ctx.fillText(obj.text, obj.x, obj.y + (obj.fontSize || 16));
      }
      break;

    case 'pencil':
      if (obj.points && obj.points.length > 1) {
        ctx.strokeStyle = obj.stroke || '#000';
        ctx.lineWidth = obj.strokeWidth || 1;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(obj.points[0].x, obj.points[0].y);
        for (let i = 1; i < obj.points.length; i++) {
          ctx.lineTo(obj.points[i].x, obj.points[i].y);
        }
        ctx.stroke();
      }
      break;
  }

  // Draw selection handles
  if (isSelected) {
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(obj.x - 5, obj.y - 5, obj.width + 10, obj.height + 10);
    ctx.setLineDash([]);

    // Draw resize handles
    const handles = [
      { x: obj.x - 5, y: obj.y - 5 },
      { x: obj.x + obj.width / 2 - 5, y: obj.y - 5 },
      { x: obj.x + obj.width - 5, y: obj.y - 5 },
      { x: obj.x - 5, y: obj.y + obj.height / 2 - 5 },
      { x: obj.x + obj.width - 5, y: obj.y + obj.height / 2 - 5 },
      { x: obj.x - 5, y: obj.y + obj.height - 5 },
      { x: obj.x + obj.width / 2 - 5, y: obj.y + obj.height - 5 },
      { x: obj.x + obj.width - 5, y: obj.y + obj.height - 5 },
    ];

    ctx.fillStyle = '#fff';
    ctx.strokeStyle = '#3b82f6';
    handles.forEach((handle) => {
      ctx.fillRect(handle.x, handle.y, 10, 10);
      ctx.strokeRect(handle.x, handle.y, 10, 10);
    });
  }

  ctx.restore();
};
