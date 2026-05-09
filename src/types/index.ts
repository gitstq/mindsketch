export type ToolType = 'select' | 'hand' | 'rectangle' | 'circle' | 'line' | 'text' | 'pencil' | 'eraser' | 'mindmap' | 'flowchart';

export type ExportFormat = 'png' | 'svg' | 'pdf' | 'json';

export interface Point {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface CanvasObject {
  id: string;
  type: ToolType;
  x: number;
  y: number;
  width: number;
  height: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  points?: Point[];
  children?: string[];
  parent?: string;
  data?: Record<string, any>;
}

export interface MindMapNode {
  id: string;
  text: string;
  x: number;
  y: number;
  children: string[];
  parent?: string;
  collapsed?: boolean;
  color?: string;
}

export interface FlowchartNode {
  id: string;
  type: 'start' | 'process' | 'decision' | 'end' | 'input' | 'output';
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  next?: string[];
  prev?: string[];
}

export interface CanvasState {
  objects: CanvasObject[];
  selectedIds: string[];
  zoom: number;
  pan: Point;
  history: CanvasObject[][];
  historyIndex: number;
}

export interface AIRequest {
  prompt: string;
  type: 'mindmap' | 'flowchart' | 'general';
}

export interface AIResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export interface User {
  id: string;
  name: string;
  color: string;
  cursor?: Point;
}

export interface CollaborationState {
  users: User[];
  isConnected: boolean;
  roomId?: string;
}
