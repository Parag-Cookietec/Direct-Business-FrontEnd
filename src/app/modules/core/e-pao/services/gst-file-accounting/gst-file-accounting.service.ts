import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class GstFileAccountingService {
    headers = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    constructor(private httpClient: HttpClient) {}

    BaseURL = environment.baseUrl;
    //http://localhost:8080/gst/

    // gst-file-accounting-listing screen Api

    getFileAccountingListingById(params) {
        return this.httpClient.post(this.BaseURL + `gst/fileprocess/301`, params, { headers: this.headers });
    }

    getAllGstAccountingList(params) {
        return this.httpClient.post(this.BaseURL + `gst/fileprocess/201`, params, { headers: this.headers });
    }

    getGstAccListOnSearch(params) {
        return this.httpClient.post(this.BaseURL + `gst/fileprocess/search`, params, { headers: this.headers });
    }

          // edit call on gst file acc listing edit on click submit button call

    getGstFileAccListOnEdit(params) {
        return this.httpClient.post(this.BaseURL + `gst/fileprocess/401`, params, { headers: this.headers });
    }

    // gst-file-accounting API Calls

    // search call
    getGstDataOnSearch(params) {
        return this.httpClient.post(this.BaseURL + `gst/filesummery/name/401`, params, { headers: this.headers });
    }

    //getByID
    getFileAccounting(params) {
        return this.httpClient.post(this.BaseURL + `gst/filesummery/301`, params, { headers: this.headers });
    }

    getEODCinReport(params) {
        return this.httpClient.post(this.BaseURL + `gst/cinfiledata/searchByfileDate`, params, {
            headers: this.headers
        });
    }

    //getAll
    getGstAccountingList(params) {
        return this.httpClient.post(this.BaseURL + `gst/filesummery/201`, params, { headers: this.headers });
    }

    //searchcall

    //updatecall
    updateGstFileAccList(params) {
        return this.httpClient.post(this.BaseURL + `gst/filesummery/401`, params, { headers: this.headers });
    }

    // list of file summary
    fileSummaryList(params) {
        return this.httpClient.post(this.BaseURL + `gst/filesummery/name`, params, { headers: this.headers });
    }

    // http://localhost:8080/gst/filesummery/diffrence
    // file summery call  for get Diffrence

    getDifference(params) {
        return this.httpClient.post(this.BaseURL + `gst/filesummery/diffrence`, params, { headers: this.headers });
    }

    // createcall
    createFile(params) {
        return this.httpClient.post(this.BaseURL + `gst/filesummery/101`, params, { headers: this.headers });
    }

    // Voucher generation call
    VoucherGeneration(params) {
        return this.httpClient.post(this.BaseURL + `gst/cinfiledata/Validation/301`, params, { headers: this.headers });
    }

    voucherListing(params) {
        return this.httpClient.post(this.BaseURL + `gst/api/fileprocess/201`, params, { headers: this.headers });
    }

    getVoucherByVoucherNo(params) {
        return this.httpClient.post(this.BaseURL + `gst/fileprocess/voucherNo`, params, { headers: this.headers });
    }

    getFileSummaryByDate(params) {
        return this.httpClient.post(this.BaseURL + `gst/filesummery/date`, params, { headers: this.headers });
    }


    // gst gst for reference number
    getRefNumber(params){
        return this.httpClient.post(this.BaseURL + `gst/common`, params, { headers: this.headers });
    }

    getAllGstAccountingListV2(params) {
        return this.httpClient.post(this.BaseURL + `gst/fileprocess/list`, params, { headers: this.headers });
    }
}
