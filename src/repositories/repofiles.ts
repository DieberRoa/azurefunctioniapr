import axios from 'axios';
import { PRDto } from './responses/prdto';
import { IRepoFiles } from './interfacerepofiles';

export class RepoFiles implements IRepoFiles {

    async getFilesFromPR(prNumber: number): Promise<PRDto[]> {
        var url = process.env.PR_ENDPOINT_URL.replace("{numberMR}", prNumber.toString());
        const { data } = await axios.get(url , {
            headers: { 'Authorization': `Bearer ${process.env.GITHUB_TOKEN}` },
        });
        return data as PRDto[];
    }

    async getCodeFromFile(urlRawCode: string) : Promise<string> {
        const { data } = await axios.get(urlRawCode);
        return data as string;
    }

}