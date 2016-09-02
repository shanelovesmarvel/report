
import { Observable } from 'rxjs/Observable';

export interface EngineInterface{

	getData(pageParameters: any): Observable<any>;
	getService(pageParameters: any): Object;
	getLayout(pageParameters: any): Object;

	prepareLayout(data: any, layout: any): void;

}