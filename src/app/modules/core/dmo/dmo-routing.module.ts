import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards';

import { NssfLoanRepaymentComponent } from './nssf-loan/nssf-loan-repayment/nssf-loan-repayment.component';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: '',
      redirectTo: 'daily-position-sheet',
      pathMatch: 'full'
    }, {
      path: 'daily-position-sheet',
      loadChildren: () => import('./daily-position/daily-position-sheet/daily-position.module').then(m => m.DailyPositionModule),
      canActivate: [AuthGuard]
    }, {
      path: 'daily-position-sheet-listing',
      loadChildren: () => import('./daily-position/daily-position-sheet-listing/daily-position-sheet-listing.module').then(m => m.DailyPositionSheetListingModule),
      canActivate: [AuthGuard]
    }, {
      path: 'nssf-loan-received',
      loadChildren: () => import('./nssf-loan/nssf-loan-received/nssf-loan-received.module').then(m => m.NssfLoanReceivedModule),
      canActivate: [AuthGuard]
    }, {
      path: 'nssf-loan-approved',
      loadChildren: () => import('./nssf-loan/nssf-loan-approved/nssf-loan-approved.module').then(m => m.NssfLoanApprovedModule),
      canActivate: [AuthGuard]
    }, {
      path: 'loan-repayment-schedule',
      loadChildren: () => import('./nssf-loan/loan-repayment-schedule/loan-repayment-schedule.module').then(m => m.LoanRepaymentScheduleModule),
      canActivate: [AuthGuard]
    }, {
      path: 'nssf-loan-repayment',
      component: NssfLoanRepaymentComponent,
      canActivate: [AuthGuard]
    }, {
      path: 'market-loan-received',
      loadChildren: () => import('./market-loan/market-loan-received/market-loan-received.module').then(m => m.MarketLoanReceivedModule),
      canActivate: [AuthGuard]
    }, {
      path: 'market-loan-approved',
      loadChildren: () => import('./market-loan/market-loan-approved/market-loan-approved.module').then(m => m.MarketLoanApprovedModule),
      canActivate: [AuthGuard]
    }, {
      path: 'market-loan-repayment-rbi',
      loadChildren: () => import('./market-loan/market-loan-repayment-rbi/market-loan-repayment-rbi.module').then(m => m.MarketLoanRepaymentRbiModule),
      canActivate: [AuthGuard]
    }, {
      path: 'market-loan-repayment-treasury',
      loadChildren: () => import('./market-loan/market-loan-repayment-treasury/market-loan-repayment-treasury.module').then(m => m.MarketLoanRepaymentTreasuryModule),
      canActivate: [AuthGuard]
    }, {
      path: 'press-communique-for-principle-payment',
      loadChildren: () => import('./market-loan/press-communique-for-principle-payment/press-communique-for-principle-payment.module').then(m => m.PressCommuniqueForPrinciplePaymentModule),
      canActivate: [AuthGuard]
    }, {
      path: 'grf',
      loadChildren: () => import('./GRF/grf.module').then(m => m.GrfModule),
      canActivate: [AuthGuard]
    }, {
      path: 'crf',
      loadChildren: () => import('./CRF/crf.module').then(m => m.CrfModule),
      canActivate: [AuthGuard]
    }, {
      path: 'guarantee-entry',
      loadChildren: () => import('./gauarantee-entry/guarantee-entry/gauarantee-entry.module').then(m => m.GauaranteeEntryModule),
      canActivate: [AuthGuard]
    },
    {
      path: 'goi',
      loadChildren: () => import('./GOI/goi.module').then(m => m.GOIModule),
      canActivate: [AuthGuard]
    },
    {
      path: 'budget-loan-master-listing',
      loadChildren: () => import('./budget-loan-master/buget-loan-master.module').then(m => m.BugetLoanMasterModule),
      canActivate: [AuthGuard]
    },
    {
      path: 'wma-master-listing',
      loadChildren: () => import('./wma-master/wma-master.module').then(m => m.WmaMasterModule),
      canActivate: [AuthGuard]
    },
    {
      path: 'guarantee-organizations-master-listing',
      loadChildren: () => import('./guarantee-organizations-master/guarantee-organizations-master.module').then(m => m.GuaranteeOrganizationsMasterModule),
      canActivate: [AuthGuard]
    },
    {
      path: 'advice-master',
      loadChildren: () => import('./advice-master-listing/advice-master-listing.module').then((m) => m.AdviceMasterListingModule),
      canActivate: [AuthGuard]
    },
    {
      path: 'goi-department-ministry-name-master-listing',
      loadChildren: () => import('./goi-department-ministry-name-master-listing/goi-department-ministry-name-master-listing.module').then((m) => m.GoiDepartmentMinistryNameMasterModule),
      canActivate: [AuthGuard]
    },
    {
      path: 'security-master-listing',
      loadChildren: () => import('./security-master-listing/security-master-listing.module').then((m) => m.SecurityMasterListingModule),
      canActivate: [AuthGuard]
    },
    {
      path: 'institute-master-listing',
      loadChildren: () => import('./institute-master-listing/institute-master-listing.module').then((m) => m.InstituteMasterListingModule),
      canActivate: [AuthGuard]
    },
    {
      path: 'goi-loan-purpose-master-listing',
      loadChildren: () => import('./goi-loan-purpose-master-listing/goi-loan-purpose-master-listing.module').then((m) => m.GoiLoanPurposeMasterListingModule),
      canActivate: [AuthGuard]
    },
    {
      path: 'institutional-loan',
      loadChildren: () => import('./InstitutionalLoanDetails/institutional-loan-details.module').then((m) => m.InstitutionalLoanDetailsModule),
      canActivate: [AuthGuard]
    },
    {
      path: 'remove-loan',
      loadChildren: () => import('./RemoveLoan/remove-loan.module').then((m) => m.RemoveLoanModule),
      canActivate: [AuthGuard]
    },
    {
      path: 'reports',
      loadChildren: () => import('./reports/reports.module').then((m) => m.ReportsModule),
      canActivate: [AuthGuard]
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DmoRoutingModule { }
