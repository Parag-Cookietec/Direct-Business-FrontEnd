import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstitutionAccLoanLiability } from './institution-acc-loan-liability.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [{
  path: '',
  component: InstitutionAccLoanLiability
}];

@NgModule({
  declarations: [
    InstitutionAccLoanLiability
  ],
  imports: [
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    RouterModule.forChild(routes)
  ]
})
export class InstitutionAccLoanLiabilityModule { }
