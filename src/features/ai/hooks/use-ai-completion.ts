import { useCallback, useState } from 'react';

import { aiComplete } from '../api/ai-complete';
import type { AiCompleteOptions, AiMessage, AiProvider } from '../api/types';

export type UseAiCompletionReturn = {
  /** Send messages to the selected provider and return the reply text */
  complete: (
    messages: AiMessage[],
    options?: AiCompleteOptions,
  ) => Promise<string>;
  /** True while a request is in-flight */
  loading: boolean;
  /** Last response text, null before first call */
  result: string | null;
  /** Error message from the last failed call, null otherwise */
  error: string | null;
  /** Reset result and error to their initial state */
  reset: () => void;
};

export const useAiCompletion = (
  provider: AiProvider,
): UseAiCompletionReturn => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const complete = useCallback(
    async (
      messages: AiMessage[],
      options?: AiCompleteOptions,
    ): Promise<string> => {
      setLoading(true);
      setError(null);
      try {
        const text = await aiComplete(provider, messages, options);
        setResult(text);
        return text;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Неизвестная ошибка';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [provider],
  );

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { complete, loading, result, error, reset };
};
