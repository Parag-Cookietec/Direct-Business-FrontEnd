import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { APIConst } from 'src/app/shared/constants/doi/doi-api.constants';
import { PartyMasterListing } from '../../core/direct-business/models/doiModel';
import { ApiService } from './api.service';
import { DoiCommonService } from './doi-common.service';

@Injectable({
    providedIn: 'root'
})

export class PartyMasterService {
private partyMasterListingSubject = new BehaviorSubject<any>({});
public partyMasterListing$ = this.partyMasterListingSubject.asObservable();
public currentIndex: number;
public filters = [];
constructor(private readonly apiService: ApiService,
    private readonly doiCommonService: DoiCommonService,
    private readonly router: Router) { }

addPartyMasterEntry(partyDetails: any, 
  bankDetails: any[] = [], 
  officeDetails: any[] = [], 
  riskLocationDetails: any[] = [],
  partyId?:  any) {
  let bankData = [];
  let officeData = [];
  let riskLocData = [];  
  let partyData = {
      "partyTypeId": partyDetails['partyType'] || '',
      "partyAddress": partyDetails['partyAddress'] || '',
      "districtId": partyDetails['district'] || '',
      "talukaId": partyDetails['taluka'] || '',
      "cityName": partyDetails['city'] || '',
      "contactNum": partyDetails['contactNo'] || '',
      "emailId": partyDetails['email'] || '',
      "panNumb": partyDetails['panCard'] || '',
      "gstinNumb": partyDetails['gstin'] || ''
    }
  if(partyId) {
    partyData['dbPartyId'] = partyId;
  }
    if(bankDetails.length) {
      bankDetails.forEach(bank => {
        bankData.push({
          "bankName": bank['bankName'] || '',
          "branchName": bank['branchName'] || '',
          "branchTypeId": bank['branchType'] || '',
          "branchCode": bank['BranchCode'] || '',
          "bankIfscCode": bank['ifscCode'] || '',
          "accountNo": bank['accountNo'] || '',
          "prefPaymentType": bank['paymentPrefered'] || '',
          "bankId": bank.bankId || '',
          "branchId": bank.branchId || ''
        })
      })
    }

    if(officeDetails.length) {
      officeDetails.forEach(office => {
        officeData.push({
          "offcTypeId": office['officeType'] || '',
          "officeName": office['officeName'] || '', 
          "officeAddress": office['officeAddress'] || '',
          "districtId": office['district'] || '',
          "talukaId": office['taluka'] || '',
          "cityId": office['city'] || '',
          "pincode": office['pinCode'] || '',
          "cityName": "Test"
        });
      })
    }

    partyData['mdoiDbPartyBankDtls'] = bankData;
    partyData['mdoiDbPartyOfficeDtls'] = officeData;

    return this.apiService.request(APIConst.DOI.DIRECT_BUSINESS.PARTY_MASTER.ADD_PARTY_MASTER_ENTRY, partyData);
}

deletePartyMasterEntry(partyId: number) {
    return this.apiService.request(APIConst.DOI.DIRECT_BUSINESS.PARTY_MASTER.DELETE_PARTY_MASTER_ENTRY(partyId));
}

viewParty(index: number) {
  this.currentIndex = index;
  this.router.navigate(['dashboard/doi/party-master/view']);
}

editParty(index: number) {
  this.currentIndex = index;
  this.router.navigate(['dashboard/doi/party-master/edit']);
}

getPartyMasterListing(searchCriteria: any[], pageIndex = 0, pageElement = 10, sortByColumn = 'dbPartyId', sortOrder = 'asc') {
    const body = {
        pageIndex: pageIndex,
        pageElement: pageElement,
        sortByColumn: sortByColumn,
        sortOrder: sortOrder,
        jsonArr: searchCriteria
    }
    this.apiService.request(APIConst.DOI.DIRECT_BUSINESS.PARTY_MASTER.GET_PARTY_MASTER_LISTING, body).subscribe(result => {
        this.processPartyData(result);
    });
}

getCurrentPartyMasterDataByIndex() {
  return this.partyMasterListingSubject.value.data[this.currentIndex];
}

processPartyData(response) {
    response = response.result;
    const elementData = []
    response.result.forEach(party => {
      let officeLocName = "";
      let officeLocAddress = "";
      let paymentPreferred = "";
      if(party.mdoiDbPartyOfficeDtls.length>0) {
        officeLocName = party.mdoiDbPartyOfficeDtls[0].officeName || '';
        officeLocAddress = party.mdoiDbPartyOfficeDtls[0].officeAddress || '';
      }

      if(party.mdoiDbPartyBankDtls.length > 0) {
        party.mdoiDbPartyBankDtls.forEach(bank => {
          const type =  isNaN(parseInt(bank.prefPaymentType))? bank.prefPaymentType : this.doiCommonService.getPaymentTypeById(bank.prefPaymentType);
          if(!paymentPreferred.includes(type)) {
            paymentPreferred += type;
          }
        })
      }
      elementData.push({
        partyId: party.dbPartyId,
        partyType: this.doiCommonService.getPartyTypeById(party.partyTypeId),
        partyName: 'Unknown',
        address: party.partyAddress,
        officeLocationName: officeLocName,
        addrerss: officeLocAddress,
        contactNo: party.contactNum,
        emailId: party.emailId,
        paymentPreferred: paymentPreferred,
        createModeON: party.createdDate,
        modifyModeON: party.updatedDate,
        status: party.activeStatus? true : false
      })
    });
    let data = { viewData: elementData, totalRecords: response.totalElement, data: response.result}
    this.partyMasterListingSubject.next(data);
  }

  filterChange(searchCriteria: any) {
    if(searchCriteria.partyType) {
        if(this.filters.some(filter => filter.key === 'partyTypeId')) {
          this.filters[this.filters.findIndex(filter => filter.key === 'partyTypeId')].value = searchCriteria.partyType;
        } else {
          this.filters.push({key: 'partyTypeId', value: searchCriteria.partyType});
        }
      } else {
        if(this.filters.some(filter => filter.key === 'partyTypeId')) {
          this.filters.splice(this.filters.findIndex(filter => filter.key === 'partyTypeId'),1);
        }
      }
      if(searchCriteria.district) {
        if(this.filters.some(filter => filter.key === 'districtId')) {
          this.filters[this.filters.findIndex(filter => filter.key === 'districtId')].value = searchCriteria.district;
        } else {
          this.filters.push({key: 'districtId', value: searchCriteria.district});
        }
      } else {
        if(this.filters.some(filter => filter.key === 'districtId')) {
          this.filters.splice(this.filters.findIndex(filter => filter.key === 'districtId'),1);
        }
      }
      if(searchCriteria.status || searchCriteria.status === 0) {
        if(this.filters.some(filter => filter.key === 'activeStatus')) {
          this.filters[this.filters.findIndex(filter => filter.key === 'activeStatus')].value = searchCriteria.status;
        } else {
          this.filters.push({key: 'activeStatus', value: searchCriteria.status});
        }
      } else {
        if(this.filters.some(filter => filter.key === 'activeStatus')) {
          this.filters.splice(this.filters.findIndex(filter => filter.key === 'activeStatus'),1);
        }
      }

      if(searchCriteria.officeLocationName) {
        if(this.filters.some(filter => filter.key === 'cityName')) {
          this.filters[this.filters.findIndex(filter => filter.key === 'cityName')].value = searchCriteria.officeLocationName;
        } else {
          this.filters.push({key: 'cityName', value: searchCriteria.officeLocationName});
        }
      } else {
        if(this.filters.some(filter => filter.key === 'cityName')) {
          this.filters.splice(this.filters.findIndex(filter => filter.key === 'cityName'),1);
        }
      }
  }

}
