import { useEffect } from 'react';

import { useAppSelector } from '@/app/hooks';

export function ThemeSync() {
  const theme = useAppSelector((state) => state.preferences.theme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return null;
}
