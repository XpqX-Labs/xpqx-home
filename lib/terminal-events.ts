import { KeyboardEvent, MouseEvent, DragEvent } from 'react';

export interface TerminalEventHandlers {
  handleTerminalClick: () => void;
  handleContextMenu: (e: MouseEvent) => void;
  handleMouseDown: (e: MouseEvent) => void;
  handleDragStart: (e: DragEvent) => void;
  handleDrop: (e: DragEvent) => void;
  handleDragOver: (e: DragEvent) => void;
  handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export const createTerminalEventHandlers = (
  inputRef: React.RefObject<HTMLInputElement | null>,
  executeCommand: (input: string) => void,
  navigateHistory: (direction: 'up' | 'down') => void,
  currentInput: string
): TerminalEventHandlers => {
  
  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
  };

  const handleMouseDown = (e: MouseEvent) => {
    e.preventDefault();
  };

  const handleDragStart = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // block all Ctrl combinations except Ctrl+L for clear
    if (e.ctrlKey) {
      if (e.key === 'l' || e.key === 'L') {
        e.preventDefault();
        executeCommand('clear');
        return;
      }
      // block all other Ctrl combinations
      e.preventDefault();
      return;
    }

    // block Alt combinations
    if (e.altKey) {
      e.preventDefault();
      return;
    }

    // block Meta/Cmd combinations (for Mac)
    if (e.metaKey) {
      e.preventDefault();
      return;
    }

    // block F-keys and other system keys
    if (e.key.startsWith('F') && e.key.length > 1) {
      e.preventDefault();
      return;
    }

    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        executeCommand(currentInput);
        break;
      case 'ArrowUp':
        e.preventDefault();
        navigateHistory('up');
        break;
      case 'ArrowDown':
        e.preventDefault();
        navigateHistory('down');
        break;
      case 'Tab':
        e.preventDefault();
        // basic tab completion could be implemented here
        break;
      case 'Escape':
      case 'Insert':
      case 'Delete':
      case 'Home':
      case 'End':
      case 'PageUp':
      case 'PageDown':
        e.preventDefault();
        break;
    }
  };

  return {
    handleTerminalClick,
    handleContextMenu,
    handleMouseDown,
    handleDragStart,
    handleDrop,
    handleDragOver,
    handleKeyDown
  };
};
