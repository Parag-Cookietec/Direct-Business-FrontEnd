import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ReportsService {
    headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    constructor(private httpClient: HttpClient) {}

    BaseURL = environment.baseUrl;
    //http://localhost:8080/gst/

    //api call (record type, num)

    getCinDetailReport(params) {
        return this.httpClient.post(this.BaseURL + `gst/report/detail?reportType=CIN`, params, { headers: this.headers });
    }
    getCpinDetailReport(params) {
        return this.httpClient.post(this.BaseURL + `gst/report/detail?reportType=CPIN`, params, { headers: this.headers });
    }
    getEODCinDetailReport(params) {
        return this.httpClient.post(this.BaseURL + `gst/report/detail?reportType=EODCIN`, params, { headers: this.headers });
    }
    getEODCpinDetailReport(params) {
        return this.httpClient.post(this.BaseURL + `gst/report/detail?reportType=EODCPIN`, params, { headers: this.headers });
    }
    getFileSummaryReport(params) {
        return this.httpClient.post(this.BaseURL + `gst/report/detail?reportType=FILE_SUMMARY`, params, { headers: this.headers });
    }
    getBlockCpinDetailReport(params) {
        return this.httpClient.post(this.BaseURL + `gst/report/detail?reportType=BLOCK_CPIN`, params, { headers: this.headers });
    }
    getVoucherDetailReport(params) {
        return this.httpClient.post(this.BaseURL + `gst/report/detail?reportType=VOUCHER_DETAILS`, params, { headers: this.headers });
    }
    getManualAccountingReport(params) {
        return this.httpClient.post(this.BaseURL + `gst/report/detail?reportType=MANUAL_ACCOUNTING`, params, { headers: this.headers });
    }
    getGstnRbiDataReport(params) {
        return this.httpClient.post(this.BaseURL + `gst/report/detail?reportType=GSTN_VS_RBI_CHALLAN_COUNT`, params, { headers: this.headers });
    }
    getChallanStatusConsolidatedReport(params) {
        return this.httpClient.post(this.BaseURL + `gst/report/detail?reportType=CHALLAN_STATUS_CONSOLIDATED`, params, { headers: this.headers });
    }
    getChallanStatusReport(params) {
        return this.httpClient.post(this.BaseURL + `gst/report/detail?reportType=CHALLAN_STATUS`, params, { headers: this.headers });
    }
    getRbiScrollFileReport(params) {
        return this.httpClient.post(this.BaseURL + `gst/report/detail?reportType=RBI_SCROLL_DETAILS`, params, { headers: this.headers });
    }
    getGstnDataReport(params) {
        return this.httpClient.post(this.BaseURL + `gst/report/detail?reportType=GSTN_DAYWISE_CHALLAN_COUNT_AMOUNT`, params, { headers: this.headers });
    }
    getModeWiseTaxpayerReport(params) {
        return this.httpClient.post(this.BaseURL + `gst/report/detail?reportType=CIN_MODEWISE_TAXPAYER`, params, { headers: this.headers });
    }
    getFileReceivedReport(params) {
        return this.httpClient.post(this.BaseURL + `gst/report/detail?reportType=FILE_RECEIVED_REPORT`, params, { headers: this.headers });
    }

    

    
}
