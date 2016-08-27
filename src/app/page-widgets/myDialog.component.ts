import { Component, Input, Output, EventEmitter, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { MyDialogBodyComponent } from './myDialogBody.component';
import { MyDialogButtonComponent } from './myDialogButton.component';

/*
* myDialog
* 
*/

declare var $: any;

@Component({
    selector: 'my-dialog',
    directives: [ROUTER_DIRECTIVES, MyDialogBodyComponent, MyDialogButtonComponent],
    template: `
    <div class="modal fade" role="dialog" id="{{options.dialogId}}">
        <div class="modal-dialog my-dialog">
            <!-- Modal content  -->
            <div class="modal-content">
                <!-- Modal header -->
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">{{options.title}}</h4>
                </div>
                <!-- Modal body -->
                <div class="modal-body" *ngFor="let item of options.body">
                    <my-dialog-body *ngIf="item.type === 'myDialogBody'"
                                    [options] = item.options
                                    [pageContext] = pageContext>
                    </my-dialog-body>
                </div>
                <!-- Modal footer -->
                <div class="modal-footer" *ngIf="options.footer">
                    <span *ngFor="let item of options.footer">
                        <my-dialog-button *ngIf="item.type === 'myDialogButton'"
                                      [options] = item.options
                                      [pageContext] = pageContext>
                        </my-dialog-button>
                    </span>
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                </div>
            </div>
        </div>
    </div>
`
})
export class MyDialogComponent  {
    @Input() options: any;
    @Input() pageContext: any;

    constructor() {
        
    }

    public clickHandler(){
        $("#"+this.options.dialogId).modal("hide");
    }
}