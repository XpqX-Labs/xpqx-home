'use client';

import { useBootSequence } from '@/hooks/useBootSequence';
import BootLoader from './BootLoader';
import Terminal from './Terminal';

interface TerminalSystemProps {
  ipAddress?: string;
}

export default function TerminalSystem({ ipAddress }: TerminalSystemProps) {
  const { isBooting, completeBoot } = useBootSequence(true);

  if (isBooting) {
    return <BootLoader onBootComplete={completeBoot} />;
  }

  return <Terminal ipAddress={ipAddress} />;
}
