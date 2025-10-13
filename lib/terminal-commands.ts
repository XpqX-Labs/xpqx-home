import { Command, CommandResult } from '@/types/terminal';

const commands: Record<string, Command> = {
  help: {
    name: 'help',
    description: 'Show available commands',
    execute: () => ({
      output: [
        'Available commands:',
        '',
        '  help       - Show this help message',
        '  whoami     - Display current username',
        '  pwd        - Print working directory',
        '  ls         - List directory contents',
        '  cat        - Display file contents',
        '  echo       - Display text',
        '  date       - Show current date and time',
        '  uptime     - Show system uptime',
        '  clear      - Clear terminal screen',
        '  about      - About this terminal',
        '  contact    - Contact information',
        '',
        'Type any command followed by arguments if needed.',
      ],
    }),
  },

  whoami: {
    name: 'whoami',
    description: 'Display current username',
    execute: () => ({
      output: ['root'],
    }),
  },

  pwd: {
    name: 'pwd',
    description: 'Print working directory',
    execute: () => ({
      output: ['/root'],
    }),
  },

  ls: {
    name: 'ls',
    description: 'List directory contents',
    usage: 'ls [-la]',
    execute: (args) => {
      const showAll = args.includes('-a') || args.includes('-la');
      const longFormat = args.includes('-l') || args.includes('-la');

      if (longFormat) {
        return {
          output: [
            'total 4',
            'drwxr-xr-x 2 root root 4096 Apr 23 10:00 .',
            'drwxr-xr-x 3 root root 4096 Apr 23 09:58 ..',
            '-rw-r--r-- 1 root root   42 Apr 23 10:00 readme.md',
          ],
        };
      }

      const files = ['readme.md'];
      if (showAll) {
        files.unshift('.', '..');
      }

      return {
        output: files,
      };
    },
  },

  cat: {
    name: 'cat',
    description: 'Display file contents',
    usage: 'cat <filename>',
    execute: (args) => {
      if (args.length === 0) {
        return {
          output: [],
          error: 'cat: missing operand',
        };
      }

      const filename = args[0];
      const files: Record<string, string[]> = {
        'readme.md': [
          "Hi, I'm Ilham Alfath. Welcome to XPQX.XYZ Terminal!",
          '',
          'This is an interactive web-based terminal.',
          'Type "help" to see available commands.',
          'Use "contact" to get in touch with me.',
        ],
      };

      if (filename in files) {
        return {
          output: files[filename],
        };
      }

      return {
        output: [],
        error: `cat: ${filename}: No such file or directory`,
      };
    },
  },

  echo: {
    name: 'echo',
    description: 'Display text',
    usage: 'echo <text>',
    execute: (args) => ({
      output: [args.join(' ')],
    }),
  },

  date: {
    name: 'date',
    description: 'Show current date and time',
    execute: () => ({
      output: [new Date().toString()],
    }),
  },

  uptime: {
    name: 'uptime',
    description: 'Show system uptime',
    execute: () => {
      const uptime = Math.floor(Date.now() / 1000 / 60); // minutes
      const hours = Math.floor(uptime / 60);
      const minutes = uptime % 60;

      return {
        output: [
          `up ${hours}:${minutes.toString().padStart(2, '0')}, 1 user, load averages: 0.52 0.58 0.59`,
        ],
      };
    },
  },

  clear: {
    name: 'clear',
    description: 'Clear terminal screen',
    execute: () => ({
      output: ['__CLEAR__'], // special command to clear screen
    }),
  },

  about: {
    name: 'about',
    description: 'About this site',
    execute: () => ({
      output: [
        'About XPQX.XYZ',
        '',
        'Personal website and portfolio of Ilham Alfath.',
        'Web developer passionate about modern technologies.',
        '',
        'Built with Next.js & TypeScript.',
      ],
    }),
  },

  contact: {
    name: 'contact',
    description: 'Contact information',
    execute: () => ({
      output: [
        'Contact Information:',
        '',
        '📧 Email: ilham@xpqx.xyz',
        '💼 LinkedIn: https://id.linkedin.com/in/ilham-alfath-537776a7',
        '🐙 GitHub: https://github.com/ujangdoubleday',
        '',
        'Feel free to reach out!',
      ],
    }),
  },
};

export const executeCommand = async (input: string): Promise<CommandResult> => {
  const trimmedInput = input.trim();

  if (!trimmedInput) {
    return { output: [] };
  }

  const parts = trimmedInput.split(' ');
  const commandName = parts[0].toLowerCase();
  const args = parts.slice(1);

  const command = commands[commandName];

  if (!command) {
    return {
      output: [],
      error: `Command not found: ${commandName}. Type 'help' for available commands.`,
    };
  }

  try {
    return await command.execute(args);
  } catch (error) {
    return {
      output: [],
      error: `Error executing command: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
};

export const getAvailableCommands = (): Command[] => {
  return Object.values(commands);
};
