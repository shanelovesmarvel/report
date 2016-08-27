import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
var parser = require('xml2json-light');

@Injectable()
export class TransporterService {

    constructor(private _http: Http) { }

    public getSummaryData(): Object {
        return {
            portfolio: [
                {
                    "value": "master",
                    "text": "@master"
                },
                {
                    "value": "guest",
                    "text": "@guest"
                },
                {
                    "value": "admin",
                    "text": "@admin"
                }
            ],
            currency: [
                {
                    "value": "us",
                    "text": "us"
                },
                {
                    "value": "rmb",
                    "text": "rmb"
                },
                {
                    "value": "eu",
                    "text": "eu"
                }
            ]
        }
    }

    public getReorgData(): Object {
        return {};
    }

    public getSSRSData(): Observable<any> {
       return this._http.get("src/app/data/ssrs.xml").map((res: any) => {
            return parser.xml2json(res._body);
        });
    }
}
