export interface RequestChatGPT {
    model : string;
    messages : MessageGPT[];
    temperature : number;
}

export interface MessageGPT {
    role: string;
    content: string;
}