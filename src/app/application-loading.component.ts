import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApplicationPipeline } from './services/application-pipeline.service';

@Component({
    selector: "rootxxx",
    template: `
        <h1>App Init Page</h1>
    `
})
export class ApplicationLoadingComponent implements OnInit {
    constructor(private _router: Router, private _appPipeline: ApplicationPipeline) {
    }

    ngOnInit() {
        let that = this;

        console.log('in app.init component.......');
        this._appPipeline.triggerInitEvent(null)
            .then(function () {
                let oldUrl = window['oldUrl'];
                console.log(`redirect to oldUrl: ${oldUrl}.`);
                that._router.navigateByUrl(oldUrl);

            })

    }
}