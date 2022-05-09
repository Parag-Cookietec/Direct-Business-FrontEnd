import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MasterEstimateService {
    guarantee_id = null;
    guarantee_data = null;
    isView = false;  
    
    budget_id = null;
    budget_data = null;
    budget_isView = false; 
    
    wma_id = null;
    wma_data = null;
    wma_isView = false; 
    constructor(private httpClient: HttpClient) {}

    getYearrage(params, url) {
        return this.httpClient.post(`${environment.baseUrl}${url}`, params);
    }

    getOrgMaster(params, url) {
        return this.httpClient.post(`${environment.baseUrl}${url}`, params);
    }

    saveGurarnteeOrg(params, url) {
        return this.httpClient.post(`${environment.baseUrl}${url}`, params);
    }

    saveBudgetMaster(params, url) {
        return this.httpClient.post(`${environment.baseUrl}${url}`, params);
    }

    savewmatype(params, url) {
        return this.httpClient.post(`${environment.baseUrl}${url}`, params);
    }
    getwmaMaster(params, url) {
        return this.httpClient.post(`${environment.baseUrl}${url}`, params);
    }
}
