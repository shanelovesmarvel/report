/*
 * 通过 my-app 选择器匹配 RootComponent 中的 indexl.html 中的元素 my-app 元素
 * 这里定义了 root 元素
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { NavigationStart, RoutesRecognized, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';

import { ApplicationPipeline } from '../services/application-pipeline.service';
import { ConfigurationService } from '../services/app.configuration.service';
import { ApplicationPipelinePageService } from '../services/application-pipeline-page.service';

@Component({
    selector: 'my-app',
    directives: [ ROUTER_DIRECTIVES ],
    template: `
        <root>
            <h1>Root Component</h1>
            <router-outlet></router-outlet>
        </root>
        `,
    providers:[ ConfigurationService, ApplicationPipelinePageService ]
})
export class RootComponent implements OnInit, OnDestroy {
    private _subscriber: any;
    constructor( private _router: Router, private _appPipeline: ApplicationPipeline, 
                 private _configurationService: ConfigurationService,
                 private _applicationPipePageService: ApplicationPipelinePageService
                  ){
        console.log('ngInit in RootComponent.');

        this._subscriber = this._router.events.subscribe( state => {
            console.log( state );

            if( state instanceof NavigationStart  ) {
                this._appPipeline.triggerBeginRequestEvent( state );
            }
            else if( state instanceof RoutesRecognized  ){
                this._appPipeline.triggerPageRecognizedEvent( state );
            }
            else if( state instanceof NavigationEnd ){
                this._appPipeline.triggerNavigationEndEvent( state );
            }
            else if( state instanceof NavigationError ) {
                console.error(`Navigation Error!`);
            }
            
        })
    }
    ngOnInit() {
        let search = window.location.search;
        console.log( search );
        let oldUrl = window.location.pathname.substring(1);
        console.log( oldUrl );
        window['oldUrl'] = oldUrl + search;

        this._appPipeline.triggerInitEvent("");

        this._router.navigateByUrl("/appInit");
    }

    ngOnDestroy(){
        this._subscriber.unsubscribe();
    }
}
