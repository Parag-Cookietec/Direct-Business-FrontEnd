import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarketLoanReportsService {

  constructor(private _httpClient: HttpClient) { }


  getMarketloanoutstanding(payload) {   
    const url = 'dmoReport/marketDetails?reportType=MARKET_OUTSTANDING_YEARLY'
    return this._httpClient.post(`${environment.baseUrl}${url}`, payload);
  }

  getMarketloanoutstandingMonthly(payload) {
    // const url = 'dmoNssfReport/nssfOutstanding'
    const url = 'dmoReport/nssfDetails?reportType=NSSF_OUTSTANDING_MONTHLY'
    return this._httpClient.post(`${environment.baseUrl}${url}`, payload);
  }
  getMarketloanoutstandingDateWise(payload) {
    // const url = 'dmoNssfReport/nssfOutstanding'
    const url = 'dmoReport/marketDetails?reportType=MARKET_OUTSTANDING_DATE_WISE'
    return this._httpClient.post(`${environment.baseUrl}${url}`, payload);
  }

  getNssfloanoutstandingVsPaid(payload) {
    const url = 'dmoNssfReport/nssfOutstanding'    
    return this._httpClient.post(`${environment.baseUrl}${url}`, payload);
  }

 
  

  getMarketLoanRePaidYearly(payload) {
    const url = 'dmoMarketReport/marketRepaidYearly'
    return this._httpClient.post(`${environment.baseUrl}${url}`, payload);
  }

  getMarketLoanRepaidMonthly(payload) {
    const url = 'dmoMarketReport/marketRepaidMonthly'
    return this._httpClient.post(`${environment.baseUrl}${url}`, payload);
  }

  getMarketLoanRepaidDatewise(payload) {
    const url = 'dmoMarketReport/marketRepaidDateWise'
    return this._httpClient.post(`${environment.baseUrl}${url}`, payload);
  }


  getFinancialYears() {
    const url = 'dmo/msfinancialyear/201'
    return this._httpClient.post(`${environment.baseUrl}${url}`, null);
  }
  
  getMarketLoanReceipt(payload) {
    const url = 'dmoMarketReport/marketReceipt'
    return this._httpClient.post(`${environment.baseUrl}${url}`, payload);
  }

  getMarketRepaymentLiability(payload) {
    const url = 'dmoMarketReport/marketMonthlyReceipt'
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
