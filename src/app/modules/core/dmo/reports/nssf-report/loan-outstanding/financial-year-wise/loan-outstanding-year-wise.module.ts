import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoanoutstandingYearWiseComponent } from './loan-outstanding-year-wise.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

const routes: Routes = [{
  path: '',
  component: LoanoutstandingYearWiseComponent
}];

@NgModule({
  declarations: [
    LoanoutstandingYearWiseComponent
  ],
  imports: [
    SharedModule,
    NgxMatSelectSearchModule,
    RouterModule.forChild(routes)
  ]
})
export class LoanoutstandingYearWiseModule { }
