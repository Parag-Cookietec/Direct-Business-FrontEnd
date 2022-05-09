import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketLoanInterestRateComponent } from './market-loan-interest-rate.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

const routes: Routes = [{
  path: '',
  component: MarketLoanInterestRateComponent
}];

@NgModule({
  declarations: [
    MarketLoanInterestRateComponent
  ],
  imports: [
    SharedModule,
    NgxMatSelectSearchModule,
    RouterModule.forChild(routes)
  ]
})
export class MarketLoanInterestRateModule { }
