import type { AiCompleteOptions, AiCompleteResponse, AiMessage } from './types';

const DEEPSEEK_BASE_URL = 'https://api.deepseek.com';
const DEFAULT_MODEL = 'deepseek-chat';

const getApiKey = (): string => {
  const key = import.meta.env.VITE_DEEPSEEK_API_KEY as string | undefined;
  if (!key) throw new Error('VITE_DEEPSEEK_API_KEY is not set');
  return key;
};

export const deepseekComplete = async (
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

  const response = await fetch(`${DEEPSEEK_BASE_URL}/chat/completions`, {
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
    throw new Error(`DeepSeek API error ${response.status}: ${text}`);
  }

  const data = (await response.json()) as AiCompleteResponse;
  return data.choices[0]?.message.content ?? '';
};
