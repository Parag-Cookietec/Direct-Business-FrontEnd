import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonthwiseorDateWiseLiabilityReportComponent } from './Month-wise-or-Date-Wise-Liability-Report.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

const routes: Routes = [{
  path: '',
  component: MonthwiseorDateWiseLiabilityReportComponent
}];

@NgModule({
  declarations: [
    MonthwiseorDateWiseLiabilityReportComponent
  ],
  imports: [
    SharedModule,
    NgxMatSelectSearchModule,
    RouterModule.forChild(routes)
  ]
})
export class MonthwiseorDateWiseLiabilityReportModule { }
