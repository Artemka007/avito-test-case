import { InputSelect, TextInput } from '@/shared/ui';

import { FormField } from '../form-field';

const TRANSMISSION_OPTIONS = [
  { value: 'automatic', label: 'Автомат' },
  { value: 'manual', label: 'Механика' },
];

type Values = Record<string, unknown>;

type AutoParamsFormProps = {
  values: Values;
  onChange: (field: string, value: string | number | undefined) => void;
};

export const AutoParamsForm = ({ values, onChange }: AutoParamsFormProps) => {
  const str = (key: string) => (values[key] as string | undefined) ?? '';
  const num = (key: string) => {
    const v = values[key];
    return v !== undefined && v !== null ? String(v) : '';
  };

  return (
    <div className="flex flex-col gap-4">
      <FormField label="Марка">
        <TextInput
          value={str('brand')}
          onChange={(e) => onChange('brand', e.target.value || undefined)}
          onClear={() => onChange('brand', undefined)}
          hasWarning={!str('brand')}
          placeholder="Марка"
        />
      </FormField>

      <FormField label="Модель">
        <TextInput
          value={str('model')}
          onChange={(e) => onChange('model', e.target.value || undefined)}
          onClear={() => onChange('model', undefined)}
          hasWarning={!str('model')}
          placeholder="Модель"
        />
      </FormField>

      <FormField label="Год выпуска">
        <TextInput
          type="number"
          value={num('yearOfManufacture')}
          onChange={(e) =>
            onChange(
              'yearOfManufacture',
              e.target.value === '' ? undefined : Number(e.target.value),
            )
          }
          onClear={() => onChange('yearOfManufacture', undefined)}
          hasWarning={!num('yearOfManufacture')}
          placeholder="Год выпуска"
          min={1900}
          max={new Date().getFullYear()}
        />
      </FormField>

      <FormField label="Трансмиссия">
        <InputSelect
          options={TRANSMISSION_OPTIONS}
          value={str('transmission')}
          onChange={(e) =>
            onChange('transmission', e.target.value || undefined)
          }
          placeholder="Трансмиссия"
          hasWarning={!str('transmission')}
        />
      </FormField>

      <FormField label="Пробег (км)">
        <TextInput
          type="number"
          value={num('mileage')}
          onChange={(e) =>
            onChange(
              'mileage',
              e.target.value === '' ? undefined : Number(e.target.value),
            )
          }
          onClear={() => onChange('mileage', undefined)}
          hasWarning={!num('mileage')}
          placeholder="Пробег"
          min={0}
        />
      </FormField>

      <FormField label="Мощность двигателя (л.с.)">
        <TextInput
          type="number"
          value={num('enginePower')}
          onChange={(e) =>
            onChange(
              'enginePower',
              e.target.value === '' ? undefined : Number(e.target.value),
            )
          }
          onClear={() => onChange('enginePower', undefined)}
          hasWarning={!num('enginePower')}
          placeholder="Мощность двигателя"
          min={0}
        />
      </FormField>
    </div>
  );
};
