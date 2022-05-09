import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AuthGuard } from 'src/app/guards';
import { SharedModule } from 'src/app/shared/shared.module';
import { InstitutionLoanReceiptComponent } from './institution-loan-receipt.component';

const routes: Routes = [
  {
    path: '',
    component: InstitutionLoanReceiptComponent
  },
  {
    path: 'institution-loan-department-wise-loan-receipt',
    loadChildren: () => import('./institution-loan-department-wise-loan-receipt/institution-loan-department-wise-receipt.module').then(m => m.InstitutionLoanDepartmentWiseReceiptModule),
    canActivate: [AuthGuard]
  }

];

@NgModule({
  declarations:[InstitutionLoanReceiptComponent],
  imports: [RouterModule.forChild(routes), SharedModule, CommonModule,
    NgxMatSelectSearchModule],
  exports: [RouterModule]
})
export class LoanReceiptRoutingModule { }
