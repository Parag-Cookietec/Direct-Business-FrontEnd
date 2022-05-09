import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemoNoWiseDetail } from './memo-no-wise-details.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

const routes: Routes = [{
  path: '',
  component: MemoNoWiseDetail
}];

@NgModule({
  declarations: [
    MemoNoWiseDetail
  ],
  imports: [
    SharedModule,
    NgxMatSelectSearchModule,
    RouterModule.forChild(routes)
  ]
})
export class MemoNoWiseDetailModule { }
