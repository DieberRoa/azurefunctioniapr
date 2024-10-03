import axios from "axios";
import { ChatGPTDto } from "./responses/chatgptdto";
import { RequestChatGPT } from "./requests/requestchatgpt";
import { IChatGPT } from "./interfacechatgpt";

export class ChatGPT implements IChatGPT {

    async getCheckFromChatGPT(code: String): Promise<ChatGPTDto> {
        const body: RequestChatGPT = {
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                    content: process.env.SYSTEM_ROLE_GPT
                },
                {
                    role: "user",
                    content: process.env.USER_ROLE_GPT + code
                }
            ],
            temperature: Number(process.env.OPENAI_TEMPERATURE)
        } as RequestChatGPT;
        const { data } = await axios.post(process.env.OPENAI_URL, 
            body,
            { headers: { 'Authorization': `Bearer ${process.env.OPENAI_KEY}` }}
          );
        return data as ChatGPTDto;
    }

}
