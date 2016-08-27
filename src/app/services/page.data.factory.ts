import { Injectable } from '@angular/core';

@Injectable()
export class PageDataFactory {
    
    public getPageData(pageId: number, linkfield: any): any {
        switch (pageId) {
            case -4222:                                         // index
                return this.getPageData_4222();
            case -4223:                                         // index detail
                return this.getPageData_4223(linkfield);
            case -4224:                                         // index edit
                return this.getPageData_4224(linkfield);
            case -4114:                                         // asset class
                return this.getPageData_4114();
            case -4034:                                         // portfolio
                return this.getPageData_4034();
            case -4036:                                         // portfolio detail
                return this.getPageData_4036(linkfield);
            case -4044:                                         // portfolio edit
                return this.getPageData_4044(linkfield);
        };

        throw `Not supported page ${pageId} currently.`;
    }
    // index
    private getPageData_4222(){
    
    }

    // index detail
    private getPageData_4223( linkfield){

    }

    // index edit
    private getPageData_4224(linkfield){

    }

    // asset class
    private getPageData_4114(){

    }

    // portfolio
    private getPageData_4034(){

    }

    // portfolio detail
    private getPageData_4036(linkfield){

    }

    // portfolio edit
    private getPageData_4044( linkfield ){

    }



}