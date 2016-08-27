import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { MyFormControlComponent } from './myFormControl.component.ts';

@Component({
    selector: 'my-form',
    directives: [ROUTER_DIRECTIVES, MyFormControlComponent],
    template: `
        <div [class]="options.klass" id="{{options.formId}}">
            <div class="span6">
                <div class="row-fluid">
                    <div class="col-md-6" >
                         <div *ngFor="let d of options.leftChildren" class="form-group row">
                            <my-form-control *ngIf="d.type === 'myFormControl'" [options] = d.options>
                            </my-form-control>
                         </div>
                    </div>
                    <div class="col-md-6" >
                         <div *ngFor="let d of options.rightChildren" class="form-group row">
                             <my-form-control *ngIf="d.type === 'myFormControl'" [options] = d.options>
                             </my-form-control>
                         </div>
                    </div>
                </div>
            </div>
        </div>
`
})
export class MyFormComponent {
    @Input() options: any;
    @Input() pageContext: any;
    constructor() {
    }
}