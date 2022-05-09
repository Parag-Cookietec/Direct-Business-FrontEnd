import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { APIConst } from 'src/app/shared/constants/dmo/dmo-api.constants';

@Injectable({
  providedIn: 'root'
})
export class MarketLoanService {
  dpObj: any=null;
  constructor(private _httpClient: HttpClient) { }

  fetchMarketLoanReceivedList(reqObj) {
    return this._httpClient.post(`${environment.baseUrl}${APIConst.MARKET_LOAN_RECEIVED}`, reqObj);
  }

  fetchMarketLoanReceivedDetails(reqObj) {
    return this._httpClient.post(`${environment.baseUrl}${APIConst.MARKET_LOAN_RECEIVED_DETAILS}`, reqObj);
  }

  saveMarketLoanReceivedDetails(reqObj) {
    return this._httpClient.post(`${environment.baseUrl}${APIConst.MARKET_LOAN_SAVE}`, reqObj);
  }

  fetchMarketLoanApprovedList(reqObj) {
    return this._httpClient.post(`${environment.baseUrl}${APIConst.MARKET_LOAN_APPROVED_LIST}`, reqObj);
  }

  setDPData(obj) {
    this.dpObj = obj;
  }
  getDPObj() {
    return this.dpObj;
  }
  
  GetfinancialYear() {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this._httpClient.post(`${environment.baseUrl}${APIConst.FINANCIAL_YEAR}`,{ headers: headers });
  }
  
  GetWayOfFloatation() {
    var obj = {
      "id" : 419
    };

    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this._httpClient.post(`${environment.baseUrl}${APIConst.WAY_OF_FLOATATION}`, obj, { headers: headers });
  }
  
  GetAllRepaymentByAdviceNo(adviceNo) {
    var obj = {
      "adviceNo" : adviceNo
    };

    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this._httpClient.post(`${environment.baseUrl}${APIConst.GET_ALL_REPAYMENT_BY_ADVICE_NO}`, obj, { headers: headers });
  }
  SearchForRepaymentByAdviceNo(obj) {
  
    var headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this._httpClient.post(`${environment.baseUrl}${APIConst.SEARCH_FOR_REPAYMENT_BY_ADVICE_No}`, obj, { headers: headers });
  }
  UpdateRepayment(reqObj) {
    return this._httpClient.post(`${environment.baseUrl}${APIConst.Update_Repayment}`, reqObj);
  }
 
  PressCommuniqueforPrincipalPayment(reqObj) {
    return this._httpClient.post(`${environment.baseUrl}${APIConst.PRESS_COMMUNIQUE_FOR_PRINCIPAL_PAYMENT}`, reqObj);
  }

  
}
