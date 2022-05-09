import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MinistrywiseLoanReceivedComponent } from './Ministry-wise-Loan-Received.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

const routes: Routes = [{
  path: '',
  component: MinistrywiseLoanReceivedComponent
}];

@NgModule({
  declarations: [
    MinistrywiseLoanReceivedComponent
  ],
  imports: [
    SharedModule,
    NgxMatSelectSearchModule,
    RouterModule.forChild(routes)
  ]
})
export class MinistrywiseLoanReceivedModule { }
