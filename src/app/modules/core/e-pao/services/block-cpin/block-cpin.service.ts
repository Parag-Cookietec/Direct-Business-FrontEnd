import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BlockCpinService {
    headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    constructor(private httpClient: HttpClient) {}

    BaseURL = environment.baseUrl;
    //http://localhost:8080/gst/

    //search call (record type, num)

    getBlockCpinOnSearch(params) {
        return this.httpClient.post(this.BaseURL + `gst/cpinstatus/search`, params, { headers: this.headers });
    }

    // CPIN CALLS get status call

    getCpinStatus(params) {
        return this.httpClient.post(this.BaseURL + `gst/cpinstatus/101`, params, { headers: this.headers });
    }

    getBlockCpinStatus(params) {
        return this.httpClient.post(this.BaseURL + `gst/cpinstatus/getStatus`, params, { headers: this.headers });
    }

    // list Data of block-Cpin

    getBlockCpinList(params) {
        return this.httpClient.post(this.BaseURL + `gst/blockcpin/201`, params, { headers: this.headers });
    }

    getBlockCpinViewById(params) {
        return this.httpClient.post(this.BaseURL + `gst/blockcpin/301`, params, { headers: this.headers });
    }

    // save Data of block-Cpin

    saveData(params) {
        return this.httpClient.post(this.BaseURL + `gst/blockcpin/101`, params, { headers: this.headers });
    }

    /// block cpin listing search call
    getBlockCpinListOnSearch(params) {
        return this.httpClient.post(this.BaseURL + `gst/blockcpin/list`, params, { headers: this.headers });
    }

    getBlockCpinListOnSearchV2(params) {
        return this.httpClient.post(this.BaseURL + `gst/blockcpin/list/201`, params, { headers: this.headers });
    }
        // gst api for reference number
        getRefNumber(params){
            return this.httpClient.post(this.BaseURL + `gst/common`, params, { headers: this.headers });
        }
}
