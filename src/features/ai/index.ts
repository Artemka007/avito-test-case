export { grokComplete } from './api/grok-complete';
export { deepseekComplete } from './api/deepseek-complete';
export { geminiComplete } from './api/gemini-complete';
export { ollamaComplete } from './api/ollama-complete';
export { aiComplete } from './api/ai-complete';
export type {
  AiProvider,
  AiRole,
  AiMessage,
  AiCompleteOptions,
  AiCompleteResponse,
  // deprecated aliases
  GrokRole,
  GrokMessage,
  GrokCompleteOptions,
  GrokCompleteResponse,
} from './api/types';

export { useAiCompletion } from './hooks/use-ai-completion';
export type { UseAiCompletionReturn } from './hooks/use-ai-completion';
