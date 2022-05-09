import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards';
import { SharedModule } from 'src/app/shared/shared.module';


const routes: Routes = [
  {
    path: 'loan-receipt',
    loadChildren: () => import('./loan-receipt/loan-receipt.module').then(m => m.LoanReceiptModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'repayment-liability',
    loadChildren: () => import('./repayment-liability/repayment-liability.module').then(m => m.RepaymentLiabilityModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'loan-outstanding',
    loadChildren: () => import('./loan-outstanding/loan-outstanding.module').then(m => m.LoanOutstandingModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'loan-repaid',
    loadChildren: () => import('./loan-repaid/loan-repaid.module').then(m => m.LoanRepaidModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'market-loan-interest-rate',
    loadChildren: () => import('./market-loan-interest-rate/market-loan-interest-rate.module').then(m => m.MarketLoanInterestRateModule),
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'repayment-liability',
  //   loadChildren: () => import('./repayment-liability/repayment-liability.module').then(m => m.RepaymentLiabilityModule),
  //   canActivate: [AuthGuard]
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes),SharedModule, CommonModule],
  exports: [RouterModule]
})
export class MarketLoanReportRoutingModule { }
