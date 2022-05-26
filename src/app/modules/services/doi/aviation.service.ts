import { Injectable } from '@angular/core';
import { ListValue } from 'src/app/model/common-listing';
import { APIConst } from 'src/app/shared/constants/doi/doi-api.constants';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AviationService {

constructor(private apiService: ApiService) { }

riskCoveredList: ListValue[] = [];


getRiskCoveredList() {
  this.apiService.request(APIConst.DOI.DIRECT_BUSINESS.AVIATION.riskCovered).subscribe(res => {
    this.riskCoveredList = res.values;
  });
}

createData(data: any, type: string) {
  if(type === 'proposal') {
    return this.apiService.request(APIConst.DOI.DIRECT_BUSINESS.AVIATION.CREATE_PROPOSAL, data);
  } else if(type === 'policy') {
    return this.apiService.request(APIConst.DOI.DIRECT_BUSINESS.AVIATION.CREATE_POLICY, data);
  }
}
}
