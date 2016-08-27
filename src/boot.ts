import "reflect-metadata";
import "rxjs";
import "zone.js/dist/zone";

// import {enableProdMode} from '@angular/core';
// enableProdMode()

import { HTTP_PROVIDERS } from '@angular/http';
import { bootstrap }      from '@angular/platform-browser-dynamic';
import { disableDeprecatedForms, provideForms } from '@angular/forms';

import { RootComponent } from './app/rootComponent';
import { APP_ROUTER_PROVIDERS } from './app/app.routes';
import { ApplicationPipeline } from './app/services/application-pipeline.service';
import { ConfigurationService } from './app/services/app.configuration.service';
import { ApplicationPipelinePageService } from './app/services/application-pipeline-page.service';

bootstrap(
    RootComponent, 
    [
        // disable the old form functionality and the warning message
        disableDeprecatedForms(),

        HTTP_PROVIDERS,
        APP_ROUTER_PROVIDERS,
        ApplicationPipeline, ConfigurationService, ApplicationPipelinePageService
    ])
    .catch(err => console.error(err));
