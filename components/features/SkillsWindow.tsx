import Window from '@/components/ui/Window';

interface SkillsWindowProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  isActive: boolean;
}

const skillCategories = [
  {
    name: 'Languages',
    icon: '📝',
    skills: ['JavaScript (ES6+)', 'TypeScript', 'Solidity', 'PHP', 'Python', 'Java'],
  },
  {
    name: 'Frontend',
    icon: '🖥️',
    skills: ['React.js', 'Next.js', 'Vue.js', 'Tailwind CSS', 'ShadcnUI'],
  },
  {
    name: 'Backend & DB',
    icon: '⚙️',
    skills: ['Node.js', 'Laravel', 'CodeIgniter', 'PostgreSQL', 'MySQL', 'Redis', 'Prisma ORM'],
  },
  {
    name: 'Web3 Ecosystem',
    icon: '🔗',
    skills: ['Hardhat', 'Foundry', 'Ethers.js', 'Wagmi', 'IPFS/Pinata'],
  },
  {
    name: 'DevOps & Cloud',
    icon: '☁️',
    skills: ['Docker', 'Vercel', 'Cloudflare DNS', 'Git', 'CI/CD', 'Linux Ubuntu'],
  },
];

export default function SkillsWindow({
  isOpen,
  onClose,
  onMinimize,
  onFocus,
  isActive,
}: SkillsWindowProps) {
  return (
    <Window
      title="Skills - Control Panel"
      icon="💻"
      isOpen={isOpen}
      onClose={onClose}
      onMinimize={onMinimize}
      onFocus={onFocus}
      isActive={isActive}
      defaultPosition={{ x: 100, y: 50 }}
      defaultSize={{ width: 580, height: 500 }}
    >
      <div className="flex-1 p-3 md:p-2 overflow-auto bg-win98-silver flex flex-col gap-3">
        <p className="m-0 text-base md:text-sm text-gray-600">Technical skills & technologies:</p>

        {skillCategories.map((category) => (
          <div key={category.name}>
            <div className="flex items-center gap-2 mb-2 font-bold text-base md:text-sm">
              <span className="text-xl md:text-lg">{category.icon}</span>
              <span>{category.name}</span>
            </div>
            <div className="win98-inset bg-white p-3 md:p-2 flex flex-wrap gap-2 md:gap-1">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="win98-outset px-3 py-1 md:px-2 md:py-0.5 text-sm md:text-xs bg-win98-silver"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Window>
  );
}
