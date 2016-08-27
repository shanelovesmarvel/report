import { Injectable } from '@angular/core';

@Injectable()
export class PageUIFactory {
    
    public getPageUI(pageId: number, linkfield: any): any {
        switch (pageId) {
            case -4222:                                         // index
                return this.getPageUI_4222();
            case -4223:                                         // index detail
                return this.getPageUI_4223(linkfield);
            case -4224:                                         // index edit
                return this.getPageUI_4224(linkfield);
            case -4114:                                         // asset class
                return this.getPageUI_4114();
            case -4034:                                         // portfolio
                return this.getPageUI_4034();
            case -4036:                                         // portfolio detail
                return this.getPageUI_4036(linkfield);
            case -4044:                                         // portfolio edit
                return this.getPageUI_4044(linkfield);
        };

        throw `Not supported page ${pageId} currently.`;
    }
    // index
    private getPageUI_4222(){
    
    }

    // index detail
    private getPageUI_4223( linkfield){

    }

    // index edit
    private getPageUI_4224(linkfield){

    }

    // asset class
    private getPageUI_4114(){

    }

    // portfolio
    private getPageUI_4034(){

    }

    // portfolio detail
    private getPageUI_4036(linkfield){

    }

    // portfolio edit
    private getPageUI_4044( linkfield ){

    }



}