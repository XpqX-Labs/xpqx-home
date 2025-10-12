import { useState, useCallback } from 'react';

export type BootState = 'booting' | 'ready';

export const useBootSequence = (autoStart = false) => {
  const [bootState, setBootState] = useState<BootState>(autoStart ? 'booting' : 'ready');

  const startBoot = useCallback(() => {
    setBootState('booting');
  }, []);

  const completeBoot = useCallback(() => {
    setBootState('ready');
  }, []);

  const resetBoot = useCallback(() => {
    setBootState('booting');
  }, []);

  return {
    bootState,
    isBooting: bootState === 'booting',
    isReady: bootState === 'ready',
    startBoot,
    completeBoot,
    resetBoot
  };
};
