import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { BudgetLoanEstimateMasterComponent } from './budget-loan-estimate-master.component';

const routes: Routes = [{
  path: '',
  component: BudgetLoanEstimateMasterComponent
}];

@NgModule({
  declarations: [BudgetLoanEstimateMasterComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class BudgetLoanEstimateMasterModule { }
