import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { GrfYearWiseOfInvestmentComponent } from './grf-year-wise-of-investment.component';




const routes: Routes = [{
  path: '',
  component: GrfYearWiseOfInvestmentComponent
}];


@NgModule({
  declarations: [GrfYearWiseOfInvestmentComponent],
  imports: [
    SharedModule,
    NgxMatSelectSearchModule,
    RouterModule.forChild(routes)
  ]
})
export class GrfYearWiseOfInvestmentModule { }
