import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

/*
*   
* 
*/
@Component({
selector: 'my-textbox',
directives: [ ROUTER_DIRECTIVES ],
template: `
     <span [ngSwitch]=" options.mode ">
        <template [ngSwitchCase]="'singleline'">
            <input type="text" ngModel=""/>
        </template>
        <template [ngSwitchCase]="'multiline'">
            <textarea></textarea>
        </template>
        <template [ngSwitchCase]="'number'">
            <input type="number" />
        </template>
    </span>
`
})
export class MyDropdownComponent {
@Input() options: any;
    constructor(){
    }
}