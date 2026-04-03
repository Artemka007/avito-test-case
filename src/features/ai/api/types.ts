export type GrokRole = 'system' | 'user' | 'assistant';

export type GrokMessage = {
  role: GrokRole;
  content: string;
};

export type GrokCompleteOptions = {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
};

export type GrokCompleteResponse = {
  id: string;
  choices: {
    index: number;
    message: GrokMessage;
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
};
