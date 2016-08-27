import { Subject } from 'rxjs';

export class ApplicationPipeline {

    // app Init
    private _appInitPromises = new Array<Promise<any>>();

    public addAppInitPromise( newTask: Promise<any> ){
        this._appInitPromises.push( newTask );
    }   
    
    public triggerInitEvent( data: any ){
        return Promise.all( this._appInitPromises );    
    }

    // begin request
    public appBeginRequestEvent: Subject<any> = new Subject<any>();
    public triggerBeginRequestEvent( data: any ){
        console.info(`trigger begin request event.......`);
        this.appBeginRequestEvent.next(data);
    }

    // route
    // RoutesRecognized, NavigationEnd
    public appPageRecognizedEvent: Subject<any> = new Subject<any>();
    public triggerPageRecognizedEvent( data: any) {
        console.info(`trigger recognize route event.......`);
        this.appPageRecognizedEvent.next( data );
    }

    // route end
    public appNavigationEndEvent: Subject<any> = new Subject<any>();
    public triggerNavigationEndEvent( data: any ){
        console.info(`trigger route navigation end event.......`);
        this.appNavigationEndEvent.next( data );
    }

}