import { Injectable, OnChanges, OnInit } from '@angular/core';
import { EngineInterface } from '../engine.interface';
import { Observable } from 'rxjs/Observable';
import { ReplangService } from '../../services/replang.service';
import { TransporterService } from '../../services/transporter.service';
import { NotifiMessageService } from '../../ReportDialogController/notify-message.service';
import { EngineLayoutAPIService } from '../engine.layout.api';

@Injectable()
export class SSRSReportPage implements EngineInterface, OnChanges, OnInit{

    constructor(private _replangService: ReplangService, private _transporterService: TransporterService) {
        
    }

    ngOnChanges(): void {
        
    }

    ngOnInit(): void {
        
    }

    getData(pageParameters: any): Observable<any> {
        return Observable.of({});
    }

    getService(pageParameters: any): Object {
        let service: any = {};
        return service;
    }

    getLayout(pageParameters: any): Observable<any> {
        return this._transporterService.getSSRSData().map((res: any) => {
            return this._replangService.getSSRSReportUILayout(false, res);
        });
    }

    prepareLayout(data: any, layout: any): void {

    }
}