import { useCallback, useState } from 'react';

import { grokComplete } from '../api/grok-complete';
import type { GrokCompleteOptions, GrokMessage } from '../api/types';

export type UseGrokCompletionReturn = {
  /** Send messages to Grok and return the reply text */
  complete: (
    messages: GrokMessage[],
    options?: GrokCompleteOptions,
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

export const useGrokCompletion = (): UseGrokCompletionReturn => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const complete = useCallback(
    async (
      messages: GrokMessage[],
      options?: GrokCompleteOptions,
    ): Promise<string> => {
      setLoading(true);
      setError(null);
      try {
        const text = await grokComplete(messages, options);
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
    [],
  );

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { complete, loading, result, error, reset };
};
