import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { GrfSecurityInvestmentSaleComponent } from './grf-security-investment-sale.component';


const routes: Routes = [{
  path: '',
  component: GrfSecurityInvestmentSaleComponent
}];


@NgModule({
  declarations: [GrfSecurityInvestmentSaleComponent],
  imports: [
    SharedModule,
    NgxMatSelectSearchModule,
    RouterModule.forChild(routes)
  ]
})
export class GrfSecurityInvestmentSaleModule { }
