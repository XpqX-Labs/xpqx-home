import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function Button({ children, className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`win98-outset bg-win98-silver px-4 py-2 md:px-3 md:py-1 text-sm md:text-[13px] min-w-[80px] text-center cursor-pointer active:win98-inset ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
