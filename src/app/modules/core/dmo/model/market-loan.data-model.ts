import * as moment from 'moment';

export const getMarketListObject = (element) => {
    return {
        dpSheetId: element.id ? element.id : null,
        memoNo: element.memoNo ? element.memoNo : '',
        adviceNo: element.adviceNo ? element.adviceNo : '',
        dpDate: element.dpSheetReciveDate ? moment(element.dpSheetReciveDate).format('DD-MMM-YYYY') : '',
        adviceDate: element.adviceDate ? moment(element.adviceDate).format('DD-MMM-YYYY') : '',
        adviceBy: element.adviceBy ? element.adviceBy : '',
        transactionDescription: element.transactionDesc ? element.transactionDesc : '',
        creditAmount: element.creditAmt ? element.creditAmt : 0,
        addDetailStatus: element.addDetailStatus,
        debitAmount: element.debitAmt ? element.debitAmt : ''
    }
}

export const getMarketLoanRecievedRequestObject = (responsObj, fieldsValues) => {
    var returnObj: MarketLoanRecievedRequest = {
        activeStatus: 1,
        adviceBy: responsObj.adviceBy,
        adviceDt: moment(responsObj.adviceDate).format('YYYY-MM-DD'),
        adviceNo: responsObj.adviceNo,
        dpSheetId: responsObj.dpSheetId,
        dpSheetRecvDt: moment(responsObj.dpDate).format('YYYY-MM-DD'),
        floatationWayId: fieldsValues.wayOfFloatation,
        interstInstallYr: parseInt(fieldsValues.numberOfInstallmentsinaYear),
        intrstFirstInstallDt: moment(fieldsValues.firstInstallmentDateInterest).format('YYYY-MM-DD'),
        isLoanOlder: 0,
        issueNumber: parseInt(fieldsValues.numberOfIssue),
        loanAmount: parseInt(fieldsValues.loanAmount),
        loanFinYrId: fieldsValues.finanacialYear,
        loanRoi: parseFloat(fieldsValues.interestRate),
        loanStartDt: moment(fieldsValues.loanStartDate).format('YYYY-MM-DD'),
        loanTenure: parseInt(fieldsValues.loanTenure),
        loanTypeId: fieldsValues.typeOfLoan,
        moratoriumPeriod: parseInt(fieldsValues.moratotiumPeriod),
        moratrmPncplPerc: parseFloat(fieldsValues.principalUnderMoratoritum),
        pncplFirstInstallDt: moment(fieldsValues.firstInstallmentDate).format('YYYY-MM-DD'),
        premiumAmount: fieldsValues.premiumAmount,
        repayInstallYr: parseInt(fieldsValues.numberOfRepaymentInstallmentsPerYear),
        totAmountRecd: parseInt(fieldsValues.totalAmountReceived),
        totRepayInstall: parseInt(fieldsValues.totalNumberOfRepaymentInstallments),
        tranDesc: fieldsValues.tranche,
        transactionDesc: fieldsValues.loanDescription,
        notificationNo: fieldsValues.notificationNumber,
        notificationDt: fieldsValues.notificationDate.toISOString()
    };
    return returnObj;
}

export const setMarketLoanRequestObject = (reqObj, dpSheetObj) => {
    return {
        "dpSheetId": dpSheetObj.dpSheetId ? dpSheetObj.dpSheetId : null,
        "dpSheetRecvDt": "2021-04-22",
        "isLoanOlder": 47,
        "loanNumber": "CVAmrb",
        "memoNo": dpSheetObj.memoNo,
        "referenceNo": "WruYZ",
        "referenceDt": "2021-04-22T23:10:04",
        "adviceNo": dpSheetObj.adviceNo,
        "adviceDt": dpSheetObj.adviceDate ? moment(reqObj.adviceDate).format('YYYY-MM-DD') : null,
        "adviceBy": dpSheetObj.adviceBy,
        "transactionDesc": dpSheetObj.transactionDescription,
        "sanctionOrderNo": "zSKfecpmKNBCErB",
        "sanctionOrderDt": "2021-05-28T13:41:09",
        "organizationName": "hdGKnABwM",
        "loanReceiptDt": "2021-09-26",
        "loanFinYrId": reqObj.finanacialYear ? reqObj.finanacialYear : null,
        "loanStartDt": reqObj.loanStartDate ? moment(reqObj.loanStartDate).format('YYYY-MM-DD') : null,
        "totAmountRecd": reqObj.totalAmountReceived ? reqObj.totalAmountReceived : '',
        "loanAmount": reqObj.loanAmount ? reqObj.loanAmount : '',
        "premiumAmount": reqObj.premiumAmount ? reqObj.premiumAmount : '',
        "notificationNo": reqObj.notificationNumber ? reqObj.notificationNumber : '',
        "notificationDt": reqObj.notificationDate ? new Date(reqObj.notificationDate) : null,
        "floatationWayId": reqObj.wayOfFloatation,
        "loanTypeId": reqObj.typeOfLoan,
        "newLoanTran": reqObj.loanDescription ? reqObj.loanDescription : '',
        "tranDesc": reqObj.tranche,
        "loanTenure": reqObj.loanTenure,
        "loanRoi": reqObj.interestRate,
        "issueNumber": reqObj.numberOfIssue,
        "moratoriumPeriod": reqObj.moratotiumPeriod,
        "moratrmPncplPerc": reqObj.principalUnderMoratoritum,
        "totRepayInstall": reqObj.totalNumberOfRepaymentInstallments,
        "repayInstallYr": reqObj.numberOfRepaymentInstallmentsPerYear,
        "pncplFirstInstallDt": reqObj.firstInstallmentDate ? moment(reqObj.firstInstallmentDate).format('YYYY-MM-DD') : null,
        "interstInstallYr": reqObj.numberOfInstallmentsinaYear,
        "intrstFirstInstallDt": reqObj.firstInstallmentDateInterest ? moment(reqObj.firstInstallmentDateInterest).format('YYYY-MM-DD') : null,
        "loanMaturityDt": moment().format('YYYY-MM-DD'),
        "loanDeleteDt": moment().format('YYYY-MM-DD'),
        "loanDeleteBy": 2104528942537451462
    }
}

// Loan repayment data model
export const getMarketLoanObject = (element) => {
    return {
        sanctionNo: element.sanctionOrderNo ? element.sanctionOrderNo : '',
        loanSanctionDate: element.sanctionOrderDt ? element.sanctionOrderDt : '',
        loanReceiptDate: element.loanReceiptDt ? element.loanReceiptDt : '',
        loanAmount: element.loanAmount ? element.loanAmount : '',
        loanTenureYears: element.loanTenure ? element.loanTenure : '',
        moratoriumPeriodYears: element.moratoriumPeriod ? element.moratoriumPeriod : '',
        interestRate: element.loanRoi ? element.loanRoi : '',
        select: element.select ? element.select : 'notApproved'
    }
}

export const getNssfRepaymentObject = (element) => {
    return {
        financialYear: element.financialYear ? element.financialYear : '',
        installmentDate: element.installPaidDate ? element.installPaidDate : '',
        openingBalance: element.openingBalanceAmount ? element.openingBalanceAmount : '',
        interest: element.intrestAmount ? element.intrestAmount : '',
        principal: element.principalAmount ? element.principalAmount : '',
        closingBalance: element.closingBalAmount ? element.closingBalAmount : ''
    }
}

export class MarketLoanRecievedRequest {
    activeStatus: number;
    adviceBy: string;
    adviceDt: string;
    adviceNo: string;
    dpSheetId: number;
    dpSheetRecvDt: string;
    floatationWayId: number;
    interstInstallYr: number;
    intrstFirstInstallDt: string;
    isLoanOlder: number;
    issueNumber: number;
    loanAmount: number;
    loanFinYrId: number;
    loanRoi: number;
    loanStartDt: string;
    loanTenure: number;
    loanTypeId: number;
    moratoriumPeriod: number;
    moratrmPncplPerc: number;
    pncplFirstInstallDt: string;
    premiumAmount: number;
    repayInstallYr: number;
    totAmountRecd: number;
    totRepayInstall: number;
    tranDesc: string;
    transactionDesc: string;
    notificationNo: string;
    notificationDt: string
}