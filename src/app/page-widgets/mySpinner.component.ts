import { Component, Input, Output, EventEmitter, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ROUTER_DIRECTIVES } from '@angular/router';


@Component({
    selector: 'my-spinner',
    directives: [ROUTER_DIRECTIVES],
    template: `
<div [hidden]="!isDelayedRunning" class="spinner">
    <div class="double-bounce1"></div>
    <div class="double-bounce2"></div>
</div>
`
})
export class MySpinnerComponent implements OnDestroy {
    @Input() delay: number = 300;

    private currentTimeout: any;
    private isDelayedRunning: boolean = false;

    constructor() {
    }

    @Input()
    public set isRunning(value: boolean) {
        if(!value) {
            this.cancelTimeout();
            this.isDelayedRunning = false;
        }
        if(this.currentTimeout){
            return;
        }
        this.currentTimeout = setTimeout(() => {
            this.isDelayedRunning = value;
            this.cancelTimeout();
        }, this.delay);
    }

    private cancelTimeout(): void {
        clearTimeout(this.currentTimeout);
        this.currentTimeout = undefined;
    }

    ngOnDestroy(){
        this.cancelTimeout();
    }
}