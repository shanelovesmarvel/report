import { Observable } from 'rxjs/Observable';

export interface EngineDataInterface{

	getData(pageParameters: any): Observable<any>;
	getService(pageParameters: any): Object;
	getLayout(pageParameters: any): Object;

	prepareLayout(data: any, layout: any): void;

}