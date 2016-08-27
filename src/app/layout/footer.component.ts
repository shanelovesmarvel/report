import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'app-footer',
    directives: [ ROUTER_DIRECTIVES ],
    template: `
    <footer>
        <ul>
            <li *ngIf="false"><a href="#">&copy;&nbsp;Copyright</a></li>
        </ul>
    </footer>
    `
})
export class FooterComponent {
}
