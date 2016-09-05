import { TransporterService } from './transporter.service';
import { Observable } from 'rxjs';

// This file is just an example about Observable.
function inherit(proto){
    function F() {};
    F.prototype = proto;
    return new F;
}

function getSecuritySymbols(securityType){    
    var dateService: RepService = new RepService();
    for(var p in securities){
        if(p === securityType){
            symbols = securities[p];
            dateService.securitySymbols();
            return securities[p];
        }
    }
}
var symbols = null; 

var securities = {
    rockets: ["James Harden", "Travor Ariza"],
    clippers: ["Chris Paul", "Blake Griffin"],
    bulls: ["Dwyane Wade", "Jamie Butter"]
}

export class RepService {
    constructor(){

    }

    public securitySymbols(): Observable<any> {
        return Observable.of(symbols).map((res: any) => {
            return res;
        });
    }

    public getSecuritySymbolsByType(securityType: string): Object {
        return getSecuritySymbols(securityType);
    }
}