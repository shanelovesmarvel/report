import { Component, Input, Output, EventEmitter, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ROUTER_DIRECTIVES } from '@angular/router';

/*
* myButton is independency componet.
* it can't contain other component.
*/

@Component({
    selector: 'my-dialog-button',
    directives: [ROUTER_DIRECTIVES],
    template: `
    <button class="btn btn-primary btn-margin" type="button" 
         [attr.data-toggle]="options.modal" 
         [attr.data-target]="options.target"
         [attr.data-dismiss]="options.dismiss"
         [attr.data-backdrop]="options.backdrop"
         [attr.data-keyboard]="options.keyboard"
         (click)="clickHandler()" >{{ options.buttonText }}
    </button>
`
})
export class MyDialogButtonComponent {
    @Input() options: any;
    @Input() pageContext: any;
    constructor( private _router: Router ) {
        
    }

    clickHandler(){
        let context = this.options;
        if( !context.service ){
            context.service = {};
        }

        context.service.router = this._router;
        this.options.click( this );
        
    }
}