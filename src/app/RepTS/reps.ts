import { ReportingData } from '../data/ReportingData';

export function InitInstance(): void{

}

export function LoadReport(argrname: string, repdesc: string): any {
    return ReportingData.getpsumJson();
}