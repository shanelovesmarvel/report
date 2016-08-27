import { Component, Input, Output, EventEmitter, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { MyDropdownComponent } from './myDropdown.component';

@Component({
    selector: 'my-form-group-dropdown',
    directives: [ROUTER_DIRECTIVES, MyDropdownComponent ],
    template: `
<div class="form-group row">
  <label for="options.controlId" class="col-xs-3">{{options.label}}</label>
  <div class="col-xs-9">
    <my-dropdown [options] = "options" [pageContext] = "pageContext"></my-dropdown>
  </div>
</div>    
`
})
export class MyFormGroupDropdownComponent implements OnChanges  {
    @Input() options: any;
    @Input() pageContext: any;
    constructor() {     
    }

    ngOnChanges(){
      
    }
}