import { Component, Input, OnChanges, SimpleChange} from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { MyTitleComponent } from './myTitle.component';
import { MyButtonGroupComponent } from './myButtonGroup.component';
import { MyDropdownComponent } from './myDropdown.component';
import { MyGridComponent } from './myGrid.component';
import { MyCardComponent } from './myCard.component';
import { MyDialogComponent } from './myDialog.component';
import { MyDialogButtonComponent } from './myDialogButton.component';
import { MySpanComponent } from './mySpan.component';
import { MyFormComponent } from './myForm.component';
import { MySectionComponent } from './mySection.component';

/*
* myDiv is container component.
* it can contain other componet, even myDiv self.
*/
@Component({
    selector: 'my-div',
    directives: [ROUTER_DIRECTIVES, MyTitleComponent, MyDivComponent, MyButtonGroupComponent, 
                 MyDropdownComponent, MyGridComponent, MyCardComponent, MyDialogComponent, 
                 MyDialogButtonComponent, MySpanComponent, MyFormComponent, MySectionComponent],
    template: `
<div>
    <div *ngFor="let d of options.ui.children; let i = index">

        <div *ngIf="d.type === 'myDiv'">
            <my-div [options]="d.options"
                    [pageContext] = "options"
                >
            </my-div>
        </div>

        <!-- title -->
        <my-title *ngIf="d.type === 'myTitle' "
                  [options] = d.options
                  [pageContext] = "options"
            >
        </my-title>

        <!-- dropdown -->
        <my-dropdown *ngIf="d.type === 'myDropdown' "
                  [options] = d.options
                  [pageContext] = "options"
            >
        </my-dropdown>

        <my-button-group *ngIf="d.type === 'myButtonGroup' "
                [options] = d.options
            >
        </my-button-group>

        <!-- card -->
        <my-card *ngIf="d.type === 'myCard' "
                 [options] = d.options
                 [pageContext] = "options"
                 >
        </my-card>

        <!-- grid -->
        <div *ngIf="d.type === 'myGrid' ">
            <my-grid [options]="options.data[i]" 
                     [pageContext] = "options"
                >
            </my-grid>
        </div>

        <my-dialog *ngIf="d.type === 'myDialog'"
                        [options] = d.options  [pageContext] = "options">
        </my-dialog>

        <my-dialog-button *ngIf="d.type === 'myDialogButton'"
                        [options] = d.options  [pageContext] = "options">
        </my-dialog-button>

        <my-span *ngIf="d.type === 'mySpan'"
                 [options] = d.options  [pageContext] = "options">
        </my-span>

        <my-form *ngIf="d.type === 'myForm'"
                 [options] = d.options  [pageContext] = "options">
        </my-form>

        <my-section *ngIf="d.type === 'mySection'"
                 [options] = d.options  [pageContext] = "options">
        </my-section>

    </div>
</div>
`
})
export class MyDivComponent implements OnChanges {
    @Input() options: any;
    constructor() {
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        console.warn(this.options);
        for (let propName in changes) {
            let chng = changes[propName];
            let cur = chng.currentValue;
            let prev = chng.previousValue;
            
            //console.log(`property name: ${propName}, previous value: ${prev}, current value: ${cur}`);
        }
    }
}