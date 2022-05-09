import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoanoutstandingComponent } from './loan-outstanding.component';
import { AuthGuard } from 'src/app/guards';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '', // yearly 
    component: LoanoutstandingComponent
  },
  {
    path: 'month-wise', // monthly 
    loadChildren: () => import('./financial-year-wise/loan-outstanding-year-wise.module').then(m => m.LoanoutstandingYearWiseModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'date-wise', //datewise
    loadChildren: () => import('./month-wise/loan-outstanding-month-wise.module').then(m => m.LoanoutstandingMonthWiseModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  declarations:[LoanoutstandingComponent],
  imports: [RouterModule.forChild(routes),
    SharedModule, 
    CommonModule],
  exports: [RouterModule]
})
export class LoanOutstandingRoutingModule { }
