import { Observable } from 'rxjs/Observable';

export interface EngineDataInterface{

	getData(pageParameters: any): Observable<any>;
	getService(pageParameters: any): Object;
	getLayout(pageParameters: any): Observable<any>;

	prepareLayout(data: any, layout: any): void;

}