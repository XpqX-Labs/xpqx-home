'use client';

import Image from 'next/image';

interface AsciiBannerProps {
  showCredit?: boolean;
}

export default function AsciiBanner({ showCredit = true }: AsciiBannerProps) {
  return (
    <div className="flex flex-col items-start w-full -mb-2">
      <Image
        src="/images/ascii-xpqx.png"
        alt="XPQX.XYZ ASCII Art"
        width={600}
        height={200}
        className="max-w-full h-auto"
        priority
        style={{
          imageRendering: 'pixelated'
        }}
      />
    </div>
  );
}
