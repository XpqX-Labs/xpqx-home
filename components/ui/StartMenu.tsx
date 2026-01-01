import Image from 'next/image';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onItemClick: (itemId: string) => void;
}

type MenuItem = { id: string; icon: string; label: string; external?: string } | { divider: true };

const menuItems: MenuItem[] = [
  { id: 'about', icon: '/icon/address_book_user.png', label: 'About Me' },
  { id: 'projects', icon: '/icon/briefcase-0.png', label: 'My Projects' },
  { id: 'skills', icon: '/icon/directory_admin_tools-0.png', label: 'Skills' },
  { id: 'contact', icon: '/icon/mailbox_world-0.png', label: 'Contact' },
  { id: 'blog', icon: '/icon/web_file_set-2.png', label: 'Blog' },
  { divider: true },
  {
    id: 'github',
    icon: '/icon/connected_world-0.png',
    label: 'GitHub',
    external: 'https://github.com/ujangdoubleday',
  },
  {
    id: 'linkedin',
    icon: '/icon/briefcase-0.png',
    label: 'LinkedIn',
    external: 'https://linkedin.com/in/ilhamalfath',
  },
];

export default function StartMenu({ isOpen, onClose, onItemClick }: StartMenuProps) {
  if (!isOpen) return null;

  const handleItemClick = (e: React.MouseEvent | React.TouchEvent, item: MenuItem) => {
    e.preventDefault();
    e.stopPropagation();

    if ('divider' in item) return;

    // use setTimeout to ensure state updates complete
    setTimeout(() => {
      if (item.external) {
        window.open(item.external, '_blank');
      } else {
        onItemClick(item.id);
      }
      onClose();
    }, 0);
  };

  return (
    <>
      {/* backdrop */}
      <div
        className="fixed inset-0 z-[9999]"
        onClick={onClose}
        onTouchEnd={(e) => {
          e.preventDefault();
          onClose();
        }}
        style={{ bottom: '48px' }}
      />

      {/* menu */}
      <div
        className="win98-outset fixed bottom-12 md:bottom-10 left-0 w-[240px] md:w-[220px] bg-win98-silver z-[10000]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* sidebar */}
        <div className="absolute left-0 top-0 bottom-0 w-7 md:w-6 bg-gradient-to-b from-win98-title to-[#1084d0] flex items-end pb-2">
          <span className="text-win98-light font-bold text-base md:text-sm [writing-mode:vertical-rl] rotate-180 tracking-wider">
            Windows98
          </span>
        </div>

        {/* items */}
        <div className="ml-7 md:ml-6 py-1">
          {menuItems.map((item, idx) => {
            if ('divider' in item) {
              return (
                <div
                  key={`divider-${idx}`}
                  className="h-px my-1 mx-2 border-t border-win98-dark border-b border-win98-light"
                />
              );
            }
            return (
              <button
                key={item.id}
                type="button"
                className="w-full flex items-center gap-2 px-3 py-2 md:py-1.5 text-sm md:text-[13px] cursor-pointer hover:bg-win98-title hover:text-white active:bg-win98-title active:text-white text-left bg-transparent border-none"
                onClick={(e) => handleItemClick(e, item)}
              >
                {item.icon.startsWith('/') ? (
                  <Image
                    src={item.icon}
                    alt=""
                    width={20}
                    height={20}
                    className="w-5 h-5 md:w-4 md:h-4"
                  />
                ) : (
                  <span className="text-xl md:text-lg">{item.icon}</span>
                )}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
