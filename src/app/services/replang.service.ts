import { Injectable } from '@angular/core';

import { TransporterService } from './transporter.service';

import { Observable } from 'rxjs';

import { AppraisalParm } from '../model/appraisal.parm.model';
import { NotifiMessageService } from '../ReportDialogController/notify-message.service';
import { DialogAdapter, UIAdapter } from '../ReportDialogController/ReportingAdapter';
import { ReportingData } from '../data/ReportingData';
import { BaseControl, UIStyleControl } from '../ReportDialogController/ReportingAdapter';

function detectValue(appraisalParm) {
    if (appraisalParm.ParmSectionID === "1") {
        return appraisalParm.DefaultValue;
    } else if (appraisalParm.ParmSectionID === "5") {
        if (appraisalParm.ParmTypeDefaultValue === "0") {
            return false;
        }
        return true;
    }
    return "";
}

function detectTitle(appraisalParm) {
    if (appraisalParm.IsRequired === "1") {
        return appraisalParm.DisplayName + " *";
    }
    return appraisalParm.DisplayName;
}


@Injectable()
export class ReplangService {

    constructor(
        private _transporter: TransporterService,
        private _notify: NotifiMessageService) {
    }

    public ssrsData: any;

    public getSSRSData(): any {
        this._transporter.getSSRSData().subscribe((res: any) => {
            this.ssrsData = res;
        });
    }

    public getSSRSReportUILayout(isDialog: boolean, ssrsData: any): Object {
        //this._transporter.getSSRSData();
        let ssrs: any = ssrsData;
        console.info(ssrs);
        let bodys = [];
        let section1forms1: Array<any> = [];
        let section1forms2: Array<any> = [];
        let section2forms1: Array<any> = [];
        let section2forms2: Array<any> = [];
        let section1Parm: Array<AppraisalParm> = [];
        let section2Parm: Array<AppraisalParm> = [];
        
        let ui: any = {};

        if (isDialog) {
            ui = {
                type: "myDialog",
                options: {
                    id: "ssrs_report",
                    dialogId: "ssrs_report",
                    title: ssrs.ParmDisplay.SSRSReport.DisplayName,
                    body: [
                        {
                            type: "myDialogBody",
                            options: {
                                children: bodys
                            }
                        }
                    ]
                }
            }
        } else {
            ui = {
                children: [
                    {
                        type: "mySection",
                        options: {
                            klass: "section-ssrs",
                            children: bodys
                        }
                    }
                ]
            }
        }


        let header = {
            type: "mySpan",
            options: {
                children: [
                    {
                        type: "myNavbar",
                        options: {
                            click: function (context) {
                                if (isDialog) {
                                    var ssrsDialog = context.pageContext.service.findControl("ssrs_report");
                                    ($("#" + ssrsDialog.options.dialogId) as any).modal("hide");
                                    window.open("http://localhost:3000/report/-3939", "SSRS");
                                } else {
                                    var outputSection = context.pageContext.service.findControl("outputSection");
                                    outputSection.options.children = [];
                                    outputSection.options.children.push({
                                        type: "myTitle",
                                        options: {
                                            title: "SSRS Report Output",
                                            level: 3
                                        }
                                    })
                                }
                            }
                        }
                    }
                ]
            }
        }

        let section1 = {
            type: "myForm",
            options: {
                klass: "row section-form collapse in",
                id: "portfolio_appraisal",
                formId: "portfolio_appraisal",
                leftChildren: section1forms1,
                rightChildren: section1forms2
            }
        }

        let section2 = {
            type: "myForm",
            options: {
                klass: "row section-form collapse",
                id: "portfolio_settings",
                formId: "portfolio_settings",
                leftChildren: section2forms1,
                rightChildren: section2forms2
            }
        }

        if (ssrs.ParmDisplay.Parameters) {
            let rows: Array<AppraisalParm> = ssrs.ParmDisplay.Parameters.row;
            for (let i = 0; i < rows.length; i++) {
                if (rows[i].ParmSectionID === "1") {
                    section1Parm.push(rows[i]);
                } else if (rows[i].ParmSectionID === "2") {
                    section2Parm.push(rows[i]);
                }
            }
        }

        this.addRowToForm(section1Parm, section1forms1, section1forms2);
        this.addRowToForm(section2Parm, section2forms1, section2forms2);

        bodys.push(header);
        bodys.push(section1);
        bodys.push(section2);
        bodys.push({
            type: "mySection",
            options: {
                isHidden: isDialog,
                klass: "section-loading-form",
                id: "outputSection",
                children: [
                    {

                    }
                ]
            }
        })

        return ui;
    }

    public pushControls(sectionForms: Array<any>, appraisalParm: AppraisalParm) {
        let that = this;
        let formControl: Object = {
            type: "myFormControl",
            options: {
                title: detectTitle(appraisalParm),
                mode: appraisalParm.ParmTypeID,
                value: detectValue(appraisalParm),
                IsRequired: appraisalParm.IsRequired,
                isMultiple: false,
                items: [],
                //We may need a common function to process the command
                click: function (context) {
                    that._notify.sendSSRSMessage(context);
                },
                onchange: function () {

                }
            }
        };
        sectionForms.push(formControl);
    }

    public addRowToForm(sectionRows: Array<AppraisalParm>, sectionForms1: Array<any>, sectionForms2: Array<any>): void {
        let halfLength: number = Math.ceil(sectionRows.length / 2);
        for (let i = 0; i < sectionRows.length; i++) {
            let appraisalParm: AppraisalParm = sectionRows[i];
            if (i < halfLength) {
                this.pushControls(sectionForms1, appraisalParm);
            } else {
                this.pushControls(sectionForms2, appraisalParm);
            }
        }
    }

    public getPortfolioSummaryUILayout(): Object {
        let that = this;
        let json: UIStyleControl = UIAdapter.getrepJSON('psum', 'Portfolio Summary');
        if(
            json !== undefined &&
            json.children !== undefined &&
            json.children.length > 0
            ){
            for(let i: number = 0; i < json.children.length; i++){
                let mBaseControl: BaseControl = json.children[i];
                if(
                    mBaseControl.type === 'mySection' && 
                    mBaseControl.options !== undefined &&
                    mBaseControl.options.children !== undefined &&
                    mBaseControl.options.children.length > 0){
                        for(let j: number = 0; j < mBaseControl.options.children.length; j++){
                            let myControl: BaseControl = mBaseControl.options.children[j];
                            if (myControl.type === 'myFormGroupDropdown' ||
                                myControl.type === 'myFormGroupRadiobutton' ||
                                myControl.type === 'myFormGroupCheckbox' ||
                                myControl.type === '') {
                                myControl.options.click = function (context) {
                                    that._notify.sendRepTSUIMessage(context);
                                }
                            }
                            else if(myControl.type === 'mySpan' &&//){
                                myControl.type === 'mySpan' &&
                                myControl.options !== undefined &&
                                myControl.options.children !== undefined &&
                                myControl.options.children.length > 0
                                ){
                                    console.warn('for button');
                                    console.warn(mBaseControl);
                                    for(let j: number = 0; j < myControl.options.children.length; j++){
                                        let myButtonControl: BaseControl = myControl.options.children[j];
                                        myButtonControl.options.click = function (context) {
                                            that._notify.sendRepTSUIMessage(context);
                                        }
                                    }
                            }
                        }
                }
            }
        }
        console.warn(json);     
        return json;
    }

    public getPortfolioSummaryChartUILayout(): Object {
        return {
            type: "mySection",
            options: {
                id: "portfolioSummaryChart",
                klass: "section-border fadeInUp",
                children: [
                    {
                        type: "myTitle",
                        options: {
                            title: "Report: Chart Options",
                            level: 3
                        }
                    },
                    {
                        type: "mySection",
                        options: {
                            klass: "section-radio",
                            children: [
                                {
                                    type: "myTitle",
                                    options: {
                                        title: "Chart Type",
                                        level: 5
                                    }
                                },
                                {
                                    type: "myFormGroupRadiobutton",
                                    options: {
                                        id: "pieRadio",
                                        label: "Pie",
                                        value: "pie",
                                        groupName: "chartType",
                                        click: function (context) {
                                            var _3d = context.pageContext.service.findControl("3dCheck");
                                            var _comLables = context.pageContext.service.findControl("labelCheck");
                                            var _gridLines = context.pageContext.service.findControl("lineCheck");
                                            _3d.options.disabled = !context.options.checked;
                                            _comLables.options.disabled = !context.options.checked;
                                            _gridLines.options.disabled = !context.options.checked;

                                        }
                                    }
                                },
                                {
                                    type: "myFormGroupRadiobutton",
                                    options: {
                                        id: "barRadio",
                                        label: "Bar",
                                        value: "bar",
                                        groupName: "chartType",
                                        click: function (context) {

                                        }
                                    }
                                },
                                {
                                    type: "myFormGroupRadiobutton",
                                    options: {
                                        id: "columnRadio",
                                        label: "Column",
                                        value: "column",
                                        groupName: "chartType",
                                        click: function (context) {

                                        }
                                    }
                                },
                                {
                                    type: "myFormGroupRadiobutton",
                                    options: {
                                        id: "lineRadio",
                                        label: "Line",
                                        value: "line",
                                        groupName: "chartType",
                                        click: function (context) {
                                            var _3d = context.pageContext.service.findControl("3dCheck");
                                            var _comLables = context.pageContext.service.findControl("labelCheck");
                                            var _gridLines = context.pageContext.service.findControl("lineCheck");
                                            _3d.options.disabled = context.options.checked;
                                            _comLables.options.disabled = context.options.checked;
                                            _gridLines.options.disabled = context.options.checked;
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    {
                        type: "mySection",
                        options: {
                            klass: "section-checkbox",
                            children: [
                                {
                                    type: "myTitle",
                                    options: {
                                        title: "Chart Format",
                                        level: 5
                                    }
                                },
                                {
                                    type: "myFormGroupCheckbox",
                                    options: {
                                        id: "3dCheck",
                                        label: "3D",
                                        value: "3d",
                                        disabled: false,
                                        click: function (context) {

                                        }
                                    }
                                },
                                {
                                    type: "myFormGroupCheckbox",
                                    options: {
                                        id: "labelCheck",
                                        label: "Combined Labels",
                                        disabled: false,
                                        value: "comLabels",
                                        click: function (context) {

                                        }
                                    }
                                },
                                {
                                    type: "myFormGroupCheckbox",
                                    options: {
                                        id: "lineCheck",
                                        label: "Grid Lines",
                                        disabled: false,
                                        value: "gridLines",
                                        click: function (context) {

                                        }
                                    }
                                },
                                {
                                    type: "myFormGroupCheckbox",
                                    options: {
                                        id: "legendCheck",
                                        label: "Legend",
                                        disabled: false,
                                        value: "legend",
                                        click: function (context) {

                                        }
                                    }
                                },
                                {
                                    type: "myFormGroupCheckbox",
                                    options: {
                                        id: "markersCheck",
                                        label: "Line Markers",
                                        disabled: false,
                                        value: "lineMarkers",
                                        click: function (context) {

                                        }
                                    }
                                }
                            ]
                        }
                    },
                    {
                        type: "mySpan",
                        options: {
                            klass: "",
                            children: [
                                {
                                    type: "myButton",
                                    options: {
                                        label: "OK",
                                        id: "confirmChartBtn",
                                        click: function (context) {
                                            console.warn(context);
                                            var chartSection = context.pageContext.service.findControl("portfolioSummaryChart");
                                            ($("#" + chartSection.options.id) as any).removeClass("fadeInUp");
                                            ($("#" + chartSection.options.id) as any).addClass("fadeOutDown");
                                            var summarySection = context.pageContext.service.findControl("Portfolio_Summary");
                                            ($("#" + summarySection.options.id) as any).removeClass("fadeOutUp");
                                            ($("#" + summarySection.options.id) as any).removeClass("fadeInLeft");
                                            ($("#" + summarySection.options.id) as any).removeClass("fadeOutRight");
                                            ($("#" + summarySection.options.id) as any).addClass("fadeInDown");
                                            var chart = context.pageContext.service.findControl("chart");
                                            chart.options.checked = false;
                                        }
                                    }
                                },
                                {
                                    type: "myButton",
                                    options: {
                                        label: "Cancel",
                                        id: "cancelChartBtn",
                                        click: function (context) {
                                            var chartSection = context.pageContext.service.findControl("portfolioSummaryChart");
                                            ($("#" + chartSection.options.id) as any).removeClass("fadeInUp");
                                            ($("#" + chartSection.options.id) as any).addClass("fadeOutDown");
                                            var summarySection = context.pageContext.service.findControl("Portfolio_Summary");
                                            ($("#" + summarySection.options.id) as any).removeClass("fadeOutUp");
                                            ($("#" + summarySection.options.id) as any).removeClass("fadeInLeft");
                                            ($("#" + summarySection.options.id) as any).removeClass("fadeOutRight");
                                            ($("#" + summarySection.options.id) as any).addClass("fadeInDown");
                                            var chart = context.pageContext.service.findControl("chart");
                                            chart.options.checked = false;
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

    public getPortfolioSummaryConfirmUILayout(): Object {
        return {
            type: "mySection",
            options: {
                id: "portfolioSummaryConfirm",
                klass: "section-border fadeInRight",
                children: [
                    {
                        type: "myTitle",
                        options: {
                            title: "Report: Confirm",
                            level: 3
                        }
                    },
                    {
                        type: "myTitle",
                        options: {
                            title: this.getSummaryConfirmation(),
                            level: 6
                        }
                    },
                    {
                        type: "mySpan",
                        options: {
                            klass: "section-span",
                            children: [
                                {
                                    type: "myButton",
                                    options: {
                                        label: "OK",
                                        id: "confirmBtn",
                                        click: function (context) {
                                            var confirmSection = context.pageContext.service.findControl("portfolioSummaryConfirm");
                                            ($("#" + confirmSection.options.id) as any).removeClass("fadeInRight");
                                            ($("#" + confirmSection.options.id) as any).addClass("fadeOutRightConfirm");
                                            var categoriesSection = context.pageContext.service.findControl("portfolioSummaryChartCategories");
                                            if (!categoriesSection) {
                                                var categoriesOptions = context.pageContext.service.getPortfolioSummaryChartCategoriesUILayout();
                                                context.pageContext.ui.children.push(categoriesOptions);
                                            } else {
                                                ($("#" + categoriesSection.options.id) as any).removeClass("fadeOutLeft");
                                                ($("#" + categoriesSection.options.id) as any).addClass("fadeInRightCate");
                                            }
                                        }
                                    }
                                },
                                {
                                    type: "myButton",
                                    options: {
                                        label: "Cancel",
                                        id: "cancelChartBtn",
                                        click: function (context) {
                                            var summarySection = context.pageContext.service.findControl("Portfolio_Summary");
                                            ($("#" + summarySection.options.id) as any).removeClass("fadeInDown");
                                            ($("#" + summarySection.options.id) as any).removeClass("fadeOutUp");
                                            ($("#" + summarySection.options.id) as any).removeClass("fadeOutRight");
                                            ($("#" + summarySection.options.id) as any).addClass("fadeInLeft");
                                            var confirmSection = context.pageContext.service.findControl("portfolioSummaryConfirm");
                                            ($("#" + confirmSection.options.id) as any).removeClass("fadeInRight");
                                            ($("#" + confirmSection.options.id) as any).addClass("fadeOutRightConfirm");
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

    public getPortfolioSummaryChartCategoriesUILayout(): Object {
        return {
            type: "mySection",
            options: {
                id: "portfolioSummaryChartCategories",
                klass: "section-border fadeInRightCate",
                children: [
                    {
                        type: "myTitle",
                        options: {
                            title: "Report: Chart Categories",
                            level: 3
                        }
                    },
                    {
                        type: "myTitle",
                        options: {
                            title: "A graph can be created based on the following categories:",
                            level: 6
                        }
                    },
                    {
                        type: "mySection",
                        options: {
                            klass: "section-radio-margin",
                            children: [
                                {
                                    type: "myTitle",
                                    options: {
                                        title: "Chart Categories",
                                        level: 5
                                    }
                                },
                                {
                                    type: "myFormGroupRadiobutton",
                                    options: {
                                        id: "assetClasses",
                                        label: "Asset Classes",
                                        value: "assetClasses",
                                        groupName: "chartCategories",
                                        click: function (context) {

                                        }
                                    }
                                },
                                {
                                    type: "myFormGroupRadiobutton",
                                    options: {
                                        id: "industryGroups",
                                        label: "Industry Groups",
                                        value: "industryGroups",
                                        groupName: "chartCategories",
                                        click: function (context) {

                                        }
                                    }
                                },
                                {
                                    type: "myFormGroupRadiobutton",
                                    options: {
                                        id: "industrySectors",
                                        label: "Industry Sectors",
                                        value: "industrySectors",
                                        groupName: "chartCategories",
                                        click: function (context) {

                                        }
                                    }
                                },
                                {
                                    type: "myFormGroupRadiobutton",
                                    options: {
                                        id: "securityTypes",
                                        label: "Security Types",
                                        value: "securityTypes",
                                        groupName: "chartCategories",
                                        click: function (context) {

                                        }
                                    }
                                }
                            ]
                        }
                    },
                    {
                        type: "mySpan",
                        options: {
                            klass: "section-span",
                            children: [
                                {
                                    type: "myButton",
                                    options: {
                                        label: "OK",
                                        click: function (context) {
                                            var categoriesSection = context.pageContext.service.findControl("portfolioSummaryChartCategories");
                                            ($("#" + categoriesSection.options.id) as any).removeClass("fadeInRightCate");
                                            ($("#" + categoriesSection.options.id) as any).addClass("fadeOutRightCate");
                                            var outputSection = context.pageContext.service.getPortfolioSummaryOutput();
                                            context.pageContext.ui.children.push(outputSection);
                                        }
                                    }
                                },
                                {
                                    type: "myButton",
                                    options: {
                                        label: "Help",
                                        click: function (context) {

                                        }
                                    }
                                },
                                {
                                    type: "myButton",
                                    options: {
                                        label: "Cancel",
                                        click: function (context) {
                                            var summarySection = context.pageContext.service.findControl("Portfolio_Summary");
                                            ($("#" + summarySection.options.id) as any).removeClass("fadeInDown");
                                            ($("#" + summarySection.options.id) as any).removeClass("fadeOutUp");
                                            ($("#" + summarySection.options.id) as any).removeClass("fadeOutRight");
                                            ($("#" + summarySection.options.id) as any).addClass("fadeInLeft");
                                            var categoriesSection = context.pageContext.service.findControl("portfolioSummaryChartCategories");
                                            ($("#" + categoriesSection.options.id) as any).removeClass("fadeInRightCate");
                                            ($("#" + categoriesSection.options.id) as any).addClass("fadeOutRightCate");
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

    public getPortfolioSummaryOutput(): Object {
        return {
            type: "mySection",
            options: {
                klass: "section-output",
                id: "porfolioSummaryOutput",
                children: [
                    {
                        type: "myTitle",
                        options: {
                            title: "Report Output",
                            level: 3
                        }
                    },
                    {
                        type: "myTitle",
                        options: {
                            title: ".......................................",
                            level: 5
                        }
                    }
                ]
            }
        }
    }

    public getSummaryConfirmation(): string {
        /*
        this._rep.getSecuritySymbolsByType("rockets");
        let result: string = "";
        this._rep.securitySymbols().subscribe((res: any) => {
            result = res;
        });
        return result; */
        return "Prices are not avaliable for 12/31/2016. Do you wish to continue to run this report ?";
    }

    public getSummaryReportUILayout(): Object {
        let that = this;
        let json: BaseControl = DialogAdapter.getrepJSON('psum', 'Portfolio summary');
        console.warn(json);
        if (
            json !== undefined &&
            json.options !== undefined &&
            json.options.body !== undefined &&
            json.options.body.length > 0 &&
            json.options.body[0] !== undefined &&
            json.options.body[0].options !== undefined &&
            json.options.body[0].options.children !== undefined &&
            json.options.body[0].options.children.length > 0
        ) {
            let myDlgchilden: Array<BaseControl> = json.options.body[0].options.children;
            for (let i: number = 0; i < myDlgchilden.length; i++) {
                let myDlgchild: BaseControl = myDlgchilden[i];
                if (myDlgchild.type === 'mySection' && myDlgchild.options !== undefined &&
                    myDlgchild.options.children !== undefined) {
                    for (let j: number = 0; j < myDlgchild.options.children.length; j++) {
                        let myControl: BaseControl = myDlgchild.options.children[j];
                        if (myControl.type === 'myFormGroupDropdown' ||
                            myControl.type === 'myFormGroupRadiobutton' ||
                            myControl.type === 'myFormGroupCheckbox' ||
                            myControl.type === '') {
                            myControl.options.click = function (context) {
                                that._notify.sendMessage(context);
                            }
                        }
                    }
                }
            }
        }
        if (
            json !== undefined &&
            json.options !== undefined &&
            json.options.footer !== undefined &&
            json.options.footer.length > 0
        ) {
            let footchildren: Array<BaseControl> = json.options.footer;
            for (let i: number = 0; i < footchildren.length; i++) {
                let buttoncontrol: BaseControl = footchildren[i];
                if (buttoncontrol.options !== undefined) {
                    buttoncontrol.options.click = function (context) {
                        that._notify.sendMessage(context);
                    }
                }
            }
        }
        return json;
    }

    public getSummaryChartUILayout(): Object {
        let that = this;
        return {
            type: "myDialog",
            options: {
                dialogId: "myportfolio_chart",
                title: "Report: Chart Options",
                body: [
                    {
                        type: "myDialogBody",
                        options: {
                            children: [
                                {
                                    type: "mySection",
                                    options: {
                                        klass: "section-radio",
                                        children: [
                                            {
                                                type: "myTitle",
                                                options: {
                                                    title: "Chart Type",
                                                    level: 5
                                                }
                                            },
                                            {
                                                type: "myFormGroupRadiobutton",
                                                options: {
                                                    id: "pieRadio",
                                                    label: "Pie",
                                                    value: "pie",
                                                    groupName: "chartType",
                                                    dialog: 'portfolio_chart',
                                                    click: function (context) {
                                                        that._notify.sendMessage(context);
                                                        console.warn('send message for pie');
                                                        //var _3d = context.pageContext.service.findControl("3dCheck");
                                                        //var _comLables = context.pageContext.service.findControl("labelCheck");
                                                        //var _gridLines = context.pageContext.service.findControl("lineCheck");
                                                        //_3d.options.disabled = !context.options.checked;
                                                        //_comLables.options.disabled = !context.options.checked;
                                                        //_gridLines.options.disabled = !context.options.checked;

                                                    }
                                                }
                                            },
                                            {
                                                type: "myFormGroupRadiobutton",
                                                options: {
                                                    id: "barRadio",
                                                    label: "Bar",
                                                    value: "bar",
                                                    groupName: "chartType",
                                                    dialog: 'portfolio_chart',
                                                    click: function (context) {
                                                        that._notify.sendMessage(context);
                                                        //console.warn('send message for bar');
                                                    }
                                                }
                                            },
                                            {
                                                type: "myFormGroupRadiobutton",
                                                options: {
                                                    id: "columnRadio",
                                                    label: "Column",
                                                    value: "column",
                                                    groupName: "chartType",
                                                    dialog: 'portfolio_chart',
                                                    click: function (context) {
                                                        that._notify.sendMessage(context);
                                                        //console.warn('send message for column');
                                                    }
                                                }
                                            },
                                            {
                                                type: "myFormGroupRadiobutton",
                                                options: {
                                                    id: "lineRadio",
                                                    label: "Line",
                                                    value: "line",
                                                    groupName: "chartType",
                                                    dialog: 'portfolio_chart',
                                                    click: function (context) {
                                                        that._notify.sendMessage(context);
                                                        console.warn('send message for Line');
                                                        //var _3d = context.pageContext.service.findControl("3dCheck");
                                                        //var _comLables = context.pageContext.service.findControl("labelCheck");
                                                        //var _gridLines = context.pageContext.service.findControl("lineCheck");
                                                        //_3d.options.disabled = context.options.checked;
                                                        //_comLables.options.disabled = context.options.checked;
                                                        //_gridLines.options.disabled = context.options.checked;
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                },
                                {
                                    type: "mySection",
                                    options: {
                                        klass: "section-checkbox",
                                        children: [
                                            {
                                                type: "myTitle",
                                                options: {
                                                    title: "Chart Format",
                                                    level: 5
                                                }
                                            },
                                            {
                                                type: "myFormGroupCheckbox",
                                                options: {
                                                    id: "3dCheck",
                                                    label: "3D",
                                                    value: "3d",
                                                    disabled: false,
                                                    click: function (context) {

                                                    }
                                                }
                                            },
                                            {
                                                type: "myFormGroupCheckbox",
                                                options: {
                                                    id: "labelCheck",
                                                    label: "Combined Labels",
                                                    disabled: false,
                                                    value: "comLabels",
                                                    click: function (context) {

                                                    }
                                                }
                                            },
                                            {
                                                type: "myFormGroupCheckbox",
                                                options: {
                                                    id: "lineCheck",
                                                    label: "Grid Lines",
                                                    disabled: false,
                                                    value: "gridLines",
                                                    click: function (context) {

                                                    }
                                                }
                                            },
                                            {
                                                type: "myFormGroupCheckbox",
                                                options: {
                                                    id: "legendCheck",
                                                    label: "Legend",
                                                    disabled: false,
                                                    value: "legend",
                                                    click: function (context) {

                                                    }
                                                }
                                            },
                                            {
                                                type: "myFormGroupCheckbox",
                                                options: {
                                                    id: "markersCheck",
                                                    label: "Line Markers",
                                                    disabled: false,
                                                    value: "lineMarkers",
                                                    click: function (context) {

                                                    }
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ],
                footer: [
                    {
                        type: "myDialogButton",
                        options: {
                            label: "OK",
                            dismiss: "modal",
                            click: function (context) {
                                var chart = context.pageContext.service.findControl("chart");

                            }
                        }
                    }
                ]
            }
        }
    }

    public getSummaryConfirmUILayout(): Object {
        return {
            type: "myDialog",
            options: {
                id: "portfolio_summary_confirm",
                dialogId: "portfolio_summary_confirm",
                title: "Report: Confirm",
                body: [
                    {
                        type: "myDialogBody",
                        options: {
                            children: [
                                {
                                    type: "myTitle",
                                    options: {
                                        title: this.getSummaryConfirmation(),
                                        level: 6
                                    }
                                }
                            ]
                        }
                    }
                ],
                footer: [
                    {
                        type: "myDialogButton",
                        options: {
                            label: "OK",
                            modal: "modal",
                            target: "#portfolio_summary_chart_categories",
                            click: function (context) {
                                var confirmDialog = context.pageContext.service.findControl("portfolio_summary_confirm");
                                ($("#" + confirmDialog.options.dialogId) as any).modal("hide");
                                var summaryDialog = context.pageContext.service.findControl("portfolio_summary");
                                ($("#" + summaryDialog.options.dialogId) as any).modal("hide");
                                var chartCategoriesDialog = context.pageContext.service.getSummaryChartCategoriesUILayout();
                                context.pageContext.ui.children.push(chartCategoriesDialog);
                            }
                        }
                    }
                ]
            }
        }
    }


    public getSummaryChartCategoriesUILayout(): Object {
        return {
            type: "myDialog",
            options: {
                dialogId: "portfolio_summary_chart_categories",
                title: "Report: Summary",
                body: [
                    {
                        type: "myDialogBody",
                        options: {
                            children: [
                                {
                                    type: "myTitle",
                                    options: {
                                        title: "A graph can be created based on the following categories:",
                                        level: 6
                                    }
                                },
                                {
                                    type: "mySection",
                                    options: {
                                        klass: "section-radio-margin",
                                        children: [
                                            {
                                                type: "myTitle",
                                                options: {
                                                    title: "Chart Categories",
                                                    level: 5
                                                }
                                            },
                                            {
                                                type: "myFormGroupRadiobutton",
                                                options: {
                                                    id: "assetClasses",
                                                    label: "Asset Classes",
                                                    value: "assetClasses",
                                                    groupName: "chartCategories",
                                                    click: function (context) {

                                                    }
                                                }
                                            },
                                            {
                                                type: "myFormGroupRadiobutton",
                                                options: {
                                                    id: "industryGroups",
                                                    label: "Industry Groups",
                                                    value: "industryGroups",
                                                    groupName: "chartCategories",
                                                    click: function (context) {

                                                    }
                                                }
                                            },
                                            {
                                                type: "myFormGroupRadiobutton",
                                                options: {
                                                    id: "industrySectors",
                                                    label: "Industry Sectors",
                                                    value: "industrySectors",
                                                    groupName: "chartCategories",
                                                    click: function (context) {

                                                    }
                                                }
                                            },
                                            {
                                                type: "myFormGroupRadiobutton",
                                                options: {
                                                    id: "securityTypes",
                                                    label: "Security Types",
                                                    value: "securityTypes",
                                                    groupName: "chartCategories",
                                                    click: function (context) {

                                                    }
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ],
                footer: [
                    {
                        type: "myDialogButton",
                        options: {
                            label: "OK",
                            dismiss: "modal",
                            click: function (context) {
                                window.open("http://localhost:3000/report/-3939", "Portfolio");
                            }
                        }
                    },
                    {
                        type: "myDialogButton",
                        options: {
                            label: "Help",
                            click: function (context) {

                            }
                        }
                    }
                ]
            }
        }
    }

    public getSettingsUILayout(): Object {
        let that = this;
        return {
            type: "myDialog",
            options: {
                dialogId: "Report_Setting",
                title: "Settings",
                body: [
                    {
                        type: "myDialogBody",
                        options: {
                            children: [{
                                type: "mySection",
                                options: {
                                    klass: "section",
                                    children: [
                                        {
                                            type: "myFormGroupDropdown",
                                            options: {
                                                id: "MBS",
                                                label: "MBS",
                                                disabled: false,
                                                name: "MBS",
                                                dtlID: 600,
                                                dtilStyle: 268438144,
                                                dialog: "Report_Setting",
                                                click: function (context) {
                                                    that._notify.sendMessage(context);
                                                },
                                                onchange: function (event) {
                                                }
                                            }
                                        },
                                        {
                                            type: "myFormGroupDropdown",
                                            options: {
                                                id: "TIPS",
                                                label: "TIPS",
                                                disabled: false,
                                                name: "TIPS",
                                                dtlID: 601,
                                                dtilStyle: 268438144,
                                                dialog: "Report_Setting",
                                                click: function (context) {
                                                    that._notify.sendMessage(context);
                                                },
                                                onchange: function (event) {
                                                }
                                            }
                                        },
                                        {
                                            type: "myFormGroupCheckbox",
                                            options: {
                                                label: "Override portfolio settings",
                                                value: "icu",
                                                dtlID: 500,
                                                dialog: "Report_Setting",
                                                disabled: false,
                                                click: function (context) {
                                                }
                                            }
                                        }
                                    ]
                                }
                            }]
                        }
                    }
                ],
                footer: [
                    {
                        type: "myDialogButton",//myDialogButton
                        options: {
                            label: "OK",
                            dialog: "Report_Setting",
                            click: function (context) {

                            }
                        }
                    }
                ]
            }
        };
    }
}
