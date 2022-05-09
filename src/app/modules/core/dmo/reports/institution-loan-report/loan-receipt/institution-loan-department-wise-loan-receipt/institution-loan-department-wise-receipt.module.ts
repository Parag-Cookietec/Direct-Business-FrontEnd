import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstitutionLoanDepartmentWiseReceiptComponent } from './institution-loan-department-wise-receipt.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

const routes: Routes = [{
  path: '',
  component: InstitutionLoanDepartmentWiseReceiptComponent
}];

@NgModule({
  declarations: [
    InstitutionLoanDepartmentWiseReceiptComponent
  ],
  imports: [
    SharedModule,
    NgxMatSelectSearchModule,
    RouterModule.forChild(routes)
  ]
})
export class InstitutionLoanDepartmentWiseReceiptModule { }
