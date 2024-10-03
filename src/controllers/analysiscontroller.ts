import { ICodeAnalysis } from "../domain/interfacecodeanalysis";

export class AnalysisController {

    analysisdomain : ICodeAnalysis;

    constructor(codeAnalysis : ICodeAnalysis) {
        this.analysisdomain = codeAnalysis;
    }

    async getAnalysis(req) : Promise<String> {
        try {
            const prNumber = req.params.mrnumber;
            const analysis = await this.analysisdomain.doIt(prNumber);
            return JSON.stringify(analysis); 
        }
        catch (error) {
            return JSON.stringify({error: error.message});
        }
    }
}
