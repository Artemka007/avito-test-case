import type { AiCompleteOptions, AiCompleteResponse, AiMessage } from './types';

const GROK_BASE_URL = 'https://api.x.ai/v1';
const DEFAULT_MODEL = 'grok-3-latest';

const getApiKey = (): string => {
  const key = import.meta.env.VITE_GROK_API_KEY as string | undefined;
  if (!key) throw new Error('VITE_GROK_API_KEY is not set');
  return key;
};

export const grokComplete = async (
  messages: AiMessage[],
  options: AiCompleteOptions = {},
): Promise<string> => {
  const {
    model = DEFAULT_MODEL,
    temperature = 0.7,
    maxTokens,
    systemPrompt,
  } = options;

  const allMessages: AiMessage[] = systemPrompt
    ? [{ role: 'system', content: systemPrompt }, ...messages]
    : messages;

  const response = await fetch(`${GROK_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getApiKey()}`,
    },
    body: JSON.stringify({
      model,
      messages: allMessages,
      temperature,
      ...(maxTokens ? { max_tokens: maxTokens } : {}),
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Grok API error ${response.status}: ${text}`);
  }

  const data = (await response.json()) as AiCompleteResponse;
  return data.choices[0]?.message.content ?? '';
};
