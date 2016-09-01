import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'app-header',
    directives: [ ROUTER_DIRECTIVES ],
    template: `
    <header class="navbar navbar-fixed-top">
        <a class="navbar-brand" href="#">
            <div class="logo"></div>
        </a>
        <ul class="pull-md-left">
            <li><a class="nav-link nav-item" [routerLink]="['/']"> Home |</a></li>
            <li><a class="nav-link nav-item" [routerLink]="['/report', -3931]">Report Dialogs |</a></li>
            <li><a class="nav-link nav-item" [routerLink]="['/report', -3979]">SSRS Page |</a></li>
            <li><a class="nav-link nav-item" [routerLink]="['/report', -3973]">Portfolio Summary Page</a></li>
            <li *ngIf="false"><a class="nav=link nav-item" [routerLink]="['/report', -3939]">Output</a></li>
        </ul>
        <ul class="pull-md-right">
            <li *ngIf="false">Login</li>
        </ul>
    </header>
    `
})
export class HeaderComponent {
}
