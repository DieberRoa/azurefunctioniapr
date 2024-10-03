import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { AnalysisController } from "../controllers/analysiscontroller";
import { CodeAnalysis } from "../domain/codeanalysis";
import { ChatGPT } from "../repositories/chatgpt";
import { RepoFiles } from "../repositories/repofiles";

export async function checkpr(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);
    const name = request.query.get('name') || await request.text() || 'world';
    var controller = new AnalysisController(new CodeAnalysis(new ChatGPT(), new RepoFiles()));
    var response = await controller.getAnalysis(request);
    return { status: 200, body: "" + response};
};

app.http('checkpr', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: checkpr
});
