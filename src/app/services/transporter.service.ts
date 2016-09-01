import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
var parser = require('xml2json-light');

@Injectable()
export class TransporterService {

    constructor(private _http: Http) { }

    
    public getSSRSData(): Observable<any> {
       return this._http.get("src/app/data/ssrs.xml").map((res: any) => {
            return parser.xml2json(res._body);
        });
    }
}
