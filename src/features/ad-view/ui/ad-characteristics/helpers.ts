import {
  CONDITION_LABELS,
  ELECTRONICS_TYPE_LABELS,
  REALESTATE_TYPE_LABELS,
  TRANSMISSION_LABELS,
} from './constants';

export const formatParamValue = (key: string, value: unknown): string => {
  if (value === undefined || value === null || value === '') return '—';

  if (key === 'transmission')
    return TRANSMISSION_LABELS[String(value)] ?? String(value);
  if (key === 'type') {
    return (
      REALESTATE_TYPE_LABELS[String(value)] ??
      ELECTRONICS_TYPE_LABELS[String(value)] ??
      String(value)
    );
  }
  if (key === 'condition')
    return CONDITION_LABELS[String(value)] ?? String(value);
  if (key === 'mileage') return `${value} км`;
  if (key === 'enginePower') return `${value} л.с.`;
  if (key === 'area') return `${value} м²`;

  return String(value);
};
