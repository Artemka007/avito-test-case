import type { AiCompleteOptions, AiMessage } from './types';

const GEMINI_BASE_URL =
  'https://generativelanguage.googleapis.com/v1beta/models';
const DEFAULT_MODEL = 'gemini-2.0-flash';

const getApiKey = (): string => {
  const key = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
  if (!key) throw new Error('VITE_GEMINI_API_KEY is not set');
  return key;
};

type GeminiPart = { text: string };
type GeminiContent = { role: 'user' | 'model'; parts: GeminiPart[] };
type GeminiResponse = {
  candidates: { content: { parts: GeminiPart[] } }[];
};

export const geminiComplete = async (
  messages: AiMessage[],
  options: AiCompleteOptions = {},
): Promise<string> => {
  const {
    model = DEFAULT_MODEL,
    temperature = 0.7,
    maxTokens,
    systemPrompt,
  } = options;

  // Extract system messages — Gemini handles them separately
  const systemParts: GeminiPart[] = [];
  const contents: GeminiContent[] = [];

  if (systemPrompt) {
    systemParts.push({ text: systemPrompt });
  }

  for (const msg of messages) {
    if (msg.role === 'system') {
      systemParts.push({ text: msg.content });
    } else {
      contents.push({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }],
      });
    }
  }

  const body: Record<string, unknown> = {
    contents,
    generationConfig: {
      temperature,
      ...(maxTokens ? { maxOutputTokens: maxTokens } : {}),
    },
  };

  if (systemParts.length > 0) {
    body.systemInstruction = { parts: systemParts };
  }

  const url = `${GEMINI_BASE_URL}/${model}:generateContent?key=${getApiKey()}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Gemini API error ${response.status}: ${text}`);
  }

  const data = (await response.json()) as GeminiResponse;
  return data.candidates[0]?.content.parts[0]?.text ?? '';
};
