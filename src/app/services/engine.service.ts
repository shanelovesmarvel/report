import { Injectable } from '@angular/core';

@Injectable()
export class EngineService {
    constructor() {
    }
    public findControl(id: string): any {
        let context: any = this;

        let recursiveFindControl = function (parent: any, id: string) {
            let result = null;

            if (parent && parent.options && parent.options.id && parent.options.id === id) {
                result = parent;
            }

            // for top
            // todo: should unify data structure
            if (parent && parent.children && parent.children.length && parent.children.length > 0) {
                for( let i=0; i< parent.children.length; i++ ){
                    let child = parent.children[i];
                    let result = recursiveFindControl( child, id );
                    if( result ){
                        return result;
                    }
                }
            }

            // for normal control
            if (parent && parent.options && parent.options.children && parent.options.children.length && parent.options.children.length > 0) {
                for( let i=0; i< parent.options.children.length; i++ ){
                    let child = parent.options.children[i];
                    let result = recursiveFindControl( child, id );
                    if( result ){
                        return result;
                    }
                }
            }

            // for dialog body
            if(parent && parent.options && parent.options.body && parent.options.body.length && parent.options.body.length > 0) {
                for( let i=0; i< parent.options.body.length; i++ ){
                    let child = parent.options.body[i];
                    let result = recursiveFindControl( child, id );
                    if( result ){
                        return result;
                    }
                }                
            }
            
            // for dialog footer
            if(parent && parent.options && parent.options.footer && parent.options.footer.length && parent.options.footer.length > 0) {
                for( let i=0; i< parent.options.footer.length; i++ ){
                    let child = parent.options.footer[i];
                    let result = recursiveFindControl( child, id );
                    if( result ){
                        return result;
                    }
                }                
            }

            return result;
        };

        let result = recursiveFindControl(context.ui, id);
        return result;
    }

}