import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards';


const routes: Routes = [
  {
    path: 'grfstatements',
    loadChildren: () => import('./grf_statement/grf-statement.module').then(m => m.GRfStatementModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'grfsecurity',
    loadChildren: () => import('./grf-security-investment-sale/grf-security-investment-sale.module').then(m => m.GrfSecurityInvestmentSaleModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'grftotalInvestment',
    loadChildren: () => import('./grf-total-investment/grf-total-investment.module').then(m => m.GrfTotalInvestmentModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'grfyearwise',
    loadChildren: () => import('./grf-year-wise-of-investment/grf-year-wise-of-investment.module').then(m => m.GrfYearWiseOfInvestmentModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrfReportRoutingModule { }
