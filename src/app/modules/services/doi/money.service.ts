import { Injectable } from '@angular/core';
import { APIConst } from 'src/app/shared/constants/doi/doi-api.constants';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MoneyService {

constructor(private apiService: ApiService) { }

createData(data: any, type: string) {
  if(type === 'proposal') {
    return this.apiService.request(APIConst.DOI.DIRECT_BUSINESS.MONEY.CREATE_PROPOSAL, data);
  } else if(type === 'policy') {
    return this.apiService.request(APIConst.DOI.DIRECT_BUSINESS.MONEY.CREATE_POLICY, data);
  }
}

}
