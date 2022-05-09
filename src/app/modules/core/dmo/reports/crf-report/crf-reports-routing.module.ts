import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { AuthGuard } from 'src/app/guards';


const routes: Routes = [
  {
    path: 'crfstatements',
    loadChildren: () => import('./crf_statement/crf-statement.module').then(m => m.CRfStatementModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'crfsecurity',
    loadChildren: () => import('./crf-security-investment-sale/crf-security-investment-sale.module').then(m => m.CRfSecurityInvestmentSaleModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'crfyearwise',
    loadChildren: () => import('./crf-year-wise-of-investment/crf-year-wise-of-investment.module').then(m => m.CrfYearWiseOfInvestmentModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'crftotalInvestment',
    loadChildren: () => import('./crf-total-investment/crf-total-investment.module').then(m => m.CrfTotalInvestmentModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule, CommonModule],
  exports: [RouterModule]
})
export class CrfReportsRoutingModule { }
