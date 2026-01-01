import Window from '@/components/ui/Window';
import Button from '@/components/ui/Button';
import Image from 'next/image';

interface BlogWindowProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  isActive: boolean;
}

export default function BlogWindow({
  isOpen,
  onClose,
  onMinimize,
  onFocus,
  isActive,
}: BlogWindowProps) {
  const blogUrl = 'http://blog.xpqx.xyz/';

  const handleGoToBlog = () => {
    window.open(blogUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Window
      title="Blog - Internet Explorer"
      icon="🌐"
      isOpen={isOpen}
      onClose={onClose}
      onMinimize={onMinimize}
      onFocus={onFocus}
      isActive={isActive}
      defaultPosition={{ x: 120, y: 60 }}
      defaultSize={{ width: 480, height: 420 }}
    >
      <div className="flex-1 p-3 md:p-2 overflow-hidden bg-win98-silver flex flex-col">
        {/* address bar */}
        <div className="flex items-center gap-2 mb-3 text-base md:text-sm">
          <label className="font-bold">Address:</label>
          <div className="win98-inset flex-1 px-3 py-2 md:px-2 md:py-1 bg-white flex items-center gap-2">
            <Image
              src="/icon/web_file_set-2.png"
              alt="Blog"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span className="text-blue-700">{blogUrl}</span>
          </div>
        </div>

        <hr className="my-3 border-0 border-t border-win98-dark border-b border-white" />

        {/* confirmation dialog */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="win98-outset bg-win98-silver p-6 md:p-4 max-w-sm w-full">
            {/* dialog title */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl md:text-3xl">❓</span>
              <div>
                <p className="font-bold text-base md:text-sm mb-1">External Link Navigation</p>
                <p className="text-sm md:text-xs text-gray-700">Security Warning</p>
              </div>
            </div>

            {/* message */}
            <div className="win98-inset bg-white p-4 md:p-3 mb-4">
              <p className="text-base md:text-sm mb-3">
                Are you sure you want to navigate to this link?
              </p>
              <p className="text-blue-700 underline text-base md:text-sm break-all">{blogUrl}</p>
            </div>

            {/* info */}
            <div className="flex items-start gap-2 p-3 md:p-2 bg-yellow-100 border border-yellow-500 text-sm md:text-xs mb-4">
              <span className="text-yellow-600 text-lg">⚠️</span>
              <span>You will leave this site and open a new tab to an external blog.</span>
            </div>

            {/* buttons */}
            <div className="flex justify-end gap-2">
              <Button onClick={handleGoToBlog}>✓ Yes, Continue</Button>
              <Button onClick={onClose}>✕ Cancel</Button>
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
}
