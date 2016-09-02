import { Injectable, EventEmitter } from '@angular/core';
import { ReportingData } from '../data/ReportingData';
import * as rep8 from '../RepTS/rep8';

@Injectable()
export class NotifiMessageService {
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
            console.warn('Receive message in setting dialog');
            rep8.SettingDlgProc(message);
        }
        else if(message.options.dialog === 'portfolio_chart'){
            console.warn('Receive message in chart dialog');
            rep8.ChartDlgProc(message);
        }
        else{
            console.warn('Receive message in Dynamic common dialog');
            rep8.DialogProc(message);
        }
    }

    sendMessage(message: any){
        this.RepTSMsg.emit(message);
    }
}