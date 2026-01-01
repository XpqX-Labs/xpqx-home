import { WindowId } from '@/types/window';

export const desktopIcons = [
  { id: 'about' as WindowId, icon: '/icon/address_book_user.png', label: 'About Me' },
  { id: 'projects' as WindowId, icon: '/icon/briefcase-0.png', label: 'My Projects' },
  { id: 'skills' as WindowId, icon: '/icon/directory_admin_tools-0.png', label: 'Skills' },
  { id: 'contact' as WindowId, icon: '/icon/mailbox_world-0.png', label: 'Contact' },
  { id: 'blog' as WindowId, icon: '/icon/web_file_set-2.png', label: 'Blog' },
];

export const windowConfig: Record<WindowId, { title: string; icon: string }> = {
  about: { title: 'About Me', icon: '/icon/address_book_user.png' },
  projects: { title: 'My Projects', icon: '/icon/briefcase-0.png' },
  skills: { title: 'Skills', icon: '/icon/directory_admin_tools-0.png' },
  contact: { title: 'Contact', icon: '/icon/mailbox_world-0.png' },
  blog: { title: 'Blog', icon: '/icon/web_file_set-2.png' },
};

export const windowIds: WindowId[] = ['about', 'projects', 'skills', 'contact', 'blog'];
