import type { ReactNode } from 'react';

import { Typography } from '@/shared/ui';

type FormSectionProps = {
  title?: string;
  children: ReactNode;
};

export const FormSection = ({ title, children }: FormSectionProps) => (
  <div className="py-4">
    {title && (
      <Typography variant="body-strong" className="mb-3">
        {title}
      </Typography>
    )}
    {children}
  </div>
);
