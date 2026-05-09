import { useEffect, useCallback } from 'react';
import { useCanvasStore } from '@/stores';

export const useKeyboard = () => {
  const {
    undo,
    redo,
    deleteSelected,
    duplicateSelected,

    setTool,
  } = useCanvasStore();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const ctrlKey = isMac ? e.metaKey : e.ctrlKey;

      // Undo: Ctrl/Cmd + Z
      if (ctrlKey && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      }

      // Redo: Ctrl/Cmd + Shift + Z or Ctrl/Cmd + Y
      if ((ctrlKey && e.key === 'z' && e.shiftKey) || (ctrlKey && e.key === 'y')) {
        e.preventDefault();
        redo();
      }

      // Delete: Delete or Backspace
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        deleteSelected();
      }

      // Duplicate: Ctrl/Cmd + D
      if (ctrlKey && e.key === 'd') {
        e.preventDefault();
        duplicateSelected();
      }

      // Select All: Ctrl/Cmd + A
      if (ctrlKey && e.key === 'a') {
        e.preventDefault();
        // selectAll(); // Implement if needed
      }

      // Tool shortcuts
      switch (e.key.toLowerCase()) {
        case 'v':
          setTool('select');
          break;
        case 'h':
          setTool('hand');
          break;
        case 'r':
          setTool('rectangle');
          break;
        case 'c':
          setTool('circle');
          break;
        case 'l':
          setTool('line');
          break;
        case 't':
          setTool('text');
          break;
        case 'p':
          setTool('pencil');
          break;
        case 'e':
          setTool('eraser');
          break;
        case 'm':
          setTool('mindmap');
          break;
        case 'f':
          setTool('flowchart');
          break;
      }

      // Escape: Clear selection
      if (e.key === 'Escape') {
        useCanvasStore.getState().clearSelection();
      }
    },
    [undo, redo, deleteSelected, duplicateSelected, setTool]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
};
