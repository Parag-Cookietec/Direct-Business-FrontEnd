import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemoveLoanRoutingModule } from './RemoveLoanRoutingModule';
import { RemoveLoanService } from 'src/app/modules/services/dmo/remove-loan.service';
import { MaterialModule } from 'src/app/shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { CommonProtoModule } from 'src/app/common/common.module';
import { RemoveLoanComponent } from './remove-loan/remove-loan.component';



@NgModule({
  declarations: [RemoveLoanComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    CommonProtoModule,
    RemoveLoanRoutingModule
  ],
  providers :[RemoveLoanService]
})
export class RemoveLoanModule { }
