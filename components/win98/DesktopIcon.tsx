'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface DesktopIconProps {
  icon: string;
  label: string;
  onDoubleClick: () => void;
  selected?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export default function DesktopIcon({
  icon,
  label,
  onDoubleClick,
  selected,
  onClick,
}: DesktopIconProps) {
  const [isMobile, setIsMobile] = useState(false);

  // detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // check if icon is an image path or emoji
  const isImageIcon = icon.startsWith('/');

  const handleClick = (e: React.MouseEvent) => {
    onClick?.(e);
    // on mobile, single click opens window
    if (isMobile) {
      onDoubleClick();
    }
  };

  return (
    <div
      className="flex flex-col items-center w-20 md:w-[70px] p-2 md:p-1 cursor-pointer text-center group"
      onDoubleClick={!isMobile ? onDoubleClick : undefined}
      onClick={handleClick}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onDoubleClick()}
    >
      <div className="w-12 h-12 md:w-10 md:h-10 flex items-center justify-center">
        {isImageIcon ? (
          <Image
            src={icon}
            alt={label}
            width={48}
            height={48}
            className="w-10 h-10 md:w-8 md:h-8"
          />
        ) : (
          <span className="text-4xl md:text-3xl">{icon}</span>
        )}
      </div>
      <span
        className={`text-sm md:text-xs text-white px-1 break-words [text-shadow:1px_1px_2px_rgba(0,0,0,0.9)] ${
          selected ? 'bg-win98-title' : 'group-hover:bg-win98-title'
        }`}
      >
        {label}
      </span>
    </div>
  );
}
