import { PRDto } from "./responses/prdto";

export interface IRepoFiles {

    getFilesFromPR(prNumber: number): Promise<PRDto[]>;
    getCodeFromFile(urlRawCode: string) : Promise<string>;

}