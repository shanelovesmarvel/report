import { Injectable, Injector, ReflectiveInjector, ApplicationRef } from '@angular/core';
import { EngineConfig } from './engine.config';
import { Observable } from 'rxjs/Observable';

import { ReplangService } from '../services/replang.service';
import { TransporterService } from '../services/transporter.service';
import { NotifiMessageService } from '../ReportDialogController/notify-message.service';
import { EngineLayoutAPIService } from './engine.layout.api';



@Injectable()
export class EngineBuilder {
	private _injector: Injector;

	constructor(private _applicationRef: ApplicationRef) {
		let pageClasses: Array<Object> = EngineConfig.map((item: any) => {
			return item.builder;
		});

		pageClasses.push(ReplangService);
		pageClasses.push(TransporterService);
		pageClasses.push(NotifiMessageService);
		pageClasses.push(EngineLayoutAPIService);

		// get root injector
		let rootInjector = this._applicationRef.injector;

		// create injector
		this._injector = ReflectiveInjector.resolveAndCreate(pageClasses, rootInjector);

	}

	public getPage(pageId: number, linkfield: any): Observable<any> {

		let page: any = EngineConfig.find((item: any) => {
			return item.pageId === pageId;
		});

		// todo if we can't get page
		if (!page) {

			// 
		}

		// use injecter
		let pageBuilder: any = this._injector.get(page.builder);

	

		let pageParameters: Object = {
			pageId: pageId,
			linkField: linkfield
		}

		let service = pageBuilder.getService(pageParameters);

		// rebind service
		for (let propertyName in service) {
			if (service.hasOwnProperty(propertyName)) {
				let fn: Function = service[propertyName];
				let target: Function = fn.bind(pageBuilder);
				service[propertyName] = target;
			}
		}

		// layour
		return Observable.zip(pageBuilder.getData(pageParameters), pageBuilder.getLayout(pageParameters), ( resData: any, resLayout: any) => {
			let data: any = resData;
			let layout: any = resLayout;

			// 
			pageBuilder.prepareLayout(data, layout);

			let result = {
				data: data,
				ui: layout,
				service: service
			}

			return result;
		});

	}
}