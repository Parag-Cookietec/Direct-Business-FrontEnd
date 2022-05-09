import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { GoiLoanRepaymentComponent } from './goi-loan-repayment.component';


const routes: Routes = [{
  path: '',
  component: GoiLoanRepaymentComponent
}];

@NgModule({
  declarations: [GoiLoanRepaymentComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class GoiLoanRepaymentModule { }
