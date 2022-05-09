import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LoadBalancerService {
    headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    constructor(private httpClient: HttpClient) { }

    BaseURL = environment.baseUrl;
    //http://localhost:8080/gst/


    //  craete screen serch call

    getLoadBalAOOnSearch(params) {
        return this.httpClient.post(this.BaseURL + `gst/loadbalancerao/searchLoadBalancerAo`, params, { headers: this.headers });
    }

    getLoadBalAODistributeCall(params) {
        return this.httpClient.post(this.BaseURL + `gst/loadbalancerao/distributeAO`, params, {
            headers: this.headers
        });
    }


    // Api call Load-Bal-AO -Listing

    getLoadBalAODataOnSearch(params,pageNumber=0, pageSize = 5) {
        return this.httpClient.post(this.BaseURL + `gst/loadbalancerao/search?pageNumber=${pageNumber}&pageSize=${pageSize}` ,params, { headers: this.headers });
    }

    getLoadBalAOList(params) {
        return this.httpClient.post(this.BaseURL + `gst/loadbalancerao/201`, params, { headers: this.headers });
    }

    // Get branch list from EDP
    getBranchNameList(params) {
        return this.httpClient.post(this.BaseURL + `edp/msbranch/303`, params, {
            headers: this.headers
        });
    }



    // Api call Load-Bal-HA

    getLoadBalHADataOnSearch(params) {
        return this.httpClient.post(this.BaseURL + `gst/challandistrubution/searchLoadBalancerHa`, params, {
            headers: this.headers
        });
    }

    getLoadBalHADistributeCall(params) {
        return this.httpClient.post(this.BaseURL + `gst/loadbalancerha/distributeAO`, params, {
            headers: this.headers
        });
    }

    // load balance ha list getAll call

    getLoadBalHAList(params) {
        return this.httpClient.post(this.BaseURL + `gst/loadbalancerha/201`, params, { headers: this.headers });
    }

    // load balance ha list search call

    getLoadBalHAListSearch(params,pageNumber=0, pageSize = 5) {
        return this.httpClient.post(this.BaseURL + `gst/loadbalancerha/search?pageNumber=${pageNumber}&pageSize=${pageSize}` ,params, { headers: this.headers });
    }

            // gst gst for reference number
            getRefNumber(params){
                return this.httpClient.post(this.BaseURL + `gst/common`, params, { headers: this.headers });
            }



}
