import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ListValue } from 'src/app/model/common-listing';
import { APIConst, urlModel } from 'src/app/shared/constants/doi/doi-api.constants';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class FireService {

constructor(private apiService: ApiService) { }

staticValues: any = {};
coverIncludedList: ListValue[] = [];
coverPlinthFoundationList: ListValue[] = [];
architectsConsultingList: ListValue[] = [];
debrisRemovalList: ListValue[] = [];
earthquakeList: ListValue[] = [];
insuredWithOtherInsuranceCoList: ListValue[] = [];
insuredWithOtherInsuranceCoDeclinedList: ListValue[] = [];
residenceOfficeShopsList: ListValue[] = [];
industrialManufacturingRiskList: ListValue[] = [];
storageOutsideIndustrialRiskList: ListValue[] = [];
tankGasHolderList: ListValue[] = [];
utilitiesList: ListValue[] = [];
usedAsShopList: ListValue[] = [];
handledAsPerListList: ListValue[] = [
  { value: '1', viewValue: 'Yes' },
  { value: '2', viewValue: 'No' },
];
stockValueList: ListValue[] = [
  { value: '1', viewValue: 'Yes' },
  { value: '2', viewValue: 'No' },
];
usedAsWarehouseList: ListValue[] = [];
usedAsIndustrialManufacturingUnitList: ListValue[] = [];
factoryStateList: ListValue[] = [
  { value: '1', viewValue: 'Working' },
  { value: '2', viewValue: 'Silent' },
];
fireProtectionDeviceInstalledList: ListValue[] = [];
basicProposedForInsuranceList: ListValue[] = [];
marketValueBasisList: ListValue[] = [];
reinstatementValueBasisList: ListValue[] = [];
paymentMode_list: ListValue[] = [
  { value: '1', viewValue: 'Cheque' },
  { value: '2', viewValue: 'Demand Draft' },
  { value: '3', viewValue: 'Treasury' },
];
bankbranch_list: ListValue[] = [
  { value: '1', viewValue: 'AXIS BOTAD [GJ] ' },
  { value: '2', viewValue: 'BOB ARM,AHMEDABAD' },
  { value: '3', viewValue: 'BOI MID CORPORATE' },
  { value: '4', viewValue: ' FEDERAL BANK VASNA IYAVA' },
  { value: '5', viewValue: 'HDFC Bavla' },
  { value: '6', viewValue: 'ICICI Ambawadi' },
  { value: '7', viewValue: 'IDFC Prahladnagar' },
  { value: '8', viewValue: ' KOTAK MAHINDRA PRAHALADNAGAR BRANCH' },
  { value: '9', viewValue: ' PNB Ahmedabad Vanijya Bhavan' },
  { value: '10', viewValue: 'PNB Ahmedabad Vanijya Bhavan' },
  { value: '11', viewValue: 'SBI AKHBARNAGAR CHAR RASTA, AHMEDABAD' },
];
bank_list: ListValue[] = [
  { value: '1', viewValue: 'Bank of Baroda    ' },
  { value: '2', viewValue: 'Bank of India' },
  { value: '3', viewValue: 'Canara Bank' },
  { value: '4', viewValue: ' Central Bank of India' },
  { value: '5', viewValue: 'Indian Bank' },
  { value: '6', viewValue: 'Indian Overseas Bank' },
  { value: '7', viewValue: 'Punjab National Bank' },
  { value: '8', viewValue: ' State Bank of India' },
  { value: '9', viewValue: ' Union Bank of India' },
  { value: '10', viewValue: 'Axis Bank' },
  { value: '11', viewValue: 'HDFC Bank' },
  { value: '12', viewValue: 'ICICI Bank' },
  { value: '13', viewValue: 'IDBI Bank' },
  { value: '14', viewValue: 'IDFC First Bank' },
  { value: '15', viewValue: ' IndusInd Bank' },
  { value: '16', viewValue: 'Jammu & Kashmir Bank ' },
  { value: '17', viewValue: 'Karnataka Bank' },
  { value: '18', viewValue: 'Karur Vysya Bank' },
  { value: '19', viewValue: ' South Indian Bank' },
  { value: '20', viewValue: ' Tamilnad Mercantile Bank' },
  { value: '20', viewValue: 'Axis Bank' },
  { value: '21', viewValue: 'Yes Bank' },
];
paymentTypeList: any[] = [
  { value: '1', viewValue: 'Cheque' },
  { value: '2', viewValue: 'Demand Draft' }
];
ageOfBuildingList: ListValue[] = [];
floaterBasisList: ListValue[] = [];
declarationBasisList: ListValue[] = [
  { value: '1', viewValue: 'Yes' },
  { value: '2', viewValue: 'No' },
];
floaterDeclarationBasisList: ListValue[] = [
  { value: '1', viewValue: 'Yes' },
  { value: '2', viewValue: 'No' },
];
stocksStoredInOpenList: ListValue[] = [];

riReqList: ListValue[] = [];


treasuryName_list: ListValue[] = [
  { value: '1', viewValue: 'District Treasury Office, Gandhinagar' }
];


letterProposalList: ListValue[] = [
  { value: '1', viewValue: '19-20/DOI/12345' },
  { value: '2', viewValue: '19-20/DOI/6783' },
];

policyTypeList: ListValue[] = [
  { value: '1', viewValue: 'New' },
  { value: '2', viewValue: 'Renewal' },
  { value: '3', viewValue: 'Endrosment' },
];



async getDDData(key: string): Promise<any> {
  const ddDet: urlModel = this.getDDDet(key);
  return new Promise((resolve, reject) => {
    const returnVal = this.staticValues[key];
    if(returnVal) {
      resolve(returnVal);
    } else {
      this.apiService.request(ddDet).subscribe(res => {
        this.staticValues[key] = {
          values: res.result,
          mapping_field: ddDet.mapping_field
        };
        resolve(this.staticValues[key]);
      });
    }
  });
}


getDDDet(key: string) {
  return APIConst.DOI.DIRECT_BUSINESS.FIRE[key];
}

async getDDValue(key: string) {
  const response = await this.getDDData(key);
  switch(key) {
    case 'coverIncluded':
      this.coverIncludedList = response.values;
      break;
    case 'coverPlinthFoundation':
      this.coverPlinthFoundationList = response.values;
      break;
    case 'architectsConsulting':
      this.architectsConsultingList = response.values;
      break;
    case 'debrisRemoval':
      this.debrisRemovalList = response.values;
      break;
    case 'earthquake':
      this.earthquakeList = response.values;
      break;
    case 'insuredWithOtherInsuranceCo':
      this.insuredWithOtherInsuranceCoList = response.values;
      break;
    case 'insuredWithOtherInsuranceCoDeclined':
      this.insuredWithOtherInsuranceCoDeclinedList = response.values;
      break;
    case 'residenceOfficeShops':
      this.residenceOfficeShopsList = response.values;
      break;
    case 'industrialManufacturingRisk':
      this.industrialManufacturingRiskList = response.values;
      break;
    case 'storageOutsideIndustrialRisk':
      this.storageOutsideIndustrialRiskList = response.values;
      break;
    case 'tankGasHolder':
      this.tankGasHolderList = response.values;
      break;
    case 'utilities':
      this.utilitiesList = response.values;
      break;
    case 'usedAsShop':
      this.usedAsShopList = response.values;
      break;
    case 'usedAsWarehouse':
      this.usedAsWarehouseList = response.values;
      break;
    case 'usedAsIndustrialManufacturingUnit':
      this.usedAsIndustrialManufacturingUnitList = response.values;
      break;
    case 'fireProtectionDeviceInstalled':
      this.fireProtectionDeviceInstalledList = response.values;
      break;
    case 'basicProposedForInsurance':
      this.basicProposedForInsuranceList = response.values;
      break;
    case 'marketValueBasis':
      this.marketValueBasisList = response.values;
      break;
    case 'reinstatementValueBasis':
      this.reinstatementValueBasisList = response.values;
      break;
    case 'age_of_building_list':
      this.ageOfBuildingList = response.values;
      break;
    case 'floaterBasis':
      this.floaterBasisList = response.values;
      break;
    case 'stocksStoredInOpen':
      this.stocksStoredInOpenList = response.values;
      break;
    case 'db_ri_required':
      this.riReqList = response.values;
      break;
    default:
      break;
  }
}

createData(data: any, type: string) {
  if(type === 'proposal') {
    return this.apiService.request(APIConst.DOI.DIRECT_BUSINESS.FIRE.CREATE_PROPOSAL, data);
  } else if(type === 'policy') {
    return this.apiService.request(APIConst.DOI.DIRECT_BUSINESS.FIRE.CREATE_POLICY, data);
  }
}

}
