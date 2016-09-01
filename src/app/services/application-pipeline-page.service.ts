import { Injectable } from '@angular/core';
import { ApplicationPipeline } from './application-pipeline.service';

@Injectable()
export class ApplicationPipelinePageService {
    constructor( private _appPipeline: ApplicationPipeline ) {
        this.registerOnPageRecognizedEvent();
    }

    public registerOnPageRecognizedEvent(){
        console.log('registing application pipe page service.');
        this._appPipeline.appPageRecognizedEvent.subscribe( data => {
            console.log("application pipe page service called.");
        });
    }
}