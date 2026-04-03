import { InputSelect, TextInput } from '@/shared/ui';

import { FormField } from '../form-field';

const TYPE_OPTIONS = [
  { value: 'flat', label: 'Квартира' },
  { value: 'house', label: 'Дом' },
  { value: 'room', label: 'Комната' },
];

type Values = Record<string, unknown>;

type RealEstateParamsFormProps = {
  values: Values;
  onChange: (field: string, value: string | number | undefined) => void;
};

export const RealEstateParamsForm = ({
  values,
  onChange,
}: RealEstateParamsFormProps) => {
  const str = (key: string) => (values[key] as string | undefined) ?? '';
  const num = (key: string) => {
    const v = values[key];
    return v !== undefined && v !== null ? String(v) : '';
  };

  return (
    <div className="flex flex-col gap-4">
      <FormField label="Тип">
        <InputSelect
          options={TYPE_OPTIONS}
          value={str('type')}
          onChange={(e) => onChange('type', e.target.value || undefined)}
          placeholder="Тип"
          hasWarning={!str('type')}
        />
      </FormField>

      <FormField label="Адрес">
        <TextInput
          value={str('address')}
          onChange={(e) => onChange('address', e.target.value || undefined)}
          onClear={() => onChange('address', undefined)}
          hasWarning={!str('address')}
          placeholder="Адрес"
        />
      </FormField>

      <FormField label="Площадь (м²)">
        <TextInput
          type="number"
          value={num('area')}
          onChange={(e) =>
            onChange(
              'area',
              e.target.value === '' ? undefined : Number(e.target.value),
            )
          }
          onClear={() => onChange('area', undefined)}
          hasWarning={!num('area')}
          placeholder="Площадь"
          min={0}
        />
      </FormField>

      <FormField label="Этаж">
        <TextInput
          type="number"
          value={num('floor')}
          onChange={(e) =>
            onChange(
              'floor',
              e.target.value === '' ? undefined : Number(e.target.value),
            )
          }
          onClear={() => onChange('floor', undefined)}
          hasWarning={!num('floor')}
          placeholder="Этаж"
          min={0}
        />
      </FormField>
    </div>
  );
};
