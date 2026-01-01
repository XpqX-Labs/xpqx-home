export type WindowId = 'about' | 'projects' | 'skills' | 'contact' | 'blog';

export interface WindowState {
  isOpen: boolean;
  isMinimized: boolean;
}
