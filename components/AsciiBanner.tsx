'use client'

import Image from 'next/image'
import bannerImage from '@/public/images/ascii-xpqx.png'

export default function AsciiBanner() {
  return (
    <div className="flex flex-col items-start w-full -mb-2">
      <Image
        src={bannerImage}
        alt="XPQX.XYZ ASCII Art"
        className="max-w-full h-auto"
        priority
        fetchPriority="high"
        style={{
          imageRendering: 'pixelated'
        }}
      />
    </div>
  )
}