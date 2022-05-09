import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchemewiseGOIPaidReportComponent } from './Scheme-wise-GOI-Paid-Report.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

const routes: Routes = [{
  path: '',
  component: SchemewiseGOIPaidReportComponent
}];

@NgModule({
  declarations: [
    SchemewiseGOIPaidReportComponent
  ],
  imports: [
    SharedModule,
    NgxMatSelectSearchModule,
    RouterModule.forChild(routes)
  ]
})
export class SchemewiseGOIPaidReportModule { }
