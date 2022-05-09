import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManualAccountingService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private httpClient: HttpClient) { }
  BaseURL = environment.baseUrl;

  fetchMajorHead() {
    return this.httpClient.post(this.BaseURL + `gst/manualentry/majorheadlist`, { headers: this.headers });
  }

  fetchSubmajorHead(params) {
    return this.httpClient.post(this.BaseURL + `gst/manualentry/submajorheadlist`, params, { headers: this.headers });
  }

  fetchMinorHead(params) {
    return this.httpClient.post(this.BaseURL + `gst/manualentry/minorheadlist`, params, { headers: this.headers });
  }

  fetchSubhead(params) {
    return this.httpClient.post(this.BaseURL + `gst/manualentry/subheadlist`, params, { headers: this.headers });
  }

  fetchDetailHead(params) {
    return this.httpClient.post(this.BaseURL + `gst/manualentry/detailsheadlist`, params, { headers: this.headers });
  }

  fetchObjectHead(params) {
    return this.httpClient.post(this.BaseURL + `gst/manualentry/objectheadlist`, params, { headers: this.headers });
  }

  saveManualEntry(params) {
    return this.httpClient.post(this.BaseURL + `gst/manualentry/901`, params, { headers: this.headers });
  }

  fetchListingDetails(params) {
    return this.httpClient.post(this.BaseURL + `gst/manualentry/201`, params, { headers: this.headers });
  }

  fetchTypeLists() {
    return this.httpClient.get(this.BaseURL + `gst/manualentry/typeList`, { headers: this.headers });
  }

  DeleteManualEntry(params) {
    return this.httpClient.post(this.BaseURL + `gst/manualentry/501`, params, { headers: this.headers });
  }

  fetchListingDetailsV2(params) {
    return this.httpClient.post(this.BaseURL + `gst/manualentry/list/201`, params, { headers: this.headers });
  }
}
