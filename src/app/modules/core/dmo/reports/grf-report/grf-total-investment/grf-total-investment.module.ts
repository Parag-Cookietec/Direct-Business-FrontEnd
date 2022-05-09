import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { GrfTotalInvestmentComponent } from './grf-total-investment.component';



const routes: Routes = [{
  path: '',
  component: GrfTotalInvestmentComponent
}];


@NgModule({
  declarations: [GrfTotalInvestmentComponent],
  imports: [
    SharedModule,
    NgxMatSelectSearchModule,
    RouterModule.forChild(routes)
  ]
})
export class GrfTotalInvestmentModule { }
