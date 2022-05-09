import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root'
})
export class GoiService {
    dpid;   
    dpData;   
    isView = false;   
    constructor(private httpClient: HttpClient) {}

    getGOILoanReceivedDetails(params, url) {
        return this.httpClient.post(`${environment.baseUrl}${url}`, params);
    }
    saveGOILoanReceivedDetails(params, url) {
        return this.httpClient.post(`${environment.baseUrl}${url}`, params);
    }

    getdropdownValues(params, url) {
        return this.httpClient.post(`${environment.baseUrl}${url}`, params);
    }

    getGOILoanApprovedDetails(params, url) {
        return this.httpClient.post(`${environment.baseUrl}${url}`, params);
    }

    searchactualpayble(params, url) {
        return this.httpClient.post(`${environment.baseUrl}${url}`, params);
    }

    matchwithpaybles(params, url) {
        return this.httpClient.post(`${environment.baseUrl}${url}`, params);
    }
    updateRepayment(params, url) {
        return this.httpClient.post(`${environment.baseUrl}${url}`, params);
    }
    getYearrage(params, url) {
        return this.httpClient.post(`${environment.baseUrl}${url}`, params);
    }

    searchblockLoan(params, url) {
        return this.httpClient.post(`${environment.baseUrl}${url}`, params);
    }
}
