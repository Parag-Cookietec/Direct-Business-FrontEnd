import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { BudgetLoanEstimateMasterListingComponent } from './budget-loan-estimate-master-listing.component';



const routes: Routes = [{
  path: '',
  component: BudgetLoanEstimateMasterListingComponent
}];

@NgModule({
  declarations: [BudgetLoanEstimateMasterListingComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class BudgetLoanEstimateMasterListingModule { }
