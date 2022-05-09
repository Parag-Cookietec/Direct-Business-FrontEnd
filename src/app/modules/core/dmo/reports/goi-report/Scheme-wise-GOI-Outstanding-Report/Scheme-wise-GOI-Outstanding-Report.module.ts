import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchemewiseGOIOutstandingReportComponent } from './Scheme-wise-GOI-Outstanding-Report.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

const routes: Routes = [{
  path: '',
  component: SchemewiseGOIOutstandingReportComponent
}];

@NgModule({
  declarations: [
    SchemewiseGOIOutstandingReportComponent
  ],
  imports: [
    SharedModule,
    NgxMatSelectSearchModule,
    RouterModule.forChild(routes)
  ]
})
export class SchemewiseGOIOutstandingReportModule { }
