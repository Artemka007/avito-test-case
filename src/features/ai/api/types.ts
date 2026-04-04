export type AiProvider = 'grok' | 'deepseek' | 'gemini' | 'ollama';

export type AiRole = 'system' | 'user' | 'assistant';

export type AiMessage = {
  role: AiRole;
  content: string;
};

export type AiCompleteOptions = {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
};

export type AiCompleteResponse = {
  id: string;
  choices: {
    index: number;
    message: AiMessage;
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
};

/** @deprecated Use AiRole */ export type GrokRole = AiRole;
/** @deprecated Use AiMessage */ export type GrokMessage = AiMessage;
/** @deprecated Use AiCompleteOptions */ export type GrokCompleteOptions =
  AiCompleteOptions;
/** @deprecated Use AiCompleteResponse */ export type GrokCompleteResponse =
  AiCompleteResponse;
