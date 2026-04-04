import type { SVGProps } from 'react';

import { Button, LightbulbIcon } from '@/shared/ui';

export type AiButtonState = 'idle' | 'loading' | 'done';

type AiButtonProps = {
  label: string;
  state: AiButtonState;
  onClick: () => void;
  className?: string;
};

const SpinnerIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    {...props}
  >
    <path
      d="M7 1.5A5.5 5.5 0 1 1 1.5 7"
      stroke="#FFA940"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const AiButton = ({
  label,
  state,
  onClick,
  className,
}: AiButtonProps) => (
  <Button
    type="button"
    variant="yellow"
    disabled={state === 'loading'}
    onClick={onClick}
    className={className}
  >
    {state === 'loading' ? (
      <SpinnerIcon className="animate-spin" />
    ) : (
      <LightbulbIcon />
    )}
    {state === 'loading'
      ? 'Выполняется запрос...'
      : state === 'done'
        ? 'Повторить запрос'
        : label}
  </Button>
);
