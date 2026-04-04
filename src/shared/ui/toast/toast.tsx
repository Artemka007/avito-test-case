import { useEffect, useState } from 'react';

import { cn } from '@/shared/lib/cn';

import type { AlertProps } from '../alert';
import { Alert } from '../alert';

export type ToastProps = AlertProps & {
  /** How long (ms) the toast is visible before auto-dismissing. Default: 4000 */
  duration?: number;
  onDismiss?: () => void;
};

export const Toast = ({
  duration = 4000,
  onDismiss,
  ...alertProps
}: ToastProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // rAF ensures the initial translate-y-4 / opacity-0 is painted before we animate in
    const frame = requestAnimationFrame(() => setVisible(true));
    const exitTimer = setTimeout(() => setVisible(false), duration - 300);
    const dismissTimer = setTimeout(() => onDismiss?.(), duration);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(exitTimer);
      clearTimeout(dismissTimer);
    };
    // intentionally empty deps — runs once per mount (key controls remounting)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={cn(
        'transition-all duration-300 ease-out',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
      )}
    >
      <Alert {...alertProps} />
    </div>
  );
};
