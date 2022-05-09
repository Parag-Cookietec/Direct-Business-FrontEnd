import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards';
import { SharedModule } from 'src/app/shared/shared.module';


const routes: Routes = [
  {
    path: 'institution-cheque-paid',
    loadChildren: () => import('./institution-cheque-paid/institution-cheque-paid.module').then(m => m.InstitutionChequePaidModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'institution-loan-total-outstanding-vs-paid',
    loadChildren: () => import('./institution-loan-total-outstanding-vs-paid/institution-loan-total-outstanding-vs-paid.module').then(m => m.InstitutionLoanTotalOutstandingVsPaidModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'institution-wise-loan-liability',
    loadChildren: () => import('./institution-wise-loan-liability/instinstitution-loan-report.module').then(m => m.InstinstitutionLoanReportModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'loan-receipt',
    loadChildren: () => import('./loan-receipt/loan-receipt.module').then(m => m.LoanReceiptModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes),SharedModule, CommonModule],
  exports: [RouterModule]
})
export class InstitutionLoanReportRoutingModule { }
