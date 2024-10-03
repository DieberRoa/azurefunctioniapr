export interface ChatGPTDto {
    id : string;
    object: string;
    created: number;
    model: string;
    choices: Choice[];
    usage: Usage;
    system_fingerprint: string;
}

export interface Choice {
    index: number;
    message: Message;
    logprobs: boolean;
    finish_reason: string;
}

export interface Message {
    role: string;
    content: string;
    refusal: boolean;
}

export interface Usage {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
    completion_tokens_details: CompletionTokensDetails;
}

export interface CompletionTokensDetails {
    reasoning_tokens: number;
}