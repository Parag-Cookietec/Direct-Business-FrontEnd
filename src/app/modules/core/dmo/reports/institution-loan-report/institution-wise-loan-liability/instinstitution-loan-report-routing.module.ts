import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AuthGuard } from 'src/app/guards';
import { SharedModule } from 'src/app/shared/shared.module';
import { InstituteWiseLoanLiabilityComponent } from './institution-wise-loan-liability.component';

const routes: Routes = [
  {
    path: '',
    component: InstituteWiseLoanLiabilityComponent
  },
  {
    path: 'institution-loan-department-wise-loan-receipt',
    loadChildren: () => import('./institution-account-wise-loan-liability/institution-acc-loan-liability.module').then(m => m.InstitutionAccLoanLiabilityModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations:[InstituteWiseLoanLiabilityComponent],
  imports: [RouterModule.forChild(routes), SharedModule, NgxMatSelectSearchModule],
  exports: [RouterModule]
})
export class InstinstitutionLoanReportRoutingModule { }
