import { provideRouter, Route } from "@angular/router";

import { RootComponent } from './pages/rootComponent';
import { AppComponent } from './pages/app.component';

import { ApplicationLoadingComponent } from './pages/application-loading.component';
import { Page404Component } from './pages/page404.component';

import { HomeComponent } from './pages/home.page';
import { PageEngineComponent } from './pages/page-engine.component';

// http://victorsavkin.com/post/146722301646/angular-router-empty-paths-componentless-routes

const routes = [ 

  { path: "page404", component: Page404Component, resolve:[], data: { message: "page 404."} },
  { path: "appInit", component: ApplicationLoadingComponent },

  { path: "", component: AppComponent, children:[
     // { path: '', redirectTo: '/app/contact-list', pathMatch: 'full' },   
     { path: "", component: HomeComponent, terminal: true },
     { path: "report/:pageId", component: PageEngineComponent }
  ]}
];


export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];