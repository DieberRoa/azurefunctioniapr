import { ChatGPTDto } from "./responses/chatgptdto";

export interface IChatGPT {
    getCheckFromChatGPT(code: String): Promise<ChatGPTDto>;
}