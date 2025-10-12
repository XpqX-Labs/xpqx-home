export interface TerminalLine {
  id: string;
  type: 'command' | 'output' | 'error';
  content: string;
  timestamp: Date;
}

export interface CommandResult {
  output: string[];
  error?: string;
}

export interface Command {
  name: string;
  description: string;
  usage?: string;
  execute: (args: string[]) => CommandResult | Promise<CommandResult>;
}

export interface TerminalState {
  history: TerminalLine[];
  currentInput: string;
  isLoading: boolean;
  ipAddress: string;
  username: string;
  hostname: string;
}
