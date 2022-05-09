import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstinstitutionLoanReportRoutingModule } from './instinstitution-loan-report-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule, 
    InstinstitutionLoanReportRoutingModule,
    ReactiveFormsModule
  ]
})
export class InstinstitutionLoanReportModule { }
