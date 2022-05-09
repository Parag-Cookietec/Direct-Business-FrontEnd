export interface institutionalLoanDetails {
    id: number;
    dpSheetId: number;
    dpSheetRecDate: string;
    isLoanOlder: number;
    loanAccNumber: string;
    instituteId: number;
    instituteName?: any;
    departmentId: number;
    departmentName?: any;
    letterNo: string;
    letterDate: string;
    refrenceNo: string;
    refrenceDate: Date;
    adviceNo: string;
    adviceDate: string;
    adviceBy: string;
    transactionDesc: string;
    sanctionOrderDate: Date;
    loanReceiptDate: string;
    loanFinanceYearId?: any;
    loanStartDate: string;
    chequeNo: number;
    chequeDate: string;
    loanAmount: number;
    loanROI: number;
    loanTenure: number;
    moratariumPeriod: number;
    prncplInstallYear: number;
    totalPrncplInstall: number;
    intrestInstallYear: number;
    firstInstallDate: string;
    loanMaturityDate: string;
    loanDeleteDate?: any;
    loanDeletedBy?: any;
    planSchemeName: number;
}

export interface memoDetails {
    memoDate: string,
    memoNo: string,
    paymentTypeId: number,
    refrenceNo: string
}

export interface instituteLetterDetails {
    instituteId: number,
    totalAmountRel: number,
    letterNo: string,
    letterDate: string,
    loanROI: string,
    approvalAuth: string,
    authDesignationId: number,
    departmentId: number,
    refrenceNo: string,
    refrenceDate: string,
    transactionDesc: string,
    planSchemeName: string,
    loanPurpose: string,
    loanAmount: number
}

export interface instLoanRecievedModel {
    id: number,
    parentDpSheetId: number,
    adviceNo: string,
    adviceDate: string,
    adviceBy: string,
    paymentTypeId: number,
    paymentTypeDesc: string,
    transactTypeId: number,
    transactionDesc: string,
    creditAmt: number,
    debitAmt: number,
    memoNo: string,
    addDetailStatus: number,
    dpSheetReciveDate: string
}

export class instLoanRecievedRequestModel {
    pageIndex: number;
    pageElement: number;
    sortByColumn: string;
    sortOrder: string;
    jsonArr: keyValueModel[];       
}
export class keyValueModel{
    key:string;
    value:string;
}