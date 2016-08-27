import { Component, Input, Output, EventEmitter, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';


@Component({
    selector: 'my-form-group-radiobutton',
    directives: [ROUTER_DIRECTIVES],
    template: `
<label class="custom-control custom-radio">
      <input type="radio" name="radio" value="{{options.value}}" class="custom-control-input"
             [checked]="options.checked" name="{{options.groupName}}" (click)="checkHandler()">
      <span class="custom-control-indicator"></span>
      <span class="custom-control-description">{{options.label}}</span>
</label>    
`
})
export class MyFormGroupRadioButtonComponent implements OnChanges  {
    @Input() options: any;
    @Input() pageContext: any;

    constructor(private _router: Router) {     
    }

    ngOnChanges(){
        
    }

    checkHandler() {
        let context = this.options;
        if( !context.service ){
            context.service = {};
        }

        context.service.router = this._router;
        this.options.click(this);
    }
}