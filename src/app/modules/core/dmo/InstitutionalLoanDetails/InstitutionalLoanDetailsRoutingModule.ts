import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeleteMemorandumComponent } from './delete-memorandum/delete-memorandum.component';
import { InstituteLetterDetailsComponent } from './institute-letter-details/institute-letter-details.component';
// tslint:disable-next-line: max-line-length
// tslint:disable-next-line: max-line-length
import { PaidChequeComponent } from './paid-cheque/paid-cheque.component';
import { InstituteLoanApprovedComponent } from './institute-loan-approved/institute-loan-approved.component';
import { ChkDeRecevdfrmInstComponent } from './chk-de-recevdfrm-inst/chk-de-recevdfrm-inst.component';
import { MemoGenDetComponent } from './memo-gen-det/memo-gen-det.component';
import { UpdateInstLetDetComponent } from './update-inst-let-det/update-inst-let-det.component';
import { ChkDetFrPayPrncplorInstComponent } from './chk-det-fr-pay-prncplor-inst/chk-det-fr-pay-prncplor-inst.component';
import { InstLetDetDPDetComponent } from './inst-let-det-dpdet/inst-let-det-dpdet.component';
import { AddDetOrLonMgmtComponent } from './add-det-or-lon-mgmt/add-det-or-lon-mgmt.component';
import { InstLoanRecevedAddComponent } from './inst-let-det-dpdet/inst-loan-receved-add/inst-loan-receved-add.component';

const routes: Routes = [

  { path: 'paid-cheque', component: PaidChequeComponent },
  { path: 'institute-loan-approved', component: InstituteLoanApprovedComponent },
  {
    path: 'update-institute-letter-details',
    component: UpdateInstLetDetComponent
  },
  {
    path: 'delete-memorandum',
    component: DeleteMemorandumComponent
  },
//   {
//     path: 'institution-loan-repayment-old',
//     component: InstitutionLoanRepaymentComponent
//   },
  {
    path: 'institute-letter-details',
    component: InstituteLetterDetailsComponent
  },
  {
    path: 'cheque-details-received-from-institute',
    component: ChkDeRecevdfrmInstComponent
  },
  {
    path: 'cheque-details-received-institute/add',
    component: AddDetOrLonMgmtComponent
  },
  {
    path: 'cheque-details-for-payment',
    component: ChkDetFrPayPrncplorInstComponent
  },
//   {
//     path: 'intimation-for-purchase-sale',
//     component: IntimationForPurchaseSaleComponent
//   },
  {
    path: 'memo-generation-details',
    component: MemoGenDetComponent
  },
//   {
//     path: 'institute-master',
//     component: InstituteMasterComponent
//   },
//   {
//     path: 'institute-master-listing',
//     component: InstituteMasterListingComponent
//   },
//   {
//     path: 'institute-master',
//     component: InstituteMasterComponent
//   },
//   {
//     path: 'institute-master-listing',
//     component: InstituteMasterListingComponent
//   },
  {
    path: 'institution-loan-received',
    component: InstLetDetDPDetComponent
  },
  {
    path: 'institution-loan-received/add-details',
    component: InstLoanRecevedAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstitutionalLoanDetailsRoutingModule { }
