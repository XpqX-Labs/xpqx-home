import Image from 'next/image'
import bannerImage from '@/public/images/ascii-xpqx.png'

export default function BannerPreloader() {
  return (
    <div style={{ display: 'none' }}>
      <Image
        src={bannerImage}
        alt="Preload Banner"
        priority
        fetchPriority="high"
      />
    </div>
  )
}