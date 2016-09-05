import { Injectable } from '@angular/core';
import { EngineInterface } from '../engine.interface';
import { Observable } from 'rxjs/Observable';
import { ReplangService } from '../../services/replang.service';
import { TransporterService } from '../../services/transporter.service';
import { NotifiMessageService } from '../../ReportDialogController/notify-message.service';
import { EngineLayoutAPIService } from '../engine.layout.api';

@Injectable()
export class ReportsPage implements EngineInterface {

    constructor(
        private _replangService: ReplangService,
        private _transporterService: TransporterService,
        private _notifyMessageService: NotifiMessageService, 
        private _layoutAPIService: EngineLayoutAPIService) {
        if (!this._replangService.ssrsData) {
            this._replangService.getSSRSData();
        }
    }

    getData(pageParameters: any): Observable<any> {
        return Observable.of({});
    }

    getService(pageParameters: any): Object {
        let self = this;

        let getSummaryUILayout = function () {
            return self._replangService.getSummaryReportUILayout();
        }

        let getSummaryChartUILayout = function () {
            return self._replangService.getSummaryChartUILayout();
        }

        let getSettingsUILayout = function () {
            return self._replangService.getSettingsUILayout();
        }

        let getSummaryConfirmUILayout = function () {
            return self._replangService.getSummaryConfirmUILayout();
        }

        let getSummaryChartCategoriesUILayout = function () {
            return self._replangService.getSummaryChartCategoriesUILayout();
        }

        let getSSRSUILayout = function () {
            return self._replangService.getSSRSReportUILayout(true, self._replangService.ssrsData);
        }


        let service: any = {
            getSummaryUILayout: getSummaryUILayout,
            getSettingsUILayout: getSettingsUILayout,
            getSummaryChartUILayout: getSummaryChartUILayout,
            getSummaryConfirmUILayout: getSummaryConfirmUILayout,
            getSummaryChartCategoriesUILayout: getSummaryChartCategoriesUILayout,
            getSSRSUILayout: getSSRSUILayout
        }

        return service;
    }

    getLayout(pageParameters: any): Observable<any> {
        return Observable.of(this._layoutAPIService.getLayout(pageParameters.pageId));
    }

    prepareLayout(data: any, layout: any): void {

    }
}