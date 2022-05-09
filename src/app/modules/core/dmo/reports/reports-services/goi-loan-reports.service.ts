import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoiLoanReportsService {

  constructor(private _httpClient: HttpClient) { }

  getGOIministrywiseloanReceived(payload) {   
    const url = 'dmoGoiReport/goiMinistry'
    return this._httpClient.post(`${environment.baseUrl}${url}`, payload);
  }


  getFinancialYears() {
    const url = 'dmo/msfinancialyear/201'
    return this._httpClient.post(`${environment.baseUrl}${url}`, null);
  }


  getMinstryDeptnames(payload) {
    const url = 'dmo/deparmentministry/201'
    return this._httpClient.post(`${environment.baseUrl}${url}`, payload);
  }
  
  getLessThan(payload) {
    const url = 'edp/lulookupinfo/getbyparentlookupid'
    return this._httpClient.post(`${environment.baseUrl}${url}`, payload);
  }
  
   /**
     * To convert the date format into (yyyy-mm-dd)
     * @param date default date
     */
    formatDate(date) {
      if (date !== 0 && date !== null && date !== undefined && date !== '') {
          const datePipe = new DatePipe('en-US');
          return datePipe.transform(date, 'yyyy-MM-dd');
      } else {
          return '';
      }
  }
}
