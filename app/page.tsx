'use client';

import { useState, useCallback } from 'react';
import BootScreen from '@/components/win98/BootScreen';
import DesktopIcon from '@/components/win98/DesktopIcon';
import Taskbar from '@/components/win98/Taskbar';
import StartMenu from '@/components/win98/StartMenu';
import AboutWindow from '@/components/windows/AboutWindow';
import ProjectsWindow from '@/components/windows/ProjectsWindow';
import SkillsWindow from '@/components/windows/SkillsWindow';
import ContactWindow from '@/components/windows/ContactWindow';

type WindowId = 'about' | 'projects' | 'skills' | 'contact';

interface WindowState {
  isOpen: boolean;
  isMinimized: boolean;
}

const desktopIcons = [
  { id: 'about' as WindowId, icon: '/icon/address_book_user.png', label: 'About Me' },
  { id: 'projects' as WindowId, icon: '/icon/briefcase-0.png', label: 'My Projects' },
  { id: 'skills' as WindowId, icon: '/icon/directory_admin_tools-0.png', label: 'Skills' },
  { id: 'contact' as WindowId, icon: '/icon/mailbox_world-0.png', label: 'Contact' },
];

const windowConfig: Record<WindowId, { title: string; icon: string }> = {
  about: { title: 'About Me', icon: '/icon/address_book_user.png' },
  projects: { title: 'My Projects', icon: '/icon/briefcase-0.png' },
  skills: { title: 'Skills', icon: '/icon/directory_admin_tools-0.png' },
  contact: { title: 'Contact', icon: '/icon/mailbox_world-0.png' },
};

export default function Home() {
  const [isBooting, setIsBooting] = useState(true);
  const [windows, setWindows] = useState<Record<WindowId, WindowState>>({
    about: { isOpen: false, isMinimized: false },
    projects: { isOpen: false, isMinimized: false },
    skills: { isOpen: false, isMinimized: false },
    contact: { isOpen: false, isMinimized: false },
  });
  const [activeWindow, setActiveWindow] = useState<WindowId | null>(null);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<WindowId | null>(null);

  const openWindow = useCallback((id: WindowId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { isOpen: true, isMinimized: false },
    }));
    setActiveWindow(id);
    setIsStartMenuOpen(false);
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
      if (['about', 'projects', 'skills', 'contact'].includes(id)) {
        openWindow(id as WindowId);
      }
    },
    [openWindow],
  );

  const openWindows = Object.entries(windows)
    .filter(([, state]) => state.isOpen)
    .map(([id]) => ({
      id,
      title: windowConfig[id as WindowId].title,
      icon: windowConfig[id as WindowId].icon,
      isMinimized: windows[id as WindowId].isMinimized,
    }));

  // show boot screen first
  if (isBooting) {
    return <BootScreen onComplete={() => setIsBooting(false)} />;
  }

  return (
    <div style={{ height: '100vh', paddingBottom: '30px', position: 'relative' }}>
      {/* desktop icons */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          padding: '8px',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
        onClick={() => setSelectedIcon(null)}
      >
        {desktopIcons.map((item) => (
          <DesktopIcon
            key={item.id}
            icon={item.icon}
            label={item.label}
            selected={selectedIcon === item.id}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIcon(item.id);
            }}
            onDoubleClick={() => openWindow(item.id)}
          />
        ))}
      </div>

      {/* windows */}
      <AboutWindow
        isOpen={windows.about.isOpen && !windows.about.isMinimized}
        onClose={() => closeWindow('about')}
        onMinimize={() => minimizeWindow('about')}
        onFocus={() => focusWindow('about')}
        isActive={activeWindow === 'about'}
      />
      <ProjectsWindow
        isOpen={windows.projects.isOpen && !windows.projects.isMinimized}
        onClose={() => closeWindow('projects')}
        onMinimize={() => minimizeWindow('projects')}
        onFocus={() => focusWindow('projects')}
        isActive={activeWindow === 'projects'}
      />
      <SkillsWindow
        isOpen={windows.skills.isOpen && !windows.skills.isMinimized}
        onClose={() => closeWindow('skills')}
        onMinimize={() => minimizeWindow('skills')}
        onFocus={() => focusWindow('skills')}
        isActive={activeWindow === 'skills'}
      />
      <ContactWindow
        isOpen={windows.contact.isOpen && !windows.contact.isMinimized}
        onClose={() => closeWindow('contact')}
        onMinimize={() => minimizeWindow('contact')}
        onFocus={() => focusWindow('contact')}
        isActive={activeWindow === 'contact'}
      />

      {/* start menu */}
      <StartMenu
        isOpen={isStartMenuOpen}
        onClose={() => setIsStartMenuOpen(false)}
        onItemClick={handleStartMenuItemClick}
      />

      {/* taskbar */}
      <Taskbar
        openWindows={openWindows}
        activeWindowId={activeWindow}
        onWindowClick={handleTaskbarWindowClick}
        onStartClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
        isStartMenuOpen={isStartMenuOpen}
      />
    </div>
  );
}
