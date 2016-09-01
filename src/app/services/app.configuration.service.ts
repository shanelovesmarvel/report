import { Injectable } from '@angular/core';
import { ApplicationPipeline } from './application-pipeline.service';

@Injectable()
export class ConfigurationService {
    constructor( private _appPipeline: ApplicationPipeline ) {
        this.registerOnAppInit();
    }

    public registerOnAppInit(){

        let promise = new Promise(function( resolve, reject ){
            setTimeout( function(){
                console.log("configuration service initialization resolved.");
                resolve('resolve in Configuration Service.');
            }, 1000);
        });

        this._appPipeline.addAppInitPromise( promise );

    }
}