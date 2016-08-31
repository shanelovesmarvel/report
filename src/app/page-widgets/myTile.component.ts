import { Component, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { MyTitleComponent } from './myTitle.component';
import { MyButtonComponent } from './myButton.component';
import { MyFormGroupEditboxComponent } from './myFormGroup-textbox.component';
import { MyFormGroupDropdownComponent } from './myFormGroup-dropdown.component';
import { MyGridComponent } from './myGrid.component';
import { MyTableComponent } from './myTable.component';

/*
* my tile
* 
*/
@Component({
selector: 'my-tile',
directives: [ ROUTER_DIRECTIVES, MyTitleComponent, MyButtonComponent, MyFormGroupEditboxComponent, MyFormGroupDropdownComponent, MyGridComponent, MyTableComponent ],
template: `
<div>
    <my-title [options] = "options.tileTitle.options"
        (click) = "expander_click()"
    >
    </my-title>

    <div *ngIf="options.expanded">
        <div *ngFor="let d of options.tileBody.options.children">

            <!-- button, !important: pageContent reference to top page object, so we can access every control. -->
            <my-button *ngIf="d.type === 'myButton' " 
                [buttonText] = "d.buttonText" 
                [clickHandler] = "d.click"
                [pageContext] = "options"
            ></my-button>

            <!-- form group -->
            <my-form-group-editbox *ngIf="d.type === 'myFormGroupTextbox' "
                    [options] = d.options>
            </my-form-group-editbox>

            <!-- form dropdown -->
            <my-form-group-dropdown  *ngIf="d.type === 'myFormGroupDropdown' "
                    [options] = d.options>
            </my-form-group-dropdown>

            <!-- grid -->
            <div *ngIf="d.type === 'myGrid' ">
                <my-grid [options]="d.options" ></my-grid>
            </div>

            <!-- table -->
            <div *ngIf="d.type === 'myTable' ">
                <my-table [options] = 'd.options'></my-table>
            </div>

        </div>
    </div>
</div>
`
})
export class MyTileComponent implements OnChanges {
    @Input() options: any;
    @Input() pageContext: any;
    @Input() tileContext: any;
    constructor(){
    }

    ngOnChanges(){
        console.info(this.options);
        
        let tileData = this.options.data;

         for(let i=0; i<this.options.tileBody.options.children.length; i++) {
             let child = this.options.tileBody.options.children[i];
             console.warn("i = " + i);
             console.warn(child);
             console.warn(tileData);
             let data = tileData.items[i];
             let service = this.options.service;

             child.options.dataContext = tileData.bindingContext;
             child.options.data = data;
             child.options.service = service;
         }
    }

    expander_click(){
        this.options.expanded = !this.options.expanded;
    }
}