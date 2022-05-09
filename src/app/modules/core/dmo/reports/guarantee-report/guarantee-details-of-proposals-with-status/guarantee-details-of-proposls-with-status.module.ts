import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuaranteeRegisterOrganizationWiseComponent } from './guarantee-details-of-proposals-with-status.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

const routes: Routes = [{
  path: '',
  component: GuaranteeRegisterOrganizationWiseComponent
}];

@NgModule({
  declarations: [GuaranteeRegisterOrganizationWiseComponent],
  imports: [
    SharedModule,
    NgxMatSelectSearchModule,
    RouterModule.forChild(routes)
  ]
})
export class GuaranteeDetailsOfProposlsWithStatusModule { }
