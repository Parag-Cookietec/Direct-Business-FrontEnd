import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIConst } from 'src/app/shared/constants/common/common-api.constants';
import { environment } from 'src/environments/environment';
import { instituteLetterDetails } from '../../core/dmo/InstitutionalLoanDetails/model/institutional-loan';

@Injectable({
  providedIn: 'root'
})
export class InstitutionalloandetailsService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private httpClient: HttpClient,) { }

  getInstitutionalLoanDetails() {
    return this.httpClient.post(`${environment.baseUrl}${APIConst.Institutional_Loan_Details.GET_Institutional_Loan_Details}`,
      { headers: this.headers });
  }
  getInstitutionalLoanMemo() {
    return this.httpClient.post(`${environment.baseUrl}${APIConst.Institutional_Loan_Details.GET_Institutional_Loan_Memo}`,
      { headers: this.headers });
  }
  DeleteMemorandum(memoNo) {
    var obj={
      "memoNo" : memoNo
    }
    return this.httpClient.post(`${environment.baseUrl}${APIConst.Institutional_Loan_Details.DELETE_Loan_Memo}`, obj,
      { headers: this.headers });
  }
  saveOrUpdateInstitutionalLoan(instituteLetterDetails) {
    return this.httpClient.post(`${environment.baseUrl}${APIConst.Institutional_Loan_Details.SAVE_OR_UPDATE_Institutional_Loan}`, instituteLetterDetails,
      { headers: this.headers });
  }
  // getChequeDetailsRecived() {
  //   return this.httpClient.post(`${environment.baseUrl}${APIConst.Institutional_Loan_Details.SAVE_OR_UPDATE_Institutional_Loan}`,
  //     { headers: this.headers });
  // }
  getMemoGenerationDetails() {
    return this.httpClient.post(`${environment.baseUrl}${APIConst.Institutional_Loan_Details.Memo_Generation_Details}`,
      { headers: this.headers });
  }
  
  getInstituteLoanApproved(obj) {

    return this.httpClient.post(`${environment.baseUrl}${APIConst.Institutional_Loan_Details.GET_Institute_Loan_Approved}`, obj,
      { headers: this.headers });
  }

  getAllInstituteNames() {
    return this.httpClient.post(`${environment.baseUrl}${APIConst.Institutional_Loan_Details.GET_All_Institute_Names}`,
      { headers: this.headers });
  }

  getAllDesignationNames() {
    return this.httpClient.post(`${environment.baseUrl}${APIConst.Institutional_Loan_Details.GET_All_Designation_Names}`,
      { headers: this.headers });
  }

  getAllDepartmentNames() {
    return this.httpClient.post(`${environment.baseUrl}${APIConst.Institutional_Loan_Details.GET_All_Department_Names}`,
      { headers: this.headers });
  }

  getAllMemos() {
    return this.httpClient.post(`${environment.baseUrl}${APIConst.Institutional_Loan_Details.GET_Cheque_Details_For_Payment}`,
      { headers: this.headers });
  }

  getAllPayableOptions() {
    var obj = {
      "id": 416
    };

    return this.httpClient.post(`${environment.baseUrl}${APIConst.Institutional_Loan_Details.GET_Payable_options}`, obj,
      { headers: this.headers });
  }

  getAllLoanRecieved(request) {
    return this.httpClient.post(`${environment.baseUrl}${APIConst.Institutional_Loan_Details.GET_All_Loan_Recieved}`, request,
      { headers: this.headers });
  }

  getByRef(refNo) {
    var obj = {
      "referenceNo": refNo
    };
    return this.httpClient.post(`${environment.baseUrl}${APIConst.Institutional_Loan_Details.GET_By_Ref}`, obj,
      { headers: this.headers });
  }
  
  getAllRef() {
    return this.httpClient.post(`${environment.baseUrl}${APIConst.Institutional_Loan_Details.GET_All_Ref}`,
      { headers: this.headers });
  }

  addDetailsLoanManagement() {
    return this.httpClient.post(`${environment.baseUrl}${APIConst.Institutional_Loan_Details.Add_Details_Loan_Management}`,
      { headers: this.headers });
  }

  UpdateMemoNoAndMemoDate(refNo, memoNo, memoDate) {
    var obj ={
        "referenceNo" : refNo,
        "memoNo" : memoNo,
        "memoDate" : memoDate
    }
    return this.httpClient.post(`${environment.baseUrl}${APIConst.Institutional_Loan_Details.Update_Memo_No_And_Memo_Date}`, obj,
      { headers: this.headers });
  }

  GetMemoRepaymentByReferenceNo(refNo, frmDate, toDate) {
    var obj = {
      "referenceNo": refNo,
      "fromDate": frmDate,
      "toDate": toDate
    };

    return this.httpClient.post(`${environment.baseUrl}${APIConst.Institutional_Loan_Details.Get_Memo_Repayment_By_Reference_No}`, obj,
      { headers: this.headers });
  }

  GetReferenceByInstitute(insId) {
    var obj = {
      "instituteId": insId
    };

    return this.httpClient.post(`${environment.baseUrl}${APIConst.Institutional_Loan_Details.Get_Reference_By_Institute}`, obj,
      { headers: this.headers });
  }
  
  GetAllMemoForDelete() {
    return this.httpClient.post(`${environment.baseUrl}${APIConst.Institutional_Loan_Details.GET_All_Memo_For_Delete}`,
      { headers: this.headers });
  }
}
