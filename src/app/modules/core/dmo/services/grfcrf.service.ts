import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root'
})
export class GrfcrfService {
    constructor(private httpClient: HttpClient) {}

    adviceForAccuredInterest(params, url) {        
        return this.httpClient.post(`${environment.baseUrl}${url}`, params);
    }
    
    getAccoutType(params, url) {
        return this.httpClient.post(`${environment.baseUrl}${url}`, params);
    }

    getprogpricontri(params, url) {
        return this.httpClient.post(`${environment.baseUrl}${url}`, params);
    }

    getInvestmentForm(params, url) {
        return this.httpClient.post(`${environment.baseUrl}${url}`, params);
    }
    getYearsOfMaturity(params, url) {
        return this.httpClient.post(`${environment.baseUrl}${url}`, params);
    }

    getTypeofTranscation(params, url) {
        return this.httpClient.post(`${environment.baseUrl}${url}`, params);
    }

    intimationforPurchaseSale(params, url) {
        return this.httpClient.post(`${environment.baseUrl}${url}`, params);
    }

    getNameSecurity(params, url) {
        return this.httpClient.post(`${environment.baseUrl}${url}`, params);
    }

    getIntimationData(params, url) {
        return this.httpClient.post(`${environment.baseUrl}${url}`, params);
    }

    saleofSecurities(params, url) {
        return this.httpClient.post(`${environment.baseUrl}${url}`, params);
    }    
}
