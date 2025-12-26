'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface BootScreenProps {
  onComplete: () => void;
}

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // animate progress bar with blocks
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 4;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  // calculate number of blocks to show (25 blocks total for full bar)
  const blockCount = Math.floor((progress / 100) * 25);

  return (
    <div className="fixed inset-0 bg-[#008080] flex flex-col items-center justify-center z-[10001]">
      {/* windows 98 logo image */}
      <div className="mb-8">
        <Image
          src="/images/Windows_98.png"
          alt="Windows 98"
          width={400}
          height={300}
          className="w-64 md:w-80 h-auto"
          priority
        />
      </div>

      {/* progress bar with blue blocks on gray background */}
      <div className="w-64 md:w-80">
        {/* progress bar container - gray background */}
        <div
          className="h-5 md:h-6 bg-[#c0c0c0] border-2"
          style={{
            borderColor: '#808080 #ffffff #ffffff #808080',
          }}
        >
          {/* blocks container */}
          <div className="h-full flex gap-0.5 p-0.5">
            {Array.from({ length: blockCount }).map((_, idx) => (
              <div key={idx} className="h-full w-2.5 md:w-3 bg-[#000080]" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
