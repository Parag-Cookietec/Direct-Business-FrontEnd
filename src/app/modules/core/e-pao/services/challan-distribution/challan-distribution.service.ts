import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ChallanDistributionService {
    headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    constructor(private httpClient: HttpClient) {}

    BaseURL = environment.baseUrl;
    //http://localhost:8080/gst/

    // Challan Distribition  Screen API

    createChallanDistribution(params) {
        return this.httpClient.post(this.BaseURL + `gst/challandistrubution/distribute`, params, { headers: this.headers });
    }

    getAllChallanDistribution(params) {
        return this.httpClient.post(this.BaseURL + `gst/challandistrubution/201`, params, { headers: this.headers });
    }

    getChallanDistributionById(params) {
        return this.httpClient.post(this.BaseURL + `gst/challandistrubution/301`, params, { headers: this.headers });
    }

    updateChallanDistribution(params) {
        return this.httpClient.post(this.BaseURL + `gst/challandistrubution/401`, params, { headers: this.headers });
    }

    //listing search

    searchChallanDistributionListing(params,pageNumber=0, pageSize = 5) {
        return this.httpClient.post(this.BaseURL + `gst/challandistrubution/getsearch?pageNumber=${pageNumber}&pageSize=${pageSize}` ,params,{
            headers: this.headers
        });
    }

    searchChallanDistribution(params) {
        return this.httpClient.post(this.BaseURL + `gst/challandistrubution/scroll`, params, {
            headers: this.headers
        });
    }

    getBankList(params) {
        return this.httpClient.post(this.BaseURL + `gst/challandistrubution/bankList`, params, {
            headers: this.headers
        });
    }

        // gst gst for reference number
        getRefNumber(params){
            return this.httpClient.post(this.BaseURL + `gst/common`, params, { headers: this.headers });
        }
}
