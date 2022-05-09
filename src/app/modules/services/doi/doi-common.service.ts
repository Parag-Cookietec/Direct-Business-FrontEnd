import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { APIConst } from 'src/app/shared/constants/doi/doi-api.constants';
import { ApiService } from './api.service';
@Injectable({
    providedIn: 'root'
})

export class DoiCommonService {

private readonly doiPrefetchDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>({});
public readonly doiPrefetchData$: Observable<any> = this.doiPrefetchDataSubject.asObservable();

constructor(private readonly apiService: ApiService) { }

getDoiCommonData() {
    const dbPartyTypes = this.getDBPartyTypes();
    const districtList = this.getDistrictList();
    const officeTypes = this.getDBOfficeTypes();
    const bankDetails = this.getBankDetails();
    const bankBranchTypes = this.getBankBranchTypes();
    const paymentModes = this.getPaymentModes();
    forkJoin([dbPartyTypes, districtList, officeTypes, bankDetails, bankBranchTypes, paymentModes]).subscribe(results => {
        this.doiPrefetchDataSubject.next({
            'dbPartyTypes': results[0].result,
            'districtList': results[1].result,
            'officeTypes': results[2].result,
            'bankDetails': results[3].result,
            'bankBranchTypes': results[4].result,
            'paymentModes': results[5].result
        });
    })
}

private getDBPartyTypes() {
    return this.apiService.request(APIConst.DOI.DIRECT_BUSINESS.COMMON.GET_DB_PARTY_TYPES);
}

private getDistrictList() {
    return this.apiService.request(APIConst.DOI.DIRECT_BUSINESS.COMMON.GET_DISTRICT_LIST);
}

getTalukaList(districtId: number) {
    return this.apiService.request(APIConst.DOI.DIRECT_BUSINESS.COMMON.GET_TALUKA_LIST(districtId));
}

private getDBOfficeTypes() {
    return this.apiService.request(APIConst.DOI.DIRECT_BUSINESS.COMMON.GET_DB_OFFICE_TYPES);
}

private getBankDetails() {
    return this.apiService.request(APIConst.DOI.DIRECT_BUSINESS.COMMON.GET_BANK_DETAILS);
}

getBankBranches(bankId: number) {
    return this.apiService.request(APIConst.DOI.DIRECT_BUSINESS.COMMON.GET_BANK_BRANCHES(bankId));
}

private getBankBranchTypes() {
    return this.apiService.request(APIConst.DOI.DIRECT_BUSINESS.COMMON.GET_BANK_BRANCH_TYPES);
}

private getPaymentModes() {
    return this.apiService.request(APIConst.DOI.DIRECT_BUSINESS.COMMON.GET_PAYMENT_MODES);
}

setDoiPrefetchData(objectName: string, data: any) {
    const doiPrefetchData = this.doiPrefetchDataSubject.getValue();
    doiPrefetchData[objectName] = data;
    this.doiPrefetchDataSubject.next(doiPrefetchData);
}

getDoiPrefetchData(objectName: string) {
    const doiPrefetchData = this.doiPrefetchDataSubject.getValue();
    return doiPrefetchData[objectName];
}

getPartyTypeById(partyTypeId: number) {
    const result = this.getDoiPrefetchData('dbPartyTypes').find((type) => type.value === partyTypeId.toString())
    return result? result["viewValue"]: 'Unknown';
}

getPaymentTypeById(paymentTypeId: any) {
    const result = this.getDoiPrefetchData('paymentModes').find((mode) => mode.value === paymentTypeId.toString())
    return result? result["viewValue"]: 'Unknown';
}

getBankDetailsById(bankId: any) {
    const bankDetails = this.getDoiPrefetchData('bankDetails').find(bank => bank.value.toString() === bankId.toString())
    return bankDetails;
}

}
