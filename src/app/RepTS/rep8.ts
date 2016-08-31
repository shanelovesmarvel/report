import { ReportingData } from '../data/ReportingData';

export class ReportDialog {
	m_MYDLGTEMPLATE: MYDLGTEMPLATE; // replace with direct members
	m_DLGITEMTEMPLATE: Array<MYDLGITEMTEMPLATE>;
	m_ECD: Array<ECD>;

	constructor(rect: RECT, caption: string) {
		this.m_MYDLGTEMPLATE = new MYDLGTEMPLATE(rect, caption);
		this.m_DLGITEMTEMPLATE = [];
		this.m_ECD = [];
	}
}

class MYDLGTEMPLATE {
	dtX: number;
	dtY: number;
	dtCX: number;
	dtCY: number;
	caption: string;
	constructor(rect: RECT, caption: string) {
		this.caption = caption;
		this.dtX = rect.left;
		this.dtY = rect.top;
		this.dtCX = rect.right;
		this.dtCY = rect.bottom;
	}
}
export class RECT {
	left: number;
	top: number;
	right: number;
	bottom: number;

	constructor() {
		this.init();
	}

	init(): void {
		this.left = 0;
		this.top = 0;
		this.right = 0;
		this.bottom = 0;
	}
}

export class MYDLGITEMTEMPLATE {
	dtilStyle: number;
	dtilX: number;
	dtilY: number;
	dtilCX: number;
	dtilCY: number;
	dtilID: number;
	dtilClass: string;
	dtilText: string;
    groupNumber: number;
	constructor(dcd: DCD) {
		this.dtilStyle = dcd.Style;
		this.dtilX = dcd.x;
		this.dtilY = dcd.y;
		this.dtilCX = dcd.cx;
		this.dtilCY = dcd.cy;
		this.dtilID = dcd.id;
		this.dtilClass = dcd.szClass;
        this.dtilText = dcd.szText;
        this.groupNumber = dcd.groupNumber;
	}
}

export class DCD {
	x: number;
	y: number;
	cx: number;
	cy: number;
	id: number;
	Style: number;
	szClass: string;
	szText: string;
    groupNumber: number;
	constructor() {
		this.init();
	}

	init(): void {
		this.x = 0;
		this.y = 0;
		this.cx = 0;
		this.cy = 0;
		this.id = 0;
		this.Style = 0;
		this.szClass = "";
        this.szText = "";
        this.groupNumber = 0;
	}
}

export class ECD {
	// One of these: # $ %
	labtype: string;
	id: number;
	lablen: number;
	lab: string;
	// control style
	Style: number;
	// control extra style. See repadds.h.
	ExStyle: EXSTYLE;
	iLimit: number;
	iDropDownState: number;
	Data: string;
    
    constructor() {
		this.init();
	}

	init(): void {
		this.labtype = "";
		this.id = 0;
		this.lablen = 0;
		this.lab = "";
		this.Style = 0;
		this.ExStyle = new EXSTYLE();
		this.iLimit = 0;
		this.iDropDownState = 0;
		this.Data = "";
	}
    public HasExStyle(exStyle: number): boolean {
		return (this.ExStyle.xs & exStyle) !== 0;
	}

	public HasStyle(style: number): boolean {
		return (this.Style & style) !== 0;
	}
}

export function ecdHasStyle(ecd: ECD, style: number): boolean{
    return (ecd.Style & style) !== 0;
}

export function ecdHasExStyle(ecd: ECD, style: number): boolean{
    return (ecd.ExStyle.xs & style) !== 0;
}

export class EXSTYLE {
	xs: number;
	constructor(xs: number = 0) {
		this.xs = xs;
	}
}

export function ChartDlgProc(message: any){
    
}

export function SettingDlgProc(message: any){
	switch(message.options.dtlID){
		case 600:
			message.options.items = ReportingData.getMBSFacesetting();
			break;
		case 601:
			message.options.items = ReportingData.getTIPSFacesetting();
			break;
	}
}

export function DialogProc(message: any){
		console.warn(message);
        switch(message.options.dtlID){
            case 100:
                var dlg = message.pageContext.service.getSettingDialog();
                message.pageContext.ui.children.push(dlg);
                message.options.modal = "modal";
                message.options.target = "#Report_Setting";
                break;
            case 400:
				//console.warn(message.checked);
                if(message.checked === true){
                    var dlg = message.pageContext.service.getSummaryChartUILayout();
                    message.pageContext.ui.children.push(dlg);
                    message.options.modal = "modal";
                    message.options.target = "#myportfolio_chart";
                }
                else{
                    message.pageContext.ui.children.pop();
                }
				//console.warn(message.pageContext.ui.);
                break;
            case 502:
                message.options.items = ReportingData.getPortfoliolist();
                break;
            case 510:
                message.options.items = ReportingData.getReportingCurrencyList();
                break;
            case 511:
                var naccfee = message.pageContext.service.findControl("accfee");
                naccfee.options.disabled = false;
                break;
            case 512:
                var accfee = message.pageContext.service.findControl("accfee");
                accfee.options.disabled = true;
                break;
            case 520:
                message.options.items = ReportingData.getSecurityType();
                break;
            case 521:
                message.options.items = [];
                var secType = message.pageContext.service.findControl("sectype");
                console.warn(secType.options.items);
                if(secType.options.items === undefined){
                }
                else{
                    console.warn('change sec symbol');
                    if(secType.options.selectedIndex === undefined){
                        secType.options.selectedIndex = 0;
                    }
                    console.warn(secType);
                    let sect: string = secType.options.items[secType.options.selectedIndex].value;
                    message.options.items = ReportingData.getSecuritySymbol(sect);
                }
                break;
            default:
                console.warn(message);
                break;
        }
}