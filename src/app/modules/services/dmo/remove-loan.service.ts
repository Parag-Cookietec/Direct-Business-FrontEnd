import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIConst } from 'src/app/shared/constants/common/common-api.constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RemoveLoanService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private httpClient: HttpClient) { }

  GetTypeOfLoan() {
    var obj = {
      "id": 418
    }
    return this.httpClient.post(`${environment.baseUrl}${APIConst.Remove_Loan.GET_Type_Of_Loan}`, obj,
      { headers: this.headers });
  }

  GetAllLoanPurposes() {
    return this.httpClient.post(`${environment.baseUrl}${APIConst.Remove_Loan.GET_Loan_Purpose}`,
      { headers: this.headers });
  }

  GetSanctionNumber() {
    return this.httpClient.post(`${environment.baseUrl}${APIConst.Remove_Loan.GET_Sanction_Number}`,
      { headers: this.headers });
  }

  GetLoanDescription() {
    return this.httpClient.post(`${environment.baseUrl}${APIConst.Remove_Loan.GET_Loan_Discription}`,
      { headers: this.headers });
  }

  GetInstitutes() {
    return this.httpClient.post(`${environment.baseUrl}${APIConst.Remove_Loan.GET_Institutes}`,
      { headers: this.headers });
  }

  GetPlanSchemaNames() {
    var obj = {
      "id": 414
    }
    return this.httpClient.post(`${environment.baseUrl}${APIConst.Remove_Loan.GET_Type_Of_Loan}`, obj,
      { headers: this.headers });
  }

  GetRemoveLoanSearch(obj) {
    return this.httpClient.post(`${environment.baseUrl}${APIConst.Remove_Loan.GET_Search}`, obj,
      { headers: this.headers });
  }

  DeleteLoan(obj) {
    return this.httpClient.post(`${environment.baseUrl}${APIConst.Remove_Loan.DELETE_Loan}`, obj,
      { headers: this.headers });
  }
  GetTranche() {
    var obj = {
      "id": 1
    }
    return this.httpClient.post(`${environment.baseUrl}${APIConst.Remove_Loan.GET_Tranche}`, obj,
      { headers: this.headers });
  }
}
