import type { MindMapNode, CanvasObject } from '@/types';
import { v4 as uuidv4 } from 'uuid';

const NODE_WIDTH = 120;
const NODE_HEIGHT = 40;
const HORIZONTAL_SPACING = 150;
const VERTICAL_SPACING = 60;

export const mindMapToCanvasObjects = (nodes: MindMapNode[]): CanvasObject[] => {
  const objects: CanvasObject[] = [];
  
  nodes.forEach((node) => {
    // Create node rectangle
    objects.push({
      id: node.id,
      type: 'rectangle',
      x: node.x,
      y: node.y,
      width: NODE_WIDTH,
      height: NODE_HEIGHT,
      fill: node.color || '#3b82f6',
      stroke: '#1e40af',
      strokeWidth: 2,
    });
    
    // Create text label
    objects.push({
      id: `${node.id}-text`,
      type: 'text',
      x: node.x + 10,
      y: node.y + 10,
      width: NODE_WIDTH - 20,
      height: NODE_HEIGHT - 20,
      text: node.text,
      fontSize: 14,
      fontFamily: 'Arial',
      fill: '#ffffff',
    });
    
    // Create connection lines to children
    if (node.children) {
      node.children.forEach((childId) => {
        const child = nodes.find((n) => n.id === childId);
        if (child) {
          objects.push({
            id: `${node.id}-${childId}-line`,
            type: 'line',
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            stroke: '#94a3b8',
            strokeWidth: 2,
            points: [
              { x: node.x, y: node.y + NODE_HEIGHT / 2 },
              { x: child.x + NODE_WIDTH, y: child.y + NODE_HEIGHT / 2 },
            ],
          });
        }
      });
    }
  });
  
  return objects;
};

export const generateMindMapLayout = (nodes: MindMapNode[]): MindMapNode[] => {
  const root = nodes.find((n) => !n.parent);
  if (!root) return nodes;
  
  const layoutNodes = new Map<string, MindMapNode>();
  nodes.forEach((n) => layoutNodes.set(n.id, { ...n }));
  
  // Position root at center
  const rootNode = layoutNodes.get(root.id)!;
  rootNode.x = 600;
  rootNode.y = 400;
  
  // Layout children recursively
  const layoutChildren = (parentId: string, level: number, startY: number): number => {
    const parent = layoutNodes.get(parentId)!;
    const children = Array.from(layoutNodes.values()).filter((n) => n.parent === parentId);
    
    if (children.length === 0) return startY;
    
    const totalHeight = (children.length - 1) * VERTICAL_SPACING;
    let currentY = parent.y - totalHeight / 2;
    
    children.forEach((child) => {
      child.x = parent.x - HORIZONTAL_SPACING * level;
      child.y = currentY;
      currentY += VERTICAL_SPACING;
      
      // Recursively layout grandchildren
      layoutChildren(child.id, level + 1, 0);
    });
    
    return currentY;
  };
  
  layoutChildren(root.id, 1, 0);
  
  return Array.from(layoutNodes.values());
};

export const createMindMapFromText = (text: string): MindMapNode[] => {
  const lines = text.split('\n').filter((line) => line.trim());
  const nodes: MindMapNode[] = [];
  const stack: { id: string; level: number }[] = [];
  
  lines.forEach((line, index) => {
    const level = line.search(/\S/);
    const content = line.trim();
    const id = `node-${index}`;
    
    const node: MindMapNode = {
      id,
      text: content,
      x: 0,
      y: 0,
      children: [],
      color: level === 0 ? '#3b82f6' : level === 1 ? '#10b981' : '#f59e0b',
    };
    
    // Find parent
    while (stack.length > 0 && stack[stack.length - 1].level >= level) {
      stack.pop();
    }
    
    if (stack.length > 0) {
      const parentId = stack[stack.length - 1].id;
      node.parent = parentId;
      const parent = nodes.find((n) => n.id === parentId);
      if (parent) {
        parent.children = parent.children || [];
        parent.children.push(id);
      }
    }
    
    nodes.push(node);
    stack.push({ id, level });
  });
  
  return generateMindMapLayout(nodes);
};

export const exportMindMapToMarkdown = (nodes: MindMapNode[]): string => {
  const root = nodes.find((n) => !n.parent);
  if (!root) return '';
  
  let markdown = `# ${root.text}\n\n`;
  
  const traverse = (parentId: string, level: number) => {
    const children = nodes.filter((n) => n.parent === parentId);
    children.forEach((child) => {
      const indent = '  '.repeat(level);
      markdown += `${indent}- ${child.text}\n`;
      traverse(child.id, level + 1);
    });
  };
  
  traverse(root.id, 0);
  
  return markdown;
};
