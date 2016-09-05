
// This page is just to layout some buttons.
// No specfied report layout .
// Report layout will be generated dynamically.
export const page_reports_layout: Object = {
    children: [
        {
            type: "myDialogButton",
            options: {
                id: "openSummaryDialog",
                label: "Run Portfolio Summary Report",
                modal: "modal",
                target: "#Portfolio_Summary",
                backdrop: "static",
                keyboard: true,
                click: function (context) {
                    var summaryDialog = context.pageContext.service.getSummaryUILayout();
                    context.pageContext.ui.children.push(summaryDialog);
                }
            }
        },
        {
            type: "myDialogButton",
            options: {
                id: "openSSRSDialog",
                label: "Run SSRS Report",
                modal: "modal",
                target: "#ssrs_report",
                backdrop: false,
                keyboard: true,
                click: function (context) {
                    var summaryDialog = context.pageContext.service.getSSRSUILayout();
                    context.pageContext.ui.children.push(summaryDialog);
                }
            }
        }
    ]
}