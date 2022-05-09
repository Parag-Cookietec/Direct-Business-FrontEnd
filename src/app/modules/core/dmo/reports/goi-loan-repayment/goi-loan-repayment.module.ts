import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GoiLoanRepaymentComponent } from './goi-loan-repayment.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [{
  path: '',
  component: GoiLoanRepaymentComponent
}];

@NgModule({
  declarations: [
    GoiLoanRepaymentComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class GoiLoanRepaymentComponentModule { }
