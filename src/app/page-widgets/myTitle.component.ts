import { Component, Input, Output, EventEmitter, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

/*
* 
* 
*/

@Component({
    selector: 'my-title',
    directives: [ROUTER_DIRECTIVES],
    template: `
    <h1 *ngIf="_level === 1">{{ _title }}</h1>
    <h2 *ngIf="_level === 2">{{ _title }}</h2>
    <h3 *ngIf="_level === 3">{{ _title }}</h3>
    <h4 *ngIf="_level === 4">{{ _title }}</h4>
    <h5 *ngIf="_level === 5">{{ _title }}</h5>
    <h6 *ngIf="_level === 6">{{ _title }}</h6>
`
})
export class MyTitleComponent implements OnChanges {
    @Input() options: any;
    private _level: number;

    private _title: string;
    constructor() {
        
    }

    ngOnChanges(){
        this._title = this.options.title;
        this._level = this.options.level;
        if( this.options.subTitle ){
            this._title += " - " + this.options.subTitle;
        }
    }

}