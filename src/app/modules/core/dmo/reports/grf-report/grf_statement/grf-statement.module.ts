import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GRfStatementComponent } from './grf-statement.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

const routes: Routes = [{
  path: '',
  component: GRfStatementComponent
}];

@NgModule({
  declarations: [
    GRfStatementComponent
  ],
  imports: [
    SharedModule,
    NgxMatSelectSearchModule,
    RouterModule.forChild(routes)
  ]
})
export class GRfStatementModule { }
