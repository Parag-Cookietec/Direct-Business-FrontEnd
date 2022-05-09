import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards';

const routes: Routes = [{
  path: '',
  children: [    
    {
      path: 'goi-loan-received',
      loadChildren: () => import('./goi-loan-received/goi-loan-received.module').then(m => m.GoiLoanReceivedModule),
      canActivate: [AuthGuard]
    },
    {
      path: 'goi-loan-received-add-details',
      loadChildren: () => import('./goi-loan-received-add-details/goi-loan-received-add-details.module').then(m => m.GoiLoanReceivedAddDetailsModule),
      canActivate: [AuthGuard]
    },
    {
      path: 'goi-loan-approved',
      loadChildren: () => import('./goi-loan-approved/goi-loan-approved.module').then(m => m.GoiLoanApprovedModule),
      canActivate: [AuthGuard]
    },
    {
      path: 'goi-loan-repayment',
      loadChildren: () => import('./goi-loan-repayment/goi-loan-repayment.module').then(m => m.GoiLoanRepaymentModule),
      canActivate: [AuthGuard]
    },
    {
      path: 'block-loan-master',
      loadChildren: () => import('./block-loan-consolidation/block-loan-consolidation.module').then(m => m.BlockLoanConsolidationModule),
      canActivate: [AuthGuard]
    }
    
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GOIRoutingModule { }
