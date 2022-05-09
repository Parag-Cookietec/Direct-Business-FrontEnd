import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PenalInterestCollectionService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private httpClient: HttpClient) { }

  BaseURL = environment.baseUrl;

  GetBankWiseInterest(params) {
    return this.httpClient.post(this.BaseURL + `gst/penalinterest/bankwiseinterest`, params, { headers: this.headers });
  }
  
  GetLookupValues(params) {
    return this.httpClient.post(this.BaseURL + `gst/lookup/getlistfromlookup`, params, { headers: this.headers });
  }
  
  GetBankList() {
    return this.httpClient.post(this.BaseURL + `gst/challandistrubution/bankList`, { headers: this.headers });
  }
  
  Save(params) {
    return this.httpClient.post(this.BaseURL + `gst/penalinterest/save`, params, { headers: this.headers });
  }

   GetListing(params) {
    return this.httpClient.post(this.BaseURL + `gst/penalinterest/listing`, params, { headers: this.headers });
  }
  
  DeletePenalEntry(params) {
    return this.httpClient.post(this.BaseURL + `gst/penalinterest/501`, params, { headers: this.headers });
  }

  GetListingV2(params) {
    return this.httpClient.post(this.BaseURL + `gst/penalinterest/listing/201`, params, { headers: this.headers });
  }
}
