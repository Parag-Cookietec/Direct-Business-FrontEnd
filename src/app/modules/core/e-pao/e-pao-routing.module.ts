import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BankRateMasterListingComponent } from './bank-rate-master-listing/bank-rate-master-listing.component';
import { BankRateMasterComponent } from './bank-rate-master/bank-rate-master.component';

import { GstFileAccountingListingComponent } from './gst-file-accounting-listing/gst-file-accounting-listing.component';
import { FileSummaryComponent } from './file-summary/file-summary.component';
import { BlockCpinReportComponent } from './reports/block-cpin-report/block-cpin-report.component';
import { GstnVsRbiReconciliationReportComponent } from './reports/gstn-vs-rbi-reconciliation-report/gstn-vs-rbi-reconciliation-report.component';
import { RsrReportComponent } from './reports/rsr-report/rsr-report.component';
import { ManualAccReportComponent } from './reports/manual-acc-report/manual-acc-report.component';
import { CrossUtilAppOfIgstReportComponent } from './reports/cross-util-app-of-igst-report/cross-util-app-of-igst-report.component';
import { VoucherDetailReportComponent } from './reports/voucher-detail-report/voucher-detail-report.component';
import { CpinDetailReportComponent } from './reports/cpin-detail-report/cpin-detail-report.component';
import { CinDetailsReportComponent } from './reports/cin-details-report/cin-details-report.component';
import { CinStatusReportComponent } from './reports/cin-status-report/cin-status-report.component';
import { EodCpinDetailReportComponent } from './reports/eod-cpin-detail-report/eod-cpin-detail-report.component';
import { MoeTrackingReportComponent } from './reports/moe-tracking-report/moe-tracking-report.component';
import { SumRecSubRegReportComponent } from './reports/sum-rec-sub-reg-report/sum-rec-sub-reg-report.component';
import { RbdReportComponent } from './reports/rbd-report/rbd-report.component';
import { SupplementaryAccountReportComponent } from './reports/supplementary-account-report/supplementary-account-report.component';
import { SummaryPenalInterestReportComponent } from './reports/summary-penal-interest-report/summary-penal-interest-report.component';
import { SuspensePlusMinusReportComponent } from './reports/suspense-plus-minus-report/suspense-plus-minus-report.component';
import { PenalInterestReportComponent } from './reports/penal-interest-report/penal-interest-report.component';
import { ComparativeReceiptsReportComponent } from './reports/comparative-receipts-report/comparative-receipts-report.component';
import { ModeWiseTaxpayerReportComponent } from './reports/mode-wise-taxpayer-report/mode-wise-taxpayer-report.component';
import { ConsolidatedPaymentReportSummaryComponent } from './reports/consolidated-payment-report-summary/consolidated-payment-report-summary.component';
import { ConsolidatedSummaryReceiptReportComponent } from './reports/consolidated-summary-receipt-report/consolidated-summary-receipt-report.component';
import { PenalInterestReportTcComponent } from './reports/penal-interest-report-tc/penal-interest-report-tc.component';
import { FileSummaryReportComponent } from './reports/file-summary-report/file-summary-report.component';
import { SuspenseAccMonitoringReportComponent } from './reports/suspense-acc-monitoring-report/suspense-acc-monitoring-report.component';
import { EodCinDetailsReportComponent } from './reports/eod-cin-details-report/eod-cin-details-report.component';
import { RbiAccStatReportComponent } from './reports/rbi-acc-stat-report/rbi-acc-stat-report.component';
import { RbiScrollFileReportComponent } from './reports/rbi-scroll-file-report/rbi-scroll-file-report.component';
import { RbiScrollWiseMonitoringReportComponent } from './reports/rbi-scroll-wise-monitoring-report/rbi-scroll-wise-monitoring-report.component';
import { RbiEScrollWiseStatusReportComponent } from './reports/rbi-e-scroll-wise-status-report/rbi-e-scroll-wise-status-report.component';
import { DetailedTrnsRegCinReportComponent } from './reports/detailed-trns-reg-cin-report/detailed-trns-reg-cin-report.component';
import { RegularCinDataReportComponent } from './reports/regular-cin-data-report/regular-cin-data-report.component';
import { RbiScrollVsStatementReportComponent } from './reports/rbi-scroll-vs-statement-report/rbi-scroll-vs-statement-report.component';
import { EodWiseCpinEodReportComponent } from './reports/eod-wise-cpin-eod-report/eod-wise-cpin-eod-report.component';
import { DateWiseCinDataReportComponent } from './reports/date-wise-cin-data-report/date-wise-cin-data-report.component';
import { CinEodcinDiffReportComponent } from './reports/cin-eodcin-diff-report/cin-eodcin-diff-report.component';
import { FileReceivedReportComponent } from './reports/file-received-report/file-received-report.component';
import { TopNTaxpayerReportComponent } from './reports/top-n-taxpayer-report/top-n-taxpayer-report.component';
import { RegularEodcinDataReportComponent } from './reports/regular-eodcin-data-report/regular-eodcin-data-report.component';
import { WorkloadReportComponent } from './reports/workload-report/workload-report.component';
import { PerformanceMonitoringReportComponent } from './reports/performance-monitoring-report/performance-monitoring-report.component';
import { BlockCpinComponent } from './block-cpin/block-cpin.component';
import { CinCpinStatusComponent } from './cin-cpin-status/cin-cpin-status.component';
import { GstFileAccountingComponent } from './gst-file-accounting/gst-file-accounting.component';
import { BlockCpinListingComponent } from './block-cpin-listing/block-cpin-listing.component';
import { LoadBalancerHaComponent } from './load-balancer-ha/load-balancer-ha.component';
import { ChallanDistributionComponent } from './challan-distribution/challan-distribution.component';
import { ChallanDistributionListingComponent } from './challan-distribution-listing/challan-distribution-listing.component';
import { ScollDstributionComponent } from './scoll-dstribution/scoll-dstribution.component';
import { ScrollDistributionListingComponent } from './scroll-distribution-listing/scroll-distribution-listing.component';
import { CinStatusReportChallanComponent } from './reports/cin-status-report-challan/cin-status-report-challan.component';
import { GstnRbiDataReportComponent } from './reports/gstn-rbi-data-report/gstn-rbi-data-report.component';
import { GstnDataReportComponent } from './reports/gstn-data-report/gstn-data-report.component';
import { DateWiseGstnRbiDataReportComponent } from './reports/date-wise-gstn-rbi-data-report/date-wise-gstn-rbi-data-report.component';
import { GstnDetailedReportComponent } from './reports/gstn-detailed-report/gstn-detailed-report.component';
import { ConsolidatedReceiptReportExpandedComponent } from './reports/consolidated-receipt-report-expanded/consolidated-receipt-report-expanded.component';
import { ConsolidatedPaymentReportExpandedComponent } from './reports/consolidated-payment-report-expanded/consolidated-payment-report-expanded.component';
import { LoadBalancerAoComponent } from './load-balancer-ao/load-balancer-ao.component';
import { AccountingScreenComponent } from './accounting-screen/accounting-screen.component';
import { AccountingScreenListingComponent } from './accounting-screen-listing/accounting-screen-listing.component';
import { PenaltyAmountReceiveComponent } from './penalty-amount-receive/penalty-amount-receive.component';
import { PenaltyAmountReceiveListingComponent } from './penalty-amount-receive/penalty-amount-receive-listing/penalty-amount-receive-listing.component';
import { ManualEntryMasterComponent } from './manual-entry/manual-entry-master/manual-entry-master.component';
import { ManualEntryMasterListingComponent } from './manual-entry/manual-entry-master/manual-entry-master-listing/manual-entry-master-listing.component';
import { GenereateMoeComponent } from './genereate-moe/genereate-moe.component';
import { GenerateModeListingComponent } from './generate-mode-listing/generate-mode-listing.component';
import { EPAOCommonWorkflowComponent } from './epao-common-workflow/epao-common-workflow.component';
import { LoadBalancerHaListingComponent } from './load-balancer-ha-listing/load-balancer-ha-listing.component';
import { LoadBalancerAoListingComponent } from './load-balancer-ao-listing/load-balancer-ao-listing.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'bank-rate-master',
                component: BankRateMasterComponent
            },
            {
                path: 'bank-rate-master-listing',
                component: BankRateMasterListingComponent
            },
            {
                path: 'gst-file-accounting',
                component: GstFileAccountingComponent
            },
            {
                path: 'gst-file-accounting-listing',
                component: GstFileAccountingListingComponent
            },
            {
                path: 'file-summary',
                component: FileSummaryComponent
            },
            {
                path: 'block-cpin',
                component: BlockCpinComponent
            },
            {
                path: 'block-cpin-listing',
                component: BlockCpinListingComponent
            },
            {
                path: 'cin-cpin-status',
                component: CinCpinStatusComponent
            },
            {
                path: 'load-balancer/ha',
                component: LoadBalancerHaComponent
            },
            {
                path: 'challan-distribution',
                component: ChallanDistributionComponent
            },
            {
                path: 'challan-distribution-listing',
                component: ChallanDistributionListingComponent
            },
            {
                path: 'scroll-distribution',
                component: ScollDstributionComponent
            },
            {
                path: 'scroll-distribution-listing',
                component: ScrollDistributionListingComponent
            },
            {
                path: 'load-balancer/ha-listing',
                component: LoadBalancerHaListingComponent
            },
            {
                path: 'load-balancer/ao',
                component: LoadBalancerAoComponent
            },
            {
                path: 'load-balancer/ao-listing',
                component: LoadBalancerAoListingComponent
            },
            {
                path: 'reports/detail/block-cpin-report', //Block CPin Report
                component: BlockCpinReportComponent
            },
            {
                path: 'reports/gstn-vs-rbi-reconcil-report',
                component: GstnVsRbiReconciliationReportComponent
            },
            {
                path: 'reports/accounting/rec-sub-Reg-report',
                component: RsrReportComponent
            },
            {
                path: 'reports/accounting/manual-acc-report', //Manual Accounting report
                component: ManualAccReportComponent
            },
            {
                path: 'reports/accounting/cross-util-igst-report',
                component: CrossUtilAppOfIgstReportComponent
            },
            {
                path: 'reports/accounting/voucher-detail-report', //Voucher Details Report
                component: VoucherDetailReportComponent
            },
            {
                path: 'reports/detail/cpin-detail-report', //CPIN details report
                component: CpinDetailReportComponent
            },
            {
                path: 'reports/detail/cin-detail-report', //CIN details report
                component: CinDetailsReportComponent
            },
            {
                path: 'reports/detail/cin-status-report', //Challan status consolidated report - CIN
                component: CinStatusReportComponent
            },
            {
                path: 'reports/detail/cin-challan-status-report', //Challan status report
                component: CinStatusReportChallanComponent
            },
            {
                path: 'reports/detail/eod-cpin-detail-report', //EOD CPIN details report
                component: EodCpinDetailReportComponent
            },
            {
                path: 'reports/accounting/moe-tracking-report', //MOE_TRACKING_GENERATE_REPORT
                component: MoeTrackingReportComponent
            },
            {
                path: 'reports/accounting/sum-rec-sub-Reg-report',
                component: SumRecSubRegReportComponent
            },
            {
                path: 'reports/accounting/rbd-register-report',
                component: RbdReportComponent
            },
            {
                path: 'reports/accounting/sup-acc-report',
                component: SupplementaryAccountReportComponent
            },
            {
                path: 'reports/accounting/summary-penal-interest-report', //Summary Penal Interest Report
                component: SummaryPenalInterestReportComponent
            },
            {
                path: 'reports/accounting/suspense-plus-minus-report',
                component: SuspensePlusMinusReportComponent
            },
            {
                path: 'reports/accounting/penal-interest-report',
                component: PenalInterestReportComponent
            },
            {
                path: 'reports/accounting/comparative-rec-report',
                component: ComparativeReceiptsReportComponent
            },
            {
                path: 'reports/mis/mode-wise-taxpayer-report', //Cin Modewise Taxpayer Report
                component: ModeWiseTaxpayerReportComponent
            },
            {
                path: 'reports/mis/consolidated-pay-report-summary',
                component: ConsolidatedPaymentReportSummaryComponent
            },
            {
                path: 'reports/mis/consolidated-summary-receipt-report',
                component: ConsolidatedSummaryReceiptReportComponent
            },
            {
                path: 'reports/accounting/penal-interest-tc-report',
                component: PenalInterestReportTcComponent
            },
            {
                path: 'reports/monitoring/file-summary-report', //File Summary Report
                component: FileSummaryReportComponent
            },
            {
                path: 'reports/monitoring/sus-acc-monitoring-report',
                component: SuspenseAccMonitoringReportComponent
            },
            {
                path: 'reports/monitoring/eod-cin-details-report', //EODCIN details report
                component: EodCinDetailsReportComponent
            },
            {
                path: 'reports/monitoring/rbi-acc-st-report',
                component: RbiAccStatReportComponent
            },
            {
                path: 'reports/details/rbi-scroll-file-report', //RBI Scroll Details Report
                component: RbiScrollFileReportComponent
            },
            {
                path: 'reports/monitoring/rbi-scroll-wise-monitoring-report', //RBI_DAYWISE_SCROLL_MONITORING
                component: RbiScrollWiseMonitoringReportComponent
            },
            {
                path: 'reports/monitoring/rbi-e-scroll-wise-status-report',
                component: RbiEScrollWiseStatusReportComponent
            },
            {
                path: 'reports/discrepancy/dtl-trans-regu-cin-report', //Cin Vs EodCin - Transaction wise details
                component: DetailedTrnsRegCinReportComponent
            },
            {
                path: 'reports/discrepancy/gstn-rbi-data-report', // Gstn Vs RBI Challan Count Report
                component: GstnRbiDataReportComponent
            },
            {
                path: 'reports/discrepancy/gstn-data-report', //Gstn Daywise Challan Count Report
                component: GstnDataReportComponent
            },
            {
                path: 'reports/discrepancy/gstn-detailed-report',
                component: GstnDetailedReportComponent
            },
            {
                path: 'reports/discrepancy/conslidated-rcpt-report',
                component: ConsolidatedReceiptReportExpandedComponent
            },
            {
                path: 'reports/discrepancy/conslidated-Payment-report',
                component: ConsolidatedPaymentReportExpandedComponent
            },
            {
                path: 'reports/discrepancy/date-wise-gstn-rbi-data-report', // GSTN File Sumary Report
                component: DateWiseGstnRbiDataReportComponent
            },
            {
                path: 'reports/discrepancy/reg-cin-data-report', //Cin Vs EodCin - Day wise CIN details
                component: RegularCinDataReportComponent
            },
            {
                path: 'reports/discrepancy/rbi-scroll-vs-acc-st-report', // RBI SCROLL STMNT DATEWISE REPORT
                component: RbiScrollVsStatementReportComponent
            },
            {
                path: 'reports/discrepancy/eod-wise-cpin-eod-report',
                component: EodWiseCpinEodReportComponent
            },
            {
                path: 'reports/discrepancy/date-wise-cin-data-report', //Cin Vs EodCin - Day wise drill down
                component: DateWiseCinDataReportComponent
            },
            {
                path: 'reports/discrepancy/cin-vs-eodcin-data-report', //Cin Vs EodCin - Difference drill down
                component: CinEodcinDiffReportComponent
            },
            {
                path: 'reports/details/file-rec-report', //File Received Report
                component: FileReceivedReportComponent
            },
            {
                path: 'reports/mis/top-n-taxpayer-report',
                component: TopNTaxpayerReportComponent
            },
            {
                path: 'reports/discrepancy/reg-eod-cin-data-report', //Cin Vs EodCin - Day wise EODCIN details
                component: RegularEodcinDataReportComponent
            },
            {
                path: 'reports/monitoring/work-load-report',
                component: WorkloadReportComponent
            },
            {
                path: 'reports/monitoring/performance-monitoring-report',
                component: PerformanceMonitoringReportComponent
            },
            {
                path: 'penalty-amount-receive',
                component: PenaltyAmountReceiveComponent
            },
            {
                path: 'penalty-amount-receive-listing',
                component: PenaltyAmountReceiveListingComponent
            },
            {
                path: 'manual-entry/manual-entry-master',
                component: ManualEntryMasterComponent
            },
            {
                path: 'manual-entry/manual-entry-master-listing',
                component: ManualEntryMasterListingComponent
            },
            {
                path: 'generate-moe',
                component: GenereateMoeComponent
            },
            {
                path: 'generate-moe-listing',
                component: GenerateModeListingComponent
            },
            {
                path: 'account-screen',
                component: AccountingScreenComponent
            },
            {
                path: 'account-screen-listing',
                component: AccountingScreenListingComponent
            },
            {
                path: 'workflow',
                component: EPAOCommonWorkflowComponent

            }
        ]
    }
    // {
    //     path: 'branch-ha-maping',
    //     component: BranchHaMappingComponent
    // },
    // {
    //     path: 'branch-sa-da-maping',
    //     component: BranchSaDaMappingComponent
    // },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EPaoRoutingModule { }
