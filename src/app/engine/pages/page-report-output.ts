import { Injectable } from '@angular/core';
import { EngineInterface } from '../engine.interface';
import { Observable } from 'rxjs/Observable';
import { ReplangService } from '../../services/replang.service';

@Injectable()
export class ReportOutputPage implements EngineInterface {

    constructor(private _replangService: ReplangService) {
    }

    getData(pageParameters: any): Observable<any> {
        return Observable.of({});
    }

    getService(pageParameters: any): Object {
        let service: any = {};
        return service;
    }

    getLayout(pageParameters: any): Observable<any> {    
        let layout = this._replangService.getPortfolioSummaryOutput();
        let comLayout = {
            children: [
                layout
            ]
        };
        return Observable.of(comLayout);
    }

    prepareLayout(data: any, layout: any): void {

    }
}