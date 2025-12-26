'use client';

import { ReactNode, useState, useRef, useEffect, MouseEvent } from 'react';
import Image from 'next/image';

interface WindowProps {
  title: string;
  icon?: string;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onMinimize?: () => void;
  onFocus?: () => void;
  isActive?: boolean;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
}

export default function Window({
  title,
  icon = '📁',
  children,
  isOpen,
  onClose,
  onMinimize,
  onFocus,
  isActive = true,
  defaultPosition = { x: 100, y: 50 },
  defaultSize = { width: 400, height: 300 },
}: WindowProps) {
  const [position, setPosition] = useState(defaultPosition);
  const [size, setSize] = useState(defaultSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const prevState = useRef({ position, size });

  // detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: globalThis.MouseEvent) => {
      if (isDragging && !isMaximized && !isMobile) {
        setPosition({
          x: e.clientX - dragOffset.current.x,
          y: Math.max(0, e.clientY - dragOffset.current.y),
        });
      }
    };

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isMaximized, isMobile]);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (isMaximized || isMobile) return;
    onFocus?.();
    dragOffset.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    setIsDragging(true);
  };

  const handleMaximize = () => {
    if (isMobile) return;
    if (isMaximized) {
      setPosition(prevState.current.position);
      setSize(prevState.current.size);
    } else {
      prevState.current = { position, size };
      setPosition({ x: 0, y: 0 });
      setSize({ width: window.innerWidth, height: window.innerHeight - 48 });
    }
    setIsMaximized(!isMaximized);
  };

  if (!isOpen) return null;

  // mobile: full screen
  const windowStyle = isMobile
    ? { left: 0, top: 0, width: '100%', height: 'calc(100% - 48px)', zIndex: isActive ? 100 : 10 }
    : {
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex: isActive ? 100 : 10,
      };

  return (
    <div
      className="win98-outset bg-win98-silver absolute flex flex-col min-w-[200px] min-h-[100px]"
      style={windowStyle}
      onClick={onFocus}
    >
      {/* title bar */}
      <div
        className={`${isActive ? 'win98-titlebar-active' : 'win98-titlebar-inactive'} text-white px-2 py-1 flex items-center gap-2 font-bold text-sm md:text-[13px] select-none ${isMobile ? '' : 'cursor-move'}`}
        onMouseDown={handleMouseDown}
        onDoubleClick={handleMaximize}
      >
        {icon.startsWith('/') ? (
          <Image src={icon} alt={title} width={16} height={16} className="w-4 h-4" />
        ) : (
          <span className="text-lg">{icon}</span>
        )}
        <span className="flex-1 truncate">{title}</span>
        <div className="flex gap-1">
          {onMinimize && (
            <button
              className="win98-outset w-6 h-5 md:w-5 md:h-4 bg-win98-silver flex items-center justify-center text-xs text-black"
              onClick={(e) => {
                e.stopPropagation();
                onMinimize();
              }}
            >
              _
            </button>
          )}
          {!isMobile && (
            <button
              className="win98-outset w-6 h-5 md:w-5 md:h-4 bg-win98-silver flex items-center justify-center text-xs text-black"
              onClick={(e) => {
                e.stopPropagation();
                handleMaximize();
              }}
            >
              {isMaximized ? '❐' : '□'}
            </button>
          )}
          <button
            className="win98-outset w-6 h-5 md:w-5 md:h-4 bg-win98-silver flex items-center justify-center text-xs text-black"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            ✕
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}
