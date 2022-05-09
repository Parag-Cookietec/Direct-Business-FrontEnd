import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoanRepaidYearWiseComponent } from './loan-repaid-year-wise.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

const routes: Routes = [{
  path: '',
  component: LoanRepaidYearWiseComponent
}];

@NgModule({
  declarations: [
    LoanRepaidYearWiseComponent
  ],
  imports: [
    SharedModule,
    NgxMatSelectSearchModule,
    RouterModule.forChild(routes)
  ]
})
export class LoanRepaidYearWiseModule { }
