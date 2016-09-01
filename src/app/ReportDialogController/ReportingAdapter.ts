import * as rep9 from '../RepTS/rep9';
import * as rep8 from '../RepTS/rep8';
import * as reps from '../RepTS/reps';

export class controlOption{
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
    constructor(){
        this.beforeGroup = -1;
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
    
    public static getmyControl(repDLG: rep8.ReportDialog, index: number, result: BaseControl, repECD: rep8.ECD): boolean{
        //let result: BaseControl = new BaseControl();
        result.options.dtilID = repDLG.m_DLGITEMTEMPLATE[index].dtilID;
        let dtilText: string = repDLG.m_DLGITEMTEMPLATE[index].dtilText.replace('&','');
        if(repDLG.m_DLGITEMTEMPLATE[index].dtilClass === 'COMBOBOX'){
            //if(repDLG.m_DLGITEMTEMPLATE[index])
            result.isInbody = true;
            if(rep8.ecdHasStyle(repECD,rep9.ADDS_DATE)){
                result.options.id = dtilText + 'date';
                result.type = 'myFormGroupDatepicker';
            }
            else{
                //result.options.id = dtilText + result.options.label;
                result.type = 'myFormGroupDropdown';
            }
        }
        else if(repDLG.m_DLGITEMTEMPLATE[index].dtilClass.toUpperCase() === 'BUTTON'){
            if(dtilText.toUpperCase() === "OK" ||
                dtilText.toUpperCase() === 'CANCEL' ||
                dtilText.toUpperCase() === 'HELP' ||
                dtilText.toUpperCase() === 'SETTINGS' ||
                dtilText.toUpperCase() === 'CONSOLIDATE' ||
                dtilText.toUpperCase() === 'BROWSE'){
                    result.isInbody = false;
                    result.type = 'myDialogButton';
                    result.options.id = dtilText + repDLG.m_DLGITEMTEMPLATE[index].dtilClass;//'myDialogButton';
                    result.options.label = dtilText;
            }
            else{
                result.isInbody = true;
                if(rep8.ecdHasStyle(repECD,rep9.ADDS_CHECK)){
                    result.type = 'myFormGroupCheckbox';
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
                else if(rep8.ecdHasStyle(repECD,rep9.ADDS_RADIO)){
                    result.type = 'myFormGroupRadiobutton';
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
            if(repDLG.m_DLGITEMTEMPLATE[index].dtilStyle === 33554436){
                result.options.label = repDLG.m_DLGITEMTEMPLATE[index].dtilText.replace('&','');
                return false;
            }
            result.options.dtlStyle = repECD.Style;
            result.options.dtlExStyle = repECD.ExStyle.xs;
            if(repECD.lab === '_asdtxt'){
                result.isInbody = true;
                result.type = 'myTitle';
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
        console.warn(repJson);
        return this.FixforUI(repJson);
    }

    private static FixforUI(repDLG: rep8.ReportDialog): any{
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
                groupname = myControl.options.name;
                grounumber = dlgarray[DIndex].groupNumber;
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
        for(let aIndex: number = 0; aIndex<myControls.length; aIndex++){
            console.warn(myControls[aIndex]);
        }
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