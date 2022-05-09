import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { GuaranteeOrganizationsMasterComponent } from './guarantee-organizations-master.component';

const routes: Routes = [{
  path: '',
  component: GuaranteeOrganizationsMasterComponent
}];

@NgModule({
  declarations: [GuaranteeOrganizationsMasterComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class GuaranteeOrganizationsMasterViewModule { }
