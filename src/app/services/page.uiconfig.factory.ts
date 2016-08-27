import { Injectable } from '@angular/core';

@Injectable()
export class PageUIConfigFactory {
    
    public getPageUIConfig(pageId: number, linkfield: any): any {
        switch (pageId) {
            case -4222:                                         // index
                return this.getPageUIConfig_4222();
            case -4223:                                         // index detail
                return this.getPageUIConfig_4223(linkfield);
            case -4224:                                         // index edit
                return this.getPageUIConfig_4224(linkfield);
            case -4114:                                         // asset class
                return this.getPageUIConfig_4114();
            case -4034:                                         // portfolio
                return this.getPageUIConfig_4034();
            case -4036:                                         // portfolio detail
                return this.getPageUIConfig_4036(linkfield);
            case -4044:                                         // portfolio edit
                return this.getPageUIConfig_4044(linkfield);
        };

        throw `Not supported page ${pageId} currently.`;
    }
    // index
    private getPageUIConfig_4222(){
    
    }

    // index detail
    private getPageUIConfig_4223( linkfield){

    }

    // index edit
    private getPageUIConfig_4224(linkfield){

    }

    // asset class
    private getPageUIConfig_4114(){

    }

    // portfolio
    private getPageUIConfig_4034(){

    }

    // portfolio detail
    private getPageUIConfig_4036(linkfield){

    }

    // portfolio edit
    private getPageUIConfig_4044( linkfield ){

    }



}