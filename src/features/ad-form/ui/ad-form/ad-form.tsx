import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useGrokCompletion } from '@/features/ai';
import type { GrokMessage } from '@/features/ai';
import { ItemCategories } from '@/features/ads-view/store/enums';
import {
  Button,
  InputSelect,
  TextArea,
  TextInput,
  Toast,
  Typography,
} from '@/shared/ui';

import type { AdFormFields } from '../../store/types';
import { AutoParamsForm } from '../auto-params-form';
import { ElectronicsParamsForm } from '../electronics-params-form';
import { FormField } from '../form-field';
import { FormSection } from '../form-section';
import { RealEstateParamsForm } from '../real-estate-params-form';
import { AiButton, AiTooltip } from '../ai-field';
import { useParamsField, type FormValues } from './use-params-field';

const CATEGORY_OPTIONS = [
  { value: ItemCategories.Auto, label: 'Авто' },
  { value: ItemCategories.RealEstate, label: 'Недвижимость' },
  { value: ItemCategories.Electronics, label: 'Электроника' },
];

export type AdFormProps = {
  defaultValues: AdFormFields;
  saving?: boolean;
  saveSuccess?: boolean;
  saveError?: string | null;
  onSubmit: (data: AdFormFields) => void | Promise<void>;
  onCancel: () => void;
};

export const AdForm = ({
  defaultValues,
  saving,
  saveSuccess,
  saveError,
  onSubmit,
  onCancel,
}: AdFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    defaultValues: {
      ...defaultValues,
      price: defaultValues.price === '' ? '' : String(defaultValues.price),
    },
    mode: 'onBlur',
  });

  const category = watch('category');
  const title = watch('title') ?? '';
  const price = watch('price') ?? '';
  const description = watch('description') ?? '';

  const { params, handleParamChange } = useParamsField(
    category,
    defaultValues.category,
    watch,
    setValue,
  );

  type ToastState = {
    key: number;
    variant: 'success' | 'error';
    title: string;
    description?: string;
  };
  const [toast, setToast] = useState<ToastState | null>(null);

  // ── AI hooks ──────────────────────────────────────────────────────────────
  const grokPrice = useGrokCompletion();
  const grokDesc = useGrokCompletion();

  const [priceTooltipOpen, setPriceTooltipOpen] = useState(false);
  const [descTooltipOpen, setDescTooltipOpen] = useState(false);
  const [priceRequested, setPriceRequested] = useState(false);
  const [descRequested, setDescRequested] = useState(false);

  const handlePriceAiClick = async () => {
    setPriceTooltipOpen(false);
    const messages: GrokMessage[] = [
      {
        role: 'system',
        content:
          'Ты эксперт по рыночным ценам на товары в России. Отвечай кратко — только число в рублях, без пояснений и дополнительного текста.',
      },
      {
        role: 'user',
        content: `Какова справедливая рыночная цена для объявления: "${title}"${category ? `, категория: ${category}` : ''}? Ответь только числом в рублях.`,
      },
    ];
    try {
      await grokPrice.complete(messages);
    } catch {
      // error is captured in grokPrice.error
    }
    setPriceRequested(true);
    setPriceTooltipOpen(true);
  };

  const handleApplyPrice = () => {
    if (grokPrice.result) {
      const match = grokPrice.result.replace(/[\s,]/g, '').match(/\d+/);
      if (match) {
        setValue('price', match[0]);
        void trigger('price');
      }
    }
    setPriceTooltipOpen(false);
  };

  const handleDescAiClick = async () => {
    setDescTooltipOpen(false);
    const messages: GrokMessage[] = description
      ? [
          {
            role: 'system',
            content:
              'Ты помогаешь улучшать описания объявлений на Авито. Пиши на русском языке кратко и информативно.',
          },
          {
            role: 'user',
            content: `Улучши описание объявления "${title}" (категория: ${category}): "${description}". Максимум 300 символов.`,
          },
        ]
      : [
          {
            role: 'system',
            content:
              'Ты помогаешь писать описания для объявлений на Авито. Пиши на русском языке кратко и информативно.',
          },
          {
            role: 'user',
            content: `Напиши описание для объявления "${title}" (категория: ${category}). Максимум 300 символов.`,
          },
        ];
    try {
      await grokDesc.complete(messages);
    } catch {
      // error is captured in grokDesc.error
    }
    setDescRequested(true);
    setDescTooltipOpen(true);
  };

  const handleApplyDesc = () => {
    if (grokDesc.result) {
      setValue('description', grokDesc.result);
      void trigger('description');
    }
    setDescTooltipOpen(false);
  };
  // ─────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (saveSuccess) {
      setToast({
        key: Date.now(),
        variant: 'success',
        title: 'Изменения сохранены',
      });
    }
  }, [saveSuccess]);

  useEffect(() => {
    if (saveError) {
      setToast({
        key: Date.now(),
        variant: 'error',
        title: 'Ошибка сохранения',
        description: saveError,
      });
    }
  }, [saveError]);

  const handleFormSubmit = (values: FormValues) => {
    onSubmit({
      ...values,
      price: values.price === '' ? '' : Number(values.price),
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        noValidate
        className="p-8"
      >
        <Typography variant="title-h2" className="mb-4">
          Редактирование объявления
        </Typography>

        <div className="divide-y divide-[var(--border)]">
          <FormSection>
            <FormField label="Категория" className="max-w-[456px]">
              <InputSelect
                {...register('category')}
                options={CATEGORY_OPTIONS}
                value={category}
              />
            </FormField>
          </FormSection>

          <FormSection>
            <FormField
              label="Название"
              required
              error={errors.title?.message}
              className="max-w-[456px]"
            >
              <TextInput
                {...register('title', {
                  required: 'Название должно быть заполнено',
                })}
                value={title}
                hasError={!!errors.title}
                onClear={() => {
                  setValue('title', '');
                  void trigger('title');
                }}
                placeholder="Название объявления"
              />
            </FormField>
          </FormSection>

          <FormSection>
            <div className="flex items-end gap-3">
              <FormField
                label="Цена"
                required
                error={errors.price?.message}
                className="max-w-[456px] flex-1"
              >
                <TextInput
                  {...register('price', {
                    required: 'Цена должна быть заполнена',
                    validate: (v) => {
                      if (!v) return 'Цена должна быть заполнена';
                      const n = Number(v);
                      if (!Number.isFinite(n) || n <= 0)
                        return 'Введите корректную цену';
                      return true;
                    },
                  })}
                  type="number"
                  value={price}
                  hasError={!!errors.price}
                  onClear={() => {
                    setValue('price', '');
                    void trigger('price');
                  }}
                  placeholder="0"
                  min={1}
                />
              </FormField>
              <div className="relative mb-0 shrink-0">
                <AiButton
                  label="Узнать рыночную цену"
                  state={
                    grokPrice.loading
                      ? 'loading'
                      : priceRequested
                        ? 'done'
                        : 'idle'
                  }
                  onClick={() => {
                    void handlePriceAiClick();
                  }}
                />
                {priceTooltipOpen && (
                  <AiTooltip
                    result={grokPrice.result}
                    error={grokPrice.error}
                    onApply={handleApplyPrice}
                    onClose={() => setPriceTooltipOpen(false)}
                  />
                )}
              </div>
            </div>
          </FormSection>

          <FormSection title="Характеристики">
            <div className="max-w-[456px]">
              {category === ItemCategories.Auto && (
                <AutoParamsForm values={params} onChange={handleParamChange} />
              )}
              {category === ItemCategories.RealEstate && (
                <RealEstateParamsForm
                  values={params}
                  onChange={handleParamChange}
                />
              )}
              {category === ItemCategories.Electronics && (
                <ElectronicsParamsForm
                  values={params}
                  onChange={handleParamChange}
                />
              )}
            </div>
          </FormSection>

          <FormSection title="Описание">
            <TextArea
              {...register('description')}
              value={description}
              maxLength={1000}
              placeholder="Расскажите подробнее об объявлении"
              rows={5}
            />
            <div className="relative mt-2 inline-block">
              <AiButton
                label={description ? 'Улучшить описание' : 'Придумать описание'}
                state={
                  grokDesc.loading ? 'loading' : descRequested ? 'done' : 'idle'
                }
                onClick={() => {
                  void handleDescAiClick();
                }}
              />
              {descTooltipOpen && (
                <AiTooltip
                  result={grokDesc.result}
                  error={grokDesc.error}
                  onApply={handleApplyDesc}
                  onClose={() => setDescTooltipOpen(false)}
                />
              )}
            </div>
          </FormSection>

          {/* ── Кнопки ── */}
          <div className="flex gap-3 py-4">
            <Button type="submit" disabled={!isValid || saving}>
              {saving ? 'Сохранение...' : 'Сохранить'}
            </Button>
            <Button type="button" variant="gray" onClick={onCancel}>
              Отменить
            </Button>
          </div>
        </div>
      </form>

      {/* ── Статус сохранения (bottom-right overlay) ── */}
      {toast && (
        <div className="fixed right-8 bottom-8 z-50 w-[328px]">
          <Toast
            key={toast.key}
            variant={toast.variant}
            title={toast.title}
            description={toast.description}
            onDismiss={() => setToast(null)}
          />
        </div>
      )}
    </>
  );
};
