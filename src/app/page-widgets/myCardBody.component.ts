import { Component, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { MyTileComponent } from './myTile.component';
import { MyButtonComponent } from './myButton.component';
import { MyFormGroupEditboxComponent } from './myFormGroup-textbox.component';
import { MyFormGroupDropdownComponent } from './myFormGroup-dropdown.component';
import { MyGridComponent } from './myGrid.component';

/*
* myDiv is container component.
* it can contain other componet, even myDiv self.
*/
@Component({
selector: 'my-card-body',
directives: [ ROUTER_DIRECTIVES, MyTileComponent],
template: `
<div>
    <div class="tile-header">
        <h1 (click)="expander_click()" >{{ getButtonText() }} All Sections</h1>
    </div>
    <form>
        <div *ngFor="let d of options.children">
            <!-- title -->
            <my-tile *ngIf="d.type === 'myTile' "
                [options] = d.options
                >
            </my-tile>
        </div>
    </form>
</div>
`
})
export class MyCardBodyComponent implements OnChanges {
    @Input() options: any;
    @Input() pageContext: any;
    private _buttonText: string;
    constructor(){
    }

    ngOnChanges(){
        console.log( this.options.data );
        for(let i=0; i<this.options.children.length; i++) {
            let tile = this.options.children[i];
            let data = this.options.data.items[i];
            let service = this.options.service;

            tile.options.data = data;
            tile.options.service = service;

            //console.log('................Card Body.......................');
            console.log( data );
        }
    }

    expander_click(){
        this.options.expanded = !this.options.expanded;
        let that = this;
        this.options.children.forEach( item=>{
            item.options.expanded = that.options.expanded; 
        });
    }

    getButtonText(): string {
        return this.options.expanded ? 
            "Collapse" : 
            "Expand";
    }
}