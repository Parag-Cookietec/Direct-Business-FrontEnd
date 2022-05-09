import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards';
import { LoanoutstandingComponent } from './loan-outstanding.component';

const routes: Routes = [
  {
    path: '',
    component: LoanoutstandingComponent
  },
  {
    path: 'month-wise',
    loadChildren: () => import('./financial-year-wise/loan-outstanding-year-wise.module').then(m => m.LoanoutstandingYearWiseModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'date-wise',
    loadChildren: () => import('./month-wise/loan-outstanding-month-wise.module').then(m => m.LoanoutstandingMonthWiseModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanOutstandingRoutingModule { }
