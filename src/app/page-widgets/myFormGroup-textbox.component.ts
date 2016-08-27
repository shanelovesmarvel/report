import { Component, Input, Output, EventEmitter, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { FORM_DIRECTIVES }   from '@angular/forms';

/*
* 
* 
*/

@Component({
    selector: 'my-form-group-editbox',
    directives: [ FORM_DIRECTIVES ],
    template: `
<div class="form-group row">
  <label for="options.controlId" class="col-xs-2 col-form-label">{{options.label}}</label>
  <div class="col-xs-10">
    <input class="form-control" type="text" [(ngModel)]="_value" [id]="options.controlId" [disabled]="options.disabled" >
  </div>
</div>    
`
})
export class MyFormGroupEditboxComponent implements OnChanges  {
    @Input() options: any;
    private _value: any;
    constructor() {     
    }

    ngOnChanges(){
       this._value = this.options.value;

       // binding data context
       if( this.options.name && this.options.dataContext ) {
         this._value = this.options.dataContext[ this.options.name ];
       }
    }
}