import { Component, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';


@Component({
selector: 'my-listbox',
directives: [ ROUTER_DIRECTIVES ],
template: `
    <select [id]="options.controlId" [disabled]="options.disabled" multiple *ngIf="!options.isHidden"
            (change)="onchange($event)" (click)="clickHandler()" style="width: 300px;">
        <option *ngFor="let item of options.items" value="item.value" [selected]="item.value == options.value" >{{item.text}}</option>
    </select>
`
})
export class MyListBoxComponent implements OnChanges {
    @Input() options: any;
    @Input() pageContext: any;
    constructor(private _router: Router){
    }

    ngOnChanges(){
        for(var memberName in this.options.service ){
            console.log( memberName);
            if( this.options[ memberName] instanceof Function ){
            }
        }
        if(this.options.items){
            this.options.selectedIndex = 0;
            this.options.value = this.options.items[0].value; 
        }
        console.warn($("#"+this.options.controlId));
        console.warn(this.options.items.length);
        $("select").attr('size', this.options.items.length);
           
    }

    onchange(event) {
       
    }

    clickHandler() {
        
    
    }
}