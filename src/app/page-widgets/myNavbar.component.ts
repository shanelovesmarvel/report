import { Component, Input } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'my-navbar',
    directives: [ROUTER_DIRECTIVES],
    template: `
    <nav class="navbar navbar-light bg-faded">
        <button class="navbar-toggler hidden-sm-up" type="button" data-toggle="collapse"
                data-target="#exCollapsingNavbar" aria-controls="exCollapsingNavbar"
                aria-expanded="false" aria-label="Toggle navigation">&#9776;
        </button>
        <div class="collapse navbar-toggleable-xs" id="exCollapsingNavbar">
            <label class="navbar-title">Show</label>
            <ul class="nav navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" data-toggle="collapse" href="#portfolio_settings" 
                       aria-expanded="false" aria-controls="portfolio_settings"> Hide Settings | </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-toggle="collapse" href="#portfolio_appraisal, #portfolio_settings"
                       aria-expanded="false" aria-controls="portfolio_appraisal,portfolio_settings"> Show All | </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-toggle="collapse" href="#portfolio_appraisal,#portfolio_settings" 
                       aria-expanded="true" aria-controls="portfolio_appraisal, portfolio_settings"> Hide All </a>
                </li>     
            </ul>
            <ul class="pull-sm-right">
                <li>
                    <button class="btn btn-primary btn-md" data-toggle="collapse" 
                            data-target="#portfolio_appraisal,#portfolio_settings"
                            aria-expanded="true" aria-controls="portfolio_appraisal, portfolio_settings" 
                            (click)="clickHandler()">Run</button>
                </li>
            </ul>
        </div>
    </nav>
    `
})
export class MyNavbarComponent {
    @Input() options: any;
    @Input() pageContext: any;
    constructor() {
    }

    clickHandler(){
        let context = this.options;
        if( !context.service ){
            context.service = {};
        }

        this.options.click( this );
    }
}
