import { create } from 'zustand';
import type { AIRequest, AIResponse, MindMapNode, FlowchartNode } from '@/types';

interface AIStore {
  isProcessing: boolean;
  error: string | null;
  apiKey: string | null;
  setApiKey: (key: string) => void;
  generateMindMap: (prompt: string) => Promise<MindMapNode[]>;
  generateFlowchart: (prompt: string) => Promise<FlowchartNode[]>;
  processRequest: (request: AIRequest) => Promise<AIResponse>;
  clearError: () => void;
}

// 模拟AI处理函数 - 实际使用时替换为真实API调用
const simulateAIProcessing = async (prompt: string, type: string): Promise<any> => {
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  if (type === 'mindmap') {
    // 生成示例思维导图数据
    const rootId = 'root';
    const nodes: MindMapNode[] = [
      {
        id: rootId,
        text: prompt.slice(0, 20) || 'Main Topic',
        x: 400,
        y: 300,
        children: ['child1', 'child2', 'child3'],
        color: '#3b82f6',
      },
      {
        id: 'child1',
        text: 'Key Point 1',
        x: 250,
        y: 200,
        children: [],
        parent: rootId,
        color: '#10b981',
      },
      {
        id: 'child2',
        text: 'Key Point 2',
        x: 250,
        y: 300,
        children: [],
        parent: rootId,
        color: '#10b981',
      },
      {
        id: 'child3',
        text: 'Key Point 3',
        x: 250,
        y: 400,
        children: ['grandchild1'],
        parent: rootId,
        color: '#10b981',
      },
      {
        id: 'grandchild1',
        text: 'Detail A',
        x: 100,
        y: 400,
        children: [],
        parent: 'child3',
        color: '#f59e0b',
      },
    ];
    return nodes;
  }
  
  if (type === 'flowchart') {
    // 生成示例流程图数据
    const nodes: FlowchartNode[] = [
      {
        id: 'start',
        type: 'start',
        text: 'Start',
        x: 400,
        y: 50,
        width: 100,
        height: 50,
        next: ['process1'],
      },
      {
        id: 'process1',
        type: 'process',
        text: 'Process Data',
        x: 400,
        y: 150,
        width: 120,
        height: 60,
        next: ['decision1'],
        prev: ['start'],
      },
      {
        id: 'decision1',
        type: 'decision',
        text: 'Valid?',
        x: 400,
        y: 270,
        width: 100,
        height: 80,
        next: ['process2', 'end'],
        prev: ['process1'],
      },
      {
        id: 'process2',
        type: 'process',
        text: 'Save Data',
        x: 250,
        y: 400,
        width: 120,
        height: 60,
        next: ['end'],
        prev: ['decision1'],
      },
      {
        id: 'end',
        type: 'end',
        text: 'End',
        x: 400,
        y: 500,
        width: 100,
        height: 50,
        prev: ['decision1', 'process2'],
      },
    ];
    return nodes;
  }
  
  return { message: 'Processed: ' + prompt };
};

export const useAIStore = create<AIStore>((set, get) => ({
  isProcessing: false,
  error: null,
  apiKey: localStorage.getItem('ai_api_key'),

  setApiKey: (key) => {
    localStorage.setItem('ai_api_key', key);
    set({ apiKey: key });
  },

  generateMindMap: async (prompt) => {
    set({ isProcessing: true, error: null });
    try {
      const nodes = await simulateAIProcessing(prompt, 'mindmap');
      set({ isProcessing: false });
      return nodes;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      set({ isProcessing: false, error: errorMessage });
      throw err;
    }
  },

  generateFlowchart: async (prompt) => {
    set({ isProcessing: true, error: null });
    try {
      const nodes = await simulateAIProcessing(prompt, 'flowchart');
      set({ isProcessing: false });
      return nodes;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      set({ isProcessing: false, error: errorMessage });
      throw err;
    }
  },

  processRequest: async (request) => {
    set({ isProcessing: true, error: null });
    try {
      const result = await simulateAIProcessing(request.prompt, request.type);
      set({ isProcessing: false });
      return { success: true, data: result };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      set({ isProcessing: false, error: errorMessage });
      return { success: false, error: errorMessage };
    }
  },

  clearError: () => set({ error: null }),
}));
