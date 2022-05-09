import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { LoanRepaymentScheduleComponent } from './loan-repayment-schedule.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

const routes: Routes = [{
  path: '',
  component: LoanRepaymentScheduleComponent
}];

@NgModule({
  declarations: [LoanRepaymentScheduleComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxMatSelectSearchModule,
    RouterModule.forChild(routes)
  ]
})
export class LoanRepaymentScheduleModule { }
