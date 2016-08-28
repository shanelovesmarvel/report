import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'my-form-control',
    directives: [ROUTER_DIRECTIVES],
    template: `
           <label class="col-md-4 col-form-label" id="twoColumnForm">{{options.title}}</label>
           <div [ngSwitch]= "true" class="col-md-8">
               <template [ngSwitchCase] = "options.mode === '2'">
                   <input type="date" class="form-control form-control-sm" 
                          [required]="options.IsRequired" id="twoColumnForm">
               </template>
               <template [ngSwitchCase] = "options.mode === '11' 
                                        || options.mode === '13' 
                                        || options.mode === '309' ">
                   <select class="form-control form-control-sm" id="twoColumnForm" 
                            [disabled]="options.disabled" (change)="onchange($event)" 
                            (click)="clickHandler()" [required]="options.IsRequired">
                       <option *ngFor="let item of options.items" 
                                value="item.value" [selected]="item.value == options.value" >{{item.text}}
                       </option>
                   </select>
               </template>
               <template [ngSwitchCase] = "options.mode === '5'">
                    <input type="checkbox" class="form-checkbox-margin" [required]="options.IsRequired"   
                           [checked]= "options.value" id="twoColumnForm">
               </template>
               <template [ngSwitchCase] = "options.mode === '1'">
                   <input type="text" class="form-control form-control-sm" [required]="options.IsRequired"
                          [value]= "options.value" id="twoColumnForm">
               </template>
          </div>        
`
})
export class MyFormControlComponent {
    @Input() options: any;
    @Input() pageContext: any;
    constructor() {
    }
}