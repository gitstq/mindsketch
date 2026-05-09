import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import type { CanvasObject, Point, ToolType } from '@/types';

interface CanvasStore {
  // State
  objects: CanvasObject[];
  selectedIds: string[];
  zoom: number;
  pan: Point;
  currentTool: ToolType;
  history: CanvasObject[][];
  historyIndex: number;
  isDrawing: boolean;
  
  // Actions
  setTool: (tool: ToolType) => void;
  addObject: (obj: Omit<CanvasObject, 'id'>) => string;
  updateObject: (id: string, updates: Partial<CanvasObject>) => void;
  deleteObject: (id: string) => void;
  deleteSelected: () => void;
  selectObject: (id: string, multi?: boolean) => void;
  clearSelection: () => void;
  setZoom: (zoom: number) => void;
  setPan: (pan: Point) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetView: () => void;
  undo: () => void;
  redo: () => void;
  saveHistory: () => void;
  clearCanvas: () => void;
  loadCanvas: (objects: CanvasObject[]) => void;
  setIsDrawing: (isDrawing: boolean) => void;
  moveSelected: (dx: number, dy: number) => void;
  duplicateSelected: () => void;
  bringToFront: () => void;
  sendToBack: () => void;
}

const MAX_HISTORY = 50;

export const useCanvasStore = create<CanvasStore>((set, get) => ({
  // Initial state
  objects: [],
  selectedIds: [],
  zoom: 1,
  pan: { x: 0, y: 0 },
  currentTool: 'select',
  history: [[]],
  historyIndex: 0,
  isDrawing: false,

  // Actions
  setTool: (tool) => set({ currentTool: tool }),

  addObject: (obj) => {
    const id = uuidv4();
    const newObj: CanvasObject = { ...obj, id };
    set((state) => {
      const newObjects = [...state.objects, newObj];
      return { objects: newObjects };
    });
    get().saveHistory();
    return id;
  },

  updateObject: (id, updates) => {
    set((state) => ({
      objects: state.objects.map((obj) =>
        obj.id === id ? { ...obj, ...updates } : obj
      ),
    }));
  },

  deleteObject: (id) => {
    set((state) => ({
      objects: state.objects.filter((obj) => obj.id !== id),
      selectedIds: state.selectedIds.filter((sid) => sid !== id),
    }));
    get().saveHistory();
  },

  deleteSelected: () => {
    const { selectedIds } = get();
    if (selectedIds.length === 0) return;
    set((state) => ({
      objects: state.objects.filter((obj) => !selectedIds.includes(obj.id)),
      selectedIds: [],
    }));
    get().saveHistory();
  },

  selectObject: (id, multi = false) => {
    set((state) => {
      if (multi) {
        const isSelected = state.selectedIds.includes(id);
        return {
          selectedIds: isSelected
            ? state.selectedIds.filter((sid) => sid !== id)
            : [...state.selectedIds, id],
        };
      }
      return { selectedIds: [id] };
    });
  },

  clearSelection: () => set({ selectedIds: [] }),

  setZoom: (zoom) => set({ zoom: Math.max(0.1, Math.min(5, zoom)) }),

  setPan: (pan) => set({ pan }),

  zoomIn: () => {
    const { zoom } = get();
    set({ zoom: Math.min(5, zoom * 1.2) });
  },

  zoomOut: () => {
    const { zoom } = get();
    set({ zoom: Math.max(0.1, zoom / 1.2) });
  },

  resetView: () => set({ zoom: 1, pan: { x: 0, y: 0 } }),

  saveHistory: () => {
    set((state) => {
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push(JSON.parse(JSON.stringify(state.objects)));
      if (newHistory.length > MAX_HISTORY) {
        newHistory.shift();
      }
      return {
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    });
  },

  undo: () => {
    set((state) => {
      if (state.historyIndex > 0) {
        const newIndex = state.historyIndex - 1;
        return {
          objects: JSON.parse(JSON.stringify(state.history[newIndex])),
          historyIndex: newIndex,
          selectedIds: [],
        };
      }
      return state;
    });
  },

  redo: () => {
    set((state) => {
      if (state.historyIndex < state.history.length - 1) {
        const newIndex = state.historyIndex + 1;
        return {
          objects: JSON.parse(JSON.stringify(state.history[newIndex])),
          historyIndex: newIndex,
          selectedIds: [],
        };
      }
      return state;
    });
  },

  clearCanvas: () => {
    set({ objects: [], selectedIds: [] });
    get().saveHistory();
  },

  loadCanvas: (objects) => {
    set({ objects, selectedIds: [] });
    get().saveHistory();
  },

  setIsDrawing: (isDrawing) => set({ isDrawing }),

  moveSelected: (dx, dy) => {
    const { selectedIds } = get();
    if (selectedIds.length === 0) return;
    set((state) => ({
      objects: state.objects.map((obj) =>
        selectedIds.includes(obj.id)
          ? { ...obj, x: obj.x + dx, y: obj.y + dy }
          : obj
      ),
    }));
  },

  duplicateSelected: () => {
    const { selectedIds, objects } = get();
    if (selectedIds.length === 0) return;
    
    const newObjects: CanvasObject[] = [];
    const idMap = new Map<string, string>();

    selectedIds.forEach((id) => {
      const obj = objects.find((o) => o.id === id);
      if (obj) {
        const newId = uuidv4();
        idMap.set(id, newId);
        newObjects.push({
          ...obj,
          id: newId,
          x: obj.x + 20,
          y: obj.y + 20,
        });
      }
    });

    set((state) => ({
      objects: [...state.objects, ...newObjects],
      selectedIds: newObjects.map((o) => o.id),
    }));
    get().saveHistory();
  },

  bringToFront: () => {
    const { selectedIds, objects } = get();
    if (selectedIds.length === 0) return;
    
    const selected = objects.filter((o) => selectedIds.includes(o.id));
    const others = objects.filter((o) => !selectedIds.includes(o.id));
    
    set({ objects: [...others, ...selected] });
    get().saveHistory();
  },

  sendToBack: () => {
    const { selectedIds, objects } = get();
    if (selectedIds.length === 0) return;
    
    const selected = objects.filter((o) => selectedIds.includes(o.id));
    const others = objects.filter((o) => !selectedIds.includes(o.id));
    
    set({ objects: [...selected, ...others] });
    get().saveHistory();
  },
}));
