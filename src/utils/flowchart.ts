import type { FlowchartNode, CanvasObject } from '@/types';

const NODE_WIDTH = 120;
const NODE_HEIGHT = 60;
const DIAMOND_SIZE = 80;
const VERTICAL_SPACING = 100;

export const flowchartToCanvasObjects = (nodes: FlowchartNode[]): CanvasObject[] => {
  const objects: CanvasObject[] = [];
  
  nodes.forEach((node) => {
    let shape: CanvasObject;
    
    switch (node.type) {
      case 'start':
      case 'end':
        // Rounded rectangle for start/end
        shape = {
          id: node.id,
          type: 'rectangle',
          x: node.x,
          y: node.y,
          width: node.width,
          height: node.height,
          fill: '#10b981',
          stroke: '#059669',
          strokeWidth: 2,
        };
        break;
      case 'decision':
        // Diamond shape using polygon approximation
        const cx = node.x + node.width / 2;
        const cy = node.y + node.height / 2;
        shape = {
          id: node.id,
          type: 'rectangle',
          x: node.x,
          y: node.y,
          width: node.width,
          height: node.height,
          fill: '#f59e0b',
          stroke: '#d97706',
          strokeWidth: 2,
        };
        break;
      case 'input':
      case 'output':
        // Parallelogram approximation
        shape = {
          id: node.id,
          type: 'rectangle',
          x: node.x,
          y: node.y,
          width: node.width,
          height: node.height,
          fill: '#8b5cf6',
          stroke: '#7c3aed',
          strokeWidth: 2,
        };
        break;
      case 'process':
      default:
        // Rectangle for process
        shape = {
          id: node.id,
          type: 'rectangle',
          x: node.x,
          y: node.y,
          width: node.width,
          height: node.height,
          fill: '#3b82f6',
          stroke: '#2563eb',
          strokeWidth: 2,
        };
    }
    
    objects.push(shape);
    
    // Add text label
    objects.push({
      id: `${node.id}-text`,
      type: 'text',
      x: node.x + node.width / 2 - 40,
      y: node.y + node.height / 2 - 8,
      width: node.width - 20,
      height: 20,
      text: node.text,
      fontSize: 12,
      fontFamily: 'Arial',
      fill: '#ffffff',
    });
    
    // Add connection lines
    if (node.next) {
      node.next.forEach((nextId, index) => {
        const nextNode = nodes.find((n) => n.id === nextId);
        if (nextNode) {
          const startX = node.x + node.width / 2;
          const startY = node.y + node.height;
          const endX = nextNode.x + nextNode.width / 2;
          const endY = nextNode.y;
          
          objects.push({
            id: `${node.id}-${nextId}-line`,
            type: 'line',
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            stroke: '#64748b',
            strokeWidth: 2,
            points: [
              { x: startX, y: startY },
              { x: endX, y: endY },
            ],
          });
          
          // Add label for decision branches
          if (node.type === 'decision') {
            const labelX = (startX + endX) / 2;
            const labelY = (startY + endY) / 2;
            objects.push({
              id: `${node.id}-${nextId}-label`,
              type: 'text',
              x: labelX,
              y: labelY - 10,
              width: 40,
              height: 16,
              text: index === 0 ? 'Yes' : 'No',
              fontSize: 10,
              fontFamily: 'Arial',
              fill: '#64748b',
            });
          }
        }
      });
    }
  });
  
  return objects;
};

export const generateFlowchartLayout = (nodes: FlowchartNode[]): FlowchartNode[] => {
  const layoutNodes = new Map<string, FlowchartNode>();
  nodes.forEach((n) => layoutNodes.set(n.id, { ...n }));
  
  // Find start node
  const startNode = Array.from(layoutNodes.values()).find((n) => n.type === 'start');
  if (!startNode) return nodes;
  
  // Position start at top center
  startNode.x = 400;
  startNode.y = 50;
  
  // Layout nodes using BFS
  const visited = new Set<string>();
  const queue: { id: string; level: number; column: number }[] = [
    { id: startNode.id, level: 0, column: 0 },
  ];
  
  const levelColumns = new Map<number, number>();
  
  while (queue.length > 0) {
    const { id, level, column } = queue.shift()!;
    if (visited.has(id)) continue;
    visited.add(id);
    
    const node = layoutNodes.get(id)!;
    const currentColumn = levelColumns.get(level) || 0;
    
    node.x = 400 + column * 150;
    node.y = 50 + level * VERTICAL_SPACING;
    
    levelColumns.set(level, currentColumn + 1);
    
    if (node.next) {
      node.next.forEach((nextId, index) => {
        if (!visited.has(nextId)) {
          queue.push({
            id: nextId,
            level: level + 1,
            column: column + index,
          });
        }
      });
    }
  }
  
  return Array.from(layoutNodes.values());
};

export const createFlowchartFromMermaid = (mermaidCode: string): FlowchartNode[] => {
  // Simple parser for basic mermaid flowchart syntax
  const nodes: FlowchartNode[] = [];
  const lines = mermaidCode.split('\n').filter((line) => line.trim());
  
  // Parse node definitions
  const nodeRegex = /(\w+)\s*\[([^\]]+)\]|(\w+)\s*\(([^)]+)\)|(\w+)\s*\{([^}]+)\}/g;
  const connectionRegex = /(\w+)\s*-->?\s*(\w+)/;
  
  lines.forEach((line) => {
    // Match node definitions
    let match;
    while ((match = nodeRegex.exec(line)) !== null) {
      const id = match[1] || match[3] || match[5];
      const text = match[2] || match[4] || match[6];
      
      let type: FlowchartNode['type'] = 'process';
      if (line.includes('([')) type = 'start';
      else if (line.includes('(["')) type = 'start';
      else if (line.includes('{"')) type = 'decision';
      else if (line.includes('/"')) type = 'input';
      
      nodes.push({
        id,
        type,
        text: text.replace(/"/g, ''),
        x: 0,
        y: 0,
        width: NODE_WIDTH,
        height: type === 'decision' ? DIAMOND_SIZE : NODE_HEIGHT,
      });
    }
    
    // Match connections
    const connMatch = line.match(connectionRegex);
    if (connMatch) {
      const fromId = connMatch[1];
      const toId = connMatch[2];
      
      const fromNode = nodes.find((n) => n.id === fromId);
      if (fromNode) {
        fromNode.next = fromNode.next || [];
        fromNode.next.push(toId);
      }
      
      const toNode = nodes.find((n) => n.id === toId);
      if (toNode) {
        toNode.prev = toNode.prev || [];
        toNode.prev.push(fromId);
      }
    }
  });
  
  return generateFlowchartLayout(nodes);
};

export const exportFlowchartToMermaid = (nodes: FlowchartNode[]): string => {
  let mermaid = 'flowchart TD\n';
  
  nodes.forEach((node) => {
    switch (node.type) {
      case 'start':
      case 'end':
        mermaid += `    ${node.id}(["${node.text}"])\n`;
        break;
      case 'decision':
        mermaid += `    ${node.id}{"${node.text}"}\n`;
        break;
      case 'input':
      case 'output':
        mermaid += `    ${node.id}/["${node.text}"]\n`;
        break;
      default:
        mermaid += `    ${node.id}["${node.text}"]\n`;
    }
  });
  
  nodes.forEach((node) => {
    if (node.next) {
      node.next.forEach((nextId) => {
        mermaid += `    ${node.id} --> ${nextId}\n`;
      });
    }
  });
  
  return mermaid;
};
