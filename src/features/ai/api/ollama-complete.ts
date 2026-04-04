import type { AiCompleteOptions, AiCompleteResponse, AiMessage } from './types';

const OLLAMA_BASE_URL =
  import.meta.env.VITE_OLLAMA_BASE_URL ?? 'http://localhost:11434';
const DEFAULT_MODEL = import.meta.env.VITE_OLLAMA_MODEL ?? 'qwen2.5:3b';

export const ollamaComplete = async (
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

  const response = await fetch(`${OLLAMA_BASE_URL}/v1/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      messages: allMessages,
      temperature,
      stream: false,
      ...(maxTokens ? { max_tokens: maxTokens } : {}),
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Ollama error ${response.status}: ${text}`);
  }

  const data = (await response.json()) as AiCompleteResponse;
  return data.choices[0]?.message.content ?? '';
};
