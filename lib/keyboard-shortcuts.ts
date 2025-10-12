export const setupGlobalKeyboardShortcuts = (): (() => void) => {
  const handleGlobalKeyDown = (e: globalThis.KeyboardEvent) => {
    // block common browser shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 's':
        case 'p':
        case 'u':
        case 'r':
        case 'f':
        case 'g':
        case 'h':
        case 'j':
        case 'k':
        case 'd':
        case 'n':
        case 't':
        case 'w':
        case 'shift+i':
        case 'shift+j':
        case 'shift+c':
          e.preventDefault();
          break;
      }
    }
    
    // block F12 (Developer tools)
    if (e.key === 'F12') {
      e.preventDefault();
    }
  };

  document.addEventListener('keydown', handleGlobalKeyDown, true);
  
  // return cleanup function
  return () => {
    document.removeEventListener('keydown', handleGlobalKeyDown, true);
  };
};
