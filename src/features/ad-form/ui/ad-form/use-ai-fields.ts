import { useState } from 'react';
import type { UseFormSetValue, UseFormTrigger } from 'react-hook-form';

import { useAiCompletion } from '@/features/ai';
import type { AiMessage } from '@/features/ai';

import type { FormValues } from './use-params-field';

type UseAiFieldsParams = {
  title: string;
  category: string;
  description: string;
  setValue: UseFormSetValue<FormValues>;
  trigger: UseFormTrigger<FormValues>;
};

export const useAiFields = ({
  title,
  category,
  description,
  setValue,
  trigger,
}: UseAiFieldsParams) => {
  const aiPrice = useAiCompletion('ollama');
  const aiDesc = useAiCompletion('ollama');

  const [priceTooltipOpen, setPriceTooltipOpen] = useState(false);
  const [descTooltipOpen, setDescTooltipOpen] = useState(false);
  const [priceRequested, setPriceRequested] = useState(false);
  const [descRequested, setDescRequested] = useState(false);

  const handlePriceAiClick = async () => {
    setPriceTooltipOpen(false);
    const messages: AiMessage[] = [
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
      await aiPrice.complete(messages);
    } catch {
      // error captured in aiPrice.error
    }
    setPriceRequested(true);
    setPriceTooltipOpen(true);
  };

  const handleApplyPrice = () => {
    if (aiPrice.result) {
      const match = aiPrice.result.replace(/[\s,]/g, '').match(/\d+/);
      if (match) {
        setValue('price', match[0]);
        void trigger('price');
      }
    }
    setPriceTooltipOpen(false);
  };

  const handleDescAiClick = async () => {
    setDescTooltipOpen(false);
    const messages: AiMessage[] = description
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
      await aiDesc.complete(messages);
    } catch {
      // error captured in aiDesc.error
    }
    setDescRequested(true);
    setDescTooltipOpen(true);
  };

  const handleApplyDesc = () => {
    if (aiDesc.result) {
      setValue('description', aiDesc.result);
      void trigger('description');
    }
    setDescTooltipOpen(false);
  };

  return {
    aiPrice,
    aiDesc,
    priceTooltipOpen,
    setPriceTooltipOpen,
    descTooltipOpen,
    setDescTooltipOpen,
    priceRequested,
    descRequested,
    handlePriceAiClick,
    handleApplyPrice,
    handleDescAiClick,
    handleApplyDesc,
  };
};
