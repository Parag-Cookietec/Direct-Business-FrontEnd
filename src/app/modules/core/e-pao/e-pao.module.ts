import { NgModule } from '@angular/core';
import { EPaoRoutingModule } from './e-pao-routing.module';
import { CommonProtoModule } from '../../../common/common.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { WorkFlowEPaoComponent } from './work-flow-e-pao/work-flow-e-pao.component';
import {
    BankRateMasterComponent,
    BankRateMasterDialogeComponent,
    BankRateMasterEditDialogeComponent
} from './bank-rate-master/bank-rate-master.component';
import { BankRateMasterListingComponent } from './bank-rate-master-listing/bank-rate-master-listing.component';
import {
    GstFileAccountingComponent,
    GstFileAccountingDialogeComponent,
    GstFileSummaryDialogeComponent,
    GstFileVoucherDialogeComponent,
    VoucherPrintDialogeComponent
} from 'src/app/modules/core/e-pao/gst-file-accounting/gst-file-accounting.component';
import {
    GstFileAccountingListingComponent,
    GstFileAccountingListingDialogeComponent,
    GstFileAccountingListingEditDialogeComponent,
    GstFileAccountingListingPrintDialogeComponent
} from './gst-file-accounting-listing/gst-file-accounting-listing.component';
import { FileSummaryComponent } from './file-summary/file-summary.component';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { SharedModule } from '../../../shared/shared.module';
import { BlockCpinReportComponent } from './reports/block-cpin-report/block-cpin-report.component';
import { CinDetailsReportComponent } from './reports/cin-details-report/cin-details-report.component';
import { SupplementaryAccountReportComponent } from './reports/supplementary-account-report/supplementary-account-report.component';
import { RsrReportComponent } from './reports/rsr-report/rsr-report.component';
import { RbdReportComponent } from './reports/rbd-report/rbd-report.component';
import { WorkloadReportComponent } from './reports/workload-report/workload-report.component';
import { SummaryPenalInterestReportComponent } from './reports/summary-penal-interest-report/summary-penal-interest-report.component';
import { SuspensePlusMinusReportComponent } from './reports/suspense-plus-minus-report/suspense-plus-minus-report.component';
import { PenalInterestReportComponent } from './reports/penal-interest-report/penal-interest-report.component';
import { PerformanceMonitoringReportComponent } from './reports/performance-monitoring-report/performance-monitoring-report.component';
import { PenalInterestReportTcComponent } from './reports/penal-interest-report-tc/penal-interest-report-tc.component';
import { SumRecSubRegReportComponent } from './reports/sum-rec-sub-reg-report/sum-rec-sub-reg-report.component';
import { CrossUtilAppOfIgstReportComponent } from './reports/cross-util-app-of-igst-report/cross-util-app-of-igst-report.component';
import { MoeTrackingReportComponent } from './reports/moe-tracking-report/moe-tracking-report.component';
import { ManualAccReportComponent } from './reports/manual-acc-report/manual-acc-report.component';
import { CpinDetailReportComponent } from './reports/cpin-detail-report/cpin-detail-report.component';
import { EodCpinDetailReportComponent } from './reports/eod-cpin-detail-report/eod-cpin-detail-report.component';
import { VoucherDetailReportComponent } from './reports/voucher-detail-report/voucher-detail-report.component';
import { FileSummaryReportComponent } from './reports/file-summary-report/file-summary-report.component';
import { RegularCinDataReportComponent } from './reports/regular-cin-data-report/regular-cin-data-report.component';
import { RegularEodcinDataReportComponent } from './reports/regular-eodcin-data-report/regular-eodcin-data-report.component';
import { DateWiseCinDataReportComponent } from './reports/date-wise-cin-data-report/date-wise-cin-data-report.component';
import { DetailedTrnsRegCinReportComponent } from './reports/detailed-trns-reg-cin-report/detailed-trns-reg-cin-report.component';
import { CinEodcinDiffReportComponent } from './reports/cin-eodcin-diff-report/cin-eodcin-diff-report.component';
import { EodWiseCpinEodReportComponent } from './reports/eod-wise-cpin-eod-report/eod-wise-cpin-eod-report.component';
import { RbiEScrollWiseStatusReportComponent } from './reports/rbi-e-scroll-wise-status-report/rbi-e-scroll-wise-status-report.component';
import { RbiAccStatReportComponent } from './reports/rbi-acc-stat-report/rbi-acc-stat-report.component';
import { ComparativeReceiptsReportComponent } from './reports/comparative-receipts-report/comparative-receipts-report.component';
import { ModeWiseTaxpayerReportComponent } from './reports/mode-wise-taxpayer-report/mode-wise-taxpayer-report.component';
import { ConsolidatedPaymentReportSummaryComponent } from './reports/consolidated-payment-report-summary/consolidated-payment-report-summary.component';
import { ConsolidatedSummaryReceiptReportComponent } from './reports/consolidated-summary-receipt-report/consolidated-summary-receipt-report.component';
import { SuspenseAccMonitoringReportComponent } from './reports/suspense-acc-monitoring-report/suspense-acc-monitoring-report.component';
import { GstnVsRbiReconciliationReportComponent } from './reports/gstn-vs-rbi-reconciliation-report/gstn-vs-rbi-reconciliation-report.component';
import { RbiScrollVsStatementReportComponent } from './reports/rbi-scroll-vs-statement-report/rbi-scroll-vs-statement-report.component';
import { RbiScrollFileReportComponent } from './reports/rbi-scroll-file-report/rbi-scroll-file-report.component';
import { RbiScrollWiseMonitoringReportComponent } from './reports/rbi-scroll-wise-monitoring-report/rbi-scroll-wise-monitoring-report.component';
import { EodCinDetailsReportComponent } from './reports/eod-cin-details-report/eod-cin-details-report.component';
import { TopNTaxpayerReportComponent } from './reports/top-n-taxpayer-report/top-n-taxpayer-report.component';
import { FileReceivedReportComponent } from './reports/file-received-report/file-received-report.component';
import { CinStatusReportComponent } from './reports/cin-status-report/cin-status-report.component';
import { BlockCpinComponent } from './block-cpin/block-cpin.component';
import { CinCpinStatusComponent } from './cin-cpin-status/cin-cpin-status.component';
import {
    BlockCpinListingComponent,
    BlockCpinListingDialogeComponent
} from './block-cpin-listing/block-cpin-listing.component';
import { LoadBalancerHaComponent } from './load-balancer-ha/load-balancer-ha.component';
import { ChallanDistributionComponent } from './challan-distribution/challan-distribution.component';
import { ChallanDistributionListingComponent } from './challan-distribution-listing/challan-distribution-listing.component';
import {
    ScollDstributionComponent,
    ScrollDistributionDialogeComponent,
    ScrollDistributionViewDialogeComponent
} from './scoll-dstribution/scoll-dstribution.component';
import {
    ScrollDistributionListingComponent,
    ScrollDistributionListingDialogeComponent
} from './scroll-distribution-listing/scroll-distribution-listing.component';
import { CinStatusReportChallanComponent } from './reports/cin-status-report-challan/cin-status-report-challan.component';
import { GstnRbiDataReportComponent } from './reports/gstn-rbi-data-report/gstn-rbi-data-report.component';
import { GstnDataReportComponent } from './reports/gstn-data-report/gstn-data-report.component';
import { DateWiseGstnRbiDataReportComponent } from './reports/date-wise-gstn-rbi-data-report/date-wise-gstn-rbi-data-report.component';
import { GstnDetailedReportComponent } from './reports/gstn-detailed-report/gstn-detailed-report.component';
import { ConsolidatedReceiptReportExpandedComponent } from './reports/consolidated-receipt-report-expanded/consolidated-receipt-report-expanded.component';
import { ConsolidatedPaymentReportExpandedComponent } from './reports/consolidated-payment-report-expanded/consolidated-payment-report-expanded.component';
import { ProceedDialogComponent } from './proceed-dialog/proceed-dialog.component';
import { LoadBalancerAoComponent } from './load-balancer-ao/load-balancer-ao.component';
import { AccountingScreenListingComponent } from './accounting-screen-listing/accounting-screen-listing.component';
import { AccountingScreenComponent } from './accounting-screen/accounting-screen.component';
import { PenaltyAmountReceiveComponent } from './penalty-amount-receive/penalty-amount-receive.component';
import { PenaltyAmountReceiveListingComponent } from './penalty-amount-receive/penalty-amount-receive-listing/penalty-amount-receive-listing.component';
import { ManualEntryMasterComponent } from './manual-entry/manual-entry-master/manual-entry-master.component';
import { ManualEntryMasterListingComponent } from './manual-entry/manual-entry-master/manual-entry-master-listing/manual-entry-master-listing.component';
import { GenereateMoeComponent, GSTDialogComponent } from './genereate-moe/genereate-moe.component';
import { GenerateModeListingComponent } from './generate-mode-listing/generate-mode-listing.component';
import { EPAOCommonWorkflowComponent } from './epao-common-workflow/epao-common-workflow.component';
import { LoadBalancerHaListingComponent } from './load-balancer-ha-listing/load-balancer-ha-listing.component';
import { LoadBalancerAoListingComponent } from './load-balancer-ao-listing/load-balancer-ao-listing.component';
import { MoeCommonPopupComponent } from './moe-common-popup/moe-common-popup.component';

const MY_FORMATS = {
    parse: {
        dateInput: 'DD-MMM-YYYY'
    },
    display: {
        dateInput: 'DD-MMM-YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'DD-MMM-YYYY',
        monthYearA11yLabel: 'MMMM YYYY'
    }
};

@NgModule({
    imports: [CommonProtoModule, NgxMatSelectSearchModule, EPaoRoutingModule, SharedModule],
    declarations: [
        // BranchHaMappingComponent,
        // BranchHaDialogComponent,
        ProceedDialogComponent,
        BankRateMasterComponent,
        BankRateMasterDialogeComponent,
        GstFileAccountingDialogeComponent,
        GstFileSummaryDialogeComponent,
        ChallanDistributionComponent,
        ChallanDistributionListingComponent,
        ScollDstributionComponent,
        ScrollDistributionListingComponent,
        ScrollDistributionDialogeComponent,
        ScrollDistributionViewDialogeComponent,
        LoadBalancerAoComponent,
        LoadBalancerAoListingComponent,
        BlockCpinListingDialogeComponent,
        GstFileVoucherDialogeComponent,
        VoucherPrintDialogeComponent,
        GstFileAccountingListingPrintDialogeComponent,
        BankRateMasterEditDialogeComponent,
        BankRateMasterListingComponent,
        GstFileAccountingComponent,
        LoadBalancerHaComponent,
        LoadBalancerHaListingComponent,
        GstFileAccountingListingComponent,
        WorkFlowEPaoComponent,
        FileSummaryComponent,
        BlockCpinReportComponent,
        CinDetailsReportComponent,
        RsrReportComponent,
        SupplementaryAccountReportComponent,
        RbdReportComponent,
        WorkloadReportComponent,
        SummaryPenalInterestReportComponent,
        SuspensePlusMinusReportComponent,
        PenalInterestReportComponent,
        PerformanceMonitoringReportComponent,
        PenalInterestReportTcComponent,
        SumRecSubRegReportComponent,
        CrossUtilAppOfIgstReportComponent,
        MoeTrackingReportComponent,
        ManualAccReportComponent,
        CpinDetailReportComponent,
        EodCpinDetailReportComponent,
        BlockCpinReportComponent,
        VoucherDetailReportComponent,
        FileSummaryReportComponent,
        RegularCinDataReportComponent,
        RegularEodcinDataReportComponent,
        DateWiseCinDataReportComponent,
        DetailedTrnsRegCinReportComponent,
        CinEodcinDiffReportComponent,
        EodWiseCpinEodReportComponent,
        RbiEScrollWiseStatusReportComponent,
        RbiAccStatReportComponent,
        ComparativeReceiptsReportComponent,
        ModeWiseTaxpayerReportComponent,
        ConsolidatedPaymentReportSummaryComponent,
        ConsolidatedSummaryReceiptReportComponent,
        SuspenseAccMonitoringReportComponent,
        GstnVsRbiReconciliationReportComponent,
        RbiScrollVsStatementReportComponent,
        RbiScrollFileReportComponent,
        RbiScrollWiseMonitoringReportComponent,
        EodCinDetailsReportComponent,
        TopNTaxpayerReportComponent,
        FileReceivedReportComponent,
        CinDetailsReportComponent,
        CinStatusReportComponent,
        CinStatusReportChallanComponent,
        BlockCpinComponent,
        GstFileAccountingListingDialogeComponent,
        GstFileAccountingListingEditDialogeComponent,
        CinCpinStatusComponent,
        BlockCpinListingComponent,
        GstnRbiDataReportComponent,
        GstnDataReportComponent,
        DateWiseGstnRbiDataReportComponent,
        GstnDetailedReportComponent,
        ConsolidatedReceiptReportExpandedComponent,
        ConsolidatedPaymentReportExpandedComponent,
        ScrollDistributionListingDialogeComponent,
        AccountingScreenComponent,
        AccountingScreenListingComponent,
        PenaltyAmountReceiveComponent,
        PenaltyAmountReceiveListingComponent,
        ManualEntryMasterComponent,
        ManualEntryMasterListingComponent,
        GenerateModeListingComponent,
        GenereateMoeComponent,
        GSTDialogComponent,
        EPAOCommonWorkflowComponent,
        MoeCommonPopupComponent,

    ],
    entryComponents: [
        MoeCommonPopupComponent,
        BankRateMasterDialogeComponent,
        GstFileAccountingDialogeComponent,
        ScrollDistributionDialogeComponent,
        ScrollDistributionViewDialogeComponent,
        ScrollDistributionListingDialogeComponent,
        //BlockCpinDialogeComponent,
        BlockCpinListingDialogeComponent,
        GstFileVoucherDialogeComponent,
        VoucherPrintDialogeComponent,
        GstFileAccountingListingPrintDialogeComponent,
        GstFileAccountingListingEditDialogeComponent,
        GstFileAccountingListingDialogeComponent,
        GstFileSummaryDialogeComponent,
        BankRateMasterEditDialogeComponent,
        WorkFlowEPaoComponent,
        FileSummaryComponent,
        EPAOCommonWorkflowComponent
        // BranchHaDialogComponent,
        // BranchSaDaDialogComponent
    ],
    providers: [
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },

        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
    ]
})
export class EPaoModule {}
