import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
};

export const Button = ({ className, children, ...props }: ButtonProps) => (
  <button
    className={`font-body-sm-strong inline-flex w-fit items-center gap-2 rounded-sm bg-[#1890FF] px-4 py-1.5 text-white transition-colors hover:bg-[#096dd9] disabled:opacity-50 ${className ?? ''}`}
    {...props}
  >
    {children}
  </button>
);
