import { Injectable } from '@angular/core';

import { ApplicationPipeline } from './application-pipeline.service';
import { ReplangService } from './replang.service';
import { EngineService } from './engine.service';
import { TransporterService } from './transporter.service';

@Injectable()
export class PageEngineService {
    constructor(
        private _replangService: ReplangService,
        private _engineService: EngineService,
        private _transporterService: TransporterService) {
    }

    public getPageData(pageId: number, linkfield: any, reportType: string): any {
        switch (pageId) {

            case -4222:
                return this.getPageData_4222();                 // index
            case -4223:
                return this.getPageData_4223(linkfield);        // index detail
            case -4224:
                return this.getPageData_4224(linkfield);        // index edit
            case -4114:
                return this.getPageData_4114();                 // asset class
            case -4034:
                return this.getPageData_4034();                 // portfolio
            case -4036:
                return this.getPageData_4036(linkfield);        // portfolio detail
            case -4044:
                return this.getPageData_4044(linkfield);        // portfolio edit
            case -3931:
                return this.showDialog();                //Portfolio summary dialog
            case -3979:
                return this.showSSRS();
            case -3939:
                return this.showOutput(reportType);
            case -3973:
                return this.showPortfolioSummary();

        };

        return {};
    }

    private showPortfolioSummary() {
        let data: any = {};

        let ui = this._replangService.getPortfolioSummaryUILayout();

        let service: any = {};

        let that = this;

        let getPortfolioSummaryData = function(){
            return that._replangService.getPortfolioSummaryData("summary");
        }

        let getPortfolioSummaryChartUILayout = function() {
            return that._replangService.getPortfolioSummaryChartUILayout();
        }

        let getPortfolioSummaryConfirmUILayout = function() {
            return that._replangService.getPortfolioSummaryConfirmUILayout();
        }

        let getPortfolioSummaryChartCategoriesUILayout = function(){
            return that._replangService.getPortfolioSummaryChartCategoriesUILayout();
        }

        service.getPortfolioSummaryData = getPortfolioSummaryData.bind(this);
        service.getPortfolioSummaryChartUILayout = getPortfolioSummaryChartUILayout.bind(this);
        service.getPortfolioSummaryConfirmUILayout = getPortfolioSummaryConfirmUILayout.bind(this);
        service.getPortfolioSummaryChartCategoriesUILayout = getPortfolioSummaryChartCategoriesUILayout.bind(this);

        let result = {
            data: data,
            ui: ui,
            service: service
        }

        return result;
    }

    private showOutput(reportType: string) {
        let data: any = {};

        let ui = {
            children: [
                {
                    type: "myTitle",
                    options: {
                        title: reportType + " Report Output",
                        level: 1
                    }
                }
            ]
        }

        let service: any = {};

        let result = {
            data: data,
            ui: ui,
            service: service
        }

        return result;
    }

    private showSSRS() {
        // Get xml via http request
        if (!this._replangService.ssrsData) {
            this._replangService.getSSRSData();
        }

        // data
        let data = [
            {}
        ]

        // service
        let service: any = {};
        let that = this;

        // ui
        let ui = that._replangService.getSSRSReportUILayout(false);

        let result = {
            data: data,
            ui: ui,
            service: service
        }

        return result;
    }


    private showDialog() {
        // data
        let realData: any = this._replangService.getPortfolioSummaryData("summary");

        if (!this._replangService.ssrsData) {
            this._replangService.getSSRSData();
        }


        let data = [
            {},
            realData
        ]

        // service
        let service: any = {};
        let that = this;

        let getSummaryChartUILayout = function () {
            return that._replangService.getSummaryChartUILayout();
        }

        let getSummaryUILayout = function () {
            return that._replangService.getSummaryReportUILayout();
        }

        let getSummaryConfirmUILayout = function () {
            return that._replangService.getSummaryConfirmUILayout();
        }

        let getSummaryChartCategoriesUILayout = function () {
            return that._replangService.getSummaryChartCategoriesUILayout();
        }

        let getSSRSUILayout = function () {
            return that._replangService.getSSRSReportUILayout(true);
        }

        let getSettingDialog = function(){
            return that._replangService.getSettingDialog();
        }

        // rebind this by bind.
        service.getSummaryConfirmUILayout = getSummaryConfirmUILayout.bind(this);
        service.getSummaryChartUILayout = getSummaryChartUILayout.bind(this);
        service.getSummaryUILayout = getSummaryUILayout.bind(this);
        service.getSummaryChartCategoriesUILayout = getSummaryChartCategoriesUILayout.bind(this);
        service.getSSRSUILayout = getSSRSUILayout.bind(this);
        service.getSettingDialog = getSettingDialog.bind(this);

        let ui = {
            children: [
                {
                    type: "myDialogButton",
                    options: {
                        id: "openSummaryDialog",
                        buttonText: "Run Summary Report",
                        modal: "modal",
                        target: "#portfolio_summary",
                        backdrop: "static",
                        keyboard: true,
                        click: function (context) {
                            var summaryDialog = context.pageContext.service.getSummaryUILayout();
                            context.pageContext.ui.children.push(summaryDialog);
                            console.info(context);
                        }
                    }
                },
                {
                    type: "myDialogButton",
                    options: {
                        id: "openSSRSDialog",
                        buttonText: "Run SSRS Report",
                        modal: "modal",
                        target: "#ssrs_report",
                        backdrop: false,
                        keyboard: true,
                        click: function (context) {
                            var summaryDialog = context.pageContext.service.getSSRSUILayout();
                            context.pageContext.ui.children.push(summaryDialog);
                            console.info(context);
                        }
                    }
                }
            ]
        }

        let result = {
            data: data,
            ui: ui,
            service: service
        }

        return result;
    }

    // SecInfoIndexSummary
    private getPageData_4222() {

        let all: any = this.getAllIndex();

        all.Column = [
            "IndexName",
            "Symbol",
            "SymbolTypeCode",
            "CurrencyCode",
            "HolidayScheduleName",
            "IndexDesc",
            "Adjustment"
        ];

        let data = [
            {},
            all
        ];
        let service = {

        };
        let ui = {
            children: [
                {
                    type: "myTitle",
                    options: {
                        title: "Index",
                        subTitle: "......"
                    }
                },
                {
                    type: "myGrid",
                    options: all
                }
            ]
        };

        let result = {
            data: data,
            ui: ui,
            service: service
        }

        return result;
    }

    // SecInfoIndexDetail
    private getPageData_4223(linkfield) {

        // get index item data;
        let all: any = this.getAllIndex();
        let item = all.Data.find(item => {
            return item.IndexID === linkfield;
        });

        let data = [
            {},
            {},
            // card
            {
                items: [
                    // card body #1
                    {
                        items: [
                            // tile #1
                            {
                                bindingContext: item,
                                items: [
                                    {},
                                    {},
                                    {
                                        value: "",
                                        items: [
                                            {
                                                "value": "",
                                                "text": "Unknown"
                                            },
                                            {
                                                "value": "C",
                                                "text": "CUSIP"
                                            },
                                            {
                                                "value": "S",
                                                "text": "SEDOL"
                                            }
                                        ]
                                    },
                                    {
                                        items: [
                                            {
                                                value: "cn",
                                                text: "Yuan Renminbi"
                                            },
                                            {
                                                value: "us",
                                                text: "US Dollar"
                                            }
                                        ]
                                    },
                                    {
                                        items: [
                                            {
                                                value: "0",
                                                "text": "Not Classified"
                                            },
                                            {
                                                value: "1",
                                                "text": "NYSE Holidays"
                                            },
                                            {
                                                value: "2",
                                                "text": "Oslo Stock Exchange Holidays"
                                            },
                                            {
                                                value: "3",
                                                "text": "Stockholm Stock Exchange Holidays"
                                            },
                                            {
                                                value: "4",
                                                "text": "Amsterdam Stock Exchange Holidays"
                                            }
                                        ]
                                    },
                                    {},
                                    {}
                                ]
                            },

                            // tile #2
                            {
                                items: [

                                ]
                            }

                        ]
                    },
                    // card body #2
                    {

                    },
                    // card body #3
                    {

                    }
                ]
            }
        ];

        let service = {};
        let ui = {
            children: [
                {
                    type: "myTitle",
                    options: {
                        title: "Index",
                        subTitle: item.IndexName
                    }
                },
                {
                    type: "myButtonGroup",
                    options: {
                        children: [
                            {
                                type: "myButton",
                                options: {
                                    buttonText: "Edit",
                                    click: function (context) {
                                        // let controlCount = pageContext.children.length;
                                        // alert(`this page contains ${controlCount} controls.`);
                                        console.log(context);
                                        let linkArray = [];
                                        linkArray.push("/index");
                                        linkArray.push(-4224);
                                        if (context.options.pageContext.params.linkfield) {
                                            linkArray.push({ linkfield: +context.options.pageContext.params.linkfield });
                                        }

                                        context.options.service.router.navigate(linkArray);
                                    }
                                }

                            }
                        ]
                    }
                },
                {
                    type: "myCard",
                    options: {
                        activeIndex: 0,
                        headers: [
                            "General",
                            "Performance",
                            "Performance (Security)"
                        ],
                        bodys: [
                            {
                                type: "myCardBody",
                                options: {
                                    expanded: true,
                                    editable: true,
                                    children: [
                                        {
                                            type: "myTile",
                                            options: {
                                                expanded: true,
                                                tileTitle: {
                                                    type: "myTitle",
                                                    options: {
                                                        title: "Index",
                                                        class: "tile-header"
                                                    }
                                                },
                                                tileBody: {
                                                    type: "myTileBody",
                                                    options: {
                                                        children: [
                                                            {
                                                                type: "myFormGroupTextbox",
                                                                options: {
                                                                    name: "IndexName",
                                                                    controlId: "ctl-01",
                                                                    label: "Index Name",
                                                                    // value: item.IndexName,
                                                                    disabled: true,
                                                                    changeHandler: function () {

                                                                    }
                                                                }
                                                            },
                                                            {
                                                                type: "myFormGroupTextbox",
                                                                options: {
                                                                    name: "Symbol",
                                                                    controlId: "ctl-02",
                                                                    label: "Symbol",
                                                                    // value: item.Symbol,
                                                                    disabled: true
                                                                }
                                                            },
                                                            {
                                                                type: "myFormGroupDropdown",
                                                                options: {
                                                                    name: "SymbolTypeCode",
                                                                    controlId: "ctl-03",
                                                                    label: "Symbol Type",
                                                                    value: item.SymbolTypeCode,
                                                                    disabled: true,
                                                                    items: [
                                                                        {
                                                                            "value": "",
                                                                            "text": "Unknown"
                                                                        },
                                                                        {
                                                                            "value": "C",
                                                                            "text": "CUSIP"
                                                                        },
                                                                        {
                                                                            "value": "S",
                                                                            "text": "SEDOL"
                                                                        }
                                                                    ]
                                                                }
                                                            },
                                                            {
                                                                type: "myFormGroupDropdown",
                                                                options: {
                                                                    name: "CurrencyCode",
                                                                    controlId: "ctl-04",
                                                                    label: "Currency",
                                                                    value: item.CurrencyCode,
                                                                    disabled: true,
                                                                    items: [
                                                                        {
                                                                            value: "cn",
                                                                            text: "Yuan Renminbi"
                                                                        },
                                                                        {
                                                                            value: "us",
                                                                            text: "US Dollar"
                                                                        }
                                                                    ]
                                                                }
                                                            },
                                                            {
                                                                type: "myFormGroupDropdown",
                                                                options: {
                                                                    name: "HolidayScheduleID",
                                                                    controlId: "ctl-05",
                                                                    label: "Holiday Schedule",
                                                                    value: item.HolidayScheduleID,
                                                                    disabled: true,
                                                                    items: [
                                                                        {
                                                                            value: "0",
                                                                            "text": "Not Classified"
                                                                        },
                                                                        {
                                                                            value: "1",
                                                                            "text": "NYSE Holidays"
                                                                        },
                                                                        {
                                                                            value: "2",
                                                                            "text": "Oslo Stock Exchange Holidays"
                                                                        },
                                                                        {
                                                                            value: "3",
                                                                            "text": "Stockholm Stock Exchange Holidays"
                                                                        },
                                                                        {
                                                                            value: "4",
                                                                            "text": "Amsterdam Stock Exchange Holidays"
                                                                        }
                                                                    ]
                                                                }
                                                            },
                                                            {
                                                                type: "myFormGroupTextbox",
                                                                options: {
                                                                    name: "IndexDesc",
                                                                    controlId: "ctl-06",
                                                                    label: "Description",
                                                                    // value: item.IndexDesc,
                                                                    disabled: true
                                                                }
                                                            },
                                                            {
                                                                type: "myFormGroupTextbox",
                                                                options: {
                                                                    name: "Adjustment",
                                                                    controlId: "ctl-07",
                                                                    label: "Adjustment",
                                                                    // value: item.Adjustment,
                                                                    disabled: true
                                                                }
                                                            }
                                                        ]
                                                    }
                                                }
                                            }

                                        },
                                        {
                                            type: "myTile",
                                            options: {
                                                expanded: true,
                                                tileTitle: {
                                                    type: "myTitle",
                                                    options: {
                                                        title: "Labels",
                                                        class: "tile-header"
                                                    }
                                                },
                                                tileBody: {
                                                    type: "myTileBody",
                                                    options: {
                                                        children: [
                                                            {
                                                                type: "myGrid",
                                                                options: {
                                                                    "Column": [
                                                                        "Name",
                                                                        "DataType",
                                                                        "Value"
                                                                    ],
                                                                    "Data": [
                                                                    ],
                                                                    "Metadata": [{
                                                                        "Fields": [
                                                                            {
                                                                                "Name": "Name",
                                                                                "Caption": "Name",
                                                                            },
                                                                            {
                                                                                "Name": "DataType",
                                                                                "Caption": "Data Type",
                                                                            },
                                                                            {
                                                                                "Name": "Value",
                                                                                "Caption": "Value",
                                                                            },
                                                                        ]
                                                                    }]
                                                                }
                                                            }
                                                        ]
                                                    }
                                                }
                                            }

                                        }
                                    ]
                                }
                            },
                            {
                                options: {}
                            },
                            {
                                options: {}
                            }
                        ]
                    }
                }
            ]
        };

        // render page data.
        let result = {
            data: data,
            ui: ui,
            service: service
        };

        return result;
    }

    // SecInfoIndexEdit
    private getPageData_4224(linkfield) {
        // get index item data;
        let all: any = this.getAllIndex();
        let item = all.Data.find(item => {
            return item.IndexID === linkfield;
        });

        let data = [
            {},
            {},
            // card
            {
                items: [
                    // card body #1
                    {
                        items: [
                            // tile #1
                            {
                                bindingContext: item,
                                items: [
                                    {
                                    },
                                    {},
                                    {
                                        items: [
                                            {
                                                "value": "",
                                                "text": "Unknown"
                                            },
                                            {
                                                "value": "C",
                                                "text": "CUSIP"
                                            },
                                            {
                                                "value": "S",
                                                "text": "SEDOL"
                                            }
                                        ]
                                    },
                                    {
                                        items: [
                                            {
                                                value: "cn",
                                                text: "Yuan Renminbi"
                                            },
                                            {
                                                value: "us",
                                                text: "US Dollar"
                                            }
                                        ]
                                    },
                                    {
                                        items: [
                                            {
                                                value: "0",
                                                "text": "Not Classified"
                                            },
                                            {
                                                value: "1",
                                                "text": "NYSE Holidays"
                                            },
                                            {
                                                value: "2",
                                                "text": "Oslo Stock Exchange Holidays"
                                            },
                                            {
                                                value: "3",
                                                "text": "Stockholm Stock Exchange Holidays"
                                            },
                                            {
                                                value: "4",
                                                "text": "Amsterdam Stock Exchange Holidays"
                                            }
                                        ]
                                    },
                                    {},
                                    {}
                                ]
                            },

                            // tile #2
                            {
                                items: [

                                ]
                            }

                        ]
                    },
                    // card body #2
                    {

                    },
                    // card body #3
                    {

                    }
                ]
            }
        ];

        let service = {};
        let ui = {
            children: [
                {
                    type: "myTitle",
                    options: {
                        title: "Index",
                        subTitle: item.IndexName,
                        class: "tile-header"
                    }
                },
                {
                    type: "myButtonGroup",
                    options: {
                        children: [
                            {
                                type: "myButton",
                                options: {
                                    buttonText: "Save",
                                    click: function (context) {
                                        let ctl = context.options.pageContext.service.findControl("myBtn");
                                        console.log(ctl);
                                        alert(ctl.options.buttonText);
                                    }
                                }

                            },
                            {
                                type: "myButton",
                                options: {
                                    id: "myBtn",
                                    buttonText: "Cancel",
                                    click: function (context) {
                                        let linkArray = [];
                                        linkArray.push("/index");
                                        linkArray.push(-4223);
                                        if (context.options.pageContext.params.linkfield) {
                                            linkArray.push({ linkfield: +context.options.pageContext.params.linkfield });
                                        }

                                        context.options.service.router.navigate(linkArray);
                                    }
                                }

                            }
                        ]
                    }
                },
                {
                    type: "myCard",
                    options: {
                        activeIndex: 0,
                        headers: [
                            "General",
                            "Performance",
                            "Performance (Security)"
                        ],
                        bodys: [
                            {
                                type: "myCardBody",
                                options: {
                                    expanded: true,
                                    editable: true,
                                    children: [
                                        {
                                            type: "myTile",
                                            options: {
                                                expanded: true,
                                                tileTitle: {
                                                    type: "myTitle",
                                                    options: {
                                                        title: "Index",
                                                        class: "tile-header"
                                                    }
                                                },
                                                tileBody: {
                                                    type: "myTileBody",
                                                    options: {
                                                        children: [
                                                            {
                                                                type: "myFormGroupTextbox",
                                                                options: {
                                                                    name: "IndexName",
                                                                    controlId: "ctl-01",
                                                                    label: "Index Name",
                                                                    disabled: false,
                                                                    changeHandler: function () {

                                                                    }
                                                                }
                                                            },
                                                            {
                                                                type: "myFormGroupTextbox",
                                                                options: {
                                                                    name: "Symbol",
                                                                    controlId: "ctl-02",
                                                                    label: "Symbol",
                                                                    disabled: false
                                                                }
                                                            },
                                                            {
                                                                type: "myFormGroupDropdown",
                                                                options: {
                                                                    name: "SymbolTypeCode",
                                                                    controlId: "ctl-03",
                                                                    label: "Symbol Type",
                                                                    disabled: false
                                                                }
                                                            },
                                                            {
                                                                type: "myFormGroupDropdown",
                                                                options: {
                                                                    name: "CurrencyCode",
                                                                    controlId: "ctl-04",
                                                                    label: "Currency",
                                                                    disabled: false
                                                                }
                                                            },
                                                            {
                                                                type: "myFormGroupDropdown",
                                                                options: {
                                                                    name: "HolidayScheduleID",
                                                                    controlId: "ctl-05",
                                                                    label: "Holiday Schedule",
                                                                    disabled: false
                                                                }
                                                            },
                                                            {
                                                                type: "myFormGroupTextbox",
                                                                options: {
                                                                    name: "IndexDesc",
                                                                    controlId: "ctl-06",
                                                                    label: "Description",
                                                                    disabled: false
                                                                }
                                                            },
                                                            {
                                                                type: "myFormGroupTextbox",
                                                                options: {
                                                                    name: "Adjustment",
                                                                    controlId: "ctl-07",
                                                                    label: "Adjustment",
                                                                    disabled: false
                                                                }
                                                            }
                                                        ]
                                                    }
                                                }
                                            }

                                        },
                                        {
                                            type: "myTile",
                                            options: {
                                                expanded: true,
                                                tileTitle: {
                                                    type: "myTitle",
                                                    options: {
                                                        title: "Labels",
                                                        class: "tile-header"
                                                    }
                                                },
                                                tileBody: {
                                                    type: "myTileBody",
                                                    options: {
                                                        children: [
                                                            {
                                                                type: "myGrid",
                                                                options: {
                                                                    "Column": [
                                                                        "Name",
                                                                        "DataType",
                                                                        "Value"
                                                                    ],
                                                                    "Data": [
                                                                    ],
                                                                    "Metadata": [{
                                                                        "Fields": [
                                                                            {
                                                                                "Name": "Name",
                                                                                "Caption": "Name",
                                                                            },
                                                                            {
                                                                                "Name": "DataType",
                                                                                "Caption": "Data Type",
                                                                            },
                                                                            {
                                                                                "Name": "Value",
                                                                                "Caption": "Value",
                                                                            },
                                                                        ]
                                                                    }]
                                                                }
                                                            }
                                                        ]
                                                    }
                                                }
                                            }

                                        }
                                    ]
                                }
                            },
                            {
                                options: {}
                            },
                            {
                                options: {}
                            }
                        ]
                    }
                }
            ]
        };

        // render page data.
        let result = {
            data: data,
            ui: ui,
            service: service
        };

        return result;
    }

    // Asset Class Summary
    private getPageData_4114() {

        let gridData = {
            "Column": [
                "AssetClassCode",
                "AssetClassName"
            ],
            "Metadata": [{
                "Name": "AssetClass",
                "DisplayName": "AssetClass",
                "Fields": [{
                    "Name": "AssetClassCode", "Caption": "Asset Class Code", "ReadOnly": false, "Required": true, "BasicType": "String", "UIType": "TextBox", "ListValues": []
                },
                    {
                        "Name": "AssetClassName", "Caption": "Asset Class", "ReadOnly": false, "Required": true, "BasicType": "String", "UIType": "TextBox", "ListValues": []
                    }]
            }],
            "Data": [
                { "AssetClassCode": "n", "AssetClassName": "None" },
                { "AssetClassCode": "c", "AssetClassName": "Cash" },
                { "AssetClassCode": "e", "AssetClassName": "Equity" },
                { "AssetClassCode": "f", "AssetClassName": "Fixed Income" },
                { "AssetClassCode": "o", "AssetClassName": "Other" }
            ]


        };

        let data = [
            {},
            gridData
        ];

        let service = {};

        let ui = {
            children: [
                {
                    type: "myTitle",
                    options: {
                        title: "Asset Class",
                        subTitle: "......"
                    }
                },
                {
                    type: "myGrid"
                }
            ]
        };


        let result = {
            data: data,
            ui: ui,
            service: service
        };

        return result;
    }

    // Portfolio 
    private getPageData_4034() {

        let all: any = this.getAllPortfolio(1);

        all.Column = [
            "PortfolioCode",
            "ShortName",
            "PortfolioTypeCode",
            "ReportHeading1",
            "PortfolioStatus",
            "StartDate",
            "ReconRuleName",
            "OwnerCode",
            "PrimaryContactCode"
        ];

        let data = [
            {},
            {
                items: [
                    {
                        value: 1,
                        text: "All Portfolios"
                    },
                    {
                        value: 2,
                        text: "BEN JOHNSON"
                    }
                ]
            },
            all
        ];

        let service: any = {};

        let fn = function (searchId) {
            let portfolios = this.getAllPortfolio(searchId);
            return portfolios;
        };

        // rebind this by bind.
        service.getPortfolissBySearchId = fn.bind(this);

        let ui = {
            children: [
                {
                    type: "myTitle",
                    options: {
                        title: "Portfolio",
                        subTitle: "......"
                    }
                },
                {
                    type: "myDropdown",
                    options: {
                        onchange: function (value) {
                            var data = this.options.service.getPortfolissBySearchId(value);
                            this.options.pageContext.data[2] = data;
                        }
                    }
                },
                {
                    type: "myGrid"
                }
            ]
        };

        let result = {
            data: data,
            ui: ui,
            service: service
        };
        return result;
    }

    // Portfolio detail
    private getPageData_4036(linkfield) {
        // get index item data;
        let all: any = this.getAllPortfolio(1);
        let item = all.Data.find(item => {
            return item.PortfolioID === linkfield;
        });

        let taxLots: any = this.getTaxLotsData();

        let item2 = taxLots.Data.find(item2 => {
            return item2.PortfolioID === linkfield;
        });

        taxLots.Column = [
            "Symbol",
            "Description",
            "Quantity",
            "ClosePrice",
            "MarketValue",
            "PctUnrealizedGainLoss",
            "UnrealizedGainLoss"
        ]

        console.log(item2);

        console.log(item);

        let data = [
            null,
            null,
            // card
            {
                items: [
                    // card body
                    {
                        items: [
                            // tile
                            {
                                bindingContext: item,
                                items: []
                            },
                            {
                                bindingContext: item2,
                                items: []
                            },
                            {
                                items: []
                            },
                            {
                                items: []
                            },
                            {
                                items: []
                            },
                            {
                                items: []
                            },
                            {
                                items: []
                            },
                            {
                                items: []
                            }
                        ]
                    }
                ]
            },
            taxLots
        ];

        let ui = {
            children: [
                {
                    type: "myTitle",
                    options: {
                        title: "Portfolio",
                        subTitle: item.PortfolioCode
                    }
                },
                {
                    type: "myButtonGroup",
                    options: {
                        children: [
                            {
                                type: "myButton",
                                options: {
                                    buttonText: "Edit",
                                    click: function (context) {
                                        let linkArray = [];
                                        linkArray.push("/index");
                                        linkArray.push(-4044);
                                        if (context.options.pageContext.params.linkfield) {
                                            linkArray.push({ linkfield: +context.options.pageContext.params.linkfield });
                                        }

                                        context.options.service.router.navigate(linkArray);
                                    }
                                }

                            }
                        ]
                    }
                },
                {
                    type: "myCard",
                    options: {
                        activeIndex: 0,
                        headers: [
                            "Dashboards",
                            "General",
                            "Holdings",
                            "Transactions",
                            "Settings",
                            "History",
                            "Performance (Security)",
                            "Statement Transactions",
                            "Custodial Positions"
                        ],
                        bodys: [
                            {
                                type: "myCardBody",
                                options: {
                                    expanded: true,
                                    editable: true,
                                    children: [
                                        {
                                            type: "myTile",
                                            options: {
                                                expanded: true,
                                                tileTitle: {
                                                    type: "myTitle",
                                                    options: {
                                                        title: "Basic Information",
                                                        class: "tile-header"
                                                    }
                                                },
                                                tileBody: {
                                                    type: "myTileBody",
                                                    options: {
                                                        children: [
                                                            {
                                                                type: "myTable",
                                                                options: {
                                                                    rowCount: 13,
                                                                    columnCount: 2,
                                                                    items: [
                                                                        {
                                                                            type: "myFormGroupTextbox",
                                                                            options: {
                                                                                rowIndex: 0,
                                                                                columnIndex: 0,
                                                                                controlId: "PortfolioCode",
                                                                                label: item.PortfolioCode,
                                                                                value: "13f",
                                                                                disabled: true
                                                                            }
                                                                        },
                                                                        {
                                                                            type: "myFormGroupTextbox",
                                                                            options: {
                                                                                rowIndex: 1,
                                                                                columnIndex: 0,
                                                                                controlId: "ShortName",
                                                                                label: "Short Name",
                                                                                value: "",
                                                                                disabled: true
                                                                            }
                                                                        },
                                                                        {
                                                                            type: "myFormGroupTextbox",
                                                                            options: {
                                                                                rowIndex: 2,
                                                                                columnIndex: 0,
                                                                                controlId: "ReportHeading1",
                                                                                label: "Report Heading 1",
                                                                                value: "13f",
                                                                                disabled: true
                                                                            }
                                                                        },
                                                                        {
                                                                            type: "myFormGroupTextbox",
                                                                            options: {
                                                                                rowIndex: 3,
                                                                                columnIndex: 0,
                                                                                controlId: "ReportHeading2",
                                                                                label: "Report Heading 2",
                                                                                value: "",
                                                                                disabled: true
                                                                            }
                                                                        }
                                                                        , {
                                                                            type: "myFormGroupTextbox",
                                                                            options: {
                                                                                rowIndex: 4,
                                                                                columnIndex: 0,
                                                                                controlId: "ReportHeading3",
                                                                                label: "Report Heading 3",
                                                                                value: "",
                                                                                disabled: true
                                                                            }
                                                                        }
                                                                        , {
                                                                            type: "myFormGroupTextbox",
                                                                            options: {
                                                                                rowIndex: 5,
                                                                                columnIndex: 0,
                                                                                controlId: "OwnerContactName",
                                                                                label: "Primary Owner",
                                                                                value: "13f",
                                                                                disabled: "True"
                                                                            }
                                                                        }
                                                                        , {
                                                                            type: "myFormGroupTextbox",
                                                                            options: {
                                                                                rowIndex: 6,
                                                                                columnIndex: 0,
                                                                                controlId: "PrimaryContactName",
                                                                                label: "Primary Contact",
                                                                                value: "13f",
                                                                                disabled: "True"
                                                                            }
                                                                        }
                                                                        , {
                                                                            type: "myFormGroupTextbox",
                                                                            options: {
                                                                                rowIndex: 7,
                                                                                columnIndex: 0,
                                                                                controlId: "StartDate",
                                                                                label: "Start Date",
                                                                                value: "3/1/1904 12:00:00 AM",
                                                                                disabled: true
                                                                            }
                                                                        }
                                                                        , {
                                                                            type: "myFormGroupTextbox",
                                                                            options: {
                                                                                rowIndex: 8,
                                                                                columnIndex: 0,
                                                                                controlId: "CloseDate",
                                                                                label: "Close Date",
                                                                                value: "",
                                                                                disabled: true
                                                                            }
                                                                        }
                                                                        , {
                                                                            type: "myFormGroupTextbox",
                                                                            options: {
                                                                                rowIndex: 9,
                                                                                columnIndex: 0,
                                                                                controlId: "PortfolioStatus",
                                                                                label: "Portfolio Status",
                                                                                value: "",
                                                                                disabled: true
                                                                            }
                                                                        },
                                                                        {
                                                                            type: "myFormGroupTextbox",
                                                                            options: {
                                                                                rowIndex: 10,
                                                                                columnIndex: 0,
                                                                                controlId: "OwnerName",
                                                                                label: "Owned By",
                                                                                value: "Default Owners",
                                                                                disabled: true
                                                                            }
                                                                        }
                                                                        , {
                                                                            type: "myFormGroupTextbox",
                                                                            options: {
                                                                                rowIndex: 11,
                                                                                columnIndex: 0,
                                                                                controlId: "ProcessingGroupName",
                                                                                label: "Processed By",
                                                                                value: "Default Owners",
                                                                                disabled: "True"
                                                                            }
                                                                        }
                                                                        , {
                                                                            type: "myFormGroupTextbox",
                                                                            options: {
                                                                                rowIndex: 0,
                                                                                columnIndex: 1,
                                                                                controlId: "InitialValue",
                                                                                label: "Initial Value",
                                                                                value: "",
                                                                                disabled: true
                                                                            }
                                                                        },
                                                                        {
                                                                            type: "myFormGroupTextbox",
                                                                            options: {
                                                                                rowIndex: 1,
                                                                                columnIndex: 1,
                                                                                controlId: "PortfolioTypeCode",
                                                                                label: "Portfolio Type",
                                                                                value: "",
                                                                                disabled: true
                                                                            }
                                                                        },
                                                                        {
                                                                            type: "myFormGroupTextbox",
                                                                            options: {
                                                                                rowIndex: 2,
                                                                                columnIndex: 1,
                                                                                controlId: "InvestmentGoal",
                                                                                label: "Investment Goal",
                                                                                value: "",
                                                                                disabled: true
                                                                            }
                                                                        },
                                                                        {
                                                                            type: "myFormGroupTextbox",
                                                                            options: {
                                                                                rowIndex: 3,
                                                                                columnIndex: 1,
                                                                                controlId: "TotalMarketValueInGlobalCurrency",
                                                                                label: "Total Market Value",
                                                                                value: "24201522.92",
                                                                                disabled: "True"
                                                                            }
                                                                        },
                                                                        {
                                                                            type: "myFormGroupTextbox",
                                                                            options: {
                                                                                rowIndex: 3,
                                                                                columnIndex: 1,
                                                                                controlId: "TotalMarketValue",
                                                                                label: "Total Market Value",
                                                                                value: "24201522.92",
                                                                                disabled: "True"
                                                                            }
                                                                        },
                                                                        {
                                                                            type: "myFormGroupTextbox",
                                                                            options: {
                                                                                rowIndex: 4,
                                                                                columnIndex: 1,
                                                                                controlId: "TotalAccruedInterest",
                                                                                label: "Total Accrued Interest",
                                                                                value: "0",
                                                                                disabled: "True"
                                                                            }
                                                                        },
                                                                        {
                                                                            type: "myFormGroupTextbox",
                                                                            options: {
                                                                                rowIndex: 5,
                                                                                columnIndex: 1,
                                                                                controlId: "TotalMarketValueWithAccruedInterest",
                                                                                label: "Total Market Value With Accrued Interest",
                                                                                value: "24201522.92",
                                                                                disabled: "True"
                                                                            }
                                                                        },
                                                                        {
                                                                            type: "myFormGroupTextbox",
                                                                            options: {
                                                                                rowIndex: 6,
                                                                                columnIndex: 1,
                                                                                controlId: "TotalCashInGlobalCurrency",
                                                                                label: "Total Cash",
                                                                                value: "24201522.92",
                                                                                disabled: "True"
                                                                            }
                                                                        },
                                                                        {
                                                                            type: "myFormGroupTextbox",
                                                                            options: {
                                                                                rowIndex: 6,
                                                                                columnIndex: 1,
                                                                                controlId: "TotalCash",
                                                                                label: "Total Cash",
                                                                                value: "24201522.92",
                                                                                disabled: "True"
                                                                            }
                                                                        },
                                                                        {
                                                                            type: "myFormGroupTextbox",
                                                                            options: {
                                                                                rowIndex: 7,
                                                                                columnIndex: 1,
                                                                                controlId: "TotalTradableCashInGlobalCurrency",
                                                                                label: "Total Tradable Cash",
                                                                                value: "24201522.92",
                                                                                disabled: "True"
                                                                            }
                                                                        }
                                                                        , {
                                                                            type: "myFormGroupTextbox",
                                                                            options: {
                                                                                rowIndex: 7,
                                                                                columnIndex: 1,
                                                                                controlId: "TotalTradableCash",
                                                                                label: "Total Tradable Cash",
                                                                                value: "24201522.92",
                                                                                disabled: "True"
                                                                            }
                                                                        }
                                                                        , {
                                                                            type: "myFormGroupTextbox",
                                                                            options: {
                                                                                rowIndex: 8,
                                                                                columnIndex: 1,
                                                                                controlId: "RealizedYTDGainInGlobalCurrency",
                                                                                label: "Realized YTD Gain",
                                                                                value: "0",
                                                                                disabled: "True"
                                                                            }
                                                                        },
                                                                        {
                                                                            type: "myFormGroupTextbox",
                                                                            options: {
                                                                                rowIndex: 8,
                                                                                columnIndex: 1,
                                                                                controlId: "RealizedYTDGain",
                                                                                label: "Realized YTD Gain",
                                                                                value: "0",
                                                                                disabled: "True"
                                                                            }
                                                                        },
                                                                        {
                                                                            type: "myFormGroupTextbox",
                                                                            options: {
                                                                                rowIndex: 9,
                                                                                columnIndex: 1,
                                                                                controlId: "RealizedYTDGainLongInGlobalCurrency",
                                                                                label: "Realized YTD Gain Long",
                                                                                value: "0",
                                                                                disabled: "True"
                                                                            }
                                                                        },
                                                                        {
                                                                            type: "myFormGroupTextbox",
                                                                            options: {
                                                                                rowIndex: 9,
                                                                                columnIndex: 1,
                                                                                controlId: "RealizedYTDGainLong",
                                                                                label: "Realized YTD Gain Long",
                                                                                value: "0",
                                                                                disabled: "True"
                                                                            }
                                                                        }
                                                                        , {
                                                                            type: "myFormGroupTextbox",
                                                                            options: {
                                                                                rowIndex: 10,
                                                                                columnIndex: 1,
                                                                                controlId: "TaxStatus",
                                                                                label: "Tax Status",
                                                                                value: "",
                                                                                disabled: true
                                                                            }
                                                                        },
                                                                        {
                                                                            type: "myFormGroupTextbox",
                                                                            options: {
                                                                                rowIndex: 11,
                                                                                columnIndex: 1,
                                                                                controlId: "TaxNumber",
                                                                                label: "Tax Number",
                                                                                value: "",
                                                                                disabled: true
                                                                            }
                                                                        },
                                                                        {
                                                                            type: "myFormGroupCheckbox",
                                                                            options: {
                                                                                rowIndex: 12,
                                                                                columnIndex: 1,
                                                                                controlId: "PortfolioStatus",
                                                                                label: "Maintain Calculated Data",
                                                                                value: "",
                                                                                disabled: true
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            },
                                                            {
                                                                type: "myTable",
                                                                options: {
                                                                    rowCount: 2,
                                                                    columnCount: 1,
                                                                    items: [
                                                                        {
                                                                            type: "myFormGroupTextbox",
                                                                            options: {
                                                                                rowIndex: 0,
                                                                                columnIndex: 0,
                                                                                name: "WebPage",
                                                                                controlId: "ctl-01",
                                                                                label: "Web Page",
                                                                                value: "",
                                                                                disabled: true,
                                                                                changeHandler: function () {

                                                                                }
                                                                            }
                                                                        },
                                                                        {
                                                                            type: "myFormGroupTextbox",
                                                                            options: {
                                                                                rowIndex: 1,
                                                                                columnIndex: 0,
                                                                                name: "PortfolioFolder",
                                                                                controlId: "ctl-02",
                                                                                label: "Portfolio Folder",
                                                                                value: "",
                                                                                disabled: true,
                                                                                changeHandler: function () {

                                                                                }
                                                                            }
                                                                        }
                                                                    ]
                                                                }
                                                            }
                                                        ]
                                                    }
                                                }
                                            }

                                        },
                                        {
                                            type: "myTile",
                                            options: {
                                                expanded: true,
                                                tileTitle: {
                                                    type: "myTitle",
                                                    options: {
                                                        title: "Tax Lots",
                                                        class: "tile-header"
                                                    }
                                                },
                                                tileBody: {
                                                    type: "myTileBody",
                                                    options: {
                                                        children: [
                                                            {
                                                                type: "myGrid",
                                                                options: {
                                                                    Column: taxLots.Column,
                                                                    Metadata: taxLots.Metadata,
                                                                    Data: taxLots.Data
                                                                }
                                                            }
                                                        ]
                                                    }
                                                }
                                            }

                                        },
                                        {
                                            type: "myTile",
                                            options: {
                                                expanded: true,
                                                tileTitle: {
                                                    type: "myTitle",
                                                    options: {
                                                        title: "Access Rights",
                                                        class: "tile-header"
                                                    }
                                                },
                                                tileBody: {
                                                    type: "myTileBody",
                                                    options: {
                                                        children: [

                                                        ]
                                                    }
                                                }
                                            }

                                        },
                                        {
                                            type: "myTile",
                                            options: {
                                                expanded: true,
                                                tileTitle: {
                                                    type: "myTitle",
                                                    options: {
                                                        title: "Interested Parties",
                                                        class: "tile-header"
                                                    }
                                                },
                                                tileBody: {
                                                    type: "myTileBody",
                                                    options: {
                                                        children: [

                                                        ]
                                                    }
                                                }
                                            }

                                        },
                                        {
                                            type: "myTile",
                                            options: {
                                                expanded: true,
                                                tileTitle: {
                                                    type: "myTitle",
                                                    options: {
                                                        title: "Activities",
                                                        class: "tile-header"
                                                    }
                                                },
                                                tileBody: {
                                                    type: "myTileBody",
                                                    options: {
                                                        children: [

                                                        ]
                                                    }
                                                }
                                            }

                                        },
                                        {
                                            type: "myTile",
                                            options: {
                                                expanded: true,
                                                tileTitle: {
                                                    type: "myTitle",
                                                    options: {
                                                        title: "Belongs to Portfolio Groups",
                                                        class: "tile-header"
                                                    }
                                                },
                                                tileBody: {
                                                    type: "myTileBody",
                                                    options: {
                                                        children: [

                                                        ]
                                                    }
                                                }
                                            }

                                        },
                                        {
                                            type: "myTile",
                                            options: {
                                                expanded: true,
                                                tileTitle: {
                                                    type: "myTitle",
                                                    options: {
                                                        title: "Belongs to Composites",
                                                        class: "tile-header"
                                                    }
                                                },
                                                tileBody: {
                                                    type: "myTileBody",
                                                    options: {
                                                        children: [

                                                        ]
                                                    }
                                                }
                                            }

                                        },
                                        {
                                            type: "myTile",
                                            options: {
                                                expanded: true,
                                                tileTitle: {
                                                    type: "myTitle",
                                                    options: {
                                                        title: "Distributions",
                                                        class: "tile-header"
                                                    }
                                                },
                                                tileBody: {
                                                    type: "myTileBody",
                                                    options: {
                                                        children: [

                                                        ]
                                                    }
                                                }
                                            }

                                        }
                                    ]
                                }
                            }
                        ]
                    }
                }
            ]
        };

        let service = {};

        // render page data.
        let result = {
            data: data,
            ui: ui,
            service: service
        };

        return result;
    }

    // Portfolio Edit
    private getPageData_4044(linkfield) {
        // get portfolio item data;
        let all: any = this.getAllPortfolio(1);
        let item = all.Data.find(item => {
            return item.PortfolioID === linkfield;
        });

        console.log(item);

        let data = [
            null,
            null,

            // card
            {
                items: [
                    // card body
                    {
                        items: [
                            // tile
                            {
                                bindingContext: item,
                                items: []
                            },
                            {
                                items: []
                            },
                            {
                                items: []
                            },
                            {
                                items: []
                            },
                            {
                                items: []
                            },
                            {
                                items: []
                            },
                            {
                                items: []
                            },
                            {
                                items: []
                            }
                        ]
                    }
                ]
            }
        ];

        let ui = {
            children: [
                {
                    type: "myTitle",
                    options: {
                        title: "Portfolio",
                        subTitle: item.PortfolioCode,
                        class: "tile-header"
                    }
                },
                {
                    type: "myButtonGroup",
                    options: {
                        children: [
                            {
                                type: "myButton",
                                options: {
                                    buttonText: "Save",
                                    click: function (context) {
                                        var tile = context.options.pageContext.ui.children[2].options.bodys[0].options.children[0];
                                        var tbx = tile.options.tileBody.options.children[0];
                                        alert(tbx.options.value);
                                    }
                                }

                            },
                            {
                                type: "myButton",
                                options: {
                                    buttonText: "Cancel",
                                    click: function (context) {
                                        let linkArray = [];
                                        linkArray.push("/index");
                                        linkArray.push(-4036);
                                        if (context.options.pageContext.params.linkfield) {
                                            linkArray.push({ linkfield: +context.options.pageContext.params.linkfield });
                                        }

                                        context.options.service.router.navigate(linkArray);
                                    }
                                }

                            }
                        ]
                    }
                },
                {
                    type: "myCard",
                    options: {
                        activeIndex: 0,
                        headers: [
                            "Dashboards",
                            "General",
                            "Holdings",
                            "Transactions",
                            "Settings",
                            "History",
                            "Performance (Security)",
                            "Statement Transactions",
                            "Custodial Positions"
                        ],
                        bodys: [
                            {
                                type: "myCardBody",
                                options: {
                                    expanded: true,
                                    editable: true,
                                    children: [
                                        {
                                            type: "myTile",
                                            options: {
                                                expanded: true,
                                                tileTitle: {
                                                    type: "myTitle",
                                                    options: {
                                                        title: "Basic Information",
                                                        class: "tile-header"
                                                    }
                                                },
                                                tileBody: {
                                                    type: "myTileBody",
                                                    options: {
                                                        children: [
                                                            {
                                                                type: "myFormGroupTextbox",
                                                                options: {
                                                                    name: "PortfolioCode",
                                                                    controlId: "ctl-01",
                                                                    label: "Portfolio Code",
                                                                    value: 1010000106,
                                                                    disabled: false,
                                                                    changeHandler: function () {

                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    }
                                                }
                                            }

                                        },
                                        {
                                            type: "myTile",
                                            options: {
                                                expanded: true,
                                                tileTitle: {
                                                    type: "myTitle",
                                                    options: {
                                                        title: "Tax Lots",
                                                        class: "tile-header"
                                                    }
                                                },
                                                tileBody: {
                                                    type: "myTileBody",
                                                    options: {
                                                        children: [

                                                        ]
                                                    }
                                                }
                                            }

                                        },
                                        {
                                            type: "myTile",
                                            options: {
                                                expanded: true,
                                                tileTitle: {
                                                    type: "myTitle",
                                                    options: {
                                                        title: "Access Rights",
                                                        class: "tile-header"
                                                    }
                                                },
                                                tileBody: {
                                                    type: "myTileBody",
                                                    options: {
                                                        children: [

                                                        ]
                                                    }
                                                }
                                            }

                                        },
                                        {
                                            type: "myTile",
                                            options: {
                                                expanded: true,
                                                tileTitle: {
                                                    type: "myTitle",
                                                    options: {
                                                        title: "Interested Parties",
                                                        class: "tile-header"
                                                    }
                                                },
                                                tileBody: {
                                                    type: "myTileBody",
                                                    options: {
                                                        children: [

                                                        ]
                                                    }
                                                }
                                            }

                                        },
                                        {
                                            type: "myTile",
                                            options: {
                                                expanded: true,
                                                tileTitle: {
                                                    type: "myTitle",
                                                    options: {
                                                        title: "Activities",
                                                        class: "tile-header"
                                                    }
                                                },
                                                tileBody: {
                                                    type: "myTileBody",
                                                    options: {
                                                        children: [

                                                        ]
                                                    }
                                                }
                                            }

                                        },
                                        {
                                            type: "myTile",
                                            options: {
                                                expanded: true,
                                                tileTitle: {
                                                    type: "myTitle",
                                                    options: {
                                                        title: "Belongs to Portfolio Groups",
                                                        class: "tile-header"
                                                    }
                                                },
                                                tileBody: {
                                                    type: "myTileBody",
                                                    options: {
                                                        children: [

                                                        ]
                                                    }
                                                }
                                            }

                                        },
                                        {
                                            type: "myTile",
                                            options: {
                                                expanded: true,
                                                tileTitle: {
                                                    type: "myTitle",
                                                    options: {
                                                        title: "Belongs to Composites",
                                                        class: "tile-header"
                                                    }
                                                },
                                                tileBody: {
                                                    type: "myTileBody",
                                                    options: {
                                                        children: [

                                                        ]
                                                    }
                                                }
                                            }

                                        },
                                        {
                                            type: "myTile",
                                            options: {
                                                expanded: true,
                                                tileTitle: {
                                                    type: "myTitle",
                                                    options: {
                                                        title: "Distributions",
                                                        class: "tile-header"
                                                    }
                                                },
                                                tileBody: {
                                                    type: "myTileBody",
                                                    options: {
                                                        children: [

                                                        ]
                                                    }
                                                }
                                            }

                                        }
                                    ]
                                }
                            }
                        ]
                    }
                }
            ]
        };

        let service = {};

        // render page data.
        let result = {
            data: data,
            ui: ui,
            service: service
        };

        return result;
    }

    private getTaxLotsData(): Object {
        let gridData = {
            "Data": [
                {
                    "QuantityCalculationPrec": "M",
                    "SecTypeGroupID": 274,
                    "SecTypeCode": "caus",
                    "PortfolioStatus": "",
                    "Quantity": 24201522,
                    "PortfolioTypeCode": "",
                    "UnrealizedGainLoss": 0,
                    "TargetCurrencyCode": "us",
                    "ValuationFactor": 1,
                    "SecurityID": 6,
                    "Symbol": "cash",
                    "SettleDate": "1753-01-01T00:00:00",
                    "IsTradingCash": true,
                    "IsShortPosition": false,
                    "MarketValue": 24201522,
                    "LongAssetClassCode": "c",
                    "ClosePrice": 1,
                    "AsOfDate": "2016-08-12T00:00:00",
                    "Description": "Cash Account",
                    "PctUnrealizedGainLoss": 0,
                    "OwnerName": "Default Owners",
                    "PortfolioID": 144,
                    "PortfolioCode": "13f",
                    "OwnerID": -14,
                    "OriginalCost": 24201522
                },
                {
                    "QuantityCalculationPrec": "M",
                    "SecTypeGroupID": 262,
                    "SecTypeCode": "cbus",
                    "PortfolioStatus": "",
                    "Quantity": 100000,
                    "PortfolioTypeCode": "",
                    "TargetCurrencyCode": "us",
                    "ValuationFactor": 0.01,
                    "SecurityID": 1473,
                    "Symbol": "000325aa",
                    "SettleDate": "1753-01-01T00:00:00",
                    "IsTradingCash": false,
                    "IsShortPosition": false,
                    "LongAssetClassCode": "f",
                    "AsOfDate": "2016-08-12T00:00:00",
                    "Description": "AAF-MCQUAY INC",
                    "OwnerName": "Default Owners",
                    "PortfolioID": 144,
                    "PortfolioCode": "13f",
                    "OwnerID": -14,
                    "OriginalCost": 98000
                },
                {
                    "QuantityCalculationPrec": "M",
                    "SecTypeGroupID": 256,
                    "SecTypeCode": "csus",
                    "PortfolioStatus": "",
                    "Quantity": 25000,
                    "PortfolioTypeCode": "",
                    "TargetCurrencyCode": "us",
                    "ValuationFactor": 1,
                    "SecurityID": 1621,
                    "Symbol": "ibm",
                    "SettleDate": "1753-01-01T00:00:00",
                    "IsTradingCash": false,
                    "IsShortPosition": false,
                    "LongAssetClassCode": "e",
                    "AsOfDate": "2016-08-12T00:00:00",
                    "Description": "INTERNATIONAL BUS MACH COM",
                    "OwnerName": "Default Owners",
                    "PortfolioID": 144,
                    "PortfolioCode": "13f",
                    "OwnerID": -14,
                    "OriginalCost": 250000
                },
                {
                    "QuantityCalculationPrec": "M",
                    "SecTypeGroupID": 257,
                    "SecTypeCode": "psus",
                    "PortfolioStatus": "",
                    "Quantity": 15000,
                    "PortfolioTypeCode": "",
                    "TargetCurrencyCode": "us",
                    "ValuationFactor": 1,
                    "SecurityID": 1751,
                    "Symbol": "hov",
                    "SettleDate": "1753-01-01T00:00:00",
                    "IsTradingCash": false,
                    "IsShortPosition": false,
                    "LongAssetClassCode": "e",
                    "AsOfDate": "2016-08-12T00:00:00",
                    "Description": "HOVNANIAN ENTERPRISES CL A",
                    "OwnerName": "Default Owners",
                    "PortfolioID": 144,
                    "PortfolioCode": "13f",
                    "OwnerID": -14,
                    "OriginalCost": 330000
                },
                {
                    "QuantityCalculationPrec": "M",
                    "SecTypeGroupID": 263,
                    "SecTypeCode": "cvus",
                    "PortfolioStatus": "",
                    "Quantity": 110000,
                    "PortfolioTypeCode": "",
                    "TargetCurrencyCode": "us",
                    "ValuationFactor": 0.01,
                    "SecurityID": 1804,
                    "Symbol": "convertible",
                    "SettleDate": "1753-01-01T00:00:00",
                    "IsTradingCash": false,
                    "IsShortPosition": false,
                    "LongAssetClassCode": "e",
                    "AsOfDate": "2016-08-12T00:00:00",
                    "Description": "cvusconvertible",
                    "OwnerName": "Default Owners",
                    "PortfolioID": 144,
                    "PortfolioCode": "13f",
                    "OwnerID": -14,
                    "OriginalCost": 107800
                }
            ],
            "Metadata": [
                {
                    "Name": "Position",
                    "DisplayName": "Portfolio Position",
                    "RestrictionClassID": 76,
                    "Fields": [
                        {
                            "Name": "QuantityCalculationPrec",
                            "Caption": "Quantity Calculation Precision",
                            "ReadOnly": true,
                            "Hidden": true,
                            "BasicType": "String",
                            "UIType": "TextBox",
                            "PrimaryKey": false,
                            "LinkTarget": "",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "1",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "SecTypeGroupID",
                            "Caption": "SecType Group ID",
                            "ReadOnly": true,
                            "Hidden": true,
                            "BasicType": "Integer",
                            "UIType": "TextBox",
                            "PrimaryKey": false,
                            "LinkTarget": "",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "15",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "SecTypeCode",
                            "Caption": "Security Type",
                            "ReadOnly": true,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "TextBox",
                            "PrimaryKey": true,
                            "LinkTarget": "",
                            "LinkFields": [
                                "SecTypeCode"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "4",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "PortfolioStatus",
                            "Caption": "Status",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "List",
                            "PrimaryKey": false,
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [
                                {
                                    "Data": "Open",
                                    "Display": "Open"
                                },
                                {
                                    "Data": "Closed",
                                    "Display": "Closed"
                                },
                                {
                                    "Data": "Prospect",
                                    "Display": "Prospect"
                                },
                                {
                                    "Data": "Model",
                                    "Display": "Model"
                                }
                            ],
                            "Validations": []
                        },
                        {
                            "Name": "Quantity",
                            "Caption": "Quantity",
                            "ReadOnly": true,
                            "Hidden": false,
                            "BasicType": "Float",
                            "UIType": "TextBox",
                            "PrimaryKey": false,
                            "LinkTarget": "",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "PortfolioTypeCode",
                            "Caption": "Portfolio Type",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "List",
                            "PrimaryKey": false,
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [
                                {
                                    "Data": "Individual",
                                    "Display": "Individual"
                                },
                                {
                                    "Data": "Joint",
                                    "Display": "Joint"
                                },
                                {
                                    "Data": "UGMA",
                                    "Display": "UGMA"
                                },
                                {
                                    "Data": "Trust",
                                    "Display": "Trust"
                                },
                                {
                                    "Data": "401K",
                                    "Display": "401K"
                                },
                                {
                                    "Data": "Pension (Def. Ben.)",
                                    "Display": "Pension (Def. Ben.)"
                                },
                                {
                                    "Data": "Pension (Def. Con.)",
                                    "Display": "Pension (Def. Con.)"
                                },
                                {
                                    "Data": "Taft Hartley",
                                    "Display": "Taft Hartley"
                                },
                                {
                                    "Data": "IRA",
                                    "Display": "IRA"
                                },
                                {
                                    "Data": "Money  Purchase PSP",
                                    "Display": "Money  Purchase PSP"
                                },
                                {
                                    "Data": "Money Purchase PP",
                                    "Display": "Money Purchase PP"
                                },
                                {
                                    "Data": "Roth IRA",
                                    "Display": "Roth IRA"
                                },
                                {
                                    "Data": "Charitable",
                                    "Display": "Charitable"
                                },
                                {
                                    "Data": "Keogh",
                                    "Display": "Keogh"
                                },
                                {
                                    "Data": "Partnership",
                                    "Display": "Partnership"
                                },
                                {
                                    "Data": "Institutional",
                                    "Display": "Institutional"
                                },
                                {
                                    "Data": "Corporate",
                                    "Display": "Corporate"
                                },
                                {
                                    "Data": "ERISA",
                                    "Display": "ERISA"
                                },
                                {
                                    "Data": "WRAP",
                                    "Display": "WRAP"
                                },
                                {
                                    "Data": "DVP",
                                    "Display": "DVP"
                                }
                            ],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "32",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "UnrealizedGainLoss",
                            "Caption": "Unrealized Gain/Loss",
                            "ReadOnly": true,
                            "Hidden": false,
                            "BasicType": "Float",
                            "UIType": "Currency",
                            "PrimaryKey": false,
                            "LinkTarget": "",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "TargetCurrencyCode",
                            "Caption": "Target Currency Code",
                            "ReadOnly": true,
                            "Hidden": true,
                            "BasicType": "String",
                            "UIType": "TextBox",
                            "PrimaryKey": false,
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "ValuationFactor",
                            "Caption": "Valuation Factor",
                            "ReadOnly": true,
                            "Hidden": true,
                            "BasicType": "PositiveFloat",
                            "UIType": "TextBox",
                            "PrimaryKey": false,
                            "LinkTarget": "",
                            "LinkFields": [
                                "SecurityID"
                            ],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "SecurityID",
                            "Caption": "Security ID",
                            "ReadOnly": true,
                            "Hidden": true,
                            "BasicType": "Integer",
                            "UIType": "TextBox",
                            "PrimaryKey": true,
                            "LinkTarget": "",
                            "LinkFields": [
                                "SecurityID"
                            ],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "Symbol",
                            "Caption": "Symbol",
                            "ReadOnly": true,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "Hyperlink",
                            "PrimaryKey": false,
                            "LinkTarget": "",
                            "LinkFields": [
                                "SecurityID"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "25",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "SettleDate",
                            "Caption": "Settle Date",
                            "ReadOnly": true,
                            "Hidden": false,
                            "BasicType": "Date",
                            "UIType": "Date",
                            "PrimaryKey": true,
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MinValue",
                                    "Value": "01021753",
                                    "SpecialErrorMessage": null
                                },
                                {
                                    "Type": "MaxValue",
                                    "Value": "12319999",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "IsTradingCash",
                            "Caption": "Cash",
                            "ReadOnly": true,
                            "Hidden": true,
                            "BasicType": "Boolean",
                            "UIType": "CheckBox",
                            "PrimaryKey": false,
                            "LinkTarget": "",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "1",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "IsShortPosition",
                            "Caption": "Short Position",
                            "ReadOnly": true,
                            "Hidden": true,
                            "BasicType": "Boolean",
                            "UIType": "CheckBox",
                            "PrimaryKey": true,
                            "LinkTarget": "",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "1",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "MarketValue",
                            "Caption": "Market Value",
                            "ReadOnly": true,
                            "Hidden": false,
                            "BasicType": "Float",
                            "UIType": "Currency",
                            "PrimaryKey": false,
                            "LinkTarget": "",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "LongAssetClassCode",
                            "Caption": "Asset Class",
                            "ReadOnly": true,
                            "Hidden": true,
                            "BasicType": "String",
                            "UIType": "TextBox",
                            "PrimaryKey": false,
                            "LinkTarget": "",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "12",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "ClosePrice",
                            "Caption": "Closing Price",
                            "ReadOnly": true,
                            "Hidden": false,
                            "BasicType": "Float",
                            "UIType": "Currency",
                            "PrimaryKey": false,
                            "LinkTarget": "",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "AsOfDate",
                            "Caption": "As Of Date",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "Date",
                            "UIType": "Date",
                            "PrimaryKey": false,
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MinValue",
                                    "Value": "01021753",
                                    "SpecialErrorMessage": null
                                },
                                {
                                    "Type": "MaxValue",
                                    "Value": "12319999",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "Description",
                            "Caption": "Description",
                            "ReadOnly": true,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "TextBox",
                            "PrimaryKey": false,
                            "LinkTarget": "SecurityDetail.aspx?linkfield={0}",
                            "LinkFields": [
                                "SecurityID"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "72",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "PctUnrealizedGainLoss",
                            "Caption": "% Unrealized Gain/Loss",
                            "ReadOnly": true,
                            "Hidden": false,
                            "BasicType": "Float",
                            "UIType": "Percent",
                            "PrimaryKey": false,
                            "LinkTarget": "",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MinValue",
                                    "Value": "0",
                                    "SpecialErrorMessage": null
                                },
                                {
                                    "Type": "MaxValue",
                                    "Value": "100",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "OwnerName",
                            "Caption": "Portfolio Owned By",
                            "ReadOnly": true,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "TextBox",
                            "PrimaryKey": false,
                            "LinkTarget": "",
                            "LinkFields": [
                                "OwnerID"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "Required",
                                    "Value": "true",
                                    "SpecialErrorMessage": null
                                },
                                {
                                    "Type": "MaxLength",
                                    "Value": "11",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "PortfolioID",
                            "Caption": "Portfolio ID",
                            "ReadOnly": true,
                            "Hidden": true,
                            "BasicType": "Integer",
                            "UIType": "None",
                            "PrimaryKey": true,
                            "LinkTarget": "",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "PortfolioCode",
                            "Caption": "Portfolio Code",
                            "ReadOnly": true,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "Hyperlink",
                            "PrimaryKey": false,
                            "LinkTarget": "PortfolioDetail.aspx?linkfield={0}",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "8",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "OwnerID",
                            "Caption": "Owner ID",
                            "ReadOnly": false,
                            "Hidden": true,
                            "BasicType": "Integer",
                            "UIType": "None",
                            "PrimaryKey": false,
                            "LinkTarget": "",
                            "LinkFields": [
                                "OwnerID"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "Required",
                                    "Value": "true",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "OriginalCost",
                            "Caption": "Original Cost",
                            "ReadOnly": true,
                            "Hidden": false,
                            "BasicType": "Float",
                            "UIType": "Currency",
                            "PrimaryKey": false,
                            "LinkTarget": "",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [],
                            "Validations": []
                        }
                    ]
                }
            ]
        }

        return gridData;
    }

    private getAllPortfolio(searchId: number): Object {
        let result: any = {
            "Data": [
                {
                    "RealizedYTDGainLongInGlobalCurrency": 0,
                    "ReconRuleName": "",
                    "RealizedYTDGainLong": 0,
                    "ProcessingGroupName": "Default Owners",
                    "ProcessingGroupID": -14,
                    "RealizedYTDGainInGlobalCurrency": 0,
                    "RealizedYTDGain": 0,
                    "ReportHeadingDetail": "13f\n\n\n",
                    "ReportHeading3": "",
                    "ShortName": "",
                    "ReportHeading2": "",
                    "ReportHeading1": "13f",
                    "ReportHeading": "13f",
                    "PrimaryContactAddressID": 1,
                    "PrimaryContactCode": "z13f-Owner",
                    "PrimaryContactAddressLabel": "Home",
                    "PriceSetCode": "",
                    "PortfolioID": 144,
                    "PortfolioGUID": "409f8cad-e728-4e6a-add5-f6df2fab31f0",
                    "PortfolioTypeCode": "",
                    "PortfolioStatus": "",
                    "PrimaryContactPhoneLabel": "",
                    "ProcessingGroupCode": "Default Owners",
                    "PrimaryContactType": 5,
                    "PrimaryContactName": "13f",
                    "PrimaryContactEmail2": "",
                    "PrimaryContactEmail1": "",
                    "PrimaryContactID": 145,
                    "PrimaryContactEmail3": "",
                    "TotalAccruedInterest": 0,
                    "TotalCashInGlobalCurrency": 24201522,
                    "TotalCash": 24201522,
                    "UseAverageCost": false,
                    "URL": "",
                    "WithholdingTaxTypeCode": "",
                    "TotalTradableCashInGlobalCurrency": 24201522,
                    "TotalMarketValueInGlobalCurrency": 24201522,
                    "TotalMarketValue": 24201522,
                    "TotalTradableCash": 24201522,
                    "TotalMarketValueWithAccruedInterest": 24201522,
                    "TaxStatus": "",
                    "StartDate": "1904-03-01T00:00:00",
                    "ShowSecuritySymbol": "",
                    "TaxNumber": "",
                    "SyntheticIndexDesc": "",
                    "BrokerRepSymbol": "",
                    "BrokerRepName": "",
                    "CashSecTypeCode": "",
                    "CashSecType": "",
                    "BillingMethodCode": "",
                    "BillingContactID": 146,
                    "BillingPhoneLabel": "Business",
                    "BillingPhoneID": 2,
                    "DocumentLink": "",
                    "DefaultSettlementCurrencyCode": "",
                    "DomicileCountryCode": "",
                    "CashSecuritySymbol": "",
                    "ClosingMethodCode": " ",
                    "AverageCostCode": "",
                    "AuditEventID": 1719,
                    "BankAddressLabel": "Business",
                    "BankAddressID": 3,
                    "AccruedInterestPMCode": "",
                    "AccruedInterestID": 0,
                    "AccruedInterestTDCode": "",
                    "AccruedInterestShowCode": "",
                    "BillingAddressID": 2,
                    "BillingContactCode": "z13f-Billing",
                    "BillingAddressLabel": "Business",
                    "BaseCurrencyCode": "",
                    "BankContactID": 147,
                    "BankContactCode": "z13f-Bank",
                    "BankPhoneLabel": "Business",
                    "BankPhoneID": 3,
                    "FootNoteLine1": "",
                    "OwnerContactID": 145,
                    "OwnerContactCode": "z13f-Owner",
                    "OwnerContactPhoneID": 1,
                    "OwnerContactName": "13f",
                    "OwnerContactAddressLabel": "Home",
                    "OwnerClassID": 53,
                    "NumOfCopies": 0,
                    "OwnerContactAddressID": 1,
                    "OwnerCode": "Default Owners",
                    "PortfolioCode": "13f",
                    "PortfolioBaseCurrencyISOCode": "USD",
                    "OwnerContactType": 5,
                    "OwnerContactPhoneLabel": "Home",
                    "OwnerName": "Default Owners",
                    "OwnerID": -14,
                    "IncomeSecTypeCode": "",
                    "IncomeSecuritySymbol": "",
                    "IncomeSecType": "",
                    "FootNoteLine3": "",
                    "FootNoteLine2": "",
                    "HoldingsStatus": "U",
                    "FxSetCode": "",
                    "MaintainCalcData": true,
                    "NextTranID": 111,
                    "LastHoldingsUpdate": "2016-08-09T19:29:03.78",
                    "InvestmentGoal": "",
                    "InternalClosingMethodCode": "",
                    "IsPositionOnly": false,
                    "IsIncomplete": true
                }
            ],
            "Metadata": [
                {
                    "Name": "Portfolio",
                    "DisplayName": "Portfolio",
                    "Fields": [
                        {
                            "Name": "ReconciliationCloseDate",
                            "Caption": "Reconciliation Close Date",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "Date",
                            "UIType": "Date",
                            "LinkTarget": "",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MinValue",
                                    "Value": "01021753",
                                    "SpecialErrorMessage": null
                                },
                                {
                                    "Type": "MaxValue",
                                    "Value": "12319999",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "RealizedYTDGainLongInGlobalCurrency",
                            "Caption": "Realized YTD Gain Long",
                            "ReadOnly": true,
                            "Hidden": false,
                            "BasicType": "Float",
                            "UIType": "Currency",
                            "LinkTarget": "",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "ReconRuleName",
                            "Caption": "Reconciliation Rule",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "Hyperlink",
                            "LinkTarget": "ReconRuleDetail.aspx?linkfield={0}",
                            "LinkFields": [
                                "ReconRuleID"
                            ],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "ReconRuleID",
                            "Caption": "Reconciliation Rule",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "Integer",
                            "UIType": "List",
                            "LinkTarget": "",
                            "LinkFields": [
                                "ReconRuleID"
                            ],
                            "ListValues": [
                                {
                                    "Data": "0",
                                    "Display": ""
                                }
                            ],
                            "Validations": []
                        },
                        {
                            "Name": "RealizedYTDGainLong",
                            "Caption": "Realized YTD Gain Long",
                            "ReadOnly": true,
                            "Hidden": false,
                            "BasicType": "Float",
                            "UIType": "Currency",
                            "LinkTarget": "",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "ProcessingGroupName",
                            "Caption": "Processed By",
                            "ReadOnly": true,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [
                                "ProcessingGroupID"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "72",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "ProcessingGroupID",
                            "Caption": "Processed By",
                            "ReadOnly": false,
                            "Hidden": true,
                            "BasicType": "Integer",
                            "UIType": "None",
                            "LinkTarget": "",
                            "LinkFields": [
                                "ProcessingGroupID"
                            ],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "RealizedYTDGainInGlobalCurrency",
                            "Caption": "Realized YTD Gain",
                            "ReadOnly": true,
                            "Hidden": false,
                            "BasicType": "Float",
                            "UIType": "Currency",
                            "LinkTarget": "",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "RealizedYTDGain",
                            "Caption": "Realized YTD Gain",
                            "ReadOnly": true,
                            "Hidden": false,
                            "BasicType": "Float",
                            "UIType": "Currency",
                            "LinkTarget": "",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "ReportHeadingDetail",
                            "Caption": "Report Heading",
                            "ReadOnly": true,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "255",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "ReportHeading3",
                            "Caption": "Report Heading 3",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "72",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "ShortName",
                            "Caption": "Short Name",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "72",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "RexStartDate",
                            "Caption": "Rex Start Date",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "Date",
                            "UIType": "Date",
                            "LinkTarget": "",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MinValue",
                                    "Value": "01021753",
                                    "SpecialErrorMessage": null
                                },
                                {
                                    "Type": "MaxValue",
                                    "Value": "12319999",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "ReportHeading2",
                            "Caption": "Report Heading 2",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "72",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "ReinvestDividends",
                            "Caption": "Reinvest Dividends",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "BooleanWithBlank",
                            "UIType": "List",
                            "LinkTarget": "",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [
                                {
                                    "Data": "-1",
                                    "Display": "(Use Settings)"
                                },
                                {
                                    "Data": "1",
                                    "Display": "Always Reinvest"
                                },
                                {
                                    "Data": "0",
                                    "Display": "Never Reinvest"
                                }
                            ],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "1",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "ReinvestCapitalGains",
                            "Caption": "Reinvest Capital Gains",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "BooleanWithBlank",
                            "UIType": "List",
                            "LinkTarget": "",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [
                                {
                                    "Data": "-1",
                                    "Display": "(Use Settings)"
                                },
                                {
                                    "Data": "1",
                                    "Display": "Always Reinvest"
                                },
                                {
                                    "Data": "0",
                                    "Display": "Never Reinvest"
                                }
                            ],
                            "Validations": []
                        },
                        {
                            "Name": "ReportHeading1",
                            "Caption": "Report Heading 1",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "72",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "ReportHeading",
                            "Caption": "Report Heading",
                            "ReadOnly": true,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "MultiLineText",
                            "LinkTarget": "",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "255",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "PrimaryContactAddressID",
                            "Caption": "Primary Contact Address ID",
                            "ReadOnly": false,
                            "Hidden": true,
                            "BasicType": "Integer",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "PriceSetID",
                            "Caption": "Price Set",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "Integer",
                            "UIType": "List",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [
                                {
                                    "Data": "0",
                                    "Display": "(Use Settings)"
                                },
                                {
                                    "Data": "1",
                                    "Display": "Standard Prices"
                                }
                            ],
                            "Validations": []
                        },
                        {
                            "Name": "PrimaryContactCode",
                            "Caption": "Primary Contact Code",
                            "ReadOnly": true,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [
                                "PrimaryContactID"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "32",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "PrimaryContactAddressLabel",
                            "Caption": "Primary Contact Address Label",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "List",
                            "LinkTarget": "",
                            "LinkFields": [
                                "PrimaryContactAddressID"
                            ],
                            "ListValues": [
                                {
                                    "Data": "Business",
                                    "Display": "Business"
                                },
                                {
                                    "Data": "Home",
                                    "Display": "Home"
                                },
                                {
                                    "Data": "Vacation Home",
                                    "Display": "Vacation Home"
                                },
                                {
                                    "Data": "Summer Home",
                                    "Display": "Summer Home"
                                },
                                {
                                    "Data": "Winter Home",
                                    "Display": "Winter Home"
                                },
                                {
                                    "Data": "Business 2",
                                    "Display": "Business 2"
                                },
                                {
                                    "Data": "Home 2",
                                    "Display": "Home 2"
                                },
                                {
                                    "Data": "Other",
                                    "Display": "Other"
                                },
                                {
                                    "Data": "Sig. Other",
                                    "Display": "Sig. Other"
                                },
                                {
                                    "Data": "None",
                                    "Display": "None"
                                }
                            ],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "16",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "PriceSetCode",
                            "Caption": "Price Set Code",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "PortfolioID",
                            "Caption": "Portfolio ID",
                            "ReadOnly": true,
                            "Hidden": true,
                            "BasicType": "Integer",
                            "UIType": "None",
                            "LinkTarget": "",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "PortfolioGUID",
                            "Caption": "Portfolio GUID",
                            "ReadOnly": false,
                            "Hidden": true,
                            "BasicType": "UniqueIdentifier",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "PortfolioTypeCode",
                            "Caption": "Portfolio Type",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "List",
                            "LinkTarget": "",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [
                                {
                                    "Data": "",
                                    "Display": ""
                                },
                                {
                                    "Data": "Individual",
                                    "Display": "Individual"
                                },
                                {
                                    "Data": "Joint",
                                    "Display": "Joint"
                                },
                                {
                                    "Data": "UGMA",
                                    "Display": "UGMA"
                                },
                                {
                                    "Data": "Trust",
                                    "Display": "Trust"
                                },
                                {
                                    "Data": "401K",
                                    "Display": "401K"
                                },
                                {
                                    "Data": "Pension (Def. Ben.)",
                                    "Display": "Pension (Def. Ben.)"
                                },
                                {
                                    "Data": "Pension (Def. Con.)",
                                    "Display": "Pension (Def. Con.)"
                                },
                                {
                                    "Data": "Taft Hartley",
                                    "Display": "Taft Hartley"
                                },
                                {
                                    "Data": "IRA",
                                    "Display": "IRA"
                                },
                                {
                                    "Data": "Money  Purchase PSP",
                                    "Display": "Money  Purchase PSP"
                                },
                                {
                                    "Data": "Money Purchase PP",
                                    "Display": "Money Purchase PP"
                                },
                                {
                                    "Data": "Roth IRA",
                                    "Display": "Roth IRA"
                                },
                                {
                                    "Data": "Charitable",
                                    "Display": "Charitable"
                                },
                                {
                                    "Data": "Keogh",
                                    "Display": "Keogh"
                                },
                                {
                                    "Data": "Partnership",
                                    "Display": "Partnership"
                                },
                                {
                                    "Data": "Institutional",
                                    "Display": "Institutional"
                                },
                                {
                                    "Data": "Corporate",
                                    "Display": "Corporate"
                                },
                                {
                                    "Data": "ERISA",
                                    "Display": "ERISA"
                                },
                                {
                                    "Data": "WRAP",
                                    "Display": "WRAP"
                                },
                                {
                                    "Data": "DVP",
                                    "Display": "DVP"
                                }
                            ],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "72",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "PortfolioStatus",
                            "Caption": "Portfolio Status",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "List",
                            "LinkTarget": "",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [
                                {
                                    "Data": "",
                                    "Display": ""
                                },
                                {
                                    "Data": "Open",
                                    "Display": "Open"
                                },
                                {
                                    "Data": "Closed",
                                    "Display": "Closed"
                                },
                                {
                                    "Data": "Prospect",
                                    "Display": "Prospect"
                                },
                                {
                                    "Data": "Model",
                                    "Display": "Model"
                                }
                            ],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "72",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "PrimaryContactPhoneLabel",
                            "Caption": "Primary Contact Phone Label",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "List",
                            "LinkTarget": "",
                            "LinkFields": [
                                "PrimaryContactPhoneID"
                            ],
                            "ListValues": [
                                {
                                    "Data": "Business",
                                    "Display": "Business"
                                },
                                {
                                    "Data": "Business 2",
                                    "Display": "Business 2"
                                },
                                {
                                    "Data": "Home",
                                    "Display": "Home"
                                },
                                {
                                    "Data": "Home 2",
                                    "Display": "Home 2"
                                },
                                {
                                    "Data": "Pager",
                                    "Display": "Pager"
                                },
                                {
                                    "Data": "Cellular",
                                    "Display": "Cellular"
                                },
                                {
                                    "Data": "Business Fax",
                                    "Display": "Business Fax"
                                },
                                {
                                    "Data": "Home Fax",
                                    "Display": "Home Fax"
                                },
                                {
                                    "Data": "Car",
                                    "Display": "Car"
                                },
                                {
                                    "Data": "Other",
                                    "Display": "Other"
                                },
                                {
                                    "Data": "Other Fax",
                                    "Display": "Other Fax"
                                },
                                {
                                    "Data": "Sig. Other Home",
                                    "Display": "Sig. Other Home"
                                },
                                {
                                    "Data": "Sig. Other Business",
                                    "Display": "Sig. Other Business"
                                },
                                {
                                    "Data": "Sig. Other Fax",
                                    "Display": "Sig. Other Fax"
                                },
                                {
                                    "Data": "Assistant",
                                    "Display": "Assistant"
                                },
                                {
                                    "Data": "TTY/TDD",
                                    "Display": "TTY/TDD"
                                },
                                {
                                    "Data": "Summer Home",
                                    "Display": "Summer Home"
                                },
                                {
                                    "Data": "Vacation Home",
                                    "Display": "Vacation Home"
                                },
                                {
                                    "Data": "Winter Home",
                                    "Display": "Winter Home"
                                }
                            ],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "16",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "PrimaryContactPhoneID",
                            "Caption": "Primary Contact Phone ID",
                            "ReadOnly": false,
                            "Hidden": true,
                            "BasicType": "Integer",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "ProcessingGroupCode",
                            "Caption": "Processing Group Code",
                            "ReadOnly": true,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [
                                "ProcessingGroupID"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "72",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "PrimaryContactType",
                            "Caption": "Primary Contact",
                            "ReadOnly": true,
                            "Hidden": true,
                            "BasicType": "Integer",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "PrimaryContactName",
                            "Caption": "Primary Contact",
                            "ReadOnly": true,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "Hyperlink",
                            "LinkTarget": "ContactDetail.aspx?linkfield={0}",
                            "LinkFields": [
                                "PrimaryContactID"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "255",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "PrimaryContactEmail2",
                            "Caption": "Primary Contact Email 2",
                            "ReadOnly": true,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "PrimaryContactEmail1",
                            "Caption": "Primary Contact Email",
                            "ReadOnly": true,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "PrimaryContactID",
                            "Caption": "Primary Contact",
                            "ReadOnly": false,
                            "Hidden": true,
                            "BasicType": "Integer",
                            "UIType": "LookupWidget",
                            "LinkTarget": "",
                            "LinkFields": [
                                "PrimaryContactID"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "10",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "PrimaryContactEmail3",
                            "Caption": "Primary Contact Email 3",
                            "ReadOnly": true,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "ShowFootNotes",
                            "Caption": "Footnotes",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "BooleanWithBlank",
                            "UIType": "List",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [
                                {
                                    "Data": "-1",
                                    "Display": "(Use Settings)"
                                },
                                {
                                    "Data": "1",
                                    "Display": "Show"
                                },
                                {
                                    "Data": "0",
                                    "Display": "Hide"
                                }
                            ],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "1",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "TotalAccruedInterest",
                            "Caption": "Total Accrued Interest",
                            "ReadOnly": true,
                            "Hidden": false,
                            "BasicType": "Float",
                            "UIType": "Currency",
                            "LinkTarget": "",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "TLIFailureRunNumber",
                            "Caption": "TLI Failure Run Number",
                            "ReadOnly": true,
                            "Hidden": true,
                            "BasicType": "Integer",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "TotalCashInGlobalCurrency",
                            "Caption": "Total Cash",
                            "ReadOnly": true,
                            "Hidden": false,
                            "BasicType": "Float",
                            "UIType": "Currency",
                            "LinkTarget": "",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "TotalCash",
                            "Caption": "Total Cash",
                            "ReadOnly": true,
                            "Hidden": false,
                            "BasicType": "Float",
                            "UIType": "Currency",
                            "LinkTarget": "",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "TLIFailureJobID",
                            "Caption": "TLI Failure Job ID",
                            "ReadOnly": true,
                            "Hidden": true,
                            "BasicType": "Integer",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "TieredBillingRate4",
                            "Caption": "Rate 4",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "PositiveFloat",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "TieredBillingRate3",
                            "Caption": "Rate 3",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "PositiveFloat",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "TieredBillingRate6",
                            "Caption": "Rate 6",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "PositiveFloat",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "TieredBillingRate5",
                            "Caption": "Rate 5",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "PositiveFloat",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "UseAverageCost",
                            "Caption": "Use Average Cost",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "Boolean",
                            "UIType": "CheckBox",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "1",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "URL",
                            "Caption": "Web Page",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "URL",
                            "LinkTarget": "",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "255",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "WithholdingTaxTypeID",
                            "Caption": "Withholding Tax Type",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "Integer",
                            "UIType": "List",
                            "LinkTarget": "",
                            "LinkFields": [
                                "WithholdingTaxTypeID"
                            ],
                            "ListValues": [
                                {
                                    "Data": "0",
                                    "Display": "(Use Settings)"
                                },
                                {
                                    "Data": "1",
                                    "Display": "Standard"
                                }
                            ],
                            "Validations": []
                        },
                        {
                            "Name": "WithholdingTaxTypeCode",
                            "Caption": "Withholding Tax Type Code",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "TotalTradableCashInGlobalCurrency",
                            "Caption": "Total Tradable Cash",
                            "ReadOnly": true,
                            "Hidden": false,
                            "BasicType": "Float",
                            "UIType": "Currency",
                            "LinkTarget": "",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "TotalMarketValueInGlobalCurrency",
                            "Caption": "Total Market Value",
                            "ReadOnly": true,
                            "Hidden": false,
                            "BasicType": "Float",
                            "UIType": "Currency",
                            "LinkTarget": "",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "TotalMarketValue",
                            "Caption": "Total Market Value",
                            "ReadOnly": true,
                            "Hidden": false,
                            "BasicType": "Float",
                            "UIType": "Currency",
                            "LinkTarget": "",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "TotalTradableCash",
                            "Caption": "Total Tradable Cash",
                            "ReadOnly": true,
                            "Hidden": false,
                            "BasicType": "Float",
                            "UIType": "Currency",
                            "LinkTarget": "",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "TotalMarketValueWithAccruedInterest",
                            "Caption": "Total Market Value With Accrued Interest",
                            "ReadOnly": true,
                            "Hidden": false,
                            "BasicType": "Float",
                            "UIType": "Currency",
                            "LinkTarget": "",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "TieredBillingBracket1",
                            "Caption": "Bracket 1",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "PositiveFloat",
                            "UIType": "Currency",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "TaxStatus",
                            "Caption": "Tax Status",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "List",
                            "LinkTarget": "",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [
                                {
                                    "Data": "",
                                    "Display": ""
                                },
                                {
                                    "Data": "Taxable",
                                    "Display": "Taxable"
                                },
                                {
                                    "Data": "Non-Taxable",
                                    "Display": "Non-Taxable"
                                }
                            ],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "72",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "TieredBillingBracket2",
                            "Caption": "Bracket 2",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "PositiveFloat",
                            "UIType": "Currency",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "TieredBillingBracket1From",
                            "Caption": "Bracket 1-From",
                            "ReadOnly": true,
                            "Hidden": false,
                            "BasicType": "Currency",
                            "UIType": "Currency",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "TaxRate",
                            "Caption": "Tax Rate",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "PositiveFloat",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "StartDate",
                            "Caption": "Start Date",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "Date",
                            "UIType": "Date",
                            "LinkTarget": "",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MinValue",
                                    "Value": "01021753",
                                    "SpecialErrorMessage": null
                                },
                                {
                                    "Type": "MaxValue",
                                    "Value": "12319999",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "ShowSecuritySymbol",
                            "Caption": "Security Symbol",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "List",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [
                                {
                                    "Data": "",
                                    "Display": "(Use Settings)"
                                },
                                {
                                    "Data": "y",
                                    "Display": "Show (12 characters)"
                                },
                                {
                                    "Data": "l",
                                    "Display": "Show (25 characters)"
                                },
                                {
                                    "Data": "n",
                                    "Display": "Hide"
                                }
                            ],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "1",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "TaxNumber",
                            "Caption": "Tax Number",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "16",
                                    "SpecialErrorMessage": null
                                },
                                {
                                    "Type": "RegularExpression",
                                    "Value": "^[\\p{IsBasicLatin}]*$",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "SyntheticIndexDesc",
                            "Caption": "Description",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "72",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "TieredBillingBracket5From",
                            "Caption": "Bracket 5-From",
                            "ReadOnly": true,
                            "Hidden": false,
                            "BasicType": "Currency",
                            "UIType": "Currency",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "TieredBillingBracket5",
                            "Caption": "Bracket 5",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "PositiveFloat",
                            "UIType": "Currency",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "TieredBillingRate2",
                            "Caption": "Rate 2",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "PositiveFloat",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "TieredBillingRate1",
                            "Caption": "Rate 1",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "PositiveFloat",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "TieredBillingBracket4From",
                            "Caption": "Bracket 4-From",
                            "ReadOnly": true,
                            "Hidden": false,
                            "BasicType": "Currency",
                            "UIType": "Currency",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "TieredBillingBracket3",
                            "Caption": "Bracket 3",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "PositiveFloat",
                            "UIType": "Currency",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "TieredBillingBracket2From",
                            "Caption": "Bracket 2-From",
                            "ReadOnly": true,
                            "Hidden": false,
                            "BasicType": "Currency",
                            "UIType": "Currency",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "TieredBillingBracket4",
                            "Caption": "Bracket 4",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "PositiveFloat",
                            "UIType": "Currency",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "TieredBillingBracket3From",
                            "Caption": "Bracket 3-From",
                            "ReadOnly": true,
                            "Hidden": false,
                            "BasicType": "Currency",
                            "UIType": "Currency",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "BrokerRepSymbol",
                            "Caption": "Broker Rep Symbol",
                            "ReadOnly": true,
                            "Hidden": true,
                            "BasicType": "String",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [
                                "BrokerRepID"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "12",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "BrokerRepName",
                            "Caption": "Default Broker Account Symbol",
                            "ReadOnly": true,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [
                                "BrokerRepID"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "12",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "CashSecTypeCode",
                            "Caption": "Cash SecType Code",
                            "ReadOnly": false,
                            "Hidden": true,
                            "BasicType": "String",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [
                                "CashSecTypeCode"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "4",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "CashSecType",
                            "Caption": "Default Cash Account Type",
                            "ReadOnly": true,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [
                                "CashSecTypeCode"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "4",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "BrokerRepID",
                            "Caption": "Default Broker Account Symbol",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "Integer",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [
                                "BrokerRepID"
                            ],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "BillingMethodCode",
                            "Caption": "Billing Method",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "List",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [
                                {
                                    "Data": "",
                                    "Display": "(Use Settings)"
                                },
                                {
                                    "Data": "t",
                                    "Display": "Tiered Billing"
                                },
                                {
                                    "Data": "f",
                                    "Display": "Flat Fee"
                                }
                            ],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "1",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "BillingContactID",
                            "Caption": "Contact ID",
                            "ReadOnly": false,
                            "Hidden": true,
                            "BasicType": "Integer",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [
                                "BillingContactID"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "10",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "BillingPhoneLabel",
                            "Caption": "Phone Label",
                            "ReadOnly": true,
                            "Hidden": true,
                            "BasicType": "String",
                            "UIType": "List",
                            "LinkTarget": "",
                            "LinkFields": [
                                "BillingPhoneID"
                            ],
                            "ListValues": [
                                {
                                    "Data": "Business",
                                    "Display": "Business"
                                },
                                {
                                    "Data": "Business 2",
                                    "Display": "Business 2"
                                },
                                {
                                    "Data": "Home",
                                    "Display": "Home"
                                },
                                {
                                    "Data": "Home 2",
                                    "Display": "Home 2"
                                },
                                {
                                    "Data": "Pager",
                                    "Display": "Pager"
                                },
                                {
                                    "Data": "Cellular",
                                    "Display": "Cellular"
                                },
                                {
                                    "Data": "Business Fax",
                                    "Display": "Business Fax"
                                },
                                {
                                    "Data": "Home Fax",
                                    "Display": "Home Fax"
                                },
                                {
                                    "Data": "Car",
                                    "Display": "Car"
                                },
                                {
                                    "Data": "Other",
                                    "Display": "Other"
                                },
                                {
                                    "Data": "Other Fax",
                                    "Display": "Other Fax"
                                },
                                {
                                    "Data": "Sig. Other Home",
                                    "Display": "Sig. Other Home"
                                },
                                {
                                    "Data": "Sig. Other Business",
                                    "Display": "Sig. Other Business"
                                },
                                {
                                    "Data": "Sig. Other Fax",
                                    "Display": "Sig. Other Fax"
                                },
                                {
                                    "Data": "Assistant",
                                    "Display": "Assistant"
                                },
                                {
                                    "Data": "TTY/TDD",
                                    "Display": "TTY/TDD"
                                },
                                {
                                    "Data": "Summer Home",
                                    "Display": "Summer Home"
                                },
                                {
                                    "Data": "Vacation Home",
                                    "Display": "Vacation Home"
                                },
                                {
                                    "Data": "Winter Home",
                                    "Display": "Winter Home"
                                }
                            ],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "16",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "BillingPhoneID",
                            "Caption": "Phone ID",
                            "ReadOnly": false,
                            "Hidden": true,
                            "BasicType": "Integer",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "DocumentLink",
                            "Caption": "Portfolio Folder",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "Path",
                            "LinkTarget": "",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "255",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "DefaultSettlementCurrencyCode",
                            "Caption": "Default Settlement Currency Code",
                            "ReadOnly": false,
                            "Hidden": true,
                            "BasicType": "String",
                            "UIType": "List",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [
                                {
                                    "Data": "ar",
                                    "Display": "Argentine Peso"
                                },
                                {
                                    "Data": "au",
                                    "Display": "Australian Dollar"
                                },
                                {
                                    "Data": "at",
                                    "Display": "Austrian Schilling"
                                },
                                {
                                    "Data": "be",
                                    "Display": "Belgian Franc"
                                },
                                {
                                    "Data": "br",
                                    "Display": "Brazilian Cruzeiro"
                                },
                                {
                                    "Data": "ca",
                                    "Display": "Canadian Dollar"
                                },
                                {
                                    "Data": "dk",
                                    "Display": "Danish Krone"
                                },
                                {
                                    "Data": "eg",
                                    "Display": "eg"
                                },
                                {
                                    "Data": "eu",
                                    "Display": "Euro Monetary Union"
                                },
                                {
                                    "Data": "xe",
                                    "Display": "European Currency Unit"
                                },
                                {
                                    "Data": "fi",
                                    "Display": "Finnish Markka"
                                },
                                {
                                    "Data": "fr",
                                    "Display": "French Franc"
                                },
                                {
                                    "Data": "de",
                                    "Display": "German Deutche Mark"
                                },
                                {
                                    "Data": "xa",
                                    "Display": "Gold"
                                },
                                {
                                    "Data": "gr",
                                    "Display": "gr"
                                },
                                {
                                    "Data": "hk",
                                    "Display": "Hong Kong Dollar"
                                },
                                {
                                    "Data": "hu",
                                    "Display": "hu"
                                },
                                {
                                    "Data": "in",
                                    "Display": "Indian Rupee"
                                },
                                {
                                    "Data": "id",
                                    "Display": "Indonesia Rupiah"
                                },
                                {
                                    "Data": "ie",
                                    "Display": "Irish Pound"
                                },
                                {
                                    "Data": "it",
                                    "Display": "Italian Lira"
                                },
                                {
                                    "Data": "jp",
                                    "Display": "Japanese Yen"
                                },
                                {
                                    "Data": "lu",
                                    "Display": "Luxembourg Franc"
                                },
                                {
                                    "Data": "my",
                                    "Display": "Malaysian Ringgit"
                                },
                                {
                                    "Data": "me",
                                    "Display": "Mexican Peso"
                                },
                                {
                                    "Data": "an",
                                    "Display": "Neatherlands Antillean Guilder"
                                },
                                {
                                    "Data": "nl",
                                    "Display": "Netherlands Guilder"
                                },
                                {
                                    "Data": "tw",
                                    "Display": "New Taiwan Dollar"
                                },
                                {
                                    "Data": "nz",
                                    "Display": "New Zealand Dollar"
                                },
                                {
                                    "Data": "no",
                                    "Display": "Norwegian Kroner"
                                },
                                {
                                    "Data": "pk",
                                    "Display": "Pakistan Rupee"
                                },
                                {
                                    "Data": "ph",
                                    "Display": "Philippine Peso"
                                },
                                {
                                    "Data": "pl",
                                    "Display": "Polish Zloty"
                                },
                                {
                                    "Data": "pt",
                                    "Display": "Portugal Escudo"
                                },
                                {
                                    "Data": "gb",
                                    "Display": "Pound Sterling"
                                },
                                {
                                    "Data": "ru",
                                    "Display": "Russian Ruble"
                                },
                                {
                                    "Data": "sa",
                                    "Display": "Saudia Arabia Riyal"
                                },
                                {
                                    "Data": "sg",
                                    "Display": "Singapore Dollar"
                                },
                                {
                                    "Data": "zz",
                                    "Display": "South African Rand"
                                },
                                {
                                    "Data": "kr",
                                    "Display": "South Korean Won"
                                },
                                {
                                    "Data": "es",
                                    "Display": "Spanish Peseta"
                                },
                                {
                                    "Data": "se",
                                    "Display": "Swedish Krona"
                                },
                                {
                                    "Data": "ch",
                                    "Display": "Swiss Franc"
                                },
                                {
                                    "Data": "th",
                                    "Display": "Thailand Baht"
                                },
                                {
                                    "Data": "tr",
                                    "Display": "tr"
                                },
                                {
                                    "Data": "us",
                                    "Display": "US Dollar"
                                },
                                {
                                    "Data": "vn",
                                    "Display": "vn"
                                },
                                {
                                    "Data": "cn",
                                    "Display": "Yuan Renminbi"
                                },
                                {
                                    "Data": "za",
                                    "Display": "za"
                                },
                                {
                                    "Data": "zw",
                                    "Display": "zw"
                                }
                            ],
                            "Validations": []
                        },
                        {
                            "Name": "FlatFee",
                            "Caption": "Flat Fee",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "PositiveFloat",
                            "UIType": "Currency",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "DomicileCountryCode",
                            "Caption": "Domicile Country",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "List",
                            "LinkTarget": "",
                            "LinkFields": [
                                "DomicileCountryCode"
                            ],
                            "ListValues": [
                                {
                                    "Data": "af",
                                    "Display": "Afghanistan"
                                },
                                {
                                    "Data": "ax",
                                    "Display": "�land Islands"
                                },
                                {
                                    "Data": "al",
                                    "Display": "Albania"
                                },
                                {
                                    "Data": "dz",
                                    "Display": "Algeria"
                                },
                                {
                                    "Data": "as",
                                    "Display": "American Samoa"
                                },
                                {
                                    "Data": "ad",
                                    "Display": "Andorra"
                                },
                                {
                                    "Data": "ao",
                                    "Display": "Angola"
                                },
                                {
                                    "Data": "ai",
                                    "Display": "Anguilla"
                                },
                                {
                                    "Data": "aq",
                                    "Display": "Antarctica"
                                },
                                {
                                    "Data": "ag",
                                    "Display": "Antigua and Barbuda"
                                },
                                {
                                    "Data": "ar",
                                    "Display": "Argentina"
                                },
                                {
                                    "Data": "am",
                                    "Display": "Armenia"
                                },
                                {
                                    "Data": "aw",
                                    "Display": "Aruba"
                                },
                                {
                                    "Data": "au",
                                    "Display": "Australia"
                                },
                                {
                                    "Data": "at",
                                    "Display": "Austria"
                                },
                                {
                                    "Data": "az",
                                    "Display": "Azerbaijan"
                                },
                                {
                                    "Data": "bs",
                                    "Display": "Bahamas"
                                },
                                {
                                    "Data": "bh",
                                    "Display": "Bahrain"
                                },
                                {
                                    "Data": "bd",
                                    "Display": "Bangladesh"
                                },
                                {
                                    "Data": "bb",
                                    "Display": "Barbados"
                                },
                                {
                                    "Data": "by",
                                    "Display": "Belarus"
                                },
                                {
                                    "Data": "be",
                                    "Display": "Belgian"
                                },
                                {
                                    "Data": "bz",
                                    "Display": "Belize"
                                },
                                {
                                    "Data": "bj",
                                    "Display": "Benin"
                                },
                                {
                                    "Data": "bm",
                                    "Display": "Bermuda"
                                },
                                {
                                    "Data": "bt",
                                    "Display": "Bhutan"
                                },
                                {
                                    "Data": "bo",
                                    "Display": "Bolivia"
                                },
                                {
                                    "Data": "ba",
                                    "Display": "Bosnia and Herzegovina"
                                },
                                {
                                    "Data": "bw",
                                    "Display": "Botswana"
                                },
                                {
                                    "Data": "bv",
                                    "Display": "Bouvet Island"
                                },
                                {
                                    "Data": "br",
                                    "Display": "Brazil"
                                },
                                {
                                    "Data": "io",
                                    "Display": "British Indian Ocean Territory"
                                },
                                {
                                    "Data": "bn",
                                    "Display": "Brunei Darussalam"
                                },
                                {
                                    "Data": "bg",
                                    "Display": "Bulgaria"
                                },
                                {
                                    "Data": "bf",
                                    "Display": "Burkina Faso"
                                },
                                {
                                    "Data": "bi",
                                    "Display": "Burundi"
                                },
                                {
                                    "Data": "kh",
                                    "Display": "Cambodia"
                                },
                                {
                                    "Data": "cm",
                                    "Display": "Cameroon"
                                },
                                {
                                    "Data": "ca",
                                    "Display": "Canada"
                                },
                                {
                                    "Data": "cv",
                                    "Display": "Cape Verde"
                                },
                                {
                                    "Data": "ky",
                                    "Display": "Cayman Islands"
                                },
                                {
                                    "Data": "cf",
                                    "Display": "Central African Republic"
                                },
                                {
                                    "Data": "td",
                                    "Display": "Chad"
                                },
                                {
                                    "Data": "cl",
                                    "Display": "Chile"
                                },
                                {
                                    "Data": "cx",
                                    "Display": "Christmas Island"
                                },
                                {
                                    "Data": "cc",
                                    "Display": "Cocos (Keeling) Islands"
                                },
                                {
                                    "Data": "co",
                                    "Display": "Colombia"
                                },
                                {
                                    "Data": "km",
                                    "Display": "Comoros"
                                },
                                {
                                    "Data": "cg",
                                    "Display": "Congo"
                                },
                                {
                                    "Data": "cd",
                                    "Display": "Congo, The Democratic Republic of the"
                                },
                                {
                                    "Data": "ck",
                                    "Display": "Cook Islands"
                                },
                                {
                                    "Data": "cr",
                                    "Display": "Costa Rica"
                                },
                                {
                                    "Data": "ci",
                                    "Display": "C�te d'Ivoire"
                                },
                                {
                                    "Data": "hr",
                                    "Display": "Croatia"
                                },
                                {
                                    "Data": "cu",
                                    "Display": "Cuba"
                                },
                                {
                                    "Data": "cy",
                                    "Display": "Cyprus"
                                },
                                {
                                    "Data": "cz",
                                    "Display": "Czech Republic"
                                },
                                {
                                    "Data": "dk",
                                    "Display": "Denmark"
                                },
                                {
                                    "Data": "dj",
                                    "Display": "Djibouti"
                                },
                                {
                                    "Data": "do",
                                    "Display": "Dominican Republic"
                                },
                                {
                                    "Data": "ec",
                                    "Display": "Ecuador"
                                },
                                {
                                    "Data": "eg",
                                    "Display": "Egypt"
                                },
                                {
                                    "Data": "sv",
                                    "Display": "El Salvador"
                                },
                                {
                                    "Data": "gq",
                                    "Display": "Equatorial Guinea"
                                },
                                {
                                    "Data": "er",
                                    "Display": "Eritrea"
                                },
                                {
                                    "Data": "ee",
                                    "Display": "Estonia"
                                },
                                {
                                    "Data": "et",
                                    "Display": "Ethiopia"
                                },
                                {
                                    "Data": "eu",
                                    "Display": "Euro"
                                },
                                {
                                    "Data": "xe",
                                    "Display": "Europe"
                                },
                                {
                                    "Data": "fk",
                                    "Display": "Falkland Islands (Malvinas)"
                                },
                                {
                                    "Data": "fo",
                                    "Display": "Faroe Islands"
                                },
                                {
                                    "Data": "fj",
                                    "Display": "Fiji"
                                },
                                {
                                    "Data": "fi",
                                    "Display": "Finland"
                                },
                                {
                                    "Data": "fr",
                                    "Display": "France"
                                },
                                {
                                    "Data": "gf",
                                    "Display": "French Guiana"
                                },
                                {
                                    "Data": "pf",
                                    "Display": "French Polynesia"
                                },
                                {
                                    "Data": "tf",
                                    "Display": "French Southern Territories"
                                },
                                {
                                    "Data": "ga",
                                    "Display": "Gabon"
                                },
                                {
                                    "Data": "gm",
                                    "Display": "Gambia"
                                },
                                {
                                    "Data": "ge",
                                    "Display": "Georgia"
                                },
                                {
                                    "Data": "de",
                                    "Display": "Germany"
                                },
                                {
                                    "Data": "gh",
                                    "Display": "Ghana"
                                },
                                {
                                    "Data": "gi",
                                    "Display": "Gibraltar"
                                },
                                {
                                    "Data": "xa",
                                    "Display": "Gold"
                                },
                                {
                                    "Data": "gb",
                                    "Display": "Great Britain"
                                },
                                {
                                    "Data": "gr",
                                    "Display": "Greece"
                                },
                                {
                                    "Data": "gl",
                                    "Display": "Greenland"
                                },
                                {
                                    "Data": "gd",
                                    "Display": "Grenada"
                                },
                                {
                                    "Data": "gp",
                                    "Display": "Guadeloupe"
                                },
                                {
                                    "Data": "gu",
                                    "Display": "Guam"
                                },
                                {
                                    "Data": "gt",
                                    "Display": "Guatemala"
                                },
                                {
                                    "Data": "gn",
                                    "Display": "Guinea"
                                },
                                {
                                    "Data": "gw",
                                    "Display": "Guinea-Bissau"
                                },
                                {
                                    "Data": "gy",
                                    "Display": "Guyana"
                                },
                                {
                                    "Data": "ht",
                                    "Display": "Haiti"
                                },
                                {
                                    "Data": "hm",
                                    "Display": "Herd Island and McDonald Islands"
                                },
                                {
                                    "Data": "va",
                                    "Display": "Holy See (Vatican City State)"
                                },
                                {
                                    "Data": "hn",
                                    "Display": "Honduras"
                                },
                                {
                                    "Data": "hk",
                                    "Display": "Hong Kong"
                                },
                                {
                                    "Data": "hu",
                                    "Display": "Hungary"
                                },
                                {
                                    "Data": "is",
                                    "Display": "Iceland"
                                },
                                {
                                    "Data": "in",
                                    "Display": "India"
                                },
                                {
                                    "Data": "id",
                                    "Display": "Indonesia"
                                },
                                {
                                    "Data": "ir",
                                    "Display": "Iran (Islamic Republic of)"
                                },
                                {
                                    "Data": "iq",
                                    "Display": "Iraq"
                                },
                                {
                                    "Data": "ie",
                                    "Display": "Ireland"
                                },
                                {
                                    "Data": "il",
                                    "Display": "Israel"
                                },
                                {
                                    "Data": "it",
                                    "Display": "Italy"
                                },
                                {
                                    "Data": "jm",
                                    "Display": "Jamaica"
                                },
                                {
                                    "Data": "jp",
                                    "Display": "Japan"
                                },
                                {
                                    "Data": "jo",
                                    "Display": "Jordan"
                                },
                                {
                                    "Data": "kz",
                                    "Display": "Kazakhstan"
                                },
                                {
                                    "Data": "ke",
                                    "Display": "Kenya"
                                },
                                {
                                    "Data": "ki",
                                    "Display": "Kiribati"
                                },
                                {
                                    "Data": "kp",
                                    "Display": "Korea (Democratic People's Rep. of)"
                                },
                                {
                                    "Data": "kw",
                                    "Display": "Kuwait"
                                },
                                {
                                    "Data": "kg",
                                    "Display": "Kyrgyzstan"
                                },
                                {
                                    "Data": "la",
                                    "Display": "Lao People's Democratic Republic"
                                },
                                {
                                    "Data": "lv",
                                    "Display": "Latvia"
                                },
                                {
                                    "Data": "lb",
                                    "Display": "Lebanon"
                                },
                                {
                                    "Data": "ls",
                                    "Display": "Lesotho"
                                },
                                {
                                    "Data": "lr",
                                    "Display": "Liberia"
                                },
                                {
                                    "Data": "ly",
                                    "Display": "Libyan Arab Jamahiriya"
                                },
                                {
                                    "Data": "li",
                                    "Display": "Liechtenstein"
                                },
                                {
                                    "Data": "lt",
                                    "Display": "Lithuania"
                                },
                                {
                                    "Data": "lu",
                                    "Display": "Luxembourg"
                                },
                                {
                                    "Data": "mo",
                                    "Display": "Macau"
                                },
                                {
                                    "Data": "mk",
                                    "Display": "Macedonia"
                                },
                                {
                                    "Data": "mg",
                                    "Display": "Madagascar"
                                },
                                {
                                    "Data": "mw",
                                    "Display": "Malawi"
                                },
                                {
                                    "Data": "my",
                                    "Display": "Malaysia"
                                },
                                {
                                    "Data": "mv",
                                    "Display": "Maldives"
                                },
                                {
                                    "Data": "ml",
                                    "Display": "Mali"
                                },
                                {
                                    "Data": "mt",
                                    "Display": "Malta"
                                },
                                {
                                    "Data": "mh",
                                    "Display": "Marshall Islands"
                                },
                                {
                                    "Data": "mq",
                                    "Display": "Martinique"
                                },
                                {
                                    "Data": "mr",
                                    "Display": "Mauritania"
                                },
                                {
                                    "Data": "mu",
                                    "Display": "Mauritius"
                                },
                                {
                                    "Data": "yt",
                                    "Display": "Mayotte"
                                },
                                {
                                    "Data": "mx",
                                    "Display": "Mexico"
                                },
                                {
                                    "Data": "fm",
                                    "Display": "Micronesia, Federated States of"
                                },
                                {
                                    "Data": "md",
                                    "Display": "Moldova, Republic of"
                                },
                                {
                                    "Data": "mc",
                                    "Display": "Monaco"
                                },
                                {
                                    "Data": "mn",
                                    "Display": "Mongolia"
                                },
                                {
                                    "Data": "me",
                                    "Display": "Montenegro"
                                },
                                {
                                    "Data": "ms",
                                    "Display": "Montserrat"
                                },
                                {
                                    "Data": "ma",
                                    "Display": "Morocco"
                                },
                                {
                                    "Data": "mz",
                                    "Display": "Mozambique"
                                },
                                {
                                    "Data": "mm",
                                    "Display": "Myanmar"
                                },
                                {
                                    "Data": "na",
                                    "Display": "Namibia"
                                },
                                {
                                    "Data": "nr",
                                    "Display": "Nauru"
                                },
                                {
                                    "Data": "np",
                                    "Display": "Nepal"
                                },
                                {
                                    "Data": "nl",
                                    "Display": "Netherlands"
                                },
                                {
                                    "Data": "an",
                                    "Display": "Netherlands Antillean"
                                },
                                {
                                    "Data": "nc",
                                    "Display": "New Caledonia"
                                },
                                {
                                    "Data": "nz",
                                    "Display": "New Zealand"
                                },
                                {
                                    "Data": "ni",
                                    "Display": "Nicaragua"
                                },
                                {
                                    "Data": "ne",
                                    "Display": "Niger"
                                },
                                {
                                    "Data": "ng",
                                    "Display": "Nigeria"
                                },
                                {
                                    "Data": "nu",
                                    "Display": "Niue"
                                },
                                {
                                    "Data": "nf",
                                    "Display": "Norfolk Island"
                                },
                                {
                                    "Data": "mp",
                                    "Display": "Northern Mariana Islands"
                                },
                                {
                                    "Data": "no",
                                    "Display": "Norway"
                                },
                                {
                                    "Data": "",
                                    "Display": "(Use Settings)"
                                },
                                {
                                    "Data": "om",
                                    "Display": "Oman"
                                },
                                {
                                    "Data": "pk",
                                    "Display": "Pakistan"
                                },
                                {
                                    "Data": "pw",
                                    "Display": "Palau"
                                },
                                {
                                    "Data": "ps",
                                    "Display": "Palestinian Territory, Occupied"
                                },
                                {
                                    "Data": "pa",
                                    "Display": "Panama"
                                },
                                {
                                    "Data": "pg",
                                    "Display": "Papua New Guinea"
                                },
                                {
                                    "Data": "py",
                                    "Display": "Paraguay"
                                },
                                {
                                    "Data": "pb",
                                    "Display": "pb"
                                },
                                {
                                    "Data": "pe",
                                    "Display": "Peru"
                                },
                                {
                                    "Data": "ph",
                                    "Display": "Philipines"
                                },
                                {
                                    "Data": "pn",
                                    "Display": "Pitcairn"
                                },
                                {
                                    "Data": "pl",
                                    "Display": "Poland"
                                },
                                {
                                    "Data": "pt",
                                    "Display": "Portugal"
                                },
                                {
                                    "Data": "pr",
                                    "Display": "Puerto Rico"
                                },
                                {
                                    "Data": "qa",
                                    "Display": "Qatar"
                                },
                                {
                                    "Data": "re",
                                    "Display": "R�union"
                                },
                                {
                                    "Data": "ro",
                                    "Display": "Romania"
                                },
                                {
                                    "Data": "ru",
                                    "Display": "Russia"
                                },
                                {
                                    "Data": "rw",
                                    "Display": "Rwanda"
                                },
                                {
                                    "Data": "sh",
                                    "Display": "Saint Helena"
                                },
                                {
                                    "Data": "kn",
                                    "Display": "Saint Kitts and Nevis"
                                },
                                {
                                    "Data": "lc",
                                    "Display": "Saint Lucia"
                                },
                                {
                                    "Data": "pm",
                                    "Display": "Saint Pierre and Miquelon"
                                },
                                {
                                    "Data": "vc",
                                    "Display": "Saint Vincent and the Grenadines"
                                },
                                {
                                    "Data": "ws",
                                    "Display": "Samoa"
                                },
                                {
                                    "Data": "sm",
                                    "Display": "San Marino"
                                },
                                {
                                    "Data": "st",
                                    "Display": "Sao Tome and Principe"
                                },
                                {
                                    "Data": "sa",
                                    "Display": "Saudi Arabia"
                                },
                                {
                                    "Data": "sn",
                                    "Display": "Senegal"
                                },
                                {
                                    "Data": "rs",
                                    "Display": "Serbia"
                                },
                                {
                                    "Data": "sc",
                                    "Display": "Seychelles"
                                },
                                {
                                    "Data": "sl",
                                    "Display": "Sierra Leone"
                                },
                                {
                                    "Data": "sg",
                                    "Display": "Singapore"
                                },
                                {
                                    "Data": "sk",
                                    "Display": "Slovakia"
                                },
                                {
                                    "Data": "si",
                                    "Display": "Slovenia"
                                },
                                {
                                    "Data": "sb",
                                    "Display": "Solomon Islands"
                                },
                                {
                                    "Data": "so",
                                    "Display": "Somalia"
                                },
                                {
                                    "Data": "za",
                                    "Display": "South Africa"
                                },
                                {
                                    "Data": "gs",
                                    "Display": "South Georgia and the South Sandwich Islands"
                                },
                                {
                                    "Data": "kr",
                                    "Display": "South Korea"
                                },
                                {
                                    "Data": "es",
                                    "Display": "Spain"
                                },
                                {
                                    "Data": "lk",
                                    "Display": "Sri Lanka"
                                },
                                {
                                    "Data": "sd",
                                    "Display": "Sudan"
                                },
                                {
                                    "Data": "sr",
                                    "Display": "Suriname"
                                },
                                {
                                    "Data": "sj",
                                    "Display": "Svalbard and Jan Mayen"
                                },
                                {
                                    "Data": "sz",
                                    "Display": "Swaziland"
                                },
                                {
                                    "Data": "se",
                                    "Display": "Sweden"
                                },
                                {
                                    "Data": "ch",
                                    "Display": "Switzerland"
                                },
                                {
                                    "Data": "sy",
                                    "Display": "Syrian Arab Republic"
                                },
                                {
                                    "Data": "tw",
                                    "Display": "Taiwan"
                                },
                                {
                                    "Data": "tj",
                                    "Display": "Tajikistan"
                                },
                                {
                                    "Data": "tz",
                                    "Display": "Tanzania, United Republic of"
                                },
                                {
                                    "Data": "th",
                                    "Display": "Thailand"
                                },
                                {
                                    "Data": "tl",
                                    "Display": "Timor-Leste"
                                },
                                {
                                    "Data": "tg",
                                    "Display": "Togo"
                                },
                                {
                                    "Data": "tk",
                                    "Display": "Tokelau"
                                },
                                {
                                    "Data": "to",
                                    "Display": "Tonga"
                                },
                                {
                                    "Data": "tt",
                                    "Display": "Trinidad and Tobago"
                                },
                                {
                                    "Data": "tn",
                                    "Display": "Tunisia"
                                },
                                {
                                    "Data": "tr",
                                    "Display": "Turkey"
                                },
                                {
                                    "Data": "tm",
                                    "Display": "Turkmenistan"
                                },
                                {
                                    "Data": "tc",
                                    "Display": "Turks and Caicos Islands"
                                },
                                {
                                    "Data": "tv",
                                    "Display": "Tuvalu"
                                },
                                {
                                    "Data": "ug",
                                    "Display": "Uganda"
                                },
                                {
                                    "Data": "ua",
                                    "Display": "Ukraine"
                                },
                                {
                                    "Data": "ae",
                                    "Display": "United Arab Emirates"
                                },
                                {
                                    "Data": "us",
                                    "Display": "United States"
                                },
                                {
                                    "Data": "um",
                                    "Display": "United States Minor Outlying Islands"
                                },
                                {
                                    "Data": "uy",
                                    "Display": "Uruguay"
                                },
                                {
                                    "Data": "uz",
                                    "Display": "Uzbekistan"
                                },
                                {
                                    "Data": "vu",
                                    "Display": "Vanuatu"
                                },
                                {
                                    "Data": "ve",
                                    "Display": "Venezuela"
                                },
                                {
                                    "Data": "vn",
                                    "Display": "Viet Nam"
                                },
                                {
                                    "Data": "vg",
                                    "Display": "Virgin Islands, British"
                                },
                                {
                                    "Data": "vi",
                                    "Display": "Virgin Islands, U.S."
                                },
                                {
                                    "Data": "wf",
                                    "Display": "Wallis and Futuna"
                                },
                                {
                                    "Data": "eh",
                                    "Display": "Western Sahara"
                                },
                                {
                                    "Data": "ye",
                                    "Display": "Yemen"
                                },
                                {
                                    "Data": "cn",
                                    "Display": "Yuan"
                                },
                                {
                                    "Data": "zm",
                                    "Display": "Zambia"
                                },
                                {
                                    "Data": "zw",
                                    "Display": "Zimbabwe"
                                }
                            ],
                            "Validations": []
                        },
                        {
                            "Name": "CustodianID",
                            "Caption": "Custodian",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "Integer",
                            "UIType": "List",
                            "LinkTarget": "",
                            "LinkFields": [
                                "CustodianID"
                            ],
                            "ListValues": [
                                {
                                    "Data": "0",
                                    "Display": "(Use Settings)"
                                },
                                {
                                    "Data": "40",
                                    "Display": "Bank of America"
                                },
                                {
                                    "Data": "20",
                                    "Display": "Bear Stearns"
                                },
                                {
                                    "Data": "15",
                                    "Display": "BONY"
                                },
                                {
                                    "Data": "35",
                                    "Display": "Charles Schwab"
                                },
                                {
                                    "Data": "10",
                                    "Display": "Chase Manhattan"
                                },
                                {
                                    "Data": "50",
                                    "Display": "Citibank"
                                },
                                {
                                    "Data": "55",
                                    "Display": "Citibank (55)"
                                },
                                {
                                    "Data": "60",
                                    "Display": "Merrill Lynch"
                                },
                                {
                                    "Data": "-2",
                                    "Display": "Not Classified"
                                },
                                {
                                    "Data": "30",
                                    "Display": "Paine Webber"
                                },
                                {
                                    "Data": "25",
                                    "Display": "State Street"
                                }
                            ],
                            "Validations": []
                        },
                        {
                            "Name": "CashSecuritySymbol",
                            "Caption": "Default Cash Account Symbol",
                            "ReadOnly": true,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [
                                "CashSecurityID"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "25",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "CashSecurityID",
                            "Caption": "Cash Security ID",
                            "ReadOnly": false,
                            "Hidden": true,
                            "BasicType": "Integer",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [
                                "CashSecurityID"
                            ],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "ClosingMethodCode",
                            "Caption": "Current Closing Method",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "List",
                            "LinkTarget": "",
                            "LinkFields": [
                                "ClosingMethodCode"
                            ],
                            "ListValues": [
                                {
                                    "Data": "",
                                    "Display": "(Use Settings)"
                                },
                                {
                                    "Data": "s",
                                    "Display": "Specify"
                                },
                                {
                                    "Data": "f",
                                    "Display": "FIFO"
                                },
                                {
                                    "Data": "l",
                                    "Display": "LIFO"
                                },
                                {
                                    "Data": "h",
                                    "Display": "Highest Cost"
                                },
                                {
                                    "Data": "c",
                                    "Display": "Lowest Cost"
                                },
                                {
                                    "Data": "m",
                                    "Display": "Minimum Short Term Gain"
                                },
                                {
                                    "Data": "g",
                                    "Display": "Average Cost"
                                },
                                {
                                    "Data": "v",
                                    "Display": "Average Cost FIFO"
                                },
                                {
                                    "Data": "y",
                                    "Display": "Long Term Highest Cost"
                                }
                            ],
                            "Validations": []
                        },
                        {
                            "Name": "CloseDate",
                            "Caption": "Close Date",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "Date",
                            "UIType": "Date",
                            "LinkTarget": "",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MinValue",
                                    "Value": "01021753",
                                    "SpecialErrorMessage": null
                                },
                                {
                                    "Type": "MaxValue",
                                    "Value": "12319999",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "AverageCostCode",
                            "Caption": "Average Cost Code",
                            "ReadOnly": true,
                            "Hidden": true,
                            "BasicType": "String",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [
                                "ClosingMethodCode"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "1",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "AuditEventID",
                            "Caption": "Max Audit Event ID",
                            "ReadOnly": true,
                            "Hidden": true,
                            "BasicType": "Integer",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "BankAddressLabel",
                            "Caption": "Address Label",
                            "ReadOnly": true,
                            "Hidden": true,
                            "BasicType": "String",
                            "UIType": "List",
                            "LinkTarget": "",
                            "LinkFields": [
                                "BankAddressID"
                            ],
                            "ListValues": [
                                {
                                    "Data": "Business",
                                    "Display": "Business"
                                },
                                {
                                    "Data": "Home",
                                    "Display": "Home"
                                },
                                {
                                    "Data": "Vacation Home",
                                    "Display": "Vacation Home"
                                },
                                {
                                    "Data": "Summer Home",
                                    "Display": "Summer Home"
                                },
                                {
                                    "Data": "Winter Home",
                                    "Display": "Winter Home"
                                },
                                {
                                    "Data": "Business 2",
                                    "Display": "Business 2"
                                },
                                {
                                    "Data": "Home 2",
                                    "Display": "Home 2"
                                },
                                {
                                    "Data": "Other",
                                    "Display": "Other"
                                },
                                {
                                    "Data": "Sig. Other",
                                    "Display": "Sig. Other"
                                },
                                {
                                    "Data": "None",
                                    "Display": "None"
                                }
                            ],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "16",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "BankAddressID",
                            "Caption": "Address ID",
                            "ReadOnly": false,
                            "Hidden": true,
                            "BasicType": "Integer",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "AddToMasterGroup",
                            "Caption": "Add To Master Group",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "Boolean",
                            "UIType": "CheckBox",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "AccruedInterestPMCode",
                            "Caption": "PM Code",
                            "ReadOnly": true,
                            "Hidden": true,
                            "BasicType": "String",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [
                                "AccruedInterestID"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "1",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "AccruedInterestID",
                            "Caption": "Accrued Interest",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "Integer",
                            "UIType": "List",
                            "LinkTarget": "",
                            "LinkFields": [
                                "AccruedInterestID"
                            ],
                            "ListValues": [
                                {
                                    "Data": "0",
                                    "Display": "(Use Settings)"
                                },
                                {
                                    "Data": "1",
                                    "Display": "Do not Show on Reports"
                                },
                                {
                                    "Data": "2",
                                    "Display": "All Reports as of Trade Date AM"
                                },
                                {
                                    "Data": "3",
                                    "Display": "All Reports as of Trade Date PM"
                                },
                                {
                                    "Data": "4",
                                    "Display": "All Reports as of Settle Date AM"
                                },
                                {
                                    "Data": "5",
                                    "Display": "All Reports as of Settle Date PM"
                                },
                                {
                                    "Data": "10",
                                    "Display": "All Reports as of Trade Date AM with Traded PA/SA"
                                },
                                {
                                    "Data": "11",
                                    "Display": "All Reports as of Trade Date PM with Traded PA/SA"
                                },
                                {
                                    "Data": "6",
                                    "Display": "Performance Reports as of Trade Date AM"
                                },
                                {
                                    "Data": "7",
                                    "Display": "Performance Reports as of Trade Date PM"
                                },
                                {
                                    "Data": "8",
                                    "Display": "Performance Reports as of Settle Date AM"
                                },
                                {
                                    "Data": "9",
                                    "Display": "Performance Reports as of Settle Date PM"
                                },
                                {
                                    "Data": "12",
                                    "Display": "Performance Reports as of Trade Date AM with Traded PA/SA"
                                },
                                {
                                    "Data": "13",
                                    "Display": "Performance Reports as of Trade Date PM with Traded PA/SA"
                                }
                            ],
                            "Validations": []
                        },
                        {
                            "Name": "AccruedInterestTDCode",
                            "Caption": "TD Code",
                            "ReadOnly": true,
                            "Hidden": true,
                            "BasicType": "String",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [
                                "AccruedInterestID"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "1",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "AccruedInterestShowCode",
                            "Caption": "Show Code",
                            "ReadOnly": true,
                            "Hidden": true,
                            "BasicType": "String",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [
                                "AccruedInterestID"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "1",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "BillingAddressID",
                            "Caption": "Address ID",
                            "ReadOnly": false,
                            "Hidden": true,
                            "BasicType": "Integer",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "BillInArrears",
                            "Caption": "Billing Style",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "BooleanWithBlank",
                            "UIType": "List",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [
                                {
                                    "Data": "1",
                                    "Display": "Arrears"
                                },
                                {
                                    "Data": "0",
                                    "Display": "Advance"
                                }
                            ],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "1",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "BillingContactCode",
                            "Caption": "Contact Code",
                            "ReadOnly": true,
                            "Hidden": true,
                            "BasicType": "String",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [
                                "BillingContactID"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "32",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "BillingAddressLabel",
                            "Caption": "Address Label",
                            "ReadOnly": true,
                            "Hidden": true,
                            "BasicType": "String",
                            "UIType": "List",
                            "LinkTarget": "",
                            "LinkFields": [
                                "BillingAddressID"
                            ],
                            "ListValues": [
                                {
                                    "Data": "Business",
                                    "Display": "Business"
                                },
                                {
                                    "Data": "Home",
                                    "Display": "Home"
                                },
                                {
                                    "Data": "Vacation Home",
                                    "Display": "Vacation Home"
                                },
                                {
                                    "Data": "Summer Home",
                                    "Display": "Summer Home"
                                },
                                {
                                    "Data": "Winter Home",
                                    "Display": "Winter Home"
                                },
                                {
                                    "Data": "Business 2",
                                    "Display": "Business 2"
                                },
                                {
                                    "Data": "Home 2",
                                    "Display": "Home 2"
                                },
                                {
                                    "Data": "Other",
                                    "Display": "Other"
                                },
                                {
                                    "Data": "Sig. Other",
                                    "Display": "Sig. Other"
                                },
                                {
                                    "Data": "None",
                                    "Display": "None"
                                }
                            ],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "16",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "BaseCurrencyCode",
                            "Caption": "Base Currency",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "List",
                            "LinkTarget": "",
                            "LinkFields": [
                                "BaseCurrencyCode"
                            ],
                            "ListValues": [
                                {
                                    "Data": "",
                                    "Display": "(Use Settings)"
                                },
                                {
                                    "Data": "ar",
                                    "Display": "Argentine Peso"
                                },
                                {
                                    "Data": "au",
                                    "Display": "Australian Dollar"
                                },
                                {
                                    "Data": "at",
                                    "Display": "Austrian Schilling"
                                },
                                {
                                    "Data": "be",
                                    "Display": "Belgian Franc"
                                },
                                {
                                    "Data": "br",
                                    "Display": "Brazilian Cruzeiro"
                                },
                                {
                                    "Data": "ca",
                                    "Display": "Canadian Dollar"
                                },
                                {
                                    "Data": "dk",
                                    "Display": "Danish Krone"
                                },
                                {
                                    "Data": "eg",
                                    "Display": "eg"
                                },
                                {
                                    "Data": "eu",
                                    "Display": "Euro Monetary Union"
                                },
                                {
                                    "Data": "xe",
                                    "Display": "European Currency Unit"
                                },
                                {
                                    "Data": "fi",
                                    "Display": "Finnish Markka"
                                },
                                {
                                    "Data": "fr",
                                    "Display": "French Franc"
                                },
                                {
                                    "Data": "de",
                                    "Display": "German Deutche Mark"
                                },
                                {
                                    "Data": "xa",
                                    "Display": "Gold"
                                },
                                {
                                    "Data": "gr",
                                    "Display": "gr"
                                },
                                {
                                    "Data": "hk",
                                    "Display": "Hong Kong Dollar"
                                },
                                {
                                    "Data": "hu",
                                    "Display": "hu"
                                },
                                {
                                    "Data": "in",
                                    "Display": "Indian Rupee"
                                },
                                {
                                    "Data": "id",
                                    "Display": "Indonesia Rupiah"
                                },
                                {
                                    "Data": "ie",
                                    "Display": "Irish Pound"
                                },
                                {
                                    "Data": "it",
                                    "Display": "Italian Lira"
                                },
                                {
                                    "Data": "jp",
                                    "Display": "Japanese Yen"
                                },
                                {
                                    "Data": "lu",
                                    "Display": "Luxembourg Franc"
                                },
                                {
                                    "Data": "my",
                                    "Display": "Malaysian Ringgit"
                                },
                                {
                                    "Data": "me",
                                    "Display": "Mexican Peso"
                                },
                                {
                                    "Data": "an",
                                    "Display": "Neatherlands Antillean Guilder"
                                },
                                {
                                    "Data": "nl",
                                    "Display": "Netherlands Guilder"
                                },
                                {
                                    "Data": "tw",
                                    "Display": "New Taiwan Dollar"
                                },
                                {
                                    "Data": "nz",
                                    "Display": "New Zealand Dollar"
                                },
                                {
                                    "Data": "no",
                                    "Display": "Norwegian Kroner"
                                },
                                {
                                    "Data": "pk",
                                    "Display": "Pakistan Rupee"
                                },
                                {
                                    "Data": "ph",
                                    "Display": "Philippine Peso"
                                },
                                {
                                    "Data": "pl",
                                    "Display": "Polish Zloty"
                                },
                                {
                                    "Data": "pt",
                                    "Display": "Portugal Escudo"
                                },
                                {
                                    "Data": "gb",
                                    "Display": "Pound Sterling"
                                },
                                {
                                    "Data": "ru",
                                    "Display": "Russian Ruble"
                                },
                                {
                                    "Data": "sa",
                                    "Display": "Saudia Arabia Riyal"
                                },
                                {
                                    "Data": "sg",
                                    "Display": "Singapore Dollar"
                                },
                                {
                                    "Data": "zz",
                                    "Display": "South African Rand"
                                },
                                {
                                    "Data": "kr",
                                    "Display": "South Korean Won"
                                },
                                {
                                    "Data": "es",
                                    "Display": "Spanish Peseta"
                                },
                                {
                                    "Data": "se",
                                    "Display": "Swedish Krona"
                                },
                                {
                                    "Data": "ch",
                                    "Display": "Swiss Franc"
                                },
                                {
                                    "Data": "th",
                                    "Display": "Thailand Baht"
                                },
                                {
                                    "Data": "tr",
                                    "Display": "tr"
                                },
                                {
                                    "Data": "us",
                                    "Display": "US Dollar"
                                },
                                {
                                    "Data": "vn",
                                    "Display": "vn"
                                },
                                {
                                    "Data": "cn",
                                    "Display": "Yuan Renminbi"
                                },
                                {
                                    "Data": "za",
                                    "Display": "za"
                                },
                                {
                                    "Data": "zw",
                                    "Display": "zw"
                                }
                            ],
                            "Validations": []
                        },
                        {
                            "Name": "BankContactID",
                            "Caption": "Contact ID",
                            "ReadOnly": false,
                            "Hidden": true,
                            "BasicType": "Integer",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [
                                "BankContactID"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "10",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "BankContactCode",
                            "Caption": "Contact Code",
                            "ReadOnly": true,
                            "Hidden": true,
                            "BasicType": "String",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [
                                "BankContactID"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "32",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "BankPhoneLabel",
                            "Caption": "Phone Label",
                            "ReadOnly": true,
                            "Hidden": true,
                            "BasicType": "String",
                            "UIType": "List",
                            "LinkTarget": "",
                            "LinkFields": [
                                "BankPhoneID"
                            ],
                            "ListValues": [
                                {
                                    "Data": "Business",
                                    "Display": "Business"
                                },
                                {
                                    "Data": "Business 2",
                                    "Display": "Business 2"
                                },
                                {
                                    "Data": "Home",
                                    "Display": "Home"
                                },
                                {
                                    "Data": "Home 2",
                                    "Display": "Home 2"
                                },
                                {
                                    "Data": "Pager",
                                    "Display": "Pager"
                                },
                                {
                                    "Data": "Cellular",
                                    "Display": "Cellular"
                                },
                                {
                                    "Data": "Business Fax",
                                    "Display": "Business Fax"
                                },
                                {
                                    "Data": "Home Fax",
                                    "Display": "Home Fax"
                                },
                                {
                                    "Data": "Car",
                                    "Display": "Car"
                                },
                                {
                                    "Data": "Other",
                                    "Display": "Other"
                                },
                                {
                                    "Data": "Other Fax",
                                    "Display": "Other Fax"
                                },
                                {
                                    "Data": "Sig. Other Home",
                                    "Display": "Sig. Other Home"
                                },
                                {
                                    "Data": "Sig. Other Business",
                                    "Display": "Sig. Other Business"
                                },
                                {
                                    "Data": "Sig. Other Fax",
                                    "Display": "Sig. Other Fax"
                                },
                                {
                                    "Data": "Assistant",
                                    "Display": "Assistant"
                                },
                                {
                                    "Data": "TTY/TDD",
                                    "Display": "TTY/TDD"
                                },
                                {
                                    "Data": "Summer Home",
                                    "Display": "Summer Home"
                                },
                                {
                                    "Data": "Vacation Home",
                                    "Display": "Vacation Home"
                                },
                                {
                                    "Data": "Winter Home",
                                    "Display": "Winter Home"
                                }
                            ],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "16",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "BankPhoneID",
                            "Caption": "Bank Phone ID",
                            "ReadOnly": false,
                            "Hidden": true,
                            "BasicType": "Integer",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "FootNoteLine1",
                            "Caption": "Footnote Line 1",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "72",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "OwnerContactID",
                            "Caption": "Primary Owner",
                            "ReadOnly": false,
                            "Hidden": true,
                            "BasicType": "Integer",
                            "UIType": "LookupWidget",
                            "LinkTarget": "",
                            "LinkFields": [
                                "OwnerContactID"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "10",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "OwnerContactCode",
                            "Caption": "Primary Owner Code",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [
                                "OwnerContactID"
                            ],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "OwnerContactPhoneID",
                            "Caption": "Primary Owner Phone ID",
                            "ReadOnly": false,
                            "Hidden": true,
                            "BasicType": "Integer",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "OwnerContactName",
                            "Caption": "Primary Owner",
                            "ReadOnly": true,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "Hyperlink",
                            "LinkTarget": "ContactDetail.aspx?linkfield={0}",
                            "LinkFields": [
                                "OwnerContactID"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "255",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "OwnerContactAddressLabel",
                            "Caption": "Primary Owner Address Label",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "List",
                            "LinkTarget": "",
                            "LinkFields": [
                                "OwnerContactAddressID"
                            ],
                            "ListValues": [
                                {
                                    "Data": "Business",
                                    "Display": "Business"
                                },
                                {
                                    "Data": "Home",
                                    "Display": "Home"
                                },
                                {
                                    "Data": "Vacation Home",
                                    "Display": "Vacation Home"
                                },
                                {
                                    "Data": "Summer Home",
                                    "Display": "Summer Home"
                                },
                                {
                                    "Data": "Winter Home",
                                    "Display": "Winter Home"
                                },
                                {
                                    "Data": "Business 2",
                                    "Display": "Business 2"
                                },
                                {
                                    "Data": "Home 2",
                                    "Display": "Home 2"
                                },
                                {
                                    "Data": "Other",
                                    "Display": "Other"
                                },
                                {
                                    "Data": "Sig. Other",
                                    "Display": "Sig. Other"
                                },
                                {
                                    "Data": "None",
                                    "Display": "None"
                                }
                            ],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "16",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "OwnerClassID",
                            "Caption": "Owner ClassID",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "Integer",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "NumOfCopies",
                            "Caption": "Number Of Copies",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "Integer",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MinValue",
                                    "Value": "0",
                                    "SpecialErrorMessage": null
                                },
                                {
                                    "Type": "MaxValue",
                                    "Value": "999",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "OwnerContactAddressID",
                            "Caption": "Primary Owner Address ID",
                            "ReadOnly": false,
                            "Hidden": true,
                            "BasicType": "Integer",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "OwnerCode",
                            "Caption": "Owned By Code",
                            "ReadOnly": true,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [
                                "OwnerID"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "32",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "PerfCloseDate",
                            "Caption": "Performance Close Date",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "Date",
                            "UIType": "Date",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MinValue",
                                    "Value": "01021753",
                                    "SpecialErrorMessage": null
                                },
                                {
                                    "Type": "MaxValue",
                                    "Value": "12319999",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "PaymentFrequencyID",
                            "Caption": "Payment Frequency",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "Integer",
                            "UIType": "List",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [
                                {
                                    "Data": "1",
                                    "Display": "Annual"
                                },
                                {
                                    "Data": "2",
                                    "Display": "Semiannual"
                                },
                                {
                                    "Data": "4",
                                    "Display": "Quarterly"
                                },
                                {
                                    "Data": "12",
                                    "Display": "Monthly"
                                }
                            ],
                            "Validations": []
                        },
                        {
                            "Name": "PortfolioCode",
                            "Caption": "Portfolio Code",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "Hyperlink",
                            "LinkTarget": "index/-4036",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "Required",
                                    "Value": "true",
                                    "SpecialErrorMessage": null
                                },
                                {
                                    "Type": "MaxLength",
                                    "Value": "30",
                                    "SpecialErrorMessage": null
                                },
                                {
                                    "Type": "RegularExpression",
                                    "Value": "^[\\p{Lu}\\p{Ll}\\p{Lo}\\p{Nd}\\p{Mn}\\p{Mc}][\\p{Lu}\\p{Ll}\\p{Lo}\\p{Nd}\\p{Mn}\\p{Mc}_\\-]*$",
                                    "SpecialErrorMessage": ": it can only contain letters, numbers, and underscores ('_') and hyphens ('-') that are not the first character"
                                }
                            ]
                        },
                        {
                            "Name": "PortfolioBaseCurrencyISOCode",
                            "Caption": "PortfolioBaseCurrencyISOCode",
                            "ReadOnly": true,
                            "Hidden": true,
                            "BasicType": "String",
                            "UIType": "None",
                            "LinkTarget": "",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "PastDueAmount",
                            "Caption": "Past Due Amount",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "PositiveFloat",
                            "UIType": "Currency",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "OwnerContactType",
                            "Caption": "Primary Owner Contact Type",
                            "ReadOnly": true,
                            "Hidden": true,
                            "BasicType": "Integer",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "OwnerContactPhoneLabel",
                            "Caption": "Primary Owner Phone",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "List",
                            "LinkTarget": "",
                            "LinkFields": [
                                "OwnerContactPhoneID"
                            ],
                            "ListValues": [
                                {
                                    "Data": "Business",
                                    "Display": "Business"
                                },
                                {
                                    "Data": "Business 2",
                                    "Display": "Business 2"
                                },
                                {
                                    "Data": "Home",
                                    "Display": "Home"
                                },
                                {
                                    "Data": "Home 2",
                                    "Display": "Home 2"
                                },
                                {
                                    "Data": "Pager",
                                    "Display": "Pager"
                                },
                                {
                                    "Data": "Cellular",
                                    "Display": "Cellular"
                                },
                                {
                                    "Data": "Business Fax",
                                    "Display": "Business Fax"
                                },
                                {
                                    "Data": "Home Fax",
                                    "Display": "Home Fax"
                                },
                                {
                                    "Data": "Car",
                                    "Display": "Car"
                                },
                                {
                                    "Data": "Other",
                                    "Display": "Other"
                                },
                                {
                                    "Data": "Other Fax",
                                    "Display": "Other Fax"
                                },
                                {
                                    "Data": "Sig. Other Home",
                                    "Display": "Sig. Other Home"
                                },
                                {
                                    "Data": "Sig. Other Business",
                                    "Display": "Sig. Other Business"
                                },
                                {
                                    "Data": "Sig. Other Fax",
                                    "Display": "Sig. Other Fax"
                                },
                                {
                                    "Data": "Assistant",
                                    "Display": "Assistant"
                                },
                                {
                                    "Data": "TTY/TDD",
                                    "Display": "TTY/TDD"
                                },
                                {
                                    "Data": "Summer Home",
                                    "Display": "Summer Home"
                                },
                                {
                                    "Data": "Vacation Home",
                                    "Display": "Vacation Home"
                                },
                                {
                                    "Data": "Winter Home",
                                    "Display": "Winter Home"
                                }
                            ],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "16",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "OwnerName",
                            "Caption": "Owned By",
                            "ReadOnly": true,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [
                                "OwnerID"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "72",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "OwnerID",
                            "Caption": "Owned By",
                            "ReadOnly": false,
                            "Hidden": true,
                            "BasicType": "Integer",
                            "UIType": "None",
                            "LinkTarget": "",
                            "LinkFields": [
                                "OwnerID"
                            ],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "IncomeSecurityID",
                            "Caption": "Income Security ID",
                            "ReadOnly": false,
                            "Hidden": true,
                            "BasicType": "Integer",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [
                                "IncomeSecurityID"
                            ],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "IncomeSecTypeCode",
                            "Caption": "Income SecType Code",
                            "ReadOnly": false,
                            "Hidden": true,
                            "BasicType": "String",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [
                                "IncomeSecTypeCode"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "4",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "InitialValue",
                            "Caption": "Initial Value",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "PositiveFloat",
                            "UIType": "Currency",
                            "LinkTarget": "",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "IncomeSecuritySymbol",
                            "Caption": "Default Income Account Symbol",
                            "ReadOnly": true,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [
                                "IncomeSecurityID"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "25",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "IncomeSecType",
                            "Caption": "Default Income Account Type",
                            "ReadOnly": true,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [
                                "IncomeSecTypeCode"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "4",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "FootNoteLine3",
                            "Caption": "Footnote Line 3",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "72",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "FootNoteLine2",
                            "Caption": "Footnote Line 2",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "72",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "HoldingsStatus",
                            "Caption": "Holdings Update Status",
                            "ReadOnly": true,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "List",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [
                                {
                                    "Data": "F",
                                    "Display": "Failed"
                                },
                                {
                                    "Data": "U",
                                    "Display": "Current"
                                },
                                {
                                    "Data": "S",
                                    "Display": "Pending"
                                }
                            ],
                            "Validations": []
                        },
                        {
                            "Name": "FxSetCode",
                            "Caption": "Fx Set Code",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "List",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "MaintainCalcData",
                            "Caption": "Maintain Calculated Data",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "BooleanWithBlank",
                            "UIType": "CheckBox",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "LocaleID",
                            "Caption": "Locale",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "Integer",
                            "UIType": "List",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [
                                {
                                    "Data": "0",
                                    "Display": "(Use Settings)"
                                },
                                {
                                    "Data": "1078",
                                    "Display": "Afrikaans"
                                },
                                {
                                    "Data": "14337",
                                    "Display": "Arabic (UAE)"
                                },
                                {
                                    "Data": "1014337",
                                    "Display": "Arabic (UAE) - Sharia"
                                },
                                {
                                    "Data": "1069",
                                    "Display": "Basque"
                                },
                                {
                                    "Data": "1027",
                                    "Display": "Catalan"
                                },
                                {
                                    "Data": "1030",
                                    "Display": "Danish"
                                },
                                {
                                    "Data": "2067",
                                    "Display": "Dutch (Belgium)"
                                },
                                {
                                    "Data": "1043",
                                    "Display": "Dutch (Netherlands)"
                                },
                                {
                                    "Data": "3081",
                                    "Display": "English (Australia)"
                                },
                                {
                                    "Data": "10249",
                                    "Display": "English (Belize)"
                                },
                                {
                                    "Data": "4105",
                                    "Display": "English (Canada)"
                                },
                                {
                                    "Data": "9225",
                                    "Display": "English (Caribbean)"
                                },
                                {
                                    "Data": "6153",
                                    "Display": "English (Ireland)"
                                },
                                {
                                    "Data": "8201",
                                    "Display": "English (Jamaica)"
                                },
                                {
                                    "Data": "5129",
                                    "Display": "English (New Zealand)"
                                },
                                {
                                    "Data": "13321",
                                    "Display": "English (Philippines)"
                                },
                                {
                                    "Data": "7177",
                                    "Display": "English (South Africa)"
                                },
                                {
                                    "Data": "11273",
                                    "Display": "English (Trinidad)"
                                },
                                {
                                    "Data": "2057",
                                    "Display": "English (United Kingdom)"
                                },
                                {
                                    "Data": "1002057",
                                    "Display": "English (United Kingdom) - Sharia"
                                },
                                {
                                    "Data": "1033",
                                    "Display": "English (United States)"
                                },
                                {
                                    "Data": "1001033",
                                    "Display": "English (United States) - Sharia"
                                },
                                {
                                    "Data": "12297",
                                    "Display": "English (Zimbabwe)"
                                },
                                {
                                    "Data": "1080",
                                    "Display": "Faeroese"
                                },
                                {
                                    "Data": "1035",
                                    "Display": "Finnish"
                                },
                                {
                                    "Data": "2060",
                                    "Display": "French (Belgium)"
                                },
                                {
                                    "Data": "3084",
                                    "Display": "French (Canada)"
                                },
                                {
                                    "Data": "1036",
                                    "Display": "French (France)"
                                },
                                {
                                    "Data": "5132",
                                    "Display": "French (Luxembourg)"
                                },
                                {
                                    "Data": "6156",
                                    "Display": "French (Monaco)"
                                },
                                {
                                    "Data": "4108",
                                    "Display": "French (Switzerland)"
                                },
                                {
                                    "Data": "3079",
                                    "Display": "German (Austria)"
                                },
                                {
                                    "Data": "1031",
                                    "Display": "German (Germany)"
                                },
                                {
                                    "Data": "5127",
                                    "Display": "German (Liechtenstein)"
                                },
                                {
                                    "Data": "4103",
                                    "Display": "German (Luxembourg)"
                                },
                                {
                                    "Data": "2055",
                                    "Display": "German (Switzerland)"
                                },
                                {
                                    "Data": "1032",
                                    "Display": "Greek"
                                },
                                {
                                    "Data": "1039",
                                    "Display": "Icelandic"
                                },
                                {
                                    "Data": "1057",
                                    "Display": "Indonesian"
                                },
                                {
                                    "Data": "1040",
                                    "Display": "Italian (Italy)"
                                },
                                {
                                    "Data": "2064",
                                    "Display": "Italian (Switzerland)"
                                },
                                {
                                    "Data": "2110",
                                    "Display": "Malay (Brunei Darussalam)"
                                },
                                {
                                    "Data": "1086",
                                    "Display": "Malay (Malaysia)"
                                },
                                {
                                    "Data": "1044",
                                    "Display": "Norwegian (Bokmal)"
                                },
                                {
                                    "Data": "2068",
                                    "Display": "Norwegian (Nynorsk)"
                                },
                                {
                                    "Data": "1046",
                                    "Display": "Portuguese (Brazil)"
                                },
                                {
                                    "Data": "2070",
                                    "Display": "Portuguese (Portugal)"
                                },
                                {
                                    "Data": "1049",
                                    "Display": "Russian"
                                },
                                {
                                    "Data": "11274",
                                    "Display": "Spanish (Argentina)"
                                },
                                {
                                    "Data": "16394",
                                    "Display": "Spanish (Bolivia)"
                                },
                                {
                                    "Data": "13322",
                                    "Display": "Spanish (Chile)"
                                },
                                {
                                    "Data": "9226",
                                    "Display": "Spanish (Colombia)"
                                },
                                {
                                    "Data": "5130",
                                    "Display": "Spanish (Costa Rica)"
                                },
                                {
                                    "Data": "7178",
                                    "Display": "Spanish (Dominican Republic)"
                                },
                                {
                                    "Data": "12298",
                                    "Display": "Spanish (Ecuador)"
                                },
                                {
                                    "Data": "17418",
                                    "Display": "Spanish (El Salvador)"
                                },
                                {
                                    "Data": "4106",
                                    "Display": "Spanish (Guatemala)"
                                },
                                {
                                    "Data": "18442",
                                    "Display": "Spanish (Honduras)"
                                },
                                {
                                    "Data": "2058",
                                    "Display": "Spanish (Mexico)"
                                },
                                {
                                    "Data": "19466",
                                    "Display": "Spanish (Nicaragua)"
                                },
                                {
                                    "Data": "6154",
                                    "Display": "Spanish (Panama)"
                                },
                                {
                                    "Data": "15370",
                                    "Display": "Spanish (Paraguay)"
                                },
                                {
                                    "Data": "10250",
                                    "Display": "Spanish (Peru)"
                                },
                                {
                                    "Data": "20490",
                                    "Display": "Spanish (Puerto Rico)"
                                },
                                {
                                    "Data": "3082",
                                    "Display": "Spanish (Spain)"
                                },
                                {
                                    "Data": "14346",
                                    "Display": "Spanish (Uruguay)"
                                },
                                {
                                    "Data": "8202",
                                    "Display": "Spanish (Venezuela)"
                                },
                                {
                                    "Data": "1089",
                                    "Display": "Swahili"
                                },
                                {
                                    "Data": "1053",
                                    "Display": "Swedish"
                                },
                                {
                                    "Data": "2077",
                                    "Display": "Swedish (Finland)"
                                }
                            ],
                            "Validations": []
                        },
                        {
                            "Name": "NextTranID",
                            "Caption": "Next TranID",
                            "ReadOnly": false,
                            "Hidden": true,
                            "BasicType": "Integer",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "MinimumFee",
                            "Caption": "Minimum Fee",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "PositiveFloat",
                            "UIType": "Currency",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": []
                        },
                        {
                            "Name": "LastHoldingsUpdate",
                            "Caption": "Last Holdings Update",
                            "ReadOnly": true,
                            "Hidden": false,
                            "BasicType": "Date",
                            "UIType": "DateAndTime",
                            "LinkTarget": "",
                            "LinkFields": [],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MinValue",
                                    "Value": "01021753",
                                    "SpecialErrorMessage": null
                                },
                                {
                                    "Type": "MaxValue",
                                    "Value": "12319999",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "InvestmentGoal",
                            "Caption": "Investment Goal",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "List",
                            "LinkTarget": "",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [
                                {
                                    "Data": "",
                                    "Display": ""
                                },
                                {
                                    "Data": "To make $, stupid!",
                                    "Display": "To make $, stupid!"
                                },
                                {
                                    "Data": "100% Equity",
                                    "Display": "100% Equity"
                                },
                                {
                                    "Data": "100% Fixed",
                                    "Display": "100% Fixed"
                                },
                                {
                                    "Data": "50% Equity/50% Fixed",
                                    "Display": "50% Equity/50% Fixed"
                                },
                                {
                                    "Data": "Average Risk",
                                    "Display": "Average Risk"
                                },
                                {
                                    "Data": "Close Portfolio",
                                    "Display": "Close Portfolio"
                                },
                                {
                                    "Data": "Paydown or pay later",
                                    "Display": "Paydown or pay later"
                                },
                                {
                                    "Data": "1 billion dollars!",
                                    "Display": "1 billion dollars!"
                                },
                                {
                                    "Data": "don't know yet",
                                    "Display": "don't know yet"
                                },
                                {
                                    "Data": "I want a jag",
                                    "Display": "I want a jag"
                                },
                                {
                                    "Data": "Growth & Income",
                                    "Display": "Growth & Income"
                                },
                                {
                                    "Data": "to rule the world",
                                    "Display": "to rule the world"
                                },
                                {
                                    "Data": "Not to lose my shirt",
                                    "Display": "Not to lose my shirt"
                                },
                                {
                                    "Data": "Muni me.",
                                    "Display": "Muni me."
                                },
                                {
                                    "Data": "100000",
                                    "Display": "100000"
                                },
                                {
                                    "Data": "Start Later",
                                    "Display": "Start Later"
                                },
                                {
                                    "Data": "just chillin'",
                                    "Display": "just chillin'"
                                },
                                {
                                    "Data": "to rule all",
                                    "Display": "to rule all"
                                }
                            ],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "72",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "InternalClosingMethodCode",
                            "Caption": "Internal Closing Method Code",
                            "ReadOnly": true,
                            "Hidden": true,
                            "BasicType": "String",
                            "UIType": "TextBox",
                            "LinkTarget": "",
                            "LinkFields": [
                                "ClosingMethodCode"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "16",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "IsPositionOnly",
                            "Caption": "Position Only",
                            "ReadOnly": false,
                            "Hidden": false,
                            "BasicType": "Boolean",
                            "UIType": "CheckBox",
                            "LinkTarget": "",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [],
                            "Validations": [
                                {
                                    "Type": "MaxLength",
                                    "Value": "1",
                                    "SpecialErrorMessage": null
                                }
                            ]
                        },
                        {
                            "Name": "IsIncomplete",
                            "Caption": "Incomplete",
                            "ReadOnly": false,
                            "Hidden": true,
                            "BasicType": "Boolean",
                            "UIType": "CheckBox",
                            "LinkTarget": "",
                            "LinkFields": [
                                "PortfolioID"
                            ],
                            "ListValues": [],
                            "Validations": []
                        }
                    ]
                }
            ]
        };

        if (searchId === 1) {
            result.Data.push(
                {
                    "RealizedYTDGainLongInGlobalCurrency": 0,
                    "ReconRuleName": "",
                    "RealizedYTDGainLong": 0,
                    "ProcessingGroupName": "Default Owners",
                    "ProcessingGroupID": -14,
                    "RealizedYTDGainInGlobalCurrency": 0,
                    "RealizedYTDGain": 0,
                    "ReportHeadingDetail": "13f\n\n\n",
                    "ReportHeading3": "",
                    "ShortName": "",
                    "ReportHeading2": "",
                    "ReportHeading1": "13f",
                    "ReportHeading": "13f",
                    "PrimaryContactAddressID": 1,
                    "PrimaryContactCode": "z13f-Owner",
                    "PrimaryContactAddressLabel": "Home",
                    "PriceSetCode": "",
                    "PortfolioID": 144,
                    "PortfolioGUID": "409f8cad-e728-4e6a-add5-f6df2fab31f0",
                    "PortfolioTypeCode": "",
                    "PortfolioStatus": "",
                    "PrimaryContactPhoneLabel": "",
                    "ProcessingGroupCode": "Default Owners",
                    "PrimaryContactType": 5,
                    "PrimaryContactName": "13f",
                    "PrimaryContactEmail2": "",
                    "PrimaryContactEmail1": "",
                    "PrimaryContactID": 145,
                    "PrimaryContactEmail3": "",
                    "TotalAccruedInterest": 0,
                    "TotalCashInGlobalCurrency": 24201522,
                    "TotalCash": 24201522,
                    "UseAverageCost": false,
                    "URL": "",
                    "WithholdingTaxTypeCode": "",
                    "TotalTradableCashInGlobalCurrency": 24201522,
                    "TotalMarketValueInGlobalCurrency": 24201522,
                    "TotalMarketValue": 24201522,
                    "TotalTradableCash": 24201522,
                    "TotalMarketValueWithAccruedInterest": 24201522,
                    "TaxStatus": "",
                    "StartDate": "1904-03-01T00:00:00",
                    "ShowSecuritySymbol": "",
                    "TaxNumber": "",
                    "SyntheticIndexDesc": "",
                    "BrokerRepSymbol": "",
                    "BrokerRepName": "",
                    "CashSecTypeCode": "",
                    "CashSecType": "",
                    "BillingMethodCode": "",
                    "BillingContactID": 146,
                    "BillingPhoneLabel": "Business",
                    "BillingPhoneID": 2,
                    "DocumentLink": "",
                    "DefaultSettlementCurrencyCode": "",
                    "DomicileCountryCode": "",
                    "CashSecuritySymbol": "",
                    "ClosingMethodCode": " ",
                    "AverageCostCode": "",
                    "AuditEventID": 1719,
                    "BankAddressLabel": "Business",
                    "BankAddressID": 3,
                    "AccruedInterestPMCode": "",
                    "AccruedInterestID": 0,
                    "AccruedInterestTDCode": "",
                    "AccruedInterestShowCode": "",
                    "BillingAddressID": 2,
                    "BillingContactCode": "z13f-Billing",
                    "BillingAddressLabel": "Business",
                    "BaseCurrencyCode": "",
                    "BankContactID": 147,
                    "BankContactCode": "z13f-Bank",
                    "BankPhoneLabel": "Business",
                    "BankPhoneID": 3,
                    "FootNoteLine1": "",
                    "OwnerContactID": 145,
                    "OwnerContactCode": "z13f-Owner",
                    "OwnerContactPhoneID": 1,
                    "OwnerContactName": "13f",
                    "OwnerContactAddressLabel": "Home",
                    "OwnerClassID": 53,
                    "NumOfCopies": 0,
                    "OwnerContactAddressID": 1,
                    "OwnerCode": "Default Owners",
                    "PortfolioCode": "13f",
                    "PortfolioBaseCurrencyISOCode": "USD",
                    "OwnerContactType": 5,
                    "OwnerContactPhoneLabel": "Home",
                    "OwnerName": "Default Owners",
                    "OwnerID": -14,
                    "IncomeSecTypeCode": "",
                    "IncomeSecuritySymbol": "",
                    "IncomeSecType": "",
                    "FootNoteLine3": "",
                    "FootNoteLine2": "",
                    "HoldingsStatus": "U",
                    "FxSetCode": "",
                    "MaintainCalcData": true,
                    "NextTranID": 111,
                    "LastHoldingsUpdate": "2016-08-09T19:29:03.78",
                    "InvestmentGoal": "",
                    "InternalClosingMethodCode": "",
                    "IsPositionOnly": false,
                    "IsIncomplete": true
                }
            );
        }

        result.Column = [
            "PortfolioCode",
            "ShortName",
            "PortfolioTypeCode",
            "ReportHeading1",
            "PortfolioStatus",
            "StartDate",
            "ReconRuleName",
            "OwnerCode",
            "PrimaryContactCode"
        ];

        return result;
    }

    private getAllIndex(): Object {
        return {
            "Data": [
                {
                    "IndexName": "Blend",
                    "Symbol": "",
                    "SymbolTypeCode": "",
                    "CurrencyCode": "",
                    "IndexDesc": "Blended Index",
                    "IndexID": 94,
                    "IsSystem": true,
                    "HolidayScheduleName": "",
                    "HolidayScheduleID": 0,
                    "Adjustment": 0,
                    "AuditEventID": 1
                },
                {
                    "IndexName": "cpi-u",
                    "Symbol": "",
                    "SymbolTypeCode": "",
                    "CurrencyCode": "us",
                    "IndexDesc": "CPI-U",
                    "IndexID": 264,
                    "IsSystem": false,
                    "HolidayScheduleName": "",
                    "HolidayScheduleID": 0,
                    "Adjustment": 0,
                    "AuditEventID": 378
                },
                {
                    "IndexName": "cpi-s",
                    "Symbol": "",
                    "SymbolTypeCode": "",
                    "CurrencyCode": "se",
                    "IndexDesc": "Swedish CPI",
                    "IndexID": 265,
                    "IsSystem": false,
                    "HolidayScheduleName": "",
                    "HolidayScheduleID": 0,
                    "Adjustment": 0,
                    "AuditEventID": 377
                },
                {
                    "IndexName": "630",
                    "Symbol": "",
                    "SymbolTypeCode": "",
                    "CurrencyCode": "us",
                    "IndexDesc": "630 Index",
                    "IndexID": 266,
                    "IsSystem": false,
                    "HolidayScheduleName": "",
                    "HolidayScheduleID": 0,
                    "Adjustment": 0,
                    "AuditEventID": 372
                },
                {
                    "IndexName": "aapl",
                    "Symbol": "03783310",
                    "SymbolTypeCode": "C",
                    "CurrencyCode": "us",
                    "IndexDesc": "Apple Computer",
                    "IndexID": 267,
                    "IsSystem": false,
                    "HolidayScheduleName": "",
                    "HolidayScheduleID": 0,
                    "Adjustment": 0,
                    "AuditEventID": 373
                },
                {
                    "IndexName": "advs",
                    "Symbol": "00797410",
                    "SymbolTypeCode": "C",
                    "CurrencyCode": "us",
                    "IndexDesc": "Advent Software",
                    "IndexID": 268,
                    "IsSystem": false,
                    "HolidayScheduleName": "",
                    "HolidayScheduleID": 0,
                    "Adjustment": 0,
                    "AuditEventID": 374
                },
                {
                    "IndexName": "austral",
                    "Symbol": "180334",
                    "SymbolTypeCode": "S",
                    "CurrencyCode": "au",
                    "IndexDesc": "ASX ALL ORDINARIES",
                    "IndexID": 269,
                    "IsSystem": false,
                    "HolidayScheduleName": "",
                    "HolidayScheduleID": 0,
                    "Adjustment": 0,
                    "AuditEventID": 375
                },
                {
                    "IndexName": "cpi-f",
                    "Symbol": "1111111",
                    "SymbolTypeCode": "S",
                    "CurrencyCode": "fr",
                    "IndexDesc": "French CPI",
                    "IndexID": 270,
                    "IsSystem": false,
                    "HolidayScheduleName": "",
                    "HolidayScheduleID": 0,
                    "Adjustment": 0,
                    "AuditEventID": 376
                },
                {
                    "IndexName": "cpi-u2",
                    "Symbol": "20299A03",
                    "SymbolTypeCode": "C",
                    "CurrencyCode": "us",
                    "IndexDesc": "CPI-U2",
                    "IndexID": 271,
                    "IsSystem": false,
                    "HolidayScheduleName": "",
                    "HolidayScheduleID": 0,
                    "Adjustment": 0,
                    "AuditEventID": 379
                },
                {
                    "IndexName": "djia",
                    "Symbol": "26099405",
                    "SymbolTypeCode": "C",
                    "CurrencyCode": "us",
                    "IndexDesc": "Dow Jones Industrial Average",
                    "IndexID": 272,
                    "IsSystem": false,
                    "HolidayScheduleName": "",
                    "HolidayScheduleID": 0,
                    "Adjustment": 0,
                    "AuditEventID": 380
                },
                {
                    "IndexName": "frcac",
                    "Symbol": "180454",
                    "SymbolTypeCode": "S",
                    "CurrencyCode": "us",
                    "IndexDesc": "FRANCE CAC 40",
                    "IndexID": 273,
                    "IsSystem": false,
                    "HolidayScheduleName": "",
                    "HolidayScheduleID": 0,
                    "Adjustment": 0,
                    "AuditEventID": 381
                },
                {
                    "IndexName": "germany",
                    "Symbol": "187653",
                    "SymbolTypeCode": "S",
                    "CurrencyCode": "de",
                    "IndexDesc": "GERMANY DAX(PERF)",
                    "IndexID": 274,
                    "IsSystem": false,
                    "HolidayScheduleName": "",
                    "HolidayScheduleID": 0,
                    "Adjustment": 0,
                    "AuditEventID": 382
                },
                {
                    "IndexName": "ibm",
                    "Symbol": "45920010",
                    "SymbolTypeCode": "C",
                    "CurrencyCode": "us",
                    "IndexDesc": "IBM",
                    "IndexID": 275,
                    "IsSystem": false,
                    "HolidayScheduleName": "",
                    "HolidayScheduleID": 0,
                    "Adjustment": 0,
                    "AuditEventID": 383
                },
                {
                    "IndexName": "merval",
                    "Symbol": "180118",
                    "SymbolTypeCode": "S",
                    "CurrencyCode": "ar",
                    "IndexDesc": "MERVAL",
                    "IndexID": 276,
                    "IsSystem": false,
                    "HolidayScheduleName": "",
                    "HolidayScheduleID": 0,
                    "Adjustment": 0,
                    "AuditEventID": 384
                },
                {
                    "IndexName": "msintl",
                    "Symbol": "180281",
                    "SymbolTypeCode": "S",
                    "CurrencyCode": "us",
                    "IndexDesc": "Morgan Stanley Intl",
                    "IndexID": 277,
                    "IsSystem": false,
                    "HolidayScheduleName": "",
                    "HolidayScheduleID": 0,
                    "Adjustment": 0,
                    "AuditEventID": 385
                },
                {
                    "IndexName": "sp100",
                    "Symbol": "12483710",
                    "SymbolTypeCode": "C",
                    "CurrencyCode": "us",
                    "IndexDesc": "Standard & Poor's 100",
                    "IndexID": 278,
                    "IsSystem": false,
                    "HolidayScheduleName": "",
                    "HolidayScheduleID": 0,
                    "Adjustment": 0,
                    "AuditEventID": 386
                },
                {
                    "IndexName": "sp500",
                    "Symbol": "78378610",
                    "SymbolTypeCode": "C",
                    "CurrencyCode": "us",
                    "IndexDesc": "S&P 500",
                    "IndexID": 279,
                    "IsSystem": false,
                    "HolidayScheduleName": "",
                    "HolidayScheduleID": 0,
                    "Adjustment": 0,
                    "AuditEventID": 387
                },
                {
                    "IndexName": "testindex1",
                    "Symbol": "ti",
                    "SymbolTypeCode": "C",
                    "CurrencyCode": "us",
                    "IndexDesc": "description",
                    "IndexID": 665,
                    "IsSystem": false,
                    "HolidayScheduleName": "",
                    "HolidayScheduleID": 0,
                    "Adjustment": 1,
                    "AuditEventID": 1877
                },
                {
                    "IndexName": "12",
                    "Symbol": "",
                    "SymbolTypeCode": "",
                    "CurrencyCode": "us",
                    "IndexDesc": "",
                    "IndexID": 666,
                    "IsSystem": false,
                    "HolidayScheduleName": "",
                    "HolidayScheduleID": 0,
                    "Adjustment": 0,
                    "AuditEventID": 1885
                },
                {
                    "IndexName": "aaaa",
                    "Symbol": "",
                    "SymbolTypeCode": "",
                    "CurrencyCode": "us",
                    "IndexDesc": "",
                    "IndexID": 667,
                    "IsSystem": false,
                    "HolidayScheduleName": "",
                    "HolidayScheduleID": 0,
                    "Adjustment": 0,
                    "AuditEventID": 1886
                }
            ],
            "Metadata": [
                {
                    "Name": "Index",
                    "DisplayName": "Index",
                    "Fields": [
                        {
                            "Name": "IndexName",
                            "Caption": "Index Name",
                            "ReadOnly": false,
                            "Required": true,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "Hyperlink",
                            "ListValues": [],
                            "FieldValidations": [
                                {
                                    "type": "Required",
                                    "value": true,
                                    "specialErrorMessage": ""
                                }
                            ],
                            "LinkTarget": "index/-4223",
                            "LinkFields": [
                                "IndexID"
                            ]
                        },
                        {
                            "Name": "HolidayScheduleName",
                            "Caption": "Holiday Schedule Name",
                            "ReadOnly": true,
                            "Required": true,
                            "Hidden": true,
                            "BasicType": "String",
                            "UIType": "TextBox",
                            "ListValues": [],
                            "FieldValidations": [
                                {
                                    "type": "MaxLength",
                                    "value": 72,
                                    "specialErrorMessage": ""
                                }
                            ]
                        },
                        {
                            "Name": "Symbol",
                            "Caption": "Symbol",
                            "ReadOnly": false,
                            "Required": false,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "Hyperlink",
                            "ListValues": []
                        },
                        {
                            "Name": "SymbolTypeCode",
                            "Caption": "Symbol Type",
                            "ReadOnly": false,
                            "Required": false,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "List",
                            "ListValues": [
                                {
                                    "Data": "",
                                    "Display": "Unknown"
                                },
                                {
                                    "Data": "C",
                                    "Display": "CUSIP"
                                },
                                {
                                    "Data": "S",
                                    "Display": "SEDOL"
                                }
                            ]
                        },
                        {
                            "Name": "CurrencyCode",
                            "Caption": "Currency",
                            "ReadOnly": false,
                            "Required": false,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "List",
                            "ListValues": [
                                {
                                    "Data": "ar",
                                    "Display": "Argentine Peso"
                                },
                                {
                                    "Data": "au",
                                    "Display": "Australian Dollar"
                                },
                                {
                                    "Data": "at",
                                    "Display": "Austrian Schilling"
                                },
                                {
                                    "Data": "be",
                                    "Display": "Belgian Franc"
                                },
                                {
                                    "Data": "br",
                                    "Display": "Brazilian Cruzeiro"
                                },
                                {
                                    "Data": "ca",
                                    "Display": "Canadian Dollar"
                                },
                                {
                                    "Data": "dk",
                                    "Display": "Danish Krone"
                                },
                                {
                                    "Data": "eg",
                                    "Display": "eg"
                                },
                                {
                                    "Data": "eu",
                                    "Display": "Euro Monetary Union"
                                },
                                {
                                    "Data": "xe",
                                    "Display": "European Currency Unit"
                                },
                                {
                                    "Data": "fi",
                                    "Display": "Finnish Markka"
                                },
                                {
                                    "Data": "fr",
                                    "Display": "French Franc"
                                },
                                {
                                    "Data": "de",
                                    "Display": "German Deutche Mark"
                                },
                                {
                                    "Data": "xa",
                                    "Display": "Gold"
                                },
                                {
                                    "Data": "gr",
                                    "Display": "gr"
                                },
                                {
                                    "Data": "hk",
                                    "Display": "Hong Kong Dollar"
                                },
                                {
                                    "Data": "hu",
                                    "Display": "hu"
                                },
                                {
                                    "Data": "in",
                                    "Display": "Indian Rupee"
                                },
                                {
                                    "Data": "id",
                                    "Display": "Indonesia Rupiah"
                                },
                                {
                                    "Data": "ie",
                                    "Display": "Irish Pound"
                                },
                                {
                                    "Data": "it",
                                    "Display": "Italian Lira"
                                },
                                {
                                    "Data": "jp",
                                    "Display": "Japanese Yen"
                                },
                                {
                                    "Data": "lu",
                                    "Display": "Luxembourg Franc"
                                },
                                {
                                    "Data": "my",
                                    "Display": "Malaysian Ringgit"
                                },
                                {
                                    "Data": "me",
                                    "Display": "Mexican Peso"
                                },
                                {
                                    "Data": "an",
                                    "Display": "Neatherlands Antillean Guilder"
                                },
                                {
                                    "Data": "nl",
                                    "Display": "Netherlands Guilder"
                                },
                                {
                                    "Data": "tw",
                                    "Display": "New Taiwan Dollar"
                                },
                                {
                                    "Data": "nz",
                                    "Display": "New Zealand Dollar"
                                },
                                {
                                    "Data": "no",
                                    "Display": "Norwegian Kroner"
                                },
                                {
                                    "Data": "pk",
                                    "Display": "Pakistan Rupee"
                                },
                                {
                                    "Data": "ph",
                                    "Display": "Philippine Peso"
                                },
                                {
                                    "Data": "pl",
                                    "Display": "Polish Zloty"
                                },
                                {
                                    "Data": "pt",
                                    "Display": "Portugal Escudo"
                                },
                                {
                                    "Data": "gb",
                                    "Display": "Pound Sterling"
                                },
                                {
                                    "Data": "ru",
                                    "Display": "Russian Ruble"
                                },
                                {
                                    "Data": "sa",
                                    "Display": "Saudia Arabia Riyal"
                                },
                                {
                                    "Data": "sg",
                                    "Display": "Singapore Dollar"
                                },
                                {
                                    "Data": "zz",
                                    "Display": "South African Rand"
                                },
                                {
                                    "Data": "kr",
                                    "Display": "South Korean Won"
                                },
                                {
                                    "Data": "es",
                                    "Display": "Spanish Peseta"
                                },
                                {
                                    "Data": "se",
                                    "Display": "Swedish Krona"
                                },
                                {
                                    "Data": "ch",
                                    "Display": "Swiss Franc"
                                },
                                {
                                    "Data": "th",
                                    "Display": "Thailand Baht"
                                },
                                {
                                    "Data": "tr",
                                    "Display": "tr"
                                },
                                {
                                    "Data": "us",
                                    "Display": "US Dollar"
                                },
                                {
                                    "Data": "vn",
                                    "Display": "vn"
                                },
                                {
                                    "Data": "cn",
                                    "Display": "Yuan Renminbi"
                                },
                                {
                                    "Data": "za",
                                    "Display": "za"
                                },
                                {
                                    "Data": "zw",
                                    "Display": "zw"
                                }
                            ]
                        },
                        {
                            "Name": "HolidayScheduleID",
                            "Caption": "Holiday Schedule",
                            "ReadOnly": false,
                            "Required": false,
                            "Hidden": false,
                            "BasicType": "Integer",
                            "UIType": "List",
                            "ListValues": [
                                {
                                    "Data": "0",
                                    "Display": "Not Classified"
                                },
                                {
                                    "Data": "1",
                                    "Display": "NYSE Holidays"
                                },
                                {
                                    "Data": "2",
                                    "Display": "Oslo Stock Exchange Holidays"
                                },
                                {
                                    "Data": "3",
                                    "Display": "Stockholm Stock Exchange Holidays"
                                },
                                {
                                    "Data": "4",
                                    "Display": "Amsterdam Stock Exchange Holidays"
                                }
                            ]
                        },
                        {
                            "Name": "IndexDesc",
                            "Caption": "Description",
                            "ReadOnly": false,
                            "Required": false,
                            "Hidden": false,
                            "BasicType": "String",
                            "UIType": "TextBox",
                            "ListValues": []
                        },
                        {
                            "Name": "IndexID",
                            "Caption": "Index ID",
                            "ReadOnly": true,
                            "Required": false,
                            "Hidden": true,
                            "BasicType": "Integer",
                            "UIType": "TextBox",
                            "ListValues": []
                        },
                        {
                            "Name": "IsSystem",
                            "Caption": "Is System",
                            "ReadOnly": true,
                            "Required": false,
                            "Hidden": true,
                            "BasicType": "Boolean",
                            "UIType": "TextBox",
                            "ListValues": []
                        },
                        {
                            "Name": "Adjustment",
                            "Caption": "Adjustment",
                            "ReadOnly": false,
                            "Required": false,
                            "Hidden": false,
                            "BasicType": "Integer",
                            "UIType": "TextBox",
                            "ListValues": []
                        },
                        {
                            "Name": "AuditEventID",
                            "Caption": "Max AuditEventID",
                            "ReadOnly": false,
                            "Required": false,
                            "Hidden": true,
                            "BasicType": "Integer",
                            "UIType": "TextBox",
                            "ListValues": []
                        }
                    ]
                }
            ]
        };
    }
}