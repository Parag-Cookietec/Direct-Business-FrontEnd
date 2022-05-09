import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoanRepaidComponent } from './loan-repaid.component';
import { AuthGuard } from 'src/app/guards';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: LoanRepaidComponent
  },
  {
    path: 'month-wise',
    loadChildren: () => import('./financial-year-wise/loan-repaid-year-wise.module').then(m => m.LoanRepaidYearWiseModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'date-wise',
    loadChildren: () => import('./month-wise/loan-repaid-month-wise.module').then(m => m.LoanRepaidMonthWiseModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  declarations:[LoanRepaidComponent],
  imports: [RouterModule.forChild(routes),SharedModule,CommonModule],
  exports: [RouterModule]
})
export class LoanRepaidRoutingModule { }
