import { Component, Input, Output, EventEmitter, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';


@Component({
    selector: 'my-form-group-checkbox',
    directives: [ROUTER_DIRECTIVES],
    template: `
<div style="display:inline;">
      <input type="checkbox" value="{{options.value}}" 
             [attr.data-toggle]="options.modal" [attr.data-target]="options.target" data-backdrop="static"
             [disabled]="options.disabled" [checked]="options.checked" (click)="checkHandler($event)">
      <label for="options.controlId">{{options.label}}</label>
</div>    
`
})
export class MyFormGroupCheckboxComponent implements OnChanges  {
    @Input() options: any;
    @Input() pageContext: any;

    checked: boolean = false;

    constructor(private _router: Router) {     
    }

    ngOnChanges(){
        console.log( this.options );
    }

    checkHandler(event) {
        let context = this.options;
        if( !context.service ){
            context.service = {};
        }

        context.service.router = this._router;
        this.options.click(this, event);
    }
}