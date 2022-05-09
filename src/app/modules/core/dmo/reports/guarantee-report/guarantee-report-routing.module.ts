import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards';


const routes: Routes = [
  {
    path: 'department-wise-outstanding-guarantees',
    loadChildren: () => import('./department-wise-outstanding-guarantees/department-wise-outstanding-guarantees.module').then(m => m.DepartmentWiseOutstandingGuaranteesModule),
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'guarantee-details-of-proposals-with-status',
  //   loadChildren: () => import('./guarantee-details-of-proposals-with-status/guarantee-details-of-proposls-with-status.module').then(m => m.GuaranteeDetailsOfProposlsWithStatusModule),
  //   canActivate: [AuthGuard]
  // },
  {
    path: 'guarantee-register-guarantee-wise',
    loadChildren: () => import('./guarantee-register-guarantee-wise/guarantee-register-guarantee-wise.module').then(m => m.GuaranteeRegisterGuaranteeWiseModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'guarantee-register-organization-wise',
    loadChildren: () => import('./guarantee-register-organization-wise/guarantee-register-organization-wise.module').then(m => m.GuaranteeRegisterOrganizationWiseModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'major-beneficiaries',
    loadChildren: () => import('./major-beneficiaries/major-beneficiaries.module').then(m => m.MajorBeneficiariesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'net-issuance-of-guarantees',
    loadChildren: () => import('./net-issuance-of-guarantees/net-issuance-of-guarantees.module').then(m => m.NetIssuanceofGuaranteesModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuaranteeReportRoutingModule { }
