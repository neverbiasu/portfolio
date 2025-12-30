
import { useState, useCallback } from 'react';

interface UseCommandHistoryOptions {
  onRestore: (command: string) => void;
}

interface UseCommandHistoryReturn {
  addCommand: (command: string) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  resetIndex: () => void;
}

/**
 * Custom hook for terminal command history navigation
 * 
 * Features:
 * - Stores executed commands in history
 * - Up arrow: navigate to previous command
 * - Down arrow: navigate to next command
 * - Resets navigation index when new command is entered
 */
export function useCommandHistory({
  onRestore,
}: UseCommandHistoryOptions): UseCommandHistoryReturn {
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [tempInput, setTempInput] = useState('');

  const addCommand = useCallback((command: string) => {
    if (command.trim()) {
      setHistory(prev => [...prev, command]);
    }
    setHistoryIndex(-1);
    setTempInput('');
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      
      if (history.length === 0) return;
      
      // Save current input when starting to navigate
      if (historyIndex === -1) {
        setTempInput((e.target as HTMLInputElement).value);
      }
      
      // Move up in history (towards older commands)
      const newIndex = historyIndex === -1 
        ? history.length - 1 
        : Math.max(0, historyIndex - 1);
      
      setHistoryIndex(newIndex);
      onRestore(history[newIndex]);
      
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      
      if (historyIndex === -1) return;
      
      // Move down in history (towards newer commands)
      const newIndex = historyIndex + 1;
      
      if (newIndex >= history.length) {
        // Reached the end, restore temp input
        setHistoryIndex(-1);
        onRestore(tempInput);
      } else {
        setHistoryIndex(newIndex);
        onRestore(history[newIndex]);
      }
    }
  }, [history, historyIndex, tempInput, onRestore]);

  const resetIndex = useCallback(() => {
    setHistoryIndex(-1);
    setTempInput('');
  }, []);

  return {
    addCommand,
    handleKeyDown,
    resetIndex,
  };
}

