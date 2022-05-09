import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChallanAccountingService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private httpClient: HttpClient) { }

  BaseURL = environment.baseUrl;

  GetBankList() {
    return this.httpClient.post(this.BaseURL + `gst/challandistrubution/bankList`, { headers: this.headers });
  }

  FetchChallanAccountingList(params) {
    return this.httpClient.post(this.BaseURL + `gst/challanacct/201/201`, params, { headers: this.headers });
  }
  
  FetchChallanAccountingListById(params) {
    return this.httpClient.post(this.BaseURL + `gst/challanacct/301`, params, { headers: this.headers });
  }
  
  ReconcileDetails(params) {
    return this.httpClient.post(this.BaseURL + `gst/challanacct/reconciledetails`, params, { headers: this.headers });
  }

  SubmitReconcileDetails(params) {
    return this.httpClient.post(this.BaseURL + `gst/challanacct/901`, params, { headers: this.headers });
  }

  fetchTypeLists() {
    return this.httpClient.get(this.BaseURL + `gst/manualentry/typeList`, { headers: this.headers });
  }

  GetLookupValues(params) {
    return this.httpClient.post(this.BaseURL + `gst/lookup/getlistfromlookup`, params, { headers: this.headers });
  }
  public accountHdrId: EventEmitter<any> = new EventEmitter();
}

