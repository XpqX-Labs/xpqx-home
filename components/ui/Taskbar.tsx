'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface TaskbarProps {
  openWindows: { id: string; title: string; icon: string; isMinimized: boolean }[];
  activeWindowId: string | null;
  onWindowClick: (id: string) => void;
  onStartClick: () => void;
  isStartMenuOpen: boolean;
}

export default function Taskbar({
  openWindows,
  activeWindowId,
  onWindowClick,
  onStartClick,
  isStartMenuOpen,
}: TaskbarProps) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="win98-outset fixed bottom-0 left-0 right-0 h-12 md:h-10 bg-win98-silver flex items-center px-1 gap-1 z-[9999]">
      {/* start button */}
      <button
        className={`${isStartMenuOpen ? 'win98-inset' : 'win98-outset'} flex items-center gap-1 px-2 md:px-1.5 h-9 md:h-7 font-bold bg-win98-silver text-sm md:text-[13px]`}
        onClick={onStartClick}
      >
        <Image
          src="https://img.icons8.com/color/48/windows-95.png"
          alt="Start"
          width={20}
          height={20}
          className="w-5 h-5 md:w-4 md:h-4"
          unoptimized
        />
        <span>Start</span>
      </button>

      {/* divider */}
      <div className="w-0.5 h-8 md:h-6 mx-0.5 border-l border-win98-dark border-r border-win98-light" />

      {/* open windows */}
      <div className="flex gap-0.5 flex-1 overflow-x-auto">
        {openWindows.map((window) => (
          <button
            key={window.id}
            className={`${activeWindowId === window.id && !window.isMinimized ? 'win98-inset' : 'win98-outset'} h-9 md:h-7 min-w-[100px] md:min-w-[120px] max-w-[140px] md:max-w-[160px] flex items-center gap-1 px-2 text-sm md:text-[13px] overflow-hidden whitespace-nowrap bg-win98-silver shrink-0`}
            onClick={() => onWindowClick(window.id)}
          >
            {window.icon.startsWith('/') ? (
              <Image src={window.icon} alt="" width={16} height={16} className="w-4 h-4" />
            ) : (
              <span>{window.icon}</span>
            )}
            <span className="truncate">{window.title}</span>
          </button>
        ))}
      </div>

      {/* clock */}
      <div className="win98-inset px-2 py-1 text-sm md:text-[13px] ml-auto shrink-0">{time}</div>
    </div>
  );
}
