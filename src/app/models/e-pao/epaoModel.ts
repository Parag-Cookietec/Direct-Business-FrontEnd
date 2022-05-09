export class ListValue {
    value: string;
    viewValue: string;
}
export class BrwoseData {
    name: string;
    file: string;
    uploadedBy: string;
}

export class BranchHamApping {
    branchName: string;
    branch: string;
}

export class BranchMapping {
    branchList: string;
}

export class SADAMapping {
    saUser: string;
}

export class BankRateMaster {
    effectivFromDate: string;
    effectivToDate: string;
    bankRate: string;
    addRated: string;
    penRated: string;
    status: string;
}

export class BankRateDialog {
    refNo: string;
    refDate: string;
    status: string;
    penRated: string;
    addRated: string;
    bankRate: string;
    effectivToDate: string | number | Date;
    effectivFromDate: string | number | Date;
}
export class BlokPinListing {
    status: string;
    cpIn: string;
    refDate: string;
    refNo: string;
    amount: string;
}

export class LoadBalancerAOListing {
    bankName: string;
    noOfChallan: string;
    amount: string;
    totalChallan: string;
    totalAmount: string;
    branch: string;
    saDA: string;
    fromSaDA: string;
    toSaDA: string;
    challanAmount: string;
    bank: string;
}

export class LoadBalancerAO {
    bankName: string;
    saDa: string;
    noOfChallan: string;
    amount: string;
    totalChallan: string;
    totalAmount: string;
    branch: string;
}

export class FileSummary {
    fileName: string;
    fileDate: string;
    fileType: string;
    totRecCnt: string;
    totFileCnt: string;
    sgstAmt: string;
    igstAmt: string;
    chstAmt: string;
    cessAmt: string;
    totAmt: string;
}

export class CInCpinStatus {
    cpin: string;
    cin: string;
    status: string;
    cpIn: string;
    fileNo: string;
    amountGovt: string;
    fileDate: string;
    creditDate: string;
    transStatus: string;
}

export class PenaltyAmount {
    id: string;
    refNo: string;
    refDate: string;
    mor: string;
    bank: string;
    claimAmt: string;
}

export class PanaltyAmountReceive {
    year: string;
    month: string;
    claimAmt: string;
    oldAmt: string;
    remainingAmt: string;
    currentAmt: string;
}

export class BlockCpin {
    desc: string;
    tax: string;
    interest: string;
    fees: string;
    penalty: string;
    others: string;
    rat: string;
    total: string;
}

export class GenerateMoe {
    status: string;
    gstIN: string;
    mOEAmount: string;
    cin: string;
    mOEType: string;
    partyName: string;
    rbiAmount: string;
    gstAmount: string;
    bank: string;
    govCreditDate: string;
    paymentDate: string;
    remarks: string;
}
export class ManualEntry {
    majorHead: string;
    subMajorHead: string;
    minorHead: string;
    subHead: string;
    detailsHead: string;
    objectHead: string;
    amt: string | number;
    majorHead_source: [];
    subMajorHead_source: [];
    minorHead_source: [];
    subHead_source: [];
    detailsHead_source: [];
    objectHead_source: [];
    
}
export class ManualEntryCredit {
    majorHeadCredit: string;
    subMajorHeadCredit: string;
    minorHeadCredit: string;
    subHeadCredit: string;
    detailsHeadCredit: string;
    objectHeadCredit: string;
    amtCred: string | number;
    majorHeadCredit_source: [];
    subMajorHeadCredit_source: [];
    minorHeadCredit_source: [];
    subHeadCredit_source: [];
    detailsHeadCredit_source: [];
    objectHeadCredit_source: [];
}

export class SubmitManualEntry {
    id: number;
    cinNo: string;
    typeId: number;
    type: string;
    typeName: string;
    valueDt: string;
    totalEntryAmt: string | number;
    totalDebitAmt: string | number;
    totalCreditAmt: string | number;
    creditEntries: CreditDebit[];
    debitEntries: CreditDebit[];
    menuId: number;
}

export class CreditDebit {
    id: number;
    majorHeadId: number;
    majorHead: string;
    subMajorHeadId: number;
    subMajorHead: string;
    minorHeadId: number;
    minorHead: string;
    subHeadId: number;
    subHead: string;
    detailHeadId: number;
    detailHead: string;
    objectHeadId: number;
    objectHead: string;
    creditAmt: string | number;
}

export class ManualEntryListing {
    id: string;
    tNo: string;
    cIn: string;
    amt: string;
    eDate: string;
    vDate: string;
    type: string;
    status: string;
}

export class ChallanDistributionListing {
    bankName: string;
    noOfChallan: string;
    amount: string;
    branch: string;
    saDA: string;
    challanAmount: string;
    scrollName: string;
}
export class ChallanDistribution {
    auditor: string;
    bank: string;
    totalChallan: string;
    availableChallan: string;
    toBeDistributed: string;
    totalToBeDistributed: string;
}
export class ScrollDisListing {
    refDate: string;
    refNo: string;
    scrollName: string;
    noOfChallan: string;
    amount: string;
    branch: string;
    status: string;
}

export class ScrollDistribution {
    scrollNo: string;
    noOfChallan: string;
    amount: string;
}

export class ChallanStatusReport {
    cin: string;
    cinDate: string;
    amt: string;
}

export class VoucherPrintReport {
    dh: string;
    desc: string;
    txn: string;
    amt: string;
}
export class CreditPrintReport {
    ch: string;
    cdesc: string;
    ctxn: string;
    camt: string;
}

export class FilePrintReport {
    fileNo: string;
    ftxn: string;
    fdt: string;
    famt: string;
}
export class VoucherYearPrintReport {
    voucherNo: string;
    yymmxxx: string;
    vdt: string;
    vyear: string;
}

export class GSTFileAccountingListing {
    fileDate: string;
    referenceNo: string;
    referenceDt: string;
    voucherNo: string;
    noOfChallan: string;
    totAmt: string;
}
export class GSTFileAccounting {
    fileName: string;
    fileDate: string;
    totFileCnt: string;
    totAmt: number;
}
export class AcountScreen {
    status: string;
    cin: string;
    amount: string;
    partyName: string;
    govCreditDate: string;
    scrollDate: string;
    paymentDate: string;
    remarks: string;
}

export class RBIDetails {
    status: string;
    cin: string;
    amount: string;
    partyName: string;
    govCreditDate: string;
    scrollDate: string;
    paymentDate: string;
    remarks: string;
    type: string;
    bank: string;
    scrollNo: string;
}
export class GSTDetails {
    gstin: string;
    cin: string;
    partyName: string;
    paymentDate: string;
    sgstFees: string;
    sgsttac: string;
    sgstInterest: string;
    sgstOthers: string;
    sgstPenalty: string;
    sgstTotal: string;
}
export class AccountingEntries {
    matched: string;
    moeType: string;
    moeId: string;
    moeStatus: string;
    debitHeaad: string;
    creditHead: string;
    amount: string;
}
export class AccountingEn {
    majorHead: string;
    subMajorHead: string;
    minorHead: string;
    subhead: string;
    detailHead: string;
    amount: string;
    majorHead1: string;
    subMajorHead1: string;
    minorHead1: string;
    subhead1: string;
    detailHead1: string;
    amount1: string;
    description: string;
    description1: string;
}

export class DtwiseCinDataReport {
    date: string;
    noOfTxnCin: string;
    amountCin: string;
    noOfTxnCinEod: string;
    amountCinEod: string;
    noOfTxnDiff: string;
    amountDiff: string;
}

export class ModifiedTable {
    desc: string;
    tax: string;
    interest: string;
    fees: string;
    penalty: string;
    others: string;
    rat: string;
    total: string;
}

export class SuppAccReport {
    hoAccount: string;
    description: string;
    amount: any;
}
export class FileRecReport {
    fileName: string;
    date: string;
    eodClosed: string;
    filesCount: string;
    filesAmt: string;
    downloadedFilesCount: string;
    downloadedFilesAmt: string;
    pendingFilesCount: string;
    pendingFilesAmt: string;
}
export class RBDregister {
    date: string;
    openingBalance: string;
    receipt: string;
    payment: string;
    closingBalance: string;
    amount: string;
    remark: string;
    daSign: string;
    haSign: string;
    aoSign: string;
}
export class TopNTaxPayerReport {
    gstin: string;
    partyName: string;
    challanCount: string;
    amount: string;
}

export class EODCinDetailsReport {
    gstin: string;
    cin: string;
    paymentDate: string;
    bankCD: string;
    sgstTax: string;
    sgstIntr: string;
    sgstFee: string;
    sgstPenalty: string;
    sgstOther: string;
    sgstTotal: string;
    fileDate: string;
}
export class CpinDetailReport {
    gstin: string;
    cpin: string;
    bank: string;
    cpinDate: string;
    sgstTax: string;
    sgstIntr: string;
    sgstFee: string;
    sgstPenalty: string;
    sgstOther: string;
    sgstTotal: string;
    paymentMode: string;
}
export class CinDetailReport {
    gstin: string;
    cin: string;
    bank: string;
    cinDate: string;
    sgstTax: string;
    sgstIntr: string;
    sgstFee: string;
    sgstPenalty: string;
    sgstOther: string;
    sgstTotal: string;
    fileDate: string;
}
export class blockCpinReport {
    cpin: string;
    cpinDate: string;
    blockCpinRqDt: string;
    actBlockCpinDt: string;
    saName: string;
    status: string;
    sgstTotal: string;
}
export class voucherDetailReport {
    voucherNo: string;
    voucherDate: string;
    totalFile: string;
    totalChallan: string;
    totalAmount: string;
    saName: string;
    status: string;
}
export class FileSummaryReport {
    fileName: string;
    totalFile: string;
    totalChallan: string;
    cgstAmount: string;
    igstAmount: string;
    sgstAmount: string;
    totalAmount: string;
}
export class RegularCinDataReport {
    date: string;
    noOfTransaction: string;
    amount: string;
}
export class RegularEodCinDataReport {
    date: string;
    noOfTransaction: string;
    amount: string;
}
export class EodCpinDetailReport {
    gstin: string;
    cpin: string;
    bank: string;
    cpinDate: string;
    sgstTax: string;
    sgstIntr: string;
    sgstFee: string;
    sgstPenalty: string;
    sgstOther: string;
    sgstTotal: string;
    paymentMode: string;
}
export class EodWIseEodCpinReport {
    gstin: string;
    cpin: string;
    bank: string;
    cpinDate: string;
    sgstTax: string;
    sgstIntr: string;
    sgstFee: string;
    sgstPenalty: string;
    sgstOther: string;
    sgstTotal: string;
    paymentMode: string;
}
export class ManualAccReport {
    trRefNo: string;
    refNo: string;
    dcHead: string;
    cdHead: string;
    amount: string;
    type: string;
    status: string;
}
export class consolidatedPayReport {
    headOfAccount: string;
    description: string;
    amount: string;
}
export class consolidatedSummaryReceiptReport {
    headOfAccount: string;
    description: string;
    amount: string;
}
export class SuspenseAccMonitReport {
    bankName: string;
    noOfTransactions: string;
    amount: string;
}
export class RbiScrollFileReport {
    scrollNum: string;
    scrollDate: string;
    txnAmount: string;
    rbiRefNo: string;
    cin: string;
    brn: string;
    ifscCode: string;
    moeCase_d: string;
    hoa: string;
    creditDate: string;
}
export class GstnVsRbiReconcilReport {
    perticulars: string;
    amount: string;
}
export class DtlTransRegCinReport {
    gstin: string;
    transId: string;
    cpin: string;
    cin: string;
    paymentDate: string;
    bankRefNo: string;
    paymentMode: string;
    sgstAmt: string;
}
export class GSTNDetailedReport {
    gstin: string;
    cpin: string;
    cin: string;
    paymentDate: string;
    bankRefNo: string;
    bankCode: string;
    sgstTax: string;
    sgstIntr: string;
    sgstFee: string;
    sgstPnlty: string;
    sgstOthr: string;
    sgstTotal: string;
}

export class ComparativeReceiptReport {
    haedOfAcc: string;
    budget: string;
    receipt: string;
    percentage: string;
    budget1: string;
    receipt1: string;
    percentage1: string;
    comp: string;
}
export class RbiScrillWiseReport {
    date: string;
    noOfTxnCin: string;
    amountCin: string;
    noOfTxnCinEod: string;
    amountCinEod: string;
    noOfTxnDiff: string;
    amountDiff: string;
    noOfTxnDiff1: string;
    amountDiff1: string;
    noOfTxnDiff2: string;
    amountDiff2: string;
    noOfTxnDiff3: string;
    amountDiff3: string;
    noOfTxnDiff4: string;
    amountDiff4: string;
    noOfTxnDiff5: string;
}
export class DtwiseGSTNRBIDataReport {
    date: string;
    noOfTxnCin: string;
    amountCin: string;
    noOfTxnCinEod: string;
    amountCinEod: string;
}
export class GSTNDataReport {
    date: string;
    noOfTxnCin: string;
    amountCin: string;
}
export class GSTNRBIDataReport {
    date: string;
    noOfTxnCin: string;
    amountCin: string;
    noOfTxnCinEod: string;
    amountCinEod: string;
}
export class RbiScrollVsAccStReport {
    date: string;
    noOfScroll: string;
    scrollAmt: string;
    noOfTxn: string;
    amount: string;
    noOfTxnDiff: string;
}
export class CinEodCinDiffReport {
    noOfTxnCin: string;
    amountCin: string;
    noOfTxnCinEod: string;
    amountCinEod: string;
}
export class SRSReport {
    bankName: string;
    noOfTransactions: string;
    sgstTax: string;
    sgstInterest: string;
    sgstFees: string;
    sgstPenalty: string;
    sgstOthers: string;
    ratAmount: string;
    totalAmount: string;
}
export class SummaryPenalInterestReport {
    nameOfBank: string;
    noOfTransactions: string;
    panelInterest: string;
}
export class CrossUtilIgstReport {
    description: string;
    curAmmount: string;
    progAmount: string;
}
export class RbiEScrollWiseReport {
    scrollNum: string;
    noOfTransaction: string;
    amount: string;
}
export class MoeTrackingReport {
    bank: string;
    moeToBeRaised: string;
    raisedMoe: string;
    totalMOe: string;
    revisedMoe: string;
    pendingMoe: string;
}
export class SuspensePlusMinusReport {
    headDescription: string;
    bank: string;
    OpeningBalance: string;
    debit: string;
    credit: string;
    closingBalance: string;
}
export class PenalInterestReport {
    cin: string;
    paymentDate: string;
    dueDate: string;
    creditDate: string;
    dayDiff: string;
    challanTotal: string;
    penalInterest: string;
    sgstAmount: string;
    penalInterestSgst: string;
}
export class ModeWiseTaxpayerReport {
    paymentMode: string;
    challanCount: string;
    amount: string;
}
export class RbiAccStatReport {
    totCreditEntry: string;
    totDebitEntry: string;
    openingBal: string;
    credit: string;
    debit: string;
    closingBal: string;
    scrollNumber: string;
    scrollDt: string;
    crdrIndi: string;
    revIndicator: string;
    actAccCrDt: string;
    entryAmt: string;
    entryRefNo: string;
}
export class PenalInterestReportTC {
    bankName: string;
    OpeningBalance: string;
    currentPenalInt: string;
    totaAmtRec: string;
    recovAmount: string;
    remAmount: string;
    remark: string;
}
export class workloadReport {
    branch: string;
    name: string;
    challanAlloted: string;
    challanPosted: string;
    challanPending: string;
    moeRaised: string;
    moeResolved: string;
    againstChallanAlloted: string;
    againstNorms: string;
}
export class ConsolidatedRecptReport {
    branch: string;
    name: string;
    challanAlloted: string;
    challanPosted: string;
    challanPending: string;
    moeRaised: string;
}

export class PerformanceMonitoringReport {
    description: string;
    match: string;
    rat: string;
    clearedRat: string;
    moe: string;
    total: string;
}

export class DialogData { }

export class PenalSave {
    id: number;
    bankId: number;
    bankName: string;
    receiptModeId: number;
    receiptModeText: string;
    referenceNo: string;
    referenceDt: string;
    chqCeferenceNo: string;
    receiptDt: string;
    govtCreditDt: string;
    interestAmount: number;
    entryStatusId: number;
    entryStatus: string;
    penalDetailsList: AmountDetails[];
    menuId: number
}

export class AmountDetails {
    id:number;
    penalIntrstId: number;
    receivedYearId: number;
    receivedYrYyyy: string;
    receivedMonthId: number;
    receivedMonth: string;
    claimAmount: number;
    earlierRecvAmount: number;
    remainingAmount: number;
    currRecvAmount: number;
}


export class GenerateMoeEntry {
    status: string;
    gstIN: string;
    mOEAmount: string;
    cin: string;
    mOEType: string;
    partyName: string;
    rbiAmount: string;
    gstAmount: string;
    bank: string;
    govCreditDate: string;
    moeRaisedDate: string;
    paymentDate: string;
    remarks: string;
  }
