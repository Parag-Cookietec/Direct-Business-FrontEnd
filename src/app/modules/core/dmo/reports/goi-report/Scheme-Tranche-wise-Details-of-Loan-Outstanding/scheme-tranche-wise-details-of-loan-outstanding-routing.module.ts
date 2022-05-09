import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards';
import { SharedModule } from 'src/app/shared/shared.module';
import { SchemeTranchewiseDetailsofLoanOutstandingComponent } from './Scheme-Tranche-wise-Details-of-Loan-Outstanding.component';


const routes: Routes = [
  {
    path: '',
    component:SchemeTranchewiseDetailsofLoanOutstandingComponent
  },
  {
    path: 'Amount-Wise',
    loadChildren: () => import('./Amount-Wise/Amount-Wise.module').then(m => m.AmountWiseModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'Scheme-Name-Wise',
    loadChildren: () => import('./Scheme-Name-Wise/Scheme-Name-Wise.module').then(m => m.SchemeNameWiseModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'Tranche-Wise',
    loadChildren: () => import('./Tranche-Wise/Tranche-Wise.module').then(m => m.TrancheWiseModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  declarations:[SchemeTranchewiseDetailsofLoanOutstandingComponent],
  imports: [RouterModule.forChild(routes),SharedModule,CommonModule],
  exports: [RouterModule]
})
export class SchemeTrancheWiseDetailsOfLoanOutstandingRoutingModule { }
