import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { MyTitleComponent } from './myTitle.component';
import { MySectionComponent } from './mySection.component';
import { MySpanComponent } from './mySpan.component';
import { MyFormComponent } from './myForm.component';

/*
* myDiv is container component.
* it can contain other componet, even myDiv self.
*/
@Component({
    selector: 'my-dialog-body',
    directives: [ROUTER_DIRECTIVES, MyTitleComponent, MySectionComponent, MySpanComponent, MyFormComponent],
    template: `
<div>
    <div *ngFor="let d of options.children">  
        <!-- title -->
        <my-title *ngIf="d.type === 'myTitle' "
                [options] = d.options>
        </my-title>

        <my-section *ngIf="d.type === 'mySection' " [options] = d.options [pageContext] = "pageContext">
        </my-section>

        <my-span *ngIf="d.type === 'mySpan' " [options] = d.options [pageContext] = "pageContext">
        </my-span>

        <my-form *ngIf="d.type === 'myForm' " [options] = d.options [pageContext] = "pageContext">
        </my-form>
    </div>
</div>
`
})
export class MyDialogBodyComponent {
    @Input() options: any;
    @Input() pageContext: any;
    constructor() {
    }
}