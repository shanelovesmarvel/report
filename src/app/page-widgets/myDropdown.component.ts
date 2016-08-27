import { Component, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

/*
* 
* 
*/

@Component({
selector: 'my-dropdown',
directives: [ ROUTER_DIRECTIVES ],
template: `
    <select [id]="options.controlId" [disabled]="options.disabled" 
            (change)="onchange($event)" (click)="clickHandler()">
        <option *ngFor="let item of options.items" value="item.value" [selected]="item.value == options.value" >{{item.text}}</option>
    </select>
`
})
export class MyDropdownComponent implements OnChanges {
    @Input() options: any;
    @Input() pageContext: any;
    constructor(private _router: Router){
    }

    ngOnChanges(){
        console.log( this );

        for(var memberName in this.options.service ){
            console.log( memberName);
            if( this.options[ memberName] instanceof Function ){
            }
        }
        if(this.options.items){
            this.options.selectedIndex = 0;
            this.options.value = this.options.items[0].value; 
        }
           
    }

    onchange(event) {
        let selectedIndex = event.target.selectedIndex;
        this.options.value = this.options.items[ selectedIndex ].value;
        this.options.selectedIndex = selectedIndex;

        if( this.options.onchange instanceof Function ){
            let self = this;
            this.options.onchange.call(self, this.options.value);
        }
    }

    clickHandler() {
        let context = this.options;
        if( !context.service ){
            context.service = {};
        }

        context.service.router = this._router;
        this.options.click( this );
    
    }
}