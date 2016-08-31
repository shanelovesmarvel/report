import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

/*
* 
* 
*/
@Component({
    selector: 'my-grid',
    directives: [ROUTER_DIRECTIVES],
    template: `
    <table class="table table-hover table-bordered table-margin">
        <thead class="thead-inverse">
            <tr>
                <th *ngFor="let item of options.Column" >{{ getColumnCaption(item) }}</th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="let dataItem of options.Data">
                <td *ngFor="let columnName of options.Column" >
                    <span [ngSwitch]=" getColumnUIType( columnName ) ">
                        <template [ngSwitchCase]="'TextBox'">{{dataItem[columnName]}}</template>
                        <template [ngSwitchCase]="'List'">{{ getListColumnText(columnName, dataItem[columnName] ) }}</template>
                        <template [ngSwitchCase]="'Hyperlink'">
                            <a [routerLink]="getRouterLinkValue(columnName, dataItem)" >
                                {{dataItem[columnName]}}
                            </a>
                        </template>
                    </span>
                </td>
            </tr>
        </tbody>
        <tfoot>
        </tfoot>
    </table>
`
})
export class MyGridComponent implements OnChanges {
    @Input() options: any;

    constructor() {
    }

    ngOnChanges() {

    }

    // index/-4223;linkfield={{dataItem[columnName]}};forcetab=1
    private getRouterLinkValue(columnName: string, dataItem: any): Array<any> {
        let result = this.options.Metadata[0].Fields.find(item => {
            return item.Name === columnName;
        });

        //console.log(result);

        if (result) {
            let linkArray = [];

            // route
            let routerLinkValue = "/" + result.LinkTarget;
            linkArray.push(routerLinkValue);

            // optional parameters, should presentation to a object.
            if (result.LinkFields && result.LinkFields.length > 0) {
                let params = {};
                result.LinkFields.forEach((item, index) => {
                    let queryKey: string = index ? `linkfield${index}` : 'linkfield';
                    params[queryKey] = dataItem[item];
                });
                linkArray.push( params );
            }

            return linkArray;
        }
    }

    private getColumnCaption(columnName: string): string {
        let result = this.options.Metadata[0].Fields.find(item => {
            return item.Name === columnName;
        });

        if (result) {
            return result.Caption;
        }

        return `Column: ${columnName} not found!`;
    }

    private getColumnUIType(columnName: string): any {
        let result = this.options.Metadata[0].Fields.find(item => {
            return item.Name === columnName;
        });

        if (result) {
            return result.UIType;
        }

        return `Column: ${columnName} not found!`;
    }

    private getListColumnText(columnName: string, columnValue: string) {
        let result = this.options.Metadata[0].Fields.find(item => {
            return item.Name === columnName;
        });

        if (result) {
            let targetItem = result.ListValues.find(item => {
                return item.Data === columnValue;
            });

            if (targetItem) {
                return targetItem.Display;
            }

            return `Value: ${columnValue} not found!`;
        }

        return `Column: ${columnName} not found!`;
    }
}