import { useParams } from 'react-router';

import { AdEdit } from '@/features/ad-form';

export const AdEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return <AdEdit id={id} />;
};
