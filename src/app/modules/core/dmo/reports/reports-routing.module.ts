import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards';
import { SharedModule } from 'src/app/shared/shared.module';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'crf-reports', // done
        loadChildren: () => import('./crf-report/crf-reports.module').then(m => m.CrfReportsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'grf-reports', // done
        loadChildren: () => import('./grf-report/grf-report.module').then(m => m.GrfReportModule),
        canActivate: [AuthGuard]
      },

      {
        path: 'nssf-reports-Module',  // done
        loadChildren: () => import('./nssf-report/nssf-report.module').then(m => m.NssfReportModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'market-loan-reports',  // done
        loadChildren: () => import('./market-loan-report/market-loan-report.module').then(m => m.MarketLoanReportModule),
        canActivate: [AuthGuard]
      },

      {
        path: 'goi-loan-repayment',
        loadChildren: () => import('./goi-loan-repayment/goi-loan-repayment.module').then(m => m.GoiLoanRepaymentComponentModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'goi-reports',
        loadChildren: () => import('./goi-report/goi-report.module').then(m => m.GoiReportModule),
        canActivate: [AuthGuard]
      },
      
      {
        path: 'guarantee-report',
        loadChildren: () => import('./guarantee-report/guarantee-report.module').then(m => m.GuaranteeReportModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'institution-loan-report',
        loadChildren: () => import('./institution-loan-report/institution-loan-report.module').then(m => m.InstitutionLoanReportModule),
        canActivate: [AuthGuard]
      },
      
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule, CommonModule],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
