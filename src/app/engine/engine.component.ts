import { Component, OnInit, OnDestroy } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormGroup, FormBuilder } from '@angular/forms';
import { ReflectiveInjector } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscriber } from 'rxjs';

import { MyDivComponent } from '../page-widgets/myDiv.component';

// we need to mark those class to initial in component
import { EngineService } from './engine.service';
import { EngineBuilder } from './engine.builder';


@Component({
	selector: 'contentSelector',
	directives: [MyDivComponent],
	providers: [EngineService,  EngineBuilder],
	template: `<div><my-div [options]="options"></my-div></div>`
})
export class EngineComponent implements OnInit, OnDestroy {
	private options: any;
	private _subscriber: any;

	constructor(
		private _router: Router,
		private _route: ActivatedRoute,
		private _engineService: EngineService,
		private _builder: EngineBuilder
	) {
	}

	ngOnInit(): void {
		this._subscriber = this._route.params.subscribe((params: any) => {
			let id: number = +params['pageId'];
			let linkfield: any = +params['linkfield'];

			this._builder.getPage(id, linkfield)
				.subscribe((pageData: any) => {
					console.warn(pageData);
					// add engine service
					for (let methodName in this._engineService) {
						//if (this._engineService.hasOwnProperty(methodName)) {
						let fn: Function = this._engineService[methodName];
						let target: Function = fn.bind(pageData);
						pageData.service[methodName] = target;
						//}
					}

					for (let i: number = 0; i < pageData.ui.children.length; i++) {
						let child: any = pageData.ui.children[i];

						if (!child.options) {
							child.options = {};
						}

						// get bindingContextName
						let bindingContextName: string = child.bindingContextName;
						if (bindingContextName) {
							let bindingContext: any = pageData.data[bindingContextName];
							console.log(bindingContext);
							if (bindingContext) {
								child.options.bindingContext = bindingContext;
							}
						}

						let service: any = pageData.service;

						child.options.pageContext = pageData;
						child.options.service = service;
					}


					// page need the additinal query parameters
					pageData.params = params;

					this.options = pageData;
				});

		});
	}

	ngOnDestroy(): void {
		if (this._subscriber) {
			this._subscriber.unsubscribe();
		}
	}
}

