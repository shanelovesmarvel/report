import { Injectable } from '@angular/core';

import { ApplicationPipeline } from './application-pipeline.service';
import { ReplangService } from './replang.service';
import { EngineService } from './engine.service';
import { TransporterService } from './transporter.service';

@Injectable()
export class PageEngineService {
    constructor(
        private _replangService: ReplangService,
        private _engineService: EngineService,
        private _transporterService: TransporterService) {
    }

    public getPageData(pageId: number, linkfield: any, reportType: string): any {
        switch (pageId) {

            case -3931:
                return this.showDialogs();                //Portfolio summary dialog
            case -3979:
                return this.showSSRSPage();
            case -3939:
                return this.showOutput(reportType);
            case -3973:
                return this.showPortfolioSummaryPage();

        };

        return {};
    }

    private showPortfolioSummaryPage() {
        let data: any = {};

        let ui = this._replangService.getPortfolioSummaryUILayout();

        let service: any = {};

        let that = this;

        let getPortfolioSummaryChartUILayout = function() {
            return that._replangService.getPortfolioSummaryChartUILayout();
        }

        let getPortfolioSummaryConfirmUILayout = function() {
            return that._replangService.getPortfolioSummaryConfirmUILayout();
        }

        let getPortfolioSummaryChartCategoriesUILayout = function(){
            return that._replangService.getPortfolioSummaryChartCategoriesUILayout();
        }

        let getPortfolioSummaryOutput = function(){
            return that._replangService.getPortfolioSummaryOutput();
        }

        service.getPortfolioSummaryChartUILayout = getPortfolioSummaryChartUILayout.bind(this);
        service.getPortfolioSummaryConfirmUILayout = getPortfolioSummaryConfirmUILayout.bind(this);
        service.getPortfolioSummaryChartCategoriesUILayout = getPortfolioSummaryChartCategoriesUILayout.bind(this);
        service.getPortfolioSummaryOutput = getPortfolioSummaryOutput.bind(this);

        let result = {
            data: data,
            ui: ui,
            service: service
        }

        return result;
    }

    private showOutput(reportType: string) {
        let data: any = {};

        let ui = {
            children: [
                {
                    type: "myTitle",
                    options: {
                        title: reportType + " Report Output",
                        level: 1
                    }
                }
            ]
        }

        let service: any = {};

        let result = {
            data: data,
            ui: ui,
            service: service
        }

        return result;
    }

    private showSSRSPage() {
        // Get xml via http request
        if (!this._replangService.ssrsData) {
            this._replangService.getSSRSData();
        }

        // data
        let data = [
            {}
        ]

        // service
        let service: any = {};
        let that = this;

        // ui
        let ui = that._replangService.getSSRSReportUILayout(false);

        let result = {
            data: data,
            ui: ui,
            service: service
        }

        return result;
    }


    private showDialogs() {
        // data

        if (!this._replangService.ssrsData) {
            this._replangService.getSSRSData();
        }


        let data = [
            {}
        ]

        // service
        let service: any = {};
        let that = this;

        let getSummaryChartUILayout = function () {
            return that._replangService.getSummaryChartUILayout();
        }

        let getSummaryUILayout = function () {
            return that._replangService.getSummaryReportUILayout();
        }

        let getSummaryConfirmUILayout = function () {
            return that._replangService.getSummaryConfirmUILayout();
        }

        let getSummaryChartCategoriesUILayout = function () {
            return that._replangService.getSummaryChartCategoriesUILayout();
        }

        let getSSRSUILayout = function () {
            return that._replangService.getSSRSReportUILayout(true);
        }

        let getSettingDialog = function(){
            return that._replangService.getSettingDialog();
        }

        // rebind this by bind.
        service.getSummaryConfirmUILayout = getSummaryConfirmUILayout.bind(this);
        service.getSummaryChartUILayout = getSummaryChartUILayout.bind(this);
        service.getSummaryUILayout = getSummaryUILayout.bind(this);
        service.getSummaryChartCategoriesUILayout = getSummaryChartCategoriesUILayout.bind(this);
        service.getSSRSUILayout = getSSRSUILayout.bind(this);
        service.getSettingDialog = getSettingDialog.bind(this);

        let ui = {
            children: [
                {
                    type: "myDialogButton",
                    options: {
                        id: "openSummaryDialog",
                        label: "Run Summary Report",
                        modal: "modal",
                        target: "#Appraisal",
                        backdrop: "static",
                        keyboard: true,
                        click: function (context) {
                            var summaryDialog = context.pageContext.service.getSummaryUILayout();
                            context.pageContext.ui.children.push(summaryDialog);
                            //console.info(context);
                        }
                    }
                },
                {
                    type: "myDialogButton",
                    options: {
                        id: "openSSRSDialog",
                        label: "Run SSRS Report",
                        modal: "modal",
                        target: "#ssrs_report",
                        backdrop: false,
                        keyboard: true,
                        click: function (context) {
                            var summaryDialog = context.pageContext.service.getSSRSUILayout();
                            context.pageContext.ui.children.push(summaryDialog);
                            //console.info(context);
                        }
                    }
                }
            ]
        }

        let result = {
            data: data,
            ui: ui,
            service: service
        }

        return result;
    }
}