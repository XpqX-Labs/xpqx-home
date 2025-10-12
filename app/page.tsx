'use client';

import { useState, Suspense } from 'react';
import TerminalSystem from '@/components/TerminalSystem';
import FetchIp from '@/components/FetchIp';

export default function Home() {
  const [ipAddress, setIpAddress] = useState<string>('');

  return (
    <main className="min-h-screen bg-black">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen bg-black text-white font-mono">
            <div className="text-white">Loading terminal...</div>
          </div>
        }
      >
        <FetchIp onFetch={setIpAddress} />
        <TerminalSystem ipAddress={ipAddress} />
      </Suspense>
    </main>
  );
}
