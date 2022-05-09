import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ScrollDistributionService {
    headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    constructor(private httpClient: HttpClient) {}

    BaseURL = environment.baseUrl;
    //http://localhost:8080/gst/

    // Scroll Distribition  Screen API

    createScrollDistribution(params) {
        return this.httpClient.post(this.BaseURL + `gst/scrolldistribute/101`, params, { headers: this.headers });
    }

    getAllScrollDistribution(params) {
        return this.httpClient.post(this.BaseURL + `gst/scrolldistribute/201`, params, { headers: this.headers });
    }

    getScrollDistributionById(params) {
        return this.httpClient.post(this.BaseURL + `gst/scrolldistribute/301`, params, { headers: this.headers });
    }

    updateScrollDistribution(params) {
        return this.httpClient.post(this.BaseURL + `gst/scrolldistribute/401`, params, { headers: this.headers });
    }
    // for listing scrrn
    searchScrollDistribution(params,pageNumber=0, pageSize = 5) {
        return this.httpClient.post(this.BaseURL + `gst/scrolldistribute/getsearch?pageNumber=${pageNumber}&pageSize=${pageSize}` ,params, { headers: this.headers });
    }
    // for create scrrn
    searchSDCreateScreen(params) {
        return this.httpClient.post(this.BaseURL + `gst/scrolldistribute/searchScroll`, params, {
            headers: this.headers
        });
    }
    // rbi vs acc. st. report
    getReport(params) {
        return this.httpClient.post(this.BaseURL + `gst/scrolldistribute/scrollReport`, params, {
            headers: this.headers
        });
    }

    // Get branch list from EDP
    getBranchNameList(params) {
        return this.httpClient.post(this.BaseURL + `edp/msbranch/303`, params, {
            headers: this.headers
        });
    }

    verifyStatus(params) {
        return this.httpClient.post(this.BaseURL + `gst/scrolldistribute/scrollVerify`, params, {
            headers: this.headers
        });
    }

    OnClickViewScroll(params) {
        return this.httpClient.post(this.BaseURL + `gst/rbifiletranxn/date`, params, {
            headers: this.headers
        });
    }

            // gst gst for reference number
            getRefNumber(params){
                return this.httpClient.post(this.BaseURL + `gst/common`, params, { headers: this.headers });
            }
}
