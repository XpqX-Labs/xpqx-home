import Window from '@/components/ui/Window';
import Button from '@/components/ui/Button';

interface ContactWindowProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  isActive: boolean;
}

export default function ContactWindow({
  isOpen,
  onClose,
  onMinimize,
  onFocus,
  isActive,
}: ContactWindowProps) {
  return (
    <Window
      title="Contact - Outlook Express"
      icon="📧"
      isOpen={isOpen}
      onClose={onClose}
      onMinimize={onMinimize}
      onFocus={onFocus}
      isActive={isActive}
      defaultPosition={{ x: 90, y: 70 }}
      defaultSize={{ width: 520, height: 460 }}
    >
      <div className="flex-1 p-3 md:p-2 overflow-auto bg-win98-silver">
        {/* compose area */}
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-2 text-base md:text-sm">
            <label className="w-16 md:w-12 font-bold">To:</label>
            <div className="win98-inset flex-1 px-3 py-2 md:px-2 md:py-1 bg-white">
              ilham28alfath@gmail.com
            </div>
          </div>
          <div className="flex items-center gap-2 text-base md:text-sm">
            <label className="w-16 md:w-12 font-bold">Subject:</label>
            <div className="win98-inset flex-1 px-3 py-2 md:px-2 md:py-1 bg-white">
              Let&apos;s work together!
            </div>
          </div>
        </div>

        <hr className="my-3 border-0 border-t border-win98-dark border-b border-white" />

        {/* contact info */}
        <div className="win98-inset bg-white p-4 md:p-3 mb-3">
          <p className="mb-3 font-bold text-base md:text-sm">📇 Contact Information:</p>
          <div className="flex flex-col gap-3 md:gap-2 text-base md:text-sm">
            <a
              href="mailto:ilham28alfath@gmail.com"
              className="text-blue-700 underline cursor-pointer"
            >
              📧 ilham28alfath@gmail.com
            </a>
            <a
              href="https://github.com/ujangdoubleday"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 underline cursor-pointer"
            >
              🌐 github.com/ujangdoubleday
            </a>
            <a
              href="https://linkedin.com/in/ilhamalfath"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 underline cursor-pointer"
            >
              💼 linkedin.com/in/ilhamalfath
            </a>
          </div>
        </div>

        {/* status */}
        <div className="flex items-center gap-2 p-3 md:p-2 bg-yellow-100 border border-yellow-500 text-base md:text-sm">
          <span className="text-green-600 text-lg">●</span>
          <span>Currently available for freelance & full-time opportunities</span>
        </div>

        {/* buttons */}
        <div className="flex justify-end gap-2 mt-3">
          <Button onClick={() => window.open('mailto:ilham28alfath@gmail.com')}>Send Mail</Button>
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </Window>
  );
}
