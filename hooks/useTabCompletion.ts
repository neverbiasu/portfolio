
import { useState, useCallback } from 'react';

interface UseTabCompletionOptions {
  commands: string[];
  input: string;
  onComplete: (value: string) => void;
}

interface UseTabCompletionReturn {
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  suggestion: string | null;
  clearSuggestion: () => void;
}

/**
 * Custom hook for terminal Tab auto-completion
 * 
 * Features:
 * - Single match: auto-completes immediately
 * - Multiple matches: cycles through with repeated Tab presses
 * - Shows inline ghost text for current suggestion
 */
export function useTabCompletion({
  commands,
  input,
  onComplete,
}: UseTabCompletionOptions): UseTabCompletionReturn {
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [lastInput, setLastInput] = useState('');

  // Find all commands that start with current input
  const getMatches = useCallback((text: string): string[] => {
    if (!text.trim()) return [];
    const lowerText = text.toLowerCase();
    return commands.filter(cmd => 
      cmd.toLowerCase().startsWith(lowerText) && cmd.toLowerCase() !== lowerText
    );
  }, [commands]);

  // Get current suggestion based on input
  const matches = getMatches(input);
  const suggestion = matches.length > 0 ? matches[suggestionIndex % matches.length] : null;

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      
      const currentMatches = getMatches(input);
      
      if (currentMatches.length === 0) {
        return;
      }

      if (currentMatches.length === 1) {
        // Single match - complete immediately
        onComplete(currentMatches[0]);
        setSuggestionIndex(0);
        setLastInput('');
      } else {
        // Multiple matches - cycle through or complete current
        if (input === lastInput) {
          // User pressed Tab again, cycle to next suggestion
          const nextIndex = (suggestionIndex + 1) % currentMatches.length;
          setSuggestionIndex(nextIndex);
          onComplete(currentMatches[nextIndex]);
        } else {
          // First Tab press on this input, complete with first match
          setSuggestionIndex(0);
          onComplete(currentMatches[0]);
          setLastInput(currentMatches[0]);
        }
      }
    } else if (e.key === 'Escape') {
      // Clear suggestion state
      setSuggestionIndex(0);
      setLastInput('');
    } else {
      // Any other key resets the cycling
      if (e.key !== 'Shift' && e.key !== 'Control' && e.key !== 'Alt' && e.key !== 'Meta') {
        setSuggestionIndex(0);
        setLastInput('');
      }
    }
  }, [input, lastInput, suggestionIndex, getMatches, onComplete]);

  const clearSuggestion = useCallback(() => {
    setSuggestionIndex(0);
    setLastInput('');
  }, []);

  return {
    handleKeyDown,
    suggestion,
    clearSuggestion,
  };
}

