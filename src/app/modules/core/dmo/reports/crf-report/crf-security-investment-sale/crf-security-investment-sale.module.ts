import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { CRfSecurityInvestmentSaleComponent } from './crf-security-investment-sale.component';

const routes: Routes = [{
  path: '',
  component: CRfSecurityInvestmentSaleComponent
}];

@NgModule({
  declarations: [
    CRfSecurityInvestmentSaleComponent
  ],
  imports: [
    SharedModule,
    NgxMatSelectSearchModule,
    RouterModule.forChild(routes)
  ]
})
export class CRfSecurityInvestmentSaleModule { }
