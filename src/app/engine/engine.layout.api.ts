import { Injectable } from '@angular/core';
import { page_reports_layout } from './pages/page-reports.layout';

@Injectable()
export class EngineLayoutAPIService {
    constructor() { }

    public getLayout(pageId: number): Object {
        let layout = null;
        switch(pageId) {
            case -3931: 
               layout = page_reports_layout;
               break;
            default: 
               layout = page_reports_layout;
               break;
        }
        return layout;
    }
}