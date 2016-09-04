import { Injectable, EventEmitter } from '@angular/core';
import { ReportingData } from '../data/ReportingData';
import { SSRSType } from './ReportingAdapter';
import * as rep8 from '../RepTS/rep8';

@Injectable()
export class NotifiMessageService {
    RepTSMsg: EventEmitter<any>;
    SSRSMsg: EventEmitter<any>;
    RepTSUIMsg: EventEmitter<any>;
    constructor() {
        this.RepTSMsg = new EventEmitter();
        this.RepTSMsg.subscribe(
            (msg: any) => {
                this.receiveMessage(msg);
            }
        );

        this.SSRSMsg = new EventEmitter();
        this.SSRSMsg.subscribe(
            (msg: any) => {
                this.receiveSSRSMessage(msg);
            }
        );
        this.RepTSUIMsg = new EventEmitter();
        this.RepTSUIMsg.subscribe(
            (msg: any) => {
                this.receiveRepTSUIMessage(msg);
            }
        );
    }

    receiveMessage(message: any) {
        if (message.options.dialog === 'Report_Setting') {
            console.warn('Receive message in setting dialog');
            rep8.SettingDlgProc(message);
        }
        else if (message.options.dialog === 'portfolio_chart') {
            console.warn('Receive message in chart dialog');
            rep8.ChartDlgProc(message);
        }
        else {
            console.warn('Receive message in Dynamic common dialog');
            rep8.DialogProc(message);
        }
    }
    sendMessage(message: any) {
        //console.warn('In Send Msg');
        console.warn(message);
        this.RepTSMsg.emit(message);
    }

    receiveSSRSMessage(message: any) {
        switch (message.options.mode) {
            case SSRSType.Portfolio.toString():
            case SSRSType.PortfolioBaseNoComposites.toString():
                //console.warn('!!!!');
                message.options.items = ReportingData.getPortfoliolist();
                break;
            case SSRSType.RDLPickList_String.toString():
                let ttStr: string = message.options.title.toUpperCase();
                if (ttStr.indexOf('CURRENCY'))
                    message.options.items = ReportingData.getLookupList('currecy');
                break;
            default:
                console.warn('Please check if the type is valid');
                break;
        }
    }
    sendSSRSMessage(message: any) {
        this.SSRSMsg.emit(message);
    }

    receiveRepTSUIMessage(message: any){
        console.warn('receive msg');
        console.warn(message);
        switch(message.options.dtilID){
            case 1:
                var summarySection = message.pageContext.service.findControl("Portfolio_Summary");
                ($("#" + summarySection.options.id) as any).removeClass("fadeInDown");
                ($("#" + summarySection.options.id) as any).removeClass("fadeOutUp");
                ($("#" + summarySection.options.id) as any).removeClass("fadeInLeft");
                ($("#" + summarySection.options.id) as any).addClass("fadeOutRight");
                var confirmSection = message.pageContext.service.findControl("portfolioSummaryConfirm");
                if (!confirmSection) {
                    var chartOptions = message.pageContext.service.getPortfolioSummaryConfirmUILayout();
                    message.pageContext.ui.children.push(chartOptions);
                    } 
                else {
                    ($("#" + confirmSection.options.id) as any).removeClass("fadeOutRightConfirm");
                    ($("#" + confirmSection.options.id) as any).addClass("fadeInRight");
                }
                break;
            case 518:
				//console.warn(message.checked);
				message.checked = !message.checked;
                message.options.checked = true;
                var summarySection = message.pageContext.service.findControl("Portfolio_Summary");
                ($("#" + summarySection.options.id) as any).removeClass("fadeInDown");
                ($("#" + summarySection.options.id) as any).removeClass("fadeInLeft");
                ($("#" + summarySection.options.id) as any).removeClass("fadeOutRight");
                ($("#" + summarySection.options.id) as any).addClass("fadeOutUp");
                var chartSection = message.pageContext.service.findControl("portfolioSummaryChart");
                if (!chartSection) {
                    var chartOptions = message.pageContext.service.getPortfolioSummaryChartUILayout();
                    message.pageContext.ui.children.push(chartOptions);
                    } 
                else {
                    ($("#" + chartSection.options.id) as any).removeClass("fadeOutDown");
                    ($("#" + chartSection.options.id) as any).addClass("fadeInUp");
                }
                break;
            default:
                rep8.DialogProc(message);
        }
    }
    sendRepTSUIMessage(message: any){
        this.RepTSUIMsg.emit(message);
        
    }
}