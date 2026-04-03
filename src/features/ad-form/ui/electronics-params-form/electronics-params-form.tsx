import { InputSelect, TextInput } from '@/shared/ui';

import { FormField } from '../form-field';

const TYPE_OPTIONS = [
  { value: 'phone', label: 'Телефон' },
  { value: 'laptop', label: 'Ноутбук' },
  { value: 'misc', label: 'Прочее' },
];

const CONDITION_OPTIONS = [
  { value: 'new', label: 'Новое' },
  { value: 'used', label: 'Б/у' },
];

type Values = Record<string, unknown>;

type ElectronicsParamsFormProps = {
  values: Values;
  onChange: (field: string, value: string | undefined) => void;
};

export const ElectronicsParamsForm = ({
  values,
  onChange,
}: ElectronicsParamsFormProps) => {
  const str = (key: string) => (values[key] as string | undefined) ?? '';

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

      <FormField label="Бренд">
        <TextInput
          value={str('brand')}
          onChange={(e) => onChange('brand', e.target.value || undefined)}
          onClear={() => onChange('brand', undefined)}
          hasWarning={!str('brand')}
          placeholder="Бренд"
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

      <FormField label="Цвет">
        <TextInput
          value={str('color')}
          onChange={(e) => onChange('color', e.target.value || undefined)}
          onClear={() => onChange('color', undefined)}
          hasWarning={!str('color')}
          placeholder="Цвет"
        />
      </FormField>

      <FormField label="Состояние">
        <InputSelect
          options={CONDITION_OPTIONS}
          value={str('condition')}
          onChange={(e) => onChange('condition', e.target.value || undefined)}
          placeholder="Состояние"
          hasWarning={!str('condition')}
        />
      </FormField>
    </div>
  );
};
