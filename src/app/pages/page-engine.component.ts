import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscriber } from 'rxjs';
import { MyDivComponent } from '../page-widgets/mydiv.component';

import { EngineService } from '../services/engine.service';
import { PageEngineService } from '../services/page-engine.service';
import { ReplangService } from '../services/replang.service';
import { TransporterService } from '../services/transporter.service'; 
import { RepService } from '../services/rep';
import { NotifiMessage } from '../ReportDialogController/NotifiMessage';
import { PageBuilder } from '../services/page.builder';
import { PageDataFactory } from '../services/page.data.factory';
import { PageUIConfigFactory } from '../services/page.uiconfig.factory';
import { PageUIFactory } from '../services/page.ui.factory';
import { PageServiceFactory } from '../services/page.service.factory';

@Component({
    selector: 'contentSelector',
    directives: [MyDivComponent],
    providers: [EngineService, PageEngineService, PageBuilder, PageDataFactory, PageUIConfigFactory, PageUIFactory, 
               PageServiceFactory, ReplangService, TransporterService, RepService, NotifiMessage],
    template: `<my-div [options]="options"></my-div>`
})
export class PageEngineComponent implements OnInit, OnDestroy {
    private options: any;
    private _subscriber: any;
    constructor(
        private _router: Router,
        private _route: ActivatedRoute, 
        private _engineService: EngineService,
        private _pageEngineService: PageEngineService,
        private _pageBuilder: PageBuilder
        ) {
    }

    ngOnInit() {
         this._subscriber = this._route.params.subscribe( params=>{
            let id = +params['pageId'];
            let linkfield = +params['linkfield'];
            let reportType = params['reportType'];

            let pageData = this._pageEngineService.getPageData( id, linkfield, reportType );

            // add engine service
            for(let methodName in this._engineService){
                var fn = this._engineService[ methodName ];
                var target = fn.bind( pageData );
                pageData.service[ methodName ] = target;
            }
            

            for(let i=0; i < pageData.ui.children.length; i++){
                let child = pageData.ui.children[i];
                let itemData = pageData.data[i];
                let service = pageData.service;

                if( !child.options ) {
                    child.options = {};
                }

                child.options.pageContext = pageData;
                child.options.data = itemData;
                child.options.service = service; 
                console.log( child );
            }

            // page need the additinal query parameters
            pageData.params = params;

            this.options = pageData;
        })
    }

    ngOnDestroy() {
        if( this._subscriber ) {
            this._subscriber.unsubscribe();
        }
    }
}

             