import { useParams } from 'react-router-dom';

import { AdView } from '@/features/ad-view';

export const AdDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  return <AdView id={id} />;
};
