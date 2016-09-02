import { Component, Input, Output, EventEmitter, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';


@Component({
    selector: 'my-form-group-datepicker',
    directives: [ROUTER_DIRECTIVES],
    template: `
<div class="form-group row">
  <label for="options.controlId" class="col-xs-3 col-form-label">{{options.label}}</label>
  <div class="col-xs-9">
      <input type="date" id="date">
  </div>
</div>    
`
})
export class MyFormGroupDatePickerComponent implements OnChanges  {
    @Input() options: any;
    constructor() {     
    }

    ngOnChanges(){
        //console.log( this.options );
    }
}