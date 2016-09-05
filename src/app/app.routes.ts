import { provideRouter, Route } from "@angular/router";

import { RootComponent } from './pages/rootComponent';
import { AppComponent } from './pages/app.component';

import { ApplicationLoadingComponent } from './pages/application-loading.component';
import { Page404Component } from './pages/page404.component';

import { HomeComponent } from './pages/home.page';
import { PageEngineComponent } from './pages/page-engine.component';
import { EngineComponent } from './engine/engine.component';

// http://victorsavkin.com/post/146722301646/angular-router-empty-paths-componentless-routes

const routes = [ 

  { path: "page404", component: Page404Component, resolve:[], data: { message: "page 404."} },
  { path: "appInit", component: ApplicationLoadingComponent },

  { path: "", component: AppComponent, children:[ 
     { path: "", component: HomeComponent, terminal: true },
     //{ path: "report/:pageId", component: PageEngineComponent }  // Release this line will roll back to previous Engine
     { path: "report/:pageId", component: EngineComponent }  // Now we will use the latest Engine.
  ]}
];


export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];