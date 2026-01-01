'use client';

import { useState, useCallback } from 'react';
import { WindowId, WindowState } from '@/types/window';
import { windowConfig, windowIds } from '@/constants/desktop';

const initialWindowState: Record<WindowId, WindowState> = {
  about: { isOpen: false, isMinimized: false },
  projects: { isOpen: false, isMinimized: false },
  skills: { isOpen: false, isMinimized: false },
  contact: { isOpen: false, isMinimized: false },
  blog: { isOpen: false, isMinimized: false },
};

export function useWindowManager() {
  const [windows, setWindows] = useState<Record<WindowId, WindowState>>(initialWindowState);
  const [activeWindow, setActiveWindow] = useState<WindowId | null>(null);

  const openWindow = useCallback((id: WindowId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { isOpen: true, isMinimized: false },
    }));
    setActiveWindow(id);
  }, []);

  const closeWindow = useCallback(
    (id: WindowId) => {
      setWindows((prev) => ({
        ...prev,
        [id]: { isOpen: false, isMinimized: false },
      }));
      if (activeWindow === id) {
        const openWindows = Object.entries(windows).filter(
          ([key, state]) => key !== id && state.isOpen && !state.isMinimized,
        );
        setActiveWindow(openWindows.length > 0 ? (openWindows[0][0] as WindowId) : null);
      }
    },
    [activeWindow, windows],
  );

  const minimizeWindow = useCallback(
    (id: WindowId) => {
      setWindows((prev) => ({
        ...prev,
        [id]: { ...prev[id], isMinimized: true },
      }));
      if (activeWindow === id) {
        const openWindows = Object.entries(windows).filter(
          ([key, state]) => key !== id && state.isOpen && !state.isMinimized,
        );
        setActiveWindow(openWindows.length > 0 ? (openWindows[0][0] as WindowId) : null);
      }
    },
    [activeWindow, windows],
  );

  const focusWindow = useCallback((id: WindowId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: false },
    }));
    setActiveWindow(id);
  }, []);

  const handleTaskbarWindowClick = useCallback(
    (id: string) => {
      const windowId = id as WindowId;
      if (windows[windowId].isMinimized) {
        focusWindow(windowId);
      } else if (activeWindow === windowId) {
        minimizeWindow(windowId);
      } else {
        focusWindow(windowId);
      }
    },
    [activeWindow, windows, focusWindow, minimizeWindow],
  );

  const handleStartMenuItemClick = useCallback(
    (id: string) => {
      if (windowIds.includes(id as WindowId)) {
        openWindow(id as WindowId);
      }
    },
    [openWindow],
  );

  const openWindowsList = Object.entries(windows)
    .filter(([, state]) => state.isOpen)
    .map(([id]) => ({
      id,
      title: windowConfig[id as WindowId].title,
      icon: windowConfig[id as WindowId].icon,
      isMinimized: windows[id as WindowId].isMinimized,
    }));

  return {
    windows,
    activeWindow,
    openWindow,
    closeWindow,
    minimizeWindow,
    focusWindow,
    handleTaskbarWindowClick,
    handleStartMenuItemClick,
    openWindowsList,
  };
}
