import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { GoiLoanReceivedAddDetailsComponent } from './goi-loan-received-add-details.component';


const routes: Routes = [{
  path: '',
  component: GoiLoanReceivedAddDetailsComponent
}];


@NgModule({
  declarations: [GoiLoanReceivedAddDetailsComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class GoiLoanReceivedAddDetailsModule { }
