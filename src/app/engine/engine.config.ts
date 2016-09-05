import { ReportsPage } from './pages/page-reports';
import { SSRSReportPage } from './pages/page-ssrs-report';
import { PortfolioReportPage } from './pages/page-portfolio-report';
import { ReportOutputPage } from './pages/page-report-output';


export const EngineConfig: Array<Object> = [ 

	{ pageId: -3931, builder: ReportsPage },
	{ pageId: -3979, builder: SSRSReportPage },
	{ pageId: -3973, builder: PortfolioReportPage },
	{ pageId: -3939, builder: ReportOutputPage }
];
