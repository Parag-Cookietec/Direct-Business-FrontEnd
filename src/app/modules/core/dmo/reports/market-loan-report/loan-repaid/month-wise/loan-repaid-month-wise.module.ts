import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoanRepaidMonthWiseComponent } from './loan-repaid-month-wise.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

const routes: Routes = [{
  path: '',
  component: LoanRepaidMonthWiseComponent
}];

@NgModule({
  declarations: [
    LoanRepaidMonthWiseComponent
  ],
  imports: [
    SharedModule,
    NgxMatSelectSearchModule,
    RouterModule.forChild(routes)
  ]
})
export class LoanRepaidMonthWiseModule { }
