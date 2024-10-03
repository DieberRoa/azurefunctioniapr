import { Analysis } from "./Analysis";

export interface ICodeAnalysis {
    doIt(prNumber: number): Promise<Analysis[]>;
}