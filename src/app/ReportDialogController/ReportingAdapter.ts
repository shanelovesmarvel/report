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
    
    public static getmyControl(repDLG: rep8.ReportDialog, index: number, result: BaseControl): boolean{
        //let result: BaseControl = new BaseControl();
        result.options.dtilID = repDLG.m_DLGITEMTEMPLATE[index].dtilID;
        let dtilText: string = repDLG.m_DLGITEMTEMPLATE[index].dtilText.replace('&','');
        if(repDLG.m_DLGITEMTEMPLATE[index].dtilClass === 'COMBOBOX'){
            //if(repDLG.m_DLGITEMTEMPLATE[index])
            result.isInbody = true;
            for(let ecdIndex: number = 0; ecdIndex < repDLG.m_ECD.length ; ecdIndex++){
                if(repDLG.m_ECD[ecdIndex].id === repDLG.m_DLGITEMTEMPLATE[index].dtilID){
                    result.options.dtlStyle = repDLG.m_ECD[ecdIndex].Style;
                    result.options.dtlExStyle = repDLG.m_ECD[ecdIndex].ExStyle.xs;
                    let ecd: rep8.ECD = repDLG.m_ECD[ecdIndex];
                    if(rep8.ecdHasStyle(ecd,rep9.ADDS_DATE)){
                        result.options.id = dtilText + 'date';
                        result.type = 'myFormGroupDatepicker';
                    }
                    else{
                        result.options.id = dtilText + result.options.label;
                        result.type = 'myFormGroupDropdown';
                    }
                    break;
                }
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
                for(let ecdIndex: number = 0; ecdIndex < repDLG.m_ECD.length; ecdIndex++){
                    if(repDLG.m_ECD[ecdIndex].id === repDLG.m_DLGITEMTEMPLATE[index].dtilID){
                        result.options.dtlStyle = repDLG.m_ECD[ecdIndex].Style;
                        result.options.dtlExStyle = repDLG.m_ECD[ecdIndex].ExStyle.xs;
                        let ecd: rep8.ECD = repDLG.m_ECD[ecdIndex];
                        if(rep8.ecdHasStyle(ecd,rep9.ADDS_CHECK)){
                            result.type = 'myFormGroupCheckbox';
                            result.options.id = dtilText + 'Checkbox';
                        }
                        else if(rep8.ecdHasStyle(ecd,rep9.ADDS_RADIO)){
                            result.type = 'myFormGroupRadiobutton';
                            result.options.id = dtilText + 'Radio';
                        }
                        break;
                    }
                }
            }
        }
        else{
            if(repDLG.m_DLGITEMTEMPLATE[index].dtilStyle === 33554436){
                result.options.label = repDLG.m_DLGITEMTEMPLATE[index].dtilText.replace('&','');
                return false;
            }
            for(let ecdIndex: number = 0; ecdIndex < repDLG.m_ECD.length; ecdIndex++){
                if(repDLG.m_ECD[ecdIndex].id === repDLG.m_DLGITEMTEMPLATE[index].dtilID){
                    result.options.dtlStyle = repDLG.m_ECD[ecdIndex].Style;
                    result.options.dtlExStyle = repDLG.m_ECD[ecdIndex].ExStyle.xs;
                    if(repDLG.m_ECD[ecdIndex].lab === '_asdtxt'){
                        result.isInbody = true;
                        result.type = 'myTitle';
                    }
                }
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
    }
}