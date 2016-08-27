import { Injectable } from '@angular/core';
import { PageDataFactory } from './page.data.factory';
import { PageUIConfigFactory } from '../services/page.uiconfig.factory';
import { PageUIFactory } from './page.ui.factory';
import { PageServiceFactory } from './page.service.factory';

@Injectable()
export class PageBuilder {
    constructor(private _dataFactory: PageDataFactory,
        private _uiconfigFactory: PageUIConfigFactory,
        private _uiFactory: PageUIFactory,
        private _serviceFactory: PageServiceFactory) {

    }
    public getPage(pageId: number, linkfield: any): any {

        let data = this._dataFactory.getPageData(pageId, linkfield);
        let uiconfig = this._uiconfigFactory.getPageUIConfig(pageId, linkfield);
        let ui = this._uiFactory.getPageUI(pageId, linkfield);
        let service = this._serviceFactory.getPageService(pageId, linkfield);

        // todo
        // get data by manipulate data with ui config.

        let result = {
            data: data,
            ui: ui,
            service: service
        }

        return result;

    }
}