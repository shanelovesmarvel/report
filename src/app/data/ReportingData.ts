import * as rep8 from '../RepTS/rep8';

export  class ReportingData{
    public static getPortfoliolist(): any{
        return ([
                {
                    "value": "master",
                    "text": "@master"
                },
                {
                    "value": "guest",
                    "text": "@guest"
                },
                {
                    "value": "admin",
                    "text": "@admin"
                },
                {
                    "value": "super",
                    "text": "super"
                },
                {
                    "value": "supercli",
                    "text": "supercli"
                },
                {
                    "value": "testRex",
                    "text": "testRex"
                },
                {
                    "value": "cmo-test",
                    "text": "cmo-test"
                },
                {
                    "value": "TIPSPORTFolio",
                    "text": "TIPSPORTFolio"
                }
            ]);
    }

    public static getLookupList(filter: string): any{
        if(filter === 'currecy'){
            return this.getReportingCurrencyList();
        }        
    }

    public static getReportingCurrencyList(): any{
        return (
            [ 
                {
                    "value": "us",
                    "text": "us"
                },
                {
                    "value": "fr",
                    "text": "fr"
                },
                {
                    "value": "eu",
                    "text": "eu"
                },
                {
                    "value": "eu",
                    "text": "eu"
                },
                {
                    "value": "eu",
                    "text": "eu"
                },
                {
                    "value": "ca",
                    "text": "ca"
                },
                {
                    "value": "de",
                    "text": "de"
                },
                {
                    "value": "au",
                    "text": "au"
                },
                {
                    "value": "bk",
                    "text": "bk"
                },
                {
                    "value": "vr",
                    "text": "vr"
                }
             ]
        );
    }

    public static getSecurityType(): any{
        return (
            [ 
                {
                    "value": "csus",
                    "text": "csus"
                },
                {
                    "value": "cbus",
                    "text": "cbus"
                },
                {
                    "value": "cmus",
                    "text": "cmus"
                },
                {
                    "value": "csde",
                    "text": "csde"
                },
                {
                    "value": "cbde",
                    "text": "cbde"
                },
                {
                    "value": "cmde",
                    "text": "cmde"
                },
                {
                    "value": "psus",
                    "text": "psus"
                },
                {
                    "value": "psde",
                    "text": "psde"
                },
                {
                    "value": "psau",
                    "text": "psau"
                }
             ]
        );
    }

    public static getMBSFacesetting(): any{
        return (
            [ 
                {
                    "value": "0",
                    "text": "<Use Settings>"
                },
                {
                    "value": "UCF",
                    "text": "Use current face"
                },
                {
                    "value": "UOF",
                    "text": "Use original face"
                }
            ]);
    }

    public static getTIPSFacesetting(): any{
        return (
            [ 
                {
                    "value": "0",
                    "text": "<Use Settings>"
                },
                {
                    "value": "UAF",
                    "text": "Use Adjusted face"
                },
                {
                    "value": "UOF",
                    "text": "Use original face"
                }
            ]);
    }

    public static getSecuritySymbol(secType: string): any{
        switch (secType){
            case 'csus':
                return(
                    [
                        {
                            "value": "ibm",
                            "text": "ibm"
                        },
                        {
                            "value": "advs",
                            "text": "advs"
                        },
                        {
                            "value": "aapl",
                            "text": "aapl"
                        }
                    ]
                );
            case 'cbus':
                return(
                    [
                        {
                            "value": "45678",
                            "text": "45678"
                        },
                        {
                            "value": "ibmcbus",
                            "text": "ibmcbus"
                        },
                        {
                            "value": "aaintel",
                            "text": "aaintel"
                        }
                    ]
                );
            default:
                alert('cannot get security by the sec type');
                break;
        }
    }

    public static getpsumJson(): any{
        let rect: rep8.RECT = new rep8.RECT();
        rect.right = 186;
        rect.bottom = 332;
        return this.getpsum();
        //console.warn(rr);
        //let result: rep8.ReportDialog = JSON.parse(rr);
        // new rep8.ReportDialog(rect, 'Appraisal');

        /*for(let i: number = 0; i<26; i++){
            let dcd = new rep8.DCD();
            let mresult = new rep8.MYDLGITEMTEMPLATE(dcd);
            result.m_DLGITEMTEMPLATE.push(mresult);            
        }

        for(let i: number = 0; i<13; i++){
            let mEcd = new rep8.ECD();
            mEcd.id = 500 + i;
            result.m_ECD.push(mEcd);
        }*/
        //return result;
    }

    private static getpsum(): any{
        return (
            {"m_MYDLGTEMPLATE":{"caption":"Portfolio Summary","dtX":0,"dtY":0,"dtCX":186,"dtCY":332},"m_DLGITEMTEMPLATE":[{"dtilStyle":33554432,"dtilX":4,"dtilY":4,"dtilCX":20,"dtilCY":96,"dtilID":500,"dtilClass":"STATIC","dtilText":"This report displays portfolio holdings by foreign currency, security type, industry sector, industry group, and individual security as of a selected date. Values include unit and total cost, market price and value, percentage of portfolio, and yield. \n","groupNumber":1},{"dtilStyle":33554436,"dtilX":4,"dtilY":107,"dtilCX":30,"dtilCY":8,"dtilID":501,"dtilClass":"STATIC","dtilText":"&Portfolio","groupNumber":2},{"dtilStyle":268438400,"dtilX":42,"dtilY":105,"dtilCX":84,"dtilCY":78,"dtilID":502,"dtilClass":"COMBOBOX","dtilText":"","groupNumber":2},{"dtilStyle":16,"dtilX":4,"dtilY":124,"dtilCX":84,"dtilCY":34,"dtilID":503,"dtilClass":"BUTTON","dtilText":"Calculate Performance","groupNumber":3},{"dtilStyle":134,"dtilX":7,"dtilY":135,"dtilCX":54,"dtilCY":10,"dtilID":504,"dtilClass":"Button","dtilText":"&Net of Fees","groupNumber":3},{"dtilStyle":2,"dtilX":7,"dtilY":145,"dtilCX":59,"dtilCY":10,"dtilID":505,"dtilClass":"Button","dtilText":"Gr&oss of Fees","groupNumber":3},{"dtilStyle":133,"dtilX":4,"dtilY":163,"dtilCX":78,"dtilCY":10,"dtilID":506,"dtilClass":"Button","dtilText":"Accr&ue Fees","groupNumber":4},{"dtilStyle":16,"dtilX":4,"dtilY":178,"dtilCX":85,"dtilCY":46,"dtilID":507,"dtilClass":"BUTTON","dtilText":"Date Range","groupNumber":5},{"dtilStyle":33554436,"dtilX":8,"dtilY":190,"dtilCX":20,"dtilCY":8,"dtilID":508,"dtilClass":"STATIC","dtilText":"&From","groupNumber":5},{"dtilStyle":268436096,"dtilX":29,"dtilY":189,"dtilCX":56,"dtilCY":103,"dtilID":509,"dtilClass":"COMBOBOX","dtilText":"","groupNumber":5},{"dtilStyle":33554436,"dtilX":8,"dtilY":209,"dtilCX":20,"dtilCY":8,"dtilID":510,"dtilClass":"STATIC","dtilText":"&To","groupNumber":5},{"dtilStyle":268436096,"dtilX":29,"dtilY":207,"dtilCX":56,"dtilCY":96,"dtilID":511,"dtilClass":"COMBOBOX","dtilText":"","groupNumber":5},{"dtilStyle":16,"dtilX":4,"dtilY":229,"dtilCX":84,"dtilCY":34,"dtilID":512,"dtilClass":"BUTTON","dtilText":"Calculate Performance","groupNumber":6},{"dtilStyle":134,"dtilX":7,"dtilY":240,"dtilCX":54,"dtilCY":10,"dtilID":513,"dtilClass":"Button","dtilText":"&Net of Fees","groupNumber":6},{"dtilStyle":2,"dtilX":7,"dtilY":250,"dtilCX":59,"dtilCY":10,"dtilID":514,"dtilClass":"Button","dtilText":"Gr&oss of Fees","groupNumber":6},{"dtilStyle":133,"dtilX":4,"dtilY":268,"dtilCX":78,"dtilCY":10,"dtilID":515,"dtilClass":"Button","dtilText":"Accr&ue Fees","groupNumber":7},{"dtilStyle":33554436,"dtilX":4,"dtilY":285,"dtilCX":64,"dtilCY":8,"dtilID":516,"dtilClass":"STATIC","dtilText":"Reporting &Currency","groupNumber":8},{"dtilStyle":268438144,"dtilX":68,"dtilY":283,"dtilCX":58,"dtilCY":78,"dtilID":517,"dtilClass":"COMBOBOX","dtilText":"","groupNumber":8},{"dtilStyle":133,"dtilX":4,"dtilY":302,"dtilCX":34,"dtilCY":10,"dtilID":518,"dtilClass":"Button","dtilText":"Cha&rt","groupNumber":9},{"dtilStyle":133,"dtilX":8,"dtilY":317,"dtilCX":124,"dtilCY":10,"dtilID":519,"dtilClass":"Button","dtilText":"Include &Unsupervised Assets","groupNumber":11},{"dtilStyle":140,"dtilX":136,"dtilY":4,"dtilCX":42,"dtilCY":16,"dtilID":1,"dtilClass":"Button","dtilText":"OK","groupNumber":12},{"dtilStyle":128,"dtilX":136,"dtilY":25,"dtilCX":42,"dtilCY":16,"dtilID":2,"dtilClass":"Button","dtilText":"Cancel","groupNumber":12},{"dtilStyle":128,"dtilX":136,"dtilY":46,"dtilCX":42,"dtilCY":16,"dtilID":12,"dtilClass":"Button","dtilText":"&Help","groupNumber":12},{"dtilStyle":192,"dtilX":136,"dtilY":67,"dtilCX":42,"dtilCY":16,"dtilID":13,"dtilClass":"BUTTON","dtilText":"Consolidat&e","groupNumber":13},{"dtilStyle":192,"dtilX":136,"dtilY":88,"dtilCX":42,"dtilCY":16,"dtilID":14,"dtilClass":"BUTTON","dtilText":"&Browse","groupNumber":14},{"dtilStyle":192,"dtilX":136,"dtilY":109,"dtilCX":42,"dtilCY":16,"dtilID":16,"dtilClass":"BUTTON","dtilText":"Settin&gs","groupNumber":15}],"m_ECD":[{"labtype":"$","id":500,"lablen":7,"lab":"_asdtxt","Style":33554432,"ExStyle":{"xs":8},"iLimit":0,"iDropDownState":0,"Data":"$_asdtxt1"},{"labtype":"$","id":502,"lablen":7,"lab":"askport","Style":268438400,"ExStyle":{"xs":34},"iLimit":0,"iDropDownState":0,"Data":""},{"labtype":"$","id":504,"lablen":7,"lab":"perffee","Style":134,"ExStyle":{"xs":67108868},"iLimit":0,"iDropDownState":0,"Data":"y"},{"labtype":"$","id":505,"lablen":7,"lab":"perffee","Style":2,"ExStyle":{"xs":69206020},"iLimit":0,"iDropDownState":0,"Data":"n"},{"labtype":"$","id":506,"lablen":7,"lab":"_accfee","Style":133,"ExStyle":{"xs":257},"iLimit":0,"iDropDownState":0,"Data":"n"},{"labtype":"%","id":509,"lablen":5,"lab":"date1","Style":268436096,"ExStyle":{"xs":66},"iLimit":0,"iDropDownState":0,"Data":""},{"labtype":"%","id":511,"lablen":7,"lab":"cutdate","Style":268436096,"ExStyle":{"xs":66},"iLimit":0,"iDropDownState":0,"Data":""},{"labtype":"$","id":513,"lablen":7,"lab":"perffee","Style":134,"ExStyle":{"xs":67108868},"iLimit":0,"iDropDownState":0,"Data":"y"},{"labtype":"$","id":514,"lablen":7,"lab":"perffee","Style":2,"ExStyle":{"xs":69206020},"iLimit":0,"iDropDownState":0,"Data":"n"},{"labtype":"$","id":515,"lablen":7,"lab":"_accfee","Style":133,"ExStyle":{"xs":257},"iLimit":0,"iDropDownState":0,"Data":"n"},{"labtype":"$","id":517,"lablen":2,"lab":"fx","Style":268438144,"ExStyle":{"xs":134217730},"iLimit":0,"iDropDownState":0,"Data":""},{"labtype":"$","id":518,"lablen":6,"lab":"_graph","Style":133,"ExStyle":{"xs":16777473},"iLimit":0,"iDropDownState":0,"Data":""},{"labtype":"$","id":519,"lablen":6,"lab":"_useun","Style":133,"ExStyle":{"xs":257},"iLimit":0,"iDropDownState":0,"Data":"[SUB] M"}]}
        );
    }
}