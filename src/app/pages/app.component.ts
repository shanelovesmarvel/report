/*
 * root 选择器匹配 RootComponent 中的 root 元素
 */
import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { HeaderComponent } from '../layout/header.component';
import { FooterComponent } from '../layout/footer.component';
import { AsideLeftComponent } from '../layout/aside.left.component';

@Component({
    selector: 'root',
    directives: [ ROUTER_DIRECTIVES, HeaderComponent, FooterComponent, AsideLeftComponent],
    template: `
    <app-header></app-header>
    <div class="main">
        <app-aside-left *ngIf="false"></app-aside-left>
        <main>
            <router-outlet></router-outlet>
        </main>
    </div>
    <app-footer></app-footer>
    `
})
export class AppComponent {
    constructor(){
        console.log('my app component constructor.');
    }
}
