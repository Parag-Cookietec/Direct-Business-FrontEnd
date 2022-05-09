import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuaranteeRegisterOrganizationWiseComponent } from './guarantee-register-organization-wise.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

const routes: Routes = [{
  path: '',
  component: GuaranteeRegisterOrganizationWiseComponent
}];

@NgModule({
  declarations: [
    GuaranteeRegisterOrganizationWiseComponent
  ],
  imports: [
    SharedModule,
    NgxMatSelectSearchModule,
    RouterModule.forChild(routes)
  ]
})
export class GuaranteeRegisterOrganizationWiseModule { }
