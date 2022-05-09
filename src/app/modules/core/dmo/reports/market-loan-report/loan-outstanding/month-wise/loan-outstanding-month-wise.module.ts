import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoanoutstandingMonthWiseComponent } from './loan-outstanding-month-wise.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

const routes: Routes = [{
  path: '',
  component: LoanoutstandingMonthWiseComponent
}];

@NgModule({
  declarations: [
    LoanoutstandingMonthWiseComponent
  ],
  imports: [
    SharedModule,
    NgxMatSelectSearchModule,
    RouterModule.forChild(routes)
  ]
})
export class LoanoutstandingMonthWiseModule { }
