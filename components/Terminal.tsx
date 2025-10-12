'use client';

import { useEffect, useRef } from 'react';
import { useTerminal } from '@/hooks/useTerminal';
import { createTerminalEventHandlers } from '@/lib/terminal-events';
import { setupGlobalKeyboardShortcuts } from '@/lib/keyboard-shortcuts';
import AsciiBanner from './AsciiBanner';

interface TerminalProps {
  ipAddress?: string;
}

export default function Terminal({ ipAddress }: TerminalProps) {
  const { state, executeCommand, setCurrentInput, navigateHistory, setIpAddress } = useTerminal();
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // set IP address when it becomes available
  useEffect(() => {
    if (ipAddress) {
      setIpAddress(ipAddress);
    }
  }, [ipAddress, setIpAddress]);

  // auto-focus input and scroll to bottom
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [state.history]);

  // block global keyboard shortcuts
  useEffect(() => {
    return setupGlobalKeyboardShortcuts();
  }, []);

  // create event handlers
  const eventHandlers = createTerminalEventHandlers(
    inputRef,
    executeCommand,
    navigateHistory,
    state.currentInput
  );

  const getPrompt = () => {
    const hostname = state.ipAddress || state.hostname;
    return `${state.username}@${hostname}:~#`;
  };

  const renderLine = (line: typeof state.history[0]) => {
    let className = 'mb-1';
    
    switch (line.type) {
      case 'command':
        className += ' text-white font-bold';
        break;
      case 'output':
        className += ' text-gray-200';
        break;
      case 'error':
        className += ' text-red-400';
        break;
    }

    // special handling for banner image
    if (line.content === '__BANNER_IMAGE__') {
      return (
        <div key={line.id} className="mb-1">
          <AsciiBanner showCredit={false} />
        </div>
      );
    }

    // helper function to render content with clickable links
    const renderContent = (content: string) => {
      // regex patterns for different types of links
      const urlPattern = /(https?:\/\/[^\s]+)/g;
      const emailPattern = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
      
      // check if content contains URLs or emails
      if (urlPattern.test(content) || emailPattern.test(content)) {
        const parts = content.split(/(https?:\/\/[^\s]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g);
        
        return parts.map((part, index) => {
          if (urlPattern.test(part)) {
            return (
              <a 
                key={index}
                href={part}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline cursor-pointer"
              >
                {part}
              </a>
            );
          } else if (emailPattern.test(part)) {
            return (
              <a 
                key={index}
                href={`mailto:${part}`}
                className="text-blue-400 hover:text-blue-300 underline cursor-pointer"
              >
                {part}
              </a>
            );
          }
          return part;
        });
      }
      
      return content;
    };

    return (
      <div key={line.id} className={className}>
        {renderContent(line.content)}
      </div>
    );
  };

  return (
    <div 
      ref={terminalRef}
      className="w-full h-screen bg-black text-white font-mono p-4 sm:p-6 overflow-y-auto cursor-text select-none terminal-strict scrollbar-thin"
      onClick={eventHandlers.handleTerminalClick}
      onContextMenu={eventHandlers.handleContextMenu}
      onMouseDown={eventHandlers.handleMouseDown}
      onDragStart={eventHandlers.handleDragStart}
      onDrop={eventHandlers.handleDrop}
      onDragOver={eventHandlers.handleDragOver}
    >
      <div className="max-w-full whitespace-pre-wrap break-words text-[3.2vw] sm:text-[2.2vw] md:text-sm lg:text-base transition-all duration-300 ease-in-out">
        {state.history.map(renderLine)}
        
        <div className="flex items-center mb-1">
          <span className="text-white font-bold mr-2">
            {getPrompt()}
          </span>
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={state.currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={eventHandlers.handleKeyDown}
              onPaste={(e) => e.preventDefault()}
              onCopy={(e) => e.preventDefault()}
              onCut={(e) => e.preventDefault()}
              onContextMenu={(e) => e.preventDefault()}
              className="bg-transparent border-none outline-none text-white font-mono w-full"
              disabled={state.isLoading}
              autoComplete="off"
              spellCheck={false}
              autoCorrect="off"
              autoCapitalize="off"
            />
            {state.isLoading && (
              <span className="absolute right-0 top-0 animate-pulse text-yellow-400">
                ...
              </span>
            )}
          </div>
        </div>
      </div>
      
      {state.isLoading && (
        <div className="text-yellow-400 text-sm mt-2">
          Processing command...
        </div>
      )}
    </div>
  );
}
