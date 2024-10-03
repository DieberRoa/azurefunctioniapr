import { IChatGPT } from "../repositories/interfacechatgpt";
import { IRepoFiles } from "../repositories/interfacerepofiles";
import { Analysis } from "./Analysis";
import { ICodeAnalysis } from "./interfacecodeanalysis";

export class CodeAnalysis implements ICodeAnalysis {

    chatgptrepo : IChatGPT; 
    githubrepo : IRepoFiles;

    constructor(chatgptrepo : IChatGPT, githubrepo : IRepoFiles) {
        this.chatgptrepo = chatgptrepo;
        this.githubrepo = githubrepo;
    }

    async doIt(prNumber: number) : Promise<Analysis[]>{
        const files = await this.githubrepo.getFilesFromPR(prNumber);
        var analysis : Analysis[] = [];
        await Promise.all(files.map(async file => {
            if (file.filename.includes(".swift")){
                const code = await this.githubrepo.getCodeFromFile(file.raw_url);
                const responseFromChatGPT = await this.chatgptrepo.getCheckFromChatGPT(code);
                var chatGPTJson = responseFromChatGPT.choices[0].message.content.replace("json","").replace(/`/g, '');
                JSON.parse(chatGPTJson).forEach(element => {
                    element.filename = file.filename;
                    analysis.push(element);
                });
            }
        }));
        return analysis;
    }

}