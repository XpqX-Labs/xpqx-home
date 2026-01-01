import Window from '@/components/ui/Window';

interface AboutWindowProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  isActive: boolean;
}

export default function AboutWindow({
  isOpen,
  onClose,
  onMinimize,
  onFocus,
  isActive,
}: AboutWindowProps) {
  return (
    <Window
      title="About Me - System Properties"
      icon="📋"
      isOpen={isOpen}
      onClose={onClose}
      onMinimize={onMinimize}
      onFocus={onFocus}
      isActive={isActive}
      defaultPosition={{ x: 80, y: 40 }}
      defaultSize={{ width: 550, height: 480 }}
    >
      <div className="flex-1 p-3 md:p-2 overflow-auto bg-win98-silver">
        <div className="flex gap-4">
          {/* icon */}
          <div className="win98-inset w-20 h-20 md:w-16 md:h-16 bg-white flex items-center justify-center text-4xl md:text-3xl shrink-0">
            👨‍💻
          </div>
          {/* info */}
          <div className="flex-1">
            <h2 className="m-0 mb-2 text-lg md:text-base font-bold">Ilham Alfath</h2>
            <p className="my-1 text-gray-600 text-base md:text-sm">
              Full-stack Developer | Web3 & Blockchain
            </p>
            <p className="my-1 text-sm md:text-xs text-gray-500">
              📍 Sumedang, West Java, Indonesia
            </p>
          </div>
        </div>

        <hr className="my-4 border-0 border-t border-win98-dark border-b border-white" />

        <div className="win98-inset bg-white p-3 mb-3 text-base md:text-sm">
          <p className="mb-2">
            <strong>Role:</strong> Full-stack Developer
          </p>
          <p className="mb-2">
            <strong>Specialty:</strong> Web3, Blockchain, Next.js, TypeScript, Solidity
          </p>
          <p className="mb-2">
            <strong>Education:</strong> D4 Information Technology - Politeknik TEDC Bandung
          </p>
          <p className="mb-2">
            <strong>GPA:</strong> 3.17 / 4.00
          </p>
          <p className="m-0">
            <strong>Status:</strong> <span className="text-green-600">● Available for work</span>
          </p>
        </div>

        <div className="win98-inset bg-white p-3 text-sm md:text-xs">
          <p className="m-0 text-gray-600 leading-relaxed">
            Result-oriented Full-stack Developer specializing in Web3 and Blockchain ecosystems.
            Proficient in architecting scalable decentralized applications using Next.js,
            TypeScript, and Solidity. Experienced in building enterprise-grade internal systems and
            end-to-end web solutions.
          </p>
        </div>

        {/* certifications */}
        <div className="win98-inset bg-white p-3 mt-3 text-sm md:text-xs">
          <p className="mb-2 font-bold">📜 Certifications:</p>
          <ul className="m-0 pl-4 text-gray-600">
            <li>
              <a
                href="https://e-hakcipta.dgip.go.id/legal/c/MTE4MzQ0YWE1N2QxMjQ3ZjA1ZTU5ZmY1ZWY0MWVjMjQ="
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 underline"
              >
                HAKI Software Copyright - NFT Web App
              </a>
            </li>
            <li>TOEFL Prediction Score: 473</li>
          </ul>
        </div>
      </div>
    </Window>
  );
}
