import { Component, Input, Output, EventEmitter, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ROUTER_DIRECTIVES } from '@angular/router';

/*
* myButton is independency componet.
* it can't contain other component.
*/

@Component({
    selector: 'my-button',
    directives: [ROUTER_DIRECTIVES],
    template: `
    <button class="btn btn-primary btn-margin" type="button" (click)="clickHandler()" >{{ options.label }}</button>
`
})
export class MyButtonComponent {
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