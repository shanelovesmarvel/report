import { Injectable, EventEmitter } from '@angular/core';
import { ReportingData } from '../data/ReportingData';
import { SSRSType } from './ReportingAdapter';
import * as rep8 from '../RepTS/rep8';

@Injectable()
export class NotifiMessageService {
    RepTSMsg: EventEmitter<any>;
    SSRSMsg: EventEmitter<any>;
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
        console.warn('In Send Msg');
        console.warn(message);
        this.RepTSMsg.emit(message);
    }

    receiveSSRSMessage(message: any) {
        //let modeID: number = message.options.mode;
        //console.warn(message.options.mode);
        //console.warn(modeID);
        //console.warn(SSRSType.PortfolioBaseNoComposites.toString());
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
        console.warn(message);
        this.SSRSMsg.emit(message);
    }
}