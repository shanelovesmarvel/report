import { Injectable } from '@angular/core';
import { EngineInterface } from '../engine.interface';
import { Observable } from 'rxjs/Observable';
import { ReplangService } from '../../services/replang.service';
import { TransporterService } from '../../services/transporter.service';
import { NotifiMessageService } from '../../ReportDialogController/notify-message.service';
import { EngineLayoutAPIService } from '../engine.layout.api';

@Injectable()
export class PortfolioReportPage implements EngineInterface {

    constructor(
        private _replangService: ReplangService) {
    }

    getData(pageParameters: any): Observable<any> {
        return Observable.of({});
    }

    getService(pageParameters: any): Object {
        let self = this;

        let getPortfolioSummaryChartUILayout = function () {
            return self._replangService.getPortfolioSummaryChartUILayout();
        }

        let getPortfolioSummaryConfirmUILayout = function () {
            return self._replangService.getPortfolioSummaryConfirmUILayout();
        }

        let getPortfolioSummaryChartCategoriesUILayout = function () {
            return self._replangService.getPortfolioSummaryChartCategoriesUILayout();
        }

        let getPortfolioSummaryOutput = function () {
            return self._replangService.getPortfolioSummaryOutput();
        }

        let service: any = {
            getPortfolioSummaryChartUILayout: getPortfolioSummaryChartUILayout,
            getPortfolioSummaryConfirmUILayout: getPortfolioSummaryConfirmUILayout,
            getPortfolioSummaryChartCategoriesUILayout: getPortfolioSummaryChartCategoriesUILayout,
            getPortfolioSummaryOutput: getPortfolioSummaryOutput
        };
        return service;
    }

    getLayout(pageParameters: any): Observable<any> {
        return Observable.of(this._replangService.getPortfolioSummaryUILayout());
    }

    prepareLayout(data: any, layout: any): void {

    }
}