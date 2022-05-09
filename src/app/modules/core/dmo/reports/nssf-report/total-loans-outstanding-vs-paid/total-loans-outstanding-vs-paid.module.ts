import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { outstandingvspaid } from './total-loans-outstanding-vs-paid.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

const routes: Routes = [{
  path: '',
  component: outstandingvspaid
}];

@NgModule({
  declarations: [
    outstandingvspaid
  ],
  imports: [
    SharedModule,
    NgxMatSelectSearchModule,
    RouterModule.forChild(routes)
  ]
})
export class outstandingvspaidModule { }
