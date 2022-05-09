import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'guarantee-organizations-master-add',
      loadChildren: () => import('./guarantee-organizations-master/guarantee-organizations-master-view.module').then(m => m.GuaranteeOrganizationsMasterViewModule),
      canActivate: [AuthGuard]
    },
    {
      path: '',
      loadChildren: () => import('./guarantee-organizations-master-listing/guarantee-organizations-master-listing.module').then(m => m.GuaranteeOrganizationsMasterListingModule),
      canActivate: [AuthGuard]
    }
  ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes),SharedModule,CommonModule],
  exports: [RouterModule]
})
export class GuaranteeOrganizationsMasterRoutingModule { }
