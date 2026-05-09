import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import type { CanvasObject, ExportFormat } from '@/types';

export const exportToPNG = async (element: HTMLElement, filename: string = 'mindsketch'): Promise<void> => {
  try {
    const canvas = await html2canvas(element, {
      backgroundColor: '#ffffff',
      scale: 2,
      useCORS: true,
      allowTaint: true,
    });
    
    const link = document.createElement('a');
    link.download = `${filename}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (error) {
    console.error('Export to PNG failed:', error);
    throw error;
  }
};

export const exportToSVG = (objects: CanvasObject[], filename: string = 'mindsketch'): void => {
  try {
    const svgContent = generateSVG(objects);
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.download = `${filename}.svg`;
    link.href = url;
    link.click();
    
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Export to SVG failed:', error);
    throw error;
  }
};

export const exportToPDF = async (element: HTMLElement, filename: string = 'mindsketch'): Promise<void> => {
  try {
    const canvas = await html2canvas(element, {
      backgroundColor: '#ffffff',
      scale: 2,
      useCORS: true,
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [canvas.width, canvas.height],
    });
    
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(`${filename}.pdf`);
  } catch (error) {
    console.error('Export to PDF failed:', error);
    throw error;
  }
};

export const exportToJSON = (objects: CanvasObject[], filename: string = 'mindsketch'): void => {
  try {
    const json = JSON.stringify(objects, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.download = `${filename}.json`;
    link.href = url;
    link.click();
    
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Export to JSON failed:', error);
    throw error;
  }
};

export const importFromJSON = (file: File): Promise<CanvasObject[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const objects = JSON.parse(e.target?.result as string);
        resolve(objects);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
};

const generateSVG = (objects: CanvasObject[]): string => {
  const width = 1200;
  const height = 800;
  
  let svgElements = '';
  
  objects.forEach((obj) => {
    switch (obj.type) {
      case 'rectangle':
        svgElements += `<rect x="${obj.x}" y="${obj.y}" width="${obj.width}" height="${obj.height}" fill="${obj.fill || 'transparent'}" stroke="${obj.stroke || '#000'}" stroke-width="${obj.strokeWidth || 1}"/>`;
        break;
      case 'circle':
        const radius = Math.min(obj.width, obj.height) / 2;
        svgElements += `<circle cx="${obj.x + radius}" cy="${obj.y + radius}" r="${radius}" fill="${obj.fill || 'transparent'}" stroke="${obj.stroke || '#000'}" stroke-width="${obj.strokeWidth || 1}"/>`;
        break;
      case 'line':
        if (obj.points && obj.points.length >= 2) {
          svgElements += `<line x1="${obj.points[0].x}" y1="${obj.points[0].y}" x2="${obj.points[1].x}" y2="${obj.points[1].y}" stroke="${obj.stroke || '#000'}" stroke-width="${obj.strokeWidth || 1}"/>`;
        }
        break;
      case 'text':
        svgElements += `<text x="${obj.x}" y="${obj.y + (obj.fontSize || 16)}" font-family="${obj.fontFamily || 'Arial'}" font-size="${obj.fontSize || 16}" fill="${obj.fill || '#000'}">${obj.text || ''}</text>`;
        break;
    }
  });
  
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${svgElements}</svg>`;
};

export const exportCanvas = async (
  format: ExportFormat,
  element: HTMLElement | null,
  objects: CanvasObject[],
  filename?: string
): Promise<void> => {
  const name = filename || `mindsketch_${Date.now()}`;
  
  switch (format) {
    case 'png':
      if (!element) throw new Error('Canvas element required for PNG export');
      await exportToPNG(element, name);
      break;
    case 'svg':
      exportToSVG(objects, name);
      break;
    case 'pdf':
      if (!element) throw new Error('Canvas element required for PDF export');
      await exportToPDF(element, name);
      break;
    case 'json':
      exportToJSON(objects, name);
      break;
    default:
      throw new Error(`Unsupported export format: ${format}`);
  }
};
