import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { GoiLoanApprovedComponent } from './goi-loan-approved.component';


const routes: Routes = [{
  path: '',
  component: GoiLoanApprovedComponent
}];

@NgModule({
  declarations: [GoiLoanApprovedComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class GoiLoanApprovedModule { }
