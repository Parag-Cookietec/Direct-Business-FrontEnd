import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuaranteeRegisterGuaranteeWiseComponent } from './guarantee-register-guarantee-wise.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

const routes: Routes = [{
  path: '',
  component: GuaranteeRegisterGuaranteeWiseComponent
}];

@NgModule({
  declarations: [
    GuaranteeRegisterGuaranteeWiseComponent
  ],
  imports: [
    SharedModule,
    NgxMatSelectSearchModule,
    RouterModule.forChild(routes)
  ]
})
export class GuaranteeRegisterGuaranteeWiseModule { }
