import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChallanNoWiseComponent } from './Challan-No-Wise.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

const routes: Routes = [{
  path: '',
  component: ChallanNoWiseComponent
}];

@NgModule({
  declarations: [
    ChallanNoWiseComponent
  ],
  imports: [
    SharedModule,
    NgxMatSelectSearchModule,
    RouterModule.forChild(routes)
  ]
})
export class ChallanNoWiseModule { }
