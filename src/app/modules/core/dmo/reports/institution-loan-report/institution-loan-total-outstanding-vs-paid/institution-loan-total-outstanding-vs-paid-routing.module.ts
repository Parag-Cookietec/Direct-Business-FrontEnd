import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards';
import { SharedModule } from 'src/app/shared/shared.module';
import { institutionLoanoutstandingvspaid } from './institution-loan-total-outstanding-vs-paid.component';

const routes: Routes = [
  {
    path: '',
    component: institutionLoanoutstandingvspaid
  },
  {
    path: 'dept-wise-outstanding-vs-paid',
    loadChildren: () => import('./dept-wise-outstanding-vs-paid/dept-wise-outstanding-vs-paid.module').then(m => m.DeptWiseOutstandingVsPaidModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  declarations: [institutionLoanoutstandingvspaid],
  imports: [RouterModule.forChild(routes), SharedModule,CommonModule],
  exports: [RouterModule]
})
export class InstitutionLoanTotalOutstandingVsPaidRoutingModule { }
