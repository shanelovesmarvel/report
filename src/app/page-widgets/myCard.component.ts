import { Component, Input, Output, EventEmitter, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { MyTitleComponent } from './myTitle.component';
import { MyTileComponent } from './myTile.component';

import { MyCardBodyComponent } from './myCardBody.component';
import { MyFormGroupEditboxComponent } from './myFormGroup-textbox.component';
import { MyFormGroupDropdownComponent } from './myFormGroup-dropdown.component';
import { MyGridComponent } from './myGrid.component';
/*
* myCard 
* 
*/

@Component({
    selector: 'my-card',
    directives: [ROUTER_DIRECTIVES, MyTileComponent, MyCardBodyComponent ],
    template: `
    <div class="card">
        <div class="card-header">
            <ul class="nav nav-pills card-header-pills">
                <li class="nav-item" *ngFor="let item of options.headers">
                    <a class="nav-link" href="#">{{item}}</a>
                </li>
            </ul>
        </div>
        <div class="card-block" *ngFor="let item of options.bodys; let i = index">
            <!-- card-body -->
            <my-card-body *ngIf="item.type === 'myCardBody' "
                [options] = item.options
                [pageContext] = pageContext
                >
            </my-card-body>            
        </div>
    </div>
`
})
export class MyCardComponent implements OnChanges  {
    @Input() options: any;
    @Input() pageContext: any;

    constructor() {
       
    }

    ngOnChanges(){
        console.log( this.options.data );
        for(let i=0; i< this.options.bodys.length; i++){
            let cardBody = this.options.bodys[i];
            let data = this.options.data.items[i];
            let service = this.options.service;

            cardBody.options.service = service;
            cardBody.options.data = data;
        }
    }

    expander_click() {
        this.options.expanded = !this.options.expanded;
        // alert(`card include ${ this.options.bodys.length } tiles. expanded: ${this._expanded}`);

        this.options.bodys.forEach( item=>{
            item.options.expanded = this.options.expanded;
        });
    }
}