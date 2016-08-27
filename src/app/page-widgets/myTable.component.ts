import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { MyFormGroupEditboxComponent } from './myFormGroup-textbox.component';
import { MyFormGroupDropdownComponent } from './myFormGroup-dropdown.component';
import { MyFormGroupCheckboxComponent } from './myFormGroup-checkbox.component';

/*
* 
* 
*/

@Component({
    selector: 'my-table',
    directives: [ROUTER_DIRECTIVES, MyFormGroupEditboxComponent, MyFormGroupDropdownComponent, MyFormGroupCheckboxComponent],
    template: `
    <table class="table t;able-hover table-margin">
       <tbody *ngIf="_cells" >
            <tr *ngFor="let row of _cells">
                <td *ngFor="let control of row">

                    <!-- form group -->
                    <my-form-group-editbox *ngIf="control && control.type === 'myFormGroupTextbox' "
                            [options] = control.options>
                    </my-form-group-editbox>

                    <!-- form dropdown -->
                    <my-form-group-dropdown *ngIf="control && control.type === 'myFormGroupDropdown' "
                            [options] = control.options>
                    </my-form-group-dropdown>

                    <!-- form checkbox -->
                    <my-form-group-checkbox  *ngIf="control && control.type === 'myFormGroupCheckbox' "
                            [options] = control.options>
                    </my-form-group-checkbox>

                </td>
            </tr>
       </tbody>
    </table>
`
})
export class MyTableComponent implements OnChanges {
    @Input() options: any;

    private _cells: Array<Array<any>> = [];
    constructor() {
    }

    ngOnChanges() {
        this._cells = new Array<any>(this.options.rowCount);
        for (let i = 0; i < this.options.rowCount; i++) {
            this._cells[i] = new Array<any>(this.options.columnCount);
        }

        // fill control into specific cell
        for (let i = 0; i < this.options.items.length; i++) {
            let item = this.options.items[i];
            this._cells[item.options.rowIndex][item.options.columnIndex] = item;
        }
    }
}