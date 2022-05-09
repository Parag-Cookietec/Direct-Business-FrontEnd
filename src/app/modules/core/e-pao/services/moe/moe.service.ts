import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoeService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private httpClient: HttpClient) { }

  BaseURL = environment.baseUrl;

  GetBankList() {
    return this.httpClient.post(this.BaseURL + `gst/challandistrubution/bankList`, { headers: this.headers });
  }

  fetchTypeLists() {
    return this.httpClient.get(this.BaseURL + `gst/manualentry/typeList`, { headers: this.headers });
  }  
  
  FetchMOEList(params) {
    return this.httpClient.post(this.BaseURL + `gst/generatemoe/201/201`, params, { headers: this.headers });
  }
  
  genMOEList(params) {
    return this.httpClient.post(this.BaseURL + `gst/wf/v3.0/wf/req/gen/101`, params, { headers: this.headers });
  }

  SubmitMOE(params) {
    return this.httpClient.post(this.BaseURL + `gst/wf/v2.0/trn/submit/101`, params, { headers: this.headers });
  }

  GetLookupValues(params) {
    return this.httpClient.post(this.BaseURL + `gst/lookup/getlistfromlookup`, params, { headers: this.headers });
  }
}
