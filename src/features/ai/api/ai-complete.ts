import { deepseekComplete } from './deepseek-complete';
import { geminiComplete } from './gemini-complete';
import { grokComplete } from './grok-complete';
import { ollamaComplete } from './ollama-complete';
import type { AiCompleteOptions, AiMessage, AiProvider } from './types';

type AiCompleteFn = (
  messages: AiMessage[],
  options?: AiCompleteOptions,
) => Promise<string>;

const PROVIDER_REGISTRY: Record<AiProvider, AiCompleteFn> = {
  grok: grokComplete,
  deepseek: deepseekComplete,
  gemini: geminiComplete,
  ollama: ollamaComplete,
};

export const aiComplete = (
  provider: AiProvider,
  messages: AiMessage[],
  options?: AiCompleteOptions,
): Promise<string> => PROVIDER_REGISTRY[provider](messages, options);
