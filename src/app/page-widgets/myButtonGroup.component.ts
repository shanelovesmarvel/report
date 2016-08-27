import { Component, Input, Output, EventEmitter, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { MyButtonComponent } from './myButton.component';

/*
* myButton is independency componet.
* it can't contain other component.
*/

@Component({
    selector: 'my-button-group',
    directives: [ROUTER_DIRECTIVES, MyButtonComponent],
    template: `
<div class="btn-group btn-group-sm" role="group" aria-label="">
    <my-button *ngFor="let item of options.children; let i = index"
        [options] = item.options >
    </my-button>
</div>
`
})
export class MyButtonGroupComponent implements OnChanges {
    @Input() options: any;
    constructor() {
    }

    ngOnChanges(){
        for(let i=0; i<this.options.children.length; i++){
            let child = this.options.children[i];

            child.options.pageContext = this.options.pageContext;
        }
    }
}