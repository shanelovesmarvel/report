import { Injectable, EventEmitter } from '@angular/core';
import { ReportingData } from '../data/ReportingData';
import * as rep8 from '../RepTS/rep8';

@Injectable()
export class NotifiMessage {
    RepTSMsg: EventEmitter<any>;
    constructor(){
        this.RepTSMsg = new EventEmitter();
        this.RepTSMsg.subscribe(
            (msg: any) =>{
                this.receiveMessage(msg);
            }
        );
    }

    receiveMessage(message: any){
        if(message.options.dialog === 'Report_Setting'){
            rep8.SettingDlgProc(message);
        }
        else if(message.options.dialog === 'portfolio_chart'){
            console.warn('in chart');
            rep8.ChartDlgProc(message);
        }
        else{
            rep8.DialogProc(message);
        }
    }

    sendMessage(message: any){
        this.RepTSMsg.emit(message);
    }
}