import Window from '@/components/ui/Window';

interface ProjectsWindowProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  isActive: boolean;
}

const projects = [
  {
    icon: '🤖',
    name: 'xoegit',
    type: 'CLI Tool',
    desc: 'AI-powered CLI for semantic git commit messages and PR descriptions',
    tech: 'TypeScript, Node.js, Gemini AI',
    link: 'https://github.com/ujangdoubleday/xoegit',
  },
  {
    icon: '🎨',
    name: 'NFT Creator Platform',
    type: 'Full-stack Web3',
    desc: 'Decentralized NFT issuance platform with Smart Contract Factory',
    tech: 'Next.js, TypeScript, Solidity, tRPC, IPFS',
    link: 'https://github.com/ujangdoubleday/ta-nft-collection',
  },
  {
    icon: '📝',
    name: 'Static Blog Generator',
    type: 'Python Tool',
    desc: 'A simple, fast, and flexible static site generator for Markdown blogs',
    tech: 'Python, Jinja2, Markdown, HTML/CSS',
    link: 'https://github.com/ujangdoubleday/blog',
  },
  {
    icon: '🎸',
    name: 'Sleepwalker Official',
    type: 'Landing Page',
    desc: 'Website landing page for Sleepwalker band',
    tech: 'Next.js, Tailwind CSS',
    link: 'https://github.com/ujangdoubleday/sleepwalkerofficial',
  },
  {
    icon: '🏛️',
    name: 'YSAS Foundation',
    type: 'Landing Page',
    desc: 'Website landing page for YSAS Foundation',
    tech: 'Next.js, Tailwind CSS',
    link: 'https://github.com/ujangdoubleday/ysas-foundation',
  },
];

export default function ProjectsWindow({
  isOpen,
  onClose,
  onMinimize,
  onFocus,
  isActive,
}: ProjectsWindowProps) {
  return (
    <Window
      title="My Projects"
      icon="📁"
      isOpen={isOpen}
      onClose={onClose}
      onMinimize={onMinimize}
      onFocus={onFocus}
      isActive={isActive}
      defaultPosition={{ x: 120, y: 60 }}
      defaultSize={{ width: 600, height: 450 }}
    >
      {/* toolbar */}
      <div className="px-3 py-2 md:px-2 md:py-1 bg-win98-silver border-b border-win98-dark text-sm md:text-xs text-gray-500">
        📁 C:\Users\Ilham\Projects
      </div>

      {/* file list */}
      <div className="win98-inset flex-1 m-0 bg-white overflow-auto">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="p-3 md:p-2 border-b border-gray-200 hover:bg-win98-title hover:text-white cursor-pointer group"
            onClick={() => project.link && window.open(project.link, '_blank')}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl md:text-lg">{project.icon}</span>
              <span className="font-bold text-base md:text-sm">{project.name}</span>
              <span className="text-xs px-2 py-0.5 bg-gray-200 group-hover:bg-white/20 rounded">
                {project.type}
              </span>
              {project.link && (
                <span className="text-xs text-blue-600 group-hover:text-blue-300">🔗 GitHub</span>
              )}
            </div>
            <p className="text-sm md:text-xs text-gray-600 group-hover:text-white/80 mb-1 ml-7">
              {project.desc}
            </p>
            <p className="text-xs text-gray-400 group-hover:text-white/60 ml-7">
              🛠️ {project.tech}
            </p>
          </div>
        ))}
      </div>

      {/* status bar */}
      <div className="win98-inset mx-2 mb-2 mt-1 px-2 py-1 text-sm md:text-xs text-gray-500">
        {projects.length} project(s)
      </div>
    </Window>
  );
}
