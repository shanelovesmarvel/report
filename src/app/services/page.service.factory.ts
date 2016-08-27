import { Injectable } from '@angular/core';

@Injectable()
export class PageServiceFactory {
    
    public getPageService(pageId: number, linkfield: any): any {
        switch (pageId) {
            case -4222:                                         // index
                return this.getPageService_4222();
            case -4223:                                         // index detail
                return this.getPageService_4223(linkfield);
            case -4224:                                         // index edit
                return this.getPageService_4224(linkfield);
            case -4114:                                         // asset class
                return this.getPageService_4114();
            case -4034:                                         // portfolio
                return this.getPageService_4034();
            case -4036:                                         // portfolio detail
                return this.getPageService_4036(linkfield);
            case -4044:                                         // portfolio edit
                return this.getPageService_4044(linkfield);
        };

        throw `Not supported page ${pageId} currently.`;
    }
    // index
    private getPageService_4222(){
    
    }

    // index detail
    private getPageService_4223( linkfield){

    }

    // index edit
    private getPageService_4224(linkfield){

    }

    // asset class
    private getPageService_4114(){

    }

    // portfolio
    private getPageService_4034(){

    }

    // portfolio detail
    private getPageService_4036(linkfield){

    }

    // portfolio edit
    private getPageService_4044( linkfield ){

    }



}