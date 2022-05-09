import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NssfReportsService {

  constructor(private _httpClient: HttpClient) { }


  getNssfloanoutstanding(payload) {
    // const url = 'dmoNssfReport/nssfOutstanding'
    const url = 'dmoReport/nssfDetails?reportType=NSSF_OUTSTANDING_YEARLY'
    return this._httpClient.post(`${environment.baseUrl}${url}`, payload);
  }

  getNssfloanoutstandingVsPaid(payload) {
    const url = 'dmoNssfReport/nssfOutstanding'    
    return this._httpClient.post(`${environment.baseUrl}${url}`, payload);
  }

  getNssfloanoutstandingMonthly(payload) {
    // const url = 'dmoNssfReport/nssfOutstanding'
    const url = 'dmoReport/nssfDetails?reportType=NSSF_OUTSTANDING_MONTHLY'
    return this._httpClient.post(`${environment.baseUrl}${url}`, payload);
  }
  getNssfloanoutstandingDateWise(payload) {
    // const url = 'dmoNssfReport/nssfOutstanding'
    const url = 'dmoReport/nssfDetails?reportType=NSSF_OUTSTANDING_DATE_WISE'
    return this._httpClient.post(`${environment.baseUrl}${url}`, payload);
  }
  

  getNssfLoanRePaidYearly(payload) {
    const url = 'dmoNssfReport/nssfRepaidYearly'
    return this._httpClient.post(`${environment.baseUrl}${url}`, payload);
  }

  getNssfLoanRepaidMonthly(payload) {
    const url = 'dmoNssfReport/nssfRepaidMonthly'
    return this._httpClient.post(`${environment.baseUrl}${url}`, payload);
  }

  getNssfLoanRepaidDatewise(payload) {
    const url = 'dmoNssfReport/nssfRepaidDateWise'
    return this._httpClient.post(`${environment.baseUrl}${url}`, payload);
  }


  getFinancialYears() {
    const url = 'dmo/msfinancialyear/201'
    return this._httpClient.post(`${environment.baseUrl}${url}`, null);
  }
  
  getNssfLoanReceipt(payload) {
    const url = 'dmoNssfReport/nssfReceipt'
    return this._httpClient.post(`${environment.baseUrl}${url}`, payload);
  }

  getNssfRepaymentLiability(payload) {
    const url = 'dmoNssfReport/nssfMonthlyReceipt'
    return this._httpClient.post(`${environment.baseUrl}${url}`, payload);
  }

  getLessThan(payload) {
    const url = 'edp/lulookupinfo/getbyparentlookupid'
    return this._httpClient.post(`${environment.baseUrl}${url}`, payload);
  }
  	
   /**
     * To convert the date format into (yyyy-mm-dd)
     * @param date default date
     */
    formatDate(date) {
      if (date !== 0 && date !== null && date !== undefined && date !== '') {
          const datePipe = new DatePipe('en-US');
          return datePipe.transform(date, 'yyyy-MM-dd');
      } else {
          return '';
      }
  }
}
