import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BurglaryHouseBreakingPolicyComponent } from './components/burglary-house-breaking-policy/burglary-house-breaking-policy.component';
import { ClaimEntryListingApplicationAcceptedComponent } from './components/claim-entry-listing-application-accepted/claim-entry-listing-application-accepted.component';
import { ClaimEntryListingSendForApprovalComponent } from './components/claim-entry-listing-send-for-approval/claim-entry-listing-send-for-approval.component';
import { ClaimEntryListingSendForPaymentComponent } from './components/claim-entry-listing-send-for-payment/claim-entry-listing-send-for-payment.component';
import { ClaimEntryListingComponent } from './components/claim-entry-listing/claim-entry-listing.component';
import { ClaimEntryViewComponent } from './components/claim-entry-view/claim-entry-view.component';
import { ClaimEntryComponent } from './components/claim-entry/claim-entry.component';
import { ClaimInvestigationSurveyorComponent } from './components/claim-investigation-surveyor/claim-investigation-surveyor.component';
import { ElectronicEquipmentPolicyComponent } from './components/electronic-equipment-policy/electronic-equipment-policy.component';
import { PolicyMasterListingComponent } from './components/policy-master-listing/policy-master-listing.component';
import { PolicyMasterViewComponent } from './components/policy-master-view/policy-master-view.component';
import { PolicyMasterComponent } from './components/policy-master/policy-master.component';
import { PolicyOfferViewComponent } from './components/policy-offer-view/policy-offer-view.component';
import { PolicyPaymentScreenComponent } from './components/policy-payment-screen/policy-payment-screen.component';
import { PolicyPaymentComponent } from './components/policy-payment/policy-payment.component';
import { PolicyProposalLetterComponent } from './components/policy-proposal-letter/policy-proposal-letter.component';
import { PolicyProposalOfferComponent } from './components/policy-proposal-offer/policy-proposal-offer.component';
import { DbProposalListingComponent } from './components/db-proposal-listing/db-proposal-listing.component';
import { DbPolicyEntryComponent } from './components/db-policy-entry/db-policy-entry.component';
import { StandardFirePolicyComponent } from './components/standard-fire-policy/standard-fire-policy.component';
import { StdFirePolicyComponent } from './components/std-fire-policy/std-fire-policy.component';
import { BurgHouseBreakingPolicyComponent } from './components/burg-house-breaking-policy/burg-house-breaking-policy.component';
import { ElectronicEquipPolicyComponent } from './components/electronic-equip-policy/electronic-equip-policy.component';
import { MoneyInTransitPolicyComponent } from './components/money-in-transit-policy/money-in-transit-policy.component';
import { MoneyInTransitProposalComponent } from './components/money-in-transit-proposal/money-in-transit-proposal.component';
import { AvaiationPolicyComponent } from './components/avaiation-policy/avaiation-policy.component';
import { AvaiationProposalComponent } from './components/avaiation-proposal/avaiation-proposal.component';
import { PartyMasterComponent } from './components/party-master/party-master/party-master.component';
import { PartyMasterListingComponent } from './components/party-master/party-master-listing/party-master-listing.component';
import { DirectBusinessComponent } from './direct-business.component';

const routes: Routes = [{
  path: '',
  component: DirectBusinessComponent,
  children:[
  {
    path: 'party-master',
    component: PartyMasterComponent
  },
  {
    path: 'party-master/view',
    component: PartyMasterComponent
  },
  {
    path: 'party-master/edit',
    component: PartyMasterComponent
  },
  {
    path: 'db-poicy-entry',
    component: DbPolicyEntryComponent
  },
  {
    path: 'db-proposal-listing',
    component: DbProposalListingComponent
  },
  {
    path: 'party-master-listing',
    component: PartyMasterListingComponent
  },
  {
    path: 'db/policy-proposal-letter',
    component: PolicyProposalLetterComponent
  },
  {
    path: 'db/policy-proposal-offer',
    component: PolicyProposalOfferComponent
  },
  {
    path: 'db/policy-payment',
    component: PolicyPaymentComponent
  },
  {
    path: 'db/policy-payment-screen',
    component: PolicyPaymentScreenComponent
  },
  {
    path: 'db/policy-proposal-letter-view',
    component: PolicyOfferViewComponent
  },
  {
    path: 'db/policy-master',
    component: PolicyMasterComponent
  },
  {
    path: 'db/policy-master-listing',
    component: PolicyMasterListingComponent
  },
  {
    path: 'db/policy-master-view',
    component: PolicyMasterViewComponent
  },
  {
    path: 'db/claim-entry',
    component: ClaimEntryComponent
  },
  {
    path: 'db/claim-entry-listing',
    component: ClaimEntryListingComponent
  },
  {
    path: 'db/claim-entry-view',
    component: ClaimEntryViewComponent
  },
  {
    path: 'db/claim-entry-listing-application-accepted',
    component: ClaimEntryListingApplicationAcceptedComponent
  },
  {
    path: 'db/claim-entry-listing-send-for-approval',
    component: ClaimEntryListingSendForApprovalComponent
  },
  {
    path: 'db/claim-entry-listing-send-for-payment',
    component: ClaimEntryListingSendForPaymentComponent
  },
  {
    path: 'db/claim-investigation-surveyor',
    component: ClaimInvestigationSurveyorComponent
  },
  {
    path: 'electronic-equipment-proposal',
    component: ElectronicEquipmentPolicyComponent
  },
  {
    path: 'electronic-equipment-policy',
    component: ElectronicEquipPolicyComponent
  },
  {
    path: 'burglary-house-breaking-proposal',
    component: BurglaryHouseBreakingPolicyComponent
  },
  {
    path: 'burglary-house-breaking-policy',
    component: BurgHouseBreakingPolicyComponent
  },
  {
    path: 'standard-fire-proposal',
    component: StandardFirePolicyComponent
  },
  {
    path: 'standard-fire-policy',
    component: StdFirePolicyComponent
  },
  {
    path: 'money-in-transit-policy',
    component: MoneyInTransitPolicyComponent
  },
  {
    path: 'money-in-transit-proposal',
    component: MoneyInTransitProposalComponent
  },
  {
    path: 'aviation-policy',
    component: AvaiationPolicyComponent
  },
  {
    path: 'aviation-proposal',
    component: AvaiationProposalComponent
  }
]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class DirectBusinessRoutingModule {}
