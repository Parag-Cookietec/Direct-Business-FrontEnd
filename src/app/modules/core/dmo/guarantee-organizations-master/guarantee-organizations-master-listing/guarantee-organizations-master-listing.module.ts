import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { GuaranteeOrganizationsMasterListingComponent } from './guarantee-organizations-master-listing.component';

const routes: Routes = [{
  path: '',
  component: GuaranteeOrganizationsMasterListingComponent
}];


@NgModule({
  declarations: [GuaranteeOrganizationsMasterListingComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class GuaranteeOrganizationsMasterListingModule { }
