import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CRfStatementComponent } from './crf-statement.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

const routes: Routes = [{
  path: '',
  component: CRfStatementComponent
}];

@NgModule({
  declarations: [
    CRfStatementComponent
  ],
  imports: [
    SharedModule,
    NgxMatSelectSearchModule,
    RouterModule.forChild(routes)
  ]
})
export class CRfStatementModule { }
