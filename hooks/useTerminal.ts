import { useState, useCallback, useRef, useEffect } from 'react';
import { TerminalLine, TerminalState } from '@/types/terminal';
import { executeCommand } from '@/lib/terminal-commands';
import { generateWelcomeBanner, getAsciiBanner, getMobileBanner } from '@/lib/system-info';
import { generateUUID } from '@/lib/uuid';

export const useTerminal = (initialUsername = 'root', initialHostname = 'localhost') => {

  const [state, setState] = useState<TerminalState>({
    history: generateWelcomeBanner().map(content => ({
      id: generateUUID(),
      type: 'output' as const,
      content,
      timestamp: new Date()
    })),
    currentInput: '',
    isLoading: false,
    ipAddress: '',
    username: initialUsername,
    hostname: initialHostname
  });

  const historyRef = useRef<string[]>([]);
  const historyIndexRef = useRef<number>(-1);

  const setIpAddress = useCallback((ip: string) => {
    setState(prev => ({ ...prev, ipAddress: ip }));
  }, []);

  const addLine = useCallback((line: Omit<TerminalLine, 'id' | 'timestamp'>) => {
    setState(prev => ({
      ...prev,
      history: [
        ...prev.history,
        {
          ...line,
          id: generateUUID(),
          timestamp: new Date()
        }
      ]
    }));
  }, []);

  const clearTerminal = useCallback(() => {
    // use responsive banner based on screen width
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const bannerLines = isMobile ? getMobileBanner() : getAsciiBanner();
    
    const banner = bannerLines.map(content => ({
      id: generateUUID(),
      type: 'output' as const,
      content,
      timestamp: new Date()
    }));
    
    setState(prev => ({
      ...prev,
      history: banner
    }));
  }, []);

  const executeTerminalCommand = useCallback(async (input: string) => {
    const trimmedInput = input.trim();
    
    // add command line to display (always show prompt)
    addLine({
      type: 'command',
      content: `${state.username}@${state.ipAddress || state.hostname}:~# ${trimmedInput}`
    });

    // if empty input, just clear input and return
    if (!trimmedInput) {
      setState(prev => ({ ...prev, currentInput: '' }));
      return;
    }

    // add command to history (only non-empty commands)
    historyRef.current.unshift(trimmedInput);
    if (historyRef.current.length > 100) {
      historyRef.current = historyRef.current.slice(0, 100);
    }
    historyIndexRef.current = -1;

    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const result = await executeCommand(trimmedInput);
      
      if (result.output.includes('__CLEAR__')) {
        clearTerminal();
      } else {
        // add output lines
        result.output.forEach(outputLine => {
          if (outputLine) {
            addLine({
              type: 'output',
              content: outputLine
            });
          }
        });

        // add error if present
        if (result.error) {
          addLine({
            type: 'error',
            content: result.error
          });
        }
      }
    } catch (error) {
      addLine({
        type: 'error',
        content: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    }

    setState(prev => ({ 
      ...prev, 
      isLoading: false, 
      currentInput: '' 
    }));
  }, [state.username, state.hostname, state.ipAddress, addLine, clearTerminal]);

  const setCurrentInput = useCallback((input: string) => {
    setState(prev => ({ ...prev, currentInput: input }));
  }, []);

  const navigateHistory = useCallback((direction: 'up' | 'down') => {
    if (direction === 'up') {
      historyIndexRef.current = Math.min(
        historyIndexRef.current + 1,
        historyRef.current.length - 1
      );
    } else {
      historyIndexRef.current = Math.max(historyIndexRef.current - 1, -1);
    }

    const historyCommand = historyIndexRef.current >= 0 
      ? historyRef.current[historyIndexRef.current] 
      : '';
    
    setCurrentInput(historyCommand);
  }, [setCurrentInput]);

  return {
    state,
    executeCommand: executeTerminalCommand,
    setCurrentInput,
    navigateHistory,
    setIpAddress,
    clearTerminal
  };
};
