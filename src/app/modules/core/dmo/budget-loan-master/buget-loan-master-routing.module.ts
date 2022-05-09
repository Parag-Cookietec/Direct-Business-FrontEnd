import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: '',
      loadChildren: () => import('./budget-loan-estimate-master-listing/budget-loan-estimate-master-listing.module').then(m => m.BudgetLoanEstimateMasterListingModule),
      canActivate: [AuthGuard]
    },
    {
      path: 'budget-loan-estimate-master-add',
      loadChildren: () => import('./budget-loan-estimate-master/budget-loan-estimate-master.module').then(m => m.BudgetLoanEstimateMasterModule),
      canActivate: [AuthGuard]
    }]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes),SharedModule,CommonModule],
  exports: [RouterModule]
})
export class BugetLoanMasterRoutingModule { }
