import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards';
import { SharedModule } from 'src/app/shared/shared.module';


const routes: Routes = [

  {
    path: 'ministry-wise-loan-received',
    loadChildren: () => import('./Ministry-wise-Loan-Received/Ministry-wise-Loan-Received.module').then(m => m.MinistrywiseLoanReceivedModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'month-wise-or-date-wise-liability-report',
    loadChildren: () => import('./Month-wise-or-Date-Wise-Liability-Report/Month-wise-or-Date-Wise-Liability-Report.module').then(m => m.MonthwiseorDateWiseLiabilityReportModule),
    canActivate: [AuthGuard]
  },


  {
    path: 'scheme-wise-goi-outstanding-report',
    loadChildren: () => import('./Scheme-wise-GOI-Outstanding-Report/Scheme-wise-GOI-Outstanding-Report.module').then(m => m.SchemewiseGOIOutstandingReportModule),
    canActivate: [AuthGuard]
  },
  

  {
    path: 'scheme-wise-goi-paid-report',
    loadChildren: () => import('./Scheme-wise-GOI-Paid-Report/Scheme-wise-GOI-Paid-Report.module').then(m => m.SchemewiseGOIPaidReportModule),
    canActivate: [AuthGuard]
  },


  // following are not in goi

  // {
  //   path: 'scheme-tranche-wise-details-of-loan-outstanding',
  //   loadChildren: () => import('./Scheme-Tranche-wise-Details-of-Loan-Outstanding/scheme-Tranche-wise-Details-of-Loan-Outstanding.module').then(m => m.SchemeTrancheWiseDetailsOfLoanOutstandingModule),
  //   canActivate: [AuthGuard]
  // },
  
  // {
  //   path: 'challan-details',
  //   loadChildren: () => import('./Challan-Details/Challan-Details.module').then(m => m.ChallanDetailsModule),
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'challan-no-wise',
  //   loadChildren: () => import('./Challan-Details/Challan-No-Wise/Challan-No-Wise.module').then(m => m.ChallanNoWiseModule),
  //   canActivate: [AuthGuard]
  // },
  
  
  
  
  

];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule, CommonModule],
  exports: [RouterModule]
})
export class GoiReportRoutingModule { }
