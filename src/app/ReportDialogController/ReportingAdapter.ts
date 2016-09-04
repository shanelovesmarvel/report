import * as rep9 from '../RepTS/rep9';
import * as rep8 from '../RepTS/rep8';
import * as reps from '../RepTS/reps';

export enum SSRSType{
    Invalid = -1,
    String = 1,
    Date = 2,
    Integer = 3,
    Float = 4,
    Boolean = 5,
    RDLPickList_String = 11,
    RDLPickList_Date = 12,
    RDLPickList_Integer = 13,
    RDLPickList_Float = 14,
    RDLPickList_Boolean = 15,
    FontPicker = 22,
    PositiveInteger = 23,
    SessionGuid = 31,
    ServerURL = 34,
    RDLMultiValueList_String = 41,
    RDLMultiValueList_Date = 42,
    RDLMultiValueList_Integer = 43,
    RDLMultiValueList_Float = 44,
    RDLMultiValueList_Boolean = 45,
    RDLMultiValueBox_String = 51,
    RDLMultiValueBox_Date = 52,
    RDLMultiValueBox_Integer = 53,
    RDLMultiValueBox_Float = 54,
    RDLMultiValueBox_Boolean = 55,
    RDLMultiValueEdit_String = 61,
    RDLMultiValueEdit_Date = 62,
    RDLMultiValueEdit_Integer = 63,
    RDLMultiValueEdit_Float = 64,
    RDLMultiValueEdit_Boolean = 65,
    Portfolio = 301,
    Contact = 302,
    Activity = 303,
    PortfolioBase_String = 304,
    PortfolioBase_Integer = 305,
    PortfolioBaseNoComposites = 309,
    Security = 306,
    SecurityType = 307,
    User = 308,
}

export class controlOption{
    dialogId: string;
    id: string;
    label: string;
    title: string;
    disabled: boolean;
    value: string;
    dtilID: number;
    dtlStyle: number;
    dtlExStyle: number;
    beforeGroup: number;
    labtype: string;
    lab: string;
    lablen: number;
    exData: string;
    groupName: string;
    level: number;
    name: string;
    messageID: number;
    klass: string;
    click: any;
    onchange: any;
    items: Array<any>;
    backdrop: string;
    children: Array<BaseControl>;
    body: Array<BaseControl>;
    footer: Array<BaseControl>;
    constructor(){
        this.beforeGroup = -1;
        //this.children = [];
        //this.body = [];
        //this.footer = [];
    }
}

// if control is mytitle, use title as the caption
// if control is like STATIC, use label as the caption
export class BaseControl{
    type: string;
    isInbody: boolean;
    options: controlOption;
    constructor(){
        this.isInbody = true;
        this.type = '';
        this.options = new controlOption();
    }
}


export class DialogAdapter{
    
    public static getmyControl(repDLG: rep8.ReportDialog, index: number, result: BaseControl, repECD?: rep8.ECD): boolean{
        let that: any = {} ;
        //let result: BaseControl = new BaseControl();
        result.options.dtilID = repDLG.m_DLGITEMTEMPLATE[index].dtilID;
        let dtilText: string = repDLG.m_DLGITEMTEMPLATE[index].dtilText.replace('&','');
        if(repDLG.m_DLGITEMTEMPLATE[index].dtilClass === 'COMBOBOX'){
            //if(repDLG.m_DLGITEMTEMPLATE[index])
            result.isInbody = true;
            if(rep8.ecdHasStyle(repECD,rep9.ADDS_DATE) || rep8.ecdHasExStyle(repECD,rep9.ADDS_DATE)){
                result.options.id = dtilText + 'date';
                result.type = 'myFormGroupDatepicker';
            }
            else{
                result.type = 'myFormGroupDropdown';
                //result.options.click = function (context) {
                //    that._notify.sendMessage(context);
                //}
            }
        }
        else if(repDLG.m_DLGITEMTEMPLATE[index].dtilClass.toUpperCase() === 'BUTTON'){
            if(
                rep8.AdvStdButton(repDLG.m_DLGITEMTEMPLATE[index].dtilID)){
                    result.isInbody = false;
                    result.type = 'myDialogButton';
                    result.options.id = dtilText + repDLG.m_DLGITEMTEMPLATE[index].dtilClass;//'myDialogButton';
                    result.options.label = dtilText;
                    result.options.messageID = repDLG.m_DLGITEMTEMPLATE[index].dtilID;
            }
            else{
                result.isInbody = true;
                if(rep8.ecdHasStyle(repECD,rep9.ADDS_CHECK)){
                    result.type = 'myFormGroupCheckbox';
                    result.options.label = dtilText;
                    while(1){ 
                        if(dtilText.indexOf(' ') !== -1){
                            dtilText = dtilText.replace(' ','');
                        }
                        else{
                            break;
                        }
                    }
                    result.options.id = dtilText + 'Checkbox';
                }
                else if(rep8.ecdHasStyle(repECD,rep9.ADDS_RADIO) || rep8.ecdHasExStyle(repECD,rep9.ADDS_RADIO)){
                    result.type = 'myFormGroupRadiobutton';
                    result.options.label = dtilText;
                    while(1){ 
                        if(dtilText.indexOf(' ') !== -1){
                            dtilText = dtilText.replace(' ','');
                        }
                        else{
                            break;
                        }
                    }
                    result.options.id = dtilText + 'Radio';
                }
            }
        }
        else{
            //if(repDLG.m_DLGITEMTEMPLATE[index].dtilStyle === 33554436){
            //    result.options.label = repDLG.m_DLGITEMTEMPLATE[index].dtilText.replace('&','');
            //    return false;
            //}
            result.options.dtlStyle = repECD.Style;
            result.options.dtlExStyle = repECD.ExStyle.xs;
            if(repECD.lab === '_asdtxt'){
                result.isInbody = true;
                result.type = 'myTitle';
                result.options.title = repDLG.m_DLGITEMTEMPLATE[index].dtilText;
                result.options.level = 6;
                //console.warn(result.options.title);
            }
            
        }
        return true;
    }

    public static getrepJSON(repName: string, reportDesc: string): any {    
        return this.LoadMyReport(repName, reportDesc);
    }

    private static LoadMyReport(repname: string, descName: string): any{
        reps.InitInstance();
        let repJson = reps.LoadReport(repname,descName);
        //console.warn(repJson);
        return this.FixforUI(repJson);
    }

    public static getUILayout(myControls: Array<BaseControl>, repDLG: rep8.ReportDialog): any{
        let rootcontrol: BaseControl = new BaseControl();
        rootcontrol.isInbody = true;
        rootcontrol.type = 'myDialog';
        let title: string = repDLG.m_MYDLGTEMPLATE.caption;
        rootcontrol.options.title = title;
        while(1){
            if(title.indexOf(' ')!=-1){
                title = title.replace(' ', '_');
            }
            else{
                break;
            }
        }
        rootcontrol.options.dialogId = title;
        rootcontrol.options.id = title;

        let footcontrol: Array<BaseControl> = myControls.filter((bc)=>bc.isInbody === false);
        let bodycontrol: Array<BaseControl> = myControls.filter((bc)=>bc.isInbody === true);

        let digObj: BaseControl = new BaseControl();
        digObj.type = 'myDialogBody';
        
        let secObj: BaseControl = new BaseControl();
        //let titleObj: BaseControl = new BaseControl();
        secObj.type = 'mySection';
        secObj.options.klass = 'section';
        for(let i: number = 0; i < bodycontrol.length; i++){
            //"exData": "$_asdtxt1"
            if(bodycontrol[i].options.exData === '$_asdtxt1'){
                if(digObj.options.children === undefined){
                    digObj.options.children = [];
                }
                digObj.options.children.push(bodycontrol[i]);
                continue;
            }
            if(secObj.options.children === undefined){
                secObj.options.children = [];
            }
            secObj.options.children.push(bodycontrol[i]);
        }
        if(digObj.options.children === undefined){
            digObj.options.children = [];
        }
        digObj.options.children.push(secObj);
        if(rootcontrol.options.body === undefined){
            rootcontrol.options.body = [];
        }
        rootcontrol.options.body.push(digObj);
        for(let i: number = 0; i < footcontrol.length; i++){
            if(rootcontrol.options.footer === undefined){
                rootcontrol.options.footer = [];
            }
            rootcontrol.options.footer.push(footcontrol[i]);
        }
        console.warn(JSON.stringify(rootcontrol));
        //console.warn(rootcontrol);
        return rootcontrol;
    }

    private static FixforUI(repDLG: rep8.ReportDialog): any{
        console.warn(repDLG);
        let mytempControls: Array<BaseControl> = [];
        let myControls: Array<BaseControl> = [];
        let dlgarray: Array<rep8.MYDLGITEMTEMPLATE> = repDLG.m_DLGITEMTEMPLATE;
        let ECDArray: Array<rep8.ECD> = repDLG.m_ECD;
        let gNumber: number = 0;
        let tempStack: Array<rep8.MYDLGITEMTEMPLATE> = [];
        let groupname: string = '';
        let grounumber: number = 0;
        for (let DIndex: number = 0; DIndex < dlgarray.length; DIndex++) {
            let myControl: BaseControl = new BaseControl();
            let dtilID = dlgarray[DIndex].dtilID;
            if(dlgarray[DIndex].dtilStyle === rep9.BS_GROUPBOX){
                myControl.isInbody = true;
                myControl.options.title = dlgarray[DIndex].dtilText;
                myControl.options.level = 6;
                myControl.options.name = dlgarray[DIndex].dtilText.replace(' ','');
                myControl.type = 'myTitle';
                groupname = myControl.options.name;
                grounumber = dlgarray[DIndex].groupNumber;
            }
            else if(dlgarray[DIndex].dtilClass.toUpperCase() === 'BUTTON' && rep8.AdvStdButton(dlgarray[DIndex].dtilID)){
                this.getmyControl(repDLG, DIndex, myControl);
            }
            else{
                let cEcd: Array<rep8.ECD> = ECDArray.filter((re) => re.id === dtilID);
                if (cEcd === undefined || cEcd.length !== 1) {
                    tempStack.push(dlgarray[DIndex]);
                    continue;
                }
                
                this.getmyControl(repDLG, DIndex, myControl, cEcd[0]);

                if(tempStack.length>0){
                    myControl.options.label = tempStack[tempStack.length-1].dtilText.replace('&','');
                }
                
                myControl.options.labtype = cEcd[0].labtype;
                myControl.options.lab = cEcd[0].lab;
                myControl.options.lablen = cEcd[0].lablen;
                myControl.options.exData = cEcd[0].Data;
                if(myControl.options.id === undefined && 
                    myControl.options.label!== undefined &&
                    myControl.type !== undefined){
                    let mID: string = myControl.options.label;
                    while(true){
                        if(mID.indexOf(' ') !== -1){
                            mID = mID.replace(' ','');
                        }
                        else{
                            break;
                        }
                    }
                    myControl.options.id = mID + myControl.type;//myControl.options.label.replace(' ','');
                }
                if(dlgarray[DIndex].groupNumber === grounumber){
                    myControl.options.groupName = groupname;
                }
            }
            myControls.push(myControl);
            tempStack = [];
        }
        //for(let aIndex: number = 0; aIndex<myControls.length; aIndex++){
        //    console.warn(myControls[aIndex]);
        //}
        return this.getUILayout(myControls,repDLG);
        /*
        let mytempControls: Array<BaseControl> = [];
        let myControls: Array<BaseControl> = [];
        let dlgarray: Array<rep8.MYDLGITEMTEMPLATE> = repDLG.m_DLGITEMTEMPLATE;
        let gNumber: number = 0;
        for(let gindex: number = 0; gindex < dlgarray.length; gindex++){
            if(gNumber < dlgarray[gindex].groupNumber){
                gNumber = dlgarray[gindex].groupNumber;
            }
        }
        for(let gindex: number = 0; gindex <= gNumber; gindex++){
            let myControl: BaseControl = new BaseControl();
            mytempControls.push(myControl);
            for(let index: number = 0; index < dlgarray.length; index++){
                if(dlgarray[index].groupNumber !== gindex) continue;
            	//if(myControl.beforeGroup !== -1) continue;
                myControl.options.beforeGroup = dlgarray[index].groupNumber;
                this.getmyControl(repDLG, index,myControl);
                //console.warn(myControl);
            }
        }
        for(let aIndex: number = 0; aIndex<mytempControls.length; aIndex++){
            if(mytempControls[aIndex].options.beforeGroup !== -1){
                myControls.push(mytempControls[aIndex]);
            }  
        }

        for(let aIndex: number = 0; aIndex<myControls.length; aIndex++){
            console.warn(myControls[aIndex]);
                //myControls.push(mytempControls[aIndex]);
            
        }
        */
    }
}