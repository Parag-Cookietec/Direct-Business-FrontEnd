import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrfgrfReportsService {

  constructor(private _httpClient: HttpClient) { }

  grfcrfstatementreport(payload) {
    const url = 'dmo/grfcrfreport/statementreport'
    return this._httpClient.post(`${environment.baseUrl}${url}`, payload);
  }

  grfcrfinvestsalereport(payload) {
    const url = 'dmo/grfcrfreport/investsalereport'
    return this._httpClient.post(`${environment.baseUrl}${url}`, payload);
  }

  grfcrfyrwisematurityinvestreport(payload) {
    const url = 'dmo/grfcrfreport/yrwisematurityinvestreport'
    return this._httpClient.post(`${environment.baseUrl}${url}`, payload);
  }

  grfcrftotalinvestreport(payload) {
    const url = 'dmo/grfcrfreport/totalinvestreport'
    return this._httpClient.post(`${environment.baseUrl}${url}`, payload);
  }

  getFinancialYears() {
    const url = 'dmo/msfinancialyear/201'
    return this._httpClient.post(`${environment.baseUrl}${url}`, null);
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
