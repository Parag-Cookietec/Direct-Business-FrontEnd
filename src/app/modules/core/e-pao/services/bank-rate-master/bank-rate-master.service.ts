import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BankRateMasterService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private httpClient: HttpClient) { }

  getBankRateMasterList(params) {
    return this.httpClient.post(`${environment.baseUrl}gst/bankratemaster/201`,
      params, { headers: this.headers });
  }

  getBankRateMasterListV2(params) {
    return this.httpClient.post(`${environment.baseUrl}gst/bankratemaster/201/201`,
      params, { headers: this.headers });
  }

  createBankRateMasterList(params) {
    return this.httpClient.post(`${environment.baseUrl}gst/bankratemaster/101`,
      params, { headers: this.headers });
  }

  updateBankRateMasterList(params) {
    return this.httpClient.post(`${environment.baseUrl}gst/bankratemaster/401`,
      params, { headers: this.headers });
  }

  getBankRateMaster(params) {
    return this.httpClient.post(`${environment.baseUrl}gst/bankratemaster/301`,
      params, { headers: this.headers });
  }

  getBankRateInformation(params) {
    return this.httpClient.post(`${environment.baseUrl}gst/bankratemaster/301`,
      params, { headers: this.headers });
  }

  getStatusList(params) {
    return this.httpClient.post(`${environment.baseUrl}edp/lulookupinfo/getbyname/201`,
      params, { headers: this.headers });
  }
}
