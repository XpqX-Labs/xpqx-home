'use client';

import { useState } from 'react';
import BootScreen from '@/components/ui/BootScreen';
import DesktopIcon from '@/components/ui/DesktopIcon';
import Taskbar from '@/components/ui/Taskbar';
import StartMenu from '@/components/ui/StartMenu';
import AboutWindow from '@/components/features/AboutWindow';
import ProjectsWindow from '@/components/features/ProjectsWindow';
import SkillsWindow from '@/components/features/SkillsWindow';
import ContactWindow from '@/components/features/ContactWindow';
import BlogWindow from '@/components/features/BlogWindow';
import { desktopIcons } from '@/constants/desktop';
import { useWindowManager } from '@/hooks/useWindowManager';
import { WindowId } from '@/types/window';

export default function Home() {
  const [isBooting, setIsBooting] = useState(true);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<WindowId | null>(null);

  const {
    windows,
    activeWindow,
    openWindow,
    closeWindow,
    minimizeWindow,
    focusWindow,
    handleTaskbarWindowClick,
    handleStartMenuItemClick: onStartMenuItemClick,
    openWindowsList,
  } = useWindowManager();

  const handleStartMenuItemClick = (id: string) => {
    onStartMenuItemClick(id);
    setIsStartMenuOpen(false);
  };

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
      <BlogWindow
        isOpen={windows.blog.isOpen && !windows.blog.isMinimized}
        onClose={() => closeWindow('blog')}
        onMinimize={() => minimizeWindow('blog')}
        onFocus={() => focusWindow('blog')}
        isActive={activeWindow === 'blog'}
      />

      {/* start menu */}
      <StartMenu
        isOpen={isStartMenuOpen}
        onClose={() => setIsStartMenuOpen(false)}
        onItemClick={handleStartMenuItemClick}
      />

      {/* taskbar */}
      <Taskbar
        openWindows={openWindowsList}
        activeWindowId={activeWindow}
        onWindowClick={handleTaskbarWindowClick}
        onStartClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
        isStartMenuOpen={isStartMenuOpen}
      />
    </div>
  );
}
