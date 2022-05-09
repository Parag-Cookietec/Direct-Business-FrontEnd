import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoanOutstandingRoutingModule } from './loan-outstanding-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { LoanoutstandingComponent } from './loan-outstanding.component';


@NgModule({
  declarations: [LoanoutstandingComponent], 
  imports: [
    CommonModule,
    SharedModule,
    NgxMatSelectSearchModule,
    LoanOutstandingRoutingModule
  ]
})
export class LoanOutstandingModule { }
