import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { APIConst } from 'src/app/shared/constants/dmo/dmo-api.constants';

@Injectable({
  providedIn: 'root'
})



export class MastersService {
  dpObj: any=null;
  RowObj: any[]=null;
  IdObj: any=null;
  constructor(private _httpClient: HttpClient) { }

  fetchAdvicemasterList(reqObj) {
    return this._httpClient.post(`${environment.baseUrl}${APIConst.ADVICE_MASTER_LISTING}`, reqObj);
  }

  saveAdvicemaster(reqObj) {
    return this._httpClient.post(`${environment.baseUrl}${APIConst.ADVICE_MASTER_ADD}`, reqObj);
  }


  fetchGoiDepartmentMinistryNameMasterList(reqObj) {
    return this._httpClient.post(`${environment.baseUrl}${APIConst.GOI_DEPARTMENT_MINISTRY_NAME_MASTER}`, reqObj);
  }
  
  saveGoiDepartmentMinistryNameMaster(reqObj) {
    return this._httpClient.post(`${environment.baseUrl}${APIConst.GOI_DEPARTMENT_MINISTRY_NAME_MASTER_ADD}`, reqObj);
  }

  fetchGoiLoanPurposeMasterList(reqObj) {
    return this._httpClient.post(`${environment.baseUrl}${APIConst.GOI_LOAN_PURPOSE_MASTER}`, reqObj);
  }

  saveGoiLoanPurposeMasterList(reqObj) {
    return this._httpClient.post(`${environment.baseUrl}${APIConst.GOI_LOAN_PURPOSE_MASTER_ADD}`, reqObj);
  }


  fetchInstituteMasterList(reqObj) {
    return this._httpClient.post(`${environment.baseUrl}${APIConst.INSTITUTE_MASTER}`, reqObj);
  }


  saveInstituteMaster(reqObj) {
    return this._httpClient.post(`${environment.baseUrl}${APIConst.INSTITUTE_MASTER_ADD}`, reqObj);
  }


  fetchSecurityMasterList(reqObj) {
    return this._httpClient.post(`${environment.baseUrl}${APIConst.SECURITY_MASTER}`, reqObj);
  }

  saveSecurityMasterList(reqObj) {
    return this._httpClient.post(`${environment.baseUrl}${APIConst.SECURITY_MASTER_ADD}`, reqObj);
  }
  
  fetchwmaMasterList(reqObj) {
    return this._httpClient.post(`${environment.baseUrl}${APIConst.WMA_MASTER}`, reqObj);
  }

  savewmaMasterList(reqObj) {
    return this._httpClient.post(`${environment.baseUrl}${APIConst.WMA_MASTER_ADD}`, reqObj);
  }


  
  setId(obj){    
    this.IdObj =obj;
  }
  getId(){
    return this.IdObj;
  }


  setRowData(obj){
    this.RowObj =obj;
  }
  getRowData(){
    return this.RowObj;
  }


  setDPData(obj) {
    this.dpObj = obj;
  }
  getDPObj() {
    return this.dpObj;
  }
}
