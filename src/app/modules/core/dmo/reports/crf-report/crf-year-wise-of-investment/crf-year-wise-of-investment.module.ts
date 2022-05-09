import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { CrfYearWiseOfInvestmentComponent } from './crf-year-wise-of-investment.component';

const routes: Routes = [{
  path: '',
  component: CrfYearWiseOfInvestmentComponent
}];

@NgModule({
  declarations: [CrfYearWiseOfInvestmentComponent],
  imports: [
    SharedModule,
    NgxMatSelectSearchModule,    
    RouterModule.forChild(routes)
  ]
})
export class CrfYearWiseOfInvestmentModule { }
