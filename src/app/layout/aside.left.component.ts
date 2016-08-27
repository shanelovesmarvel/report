import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'app-aside-left',
    directives: [ ROUTER_DIRECTIVES ],
    template: `
    <aside class="left-sidebar">
            <ul>
                <li>Nav1</li>
                <li>Nav2</li>
            </ul>
    </aside>
    `
})
export class AsideLeftComponent {
}
