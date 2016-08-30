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
            <li *ngIf="false"><a class="nav-link nav-item" [routerLink]="['/index', -4034]">Portfolio</a></li>
            <li *ngIf="false"><a class="nav-link nav-item" [routerLink]="['/index', -4222]">Index</a></li>
            <li *ngIf="false"><a class="nav-link nav-item" [routerLink]="['/index', -4114]">Asset Class</a></li>
            <li *ngIf="false"><a class="nav-link nav-item" href="#">Help</a></li>
            <li><a class="nav-link nav-item" [routerLink]="['/report', -3931]">Dialog |</a></li>
            <li><a class="nav-link nav-item" [routerLink]="['/report', -3979]">SSRS |</a></li>
            <li><a class="nav-link nav-item" [routerLink]="['/report', -3973]">Portfolio Summary</a></li>
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
