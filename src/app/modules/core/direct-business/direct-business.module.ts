import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { DirectBusinessComponent } from './direct-business.component';
import { AvaiationPolicyComponent } from './components/avaiation-policy/avaiation-policy.component';
import { AvaiationProposalComponent } from './components/avaiation-proposal/avaiation-proposal.component';
import { BurgHouseBreakingPolicyComponent } from './components/burg-house-breaking-policy/burg-house-breaking-policy.component';
import { BurglaryHouseBreakingPolicyComponent } from './components/burglary-house-breaking-policy/burglary-house-breaking-policy.component';
import { ClaimEntryListingApplicationAcceptedComponent } from './components/claim-entry-listing-application-accepted/claim-entry-listing-application-accepted.component';
import { ClaimEntryListingSendForApprovalComponent } from './components/claim-entry-listing-send-for-approval/claim-entry-listing-send-for-approval.component';
import { ClaimEntryListingSendForPaymentComponent } from './components/claim-entry-listing-send-for-payment/claim-entry-listing-send-for-payment.component';
import { ClaimEntryListingComponent } from './components/claim-entry-listing/claim-entry-listing.component';
import { ClaimEntryViewComponent } from './components/claim-entry-view/claim-entry-view.component';
import { ClaimEntryComponent } from './components/claim-entry/claim-entry.component';
import { ClaimInvestigationSurveyorComponent } from './components/claim-investigation-surveyor/claim-investigation-surveyor.component';
import { DbProposalListingComponent } from './components/db-proposal-listing/db-proposal-listing.component';
import { ElectronicEquipPolicyComponent } from './components/electronic-equip-policy/electronic-equip-policy.component';
import { ElectronicEquipmentPolicyComponent } from './components/electronic-equipment-policy/electronic-equipment-policy.component';
import { MoneyInTransitPolicyComponent } from './components/money-in-transit-policy/money-in-transit-policy.component';
import { MoneyInTransitProposalComponent } from './components/money-in-transit-proposal/money-in-transit-proposal.component';
import { PolicyMasterListingComponent } from './components/policy-master-listing/policy-master-listing.component';
import { PolicyMasterViewComponent } from './components/policy-master-view/policy-master-view.component';
import { GeneratePolicyNoComponent, PolicyMasterComponent } from './components/policy-master/policy-master.component';
import { PolicyOfferViewComponent } from './components/policy-offer-view/policy-offer-view.component';
import { PolicyPaymentScreenComponent } from './components/policy-payment-screen/policy-payment-screen.component';
import { PolicyPaymentComponent } from './components/policy-payment/policy-payment.component';
import { PolicyProposalLetterComponent, PolicyProposalSubmissionComponent } from './components/policy-proposal-letter/policy-proposal-letter.component';
import { PolicyProposalOfferComponent } from './components/policy-proposal-offer/policy-proposal-offer.component';
import { StandardFirePolicyComponent } from './components/standard-fire-policy/standard-fire-policy.component';
import { StdFirePolicyComponent } from './components/std-fire-policy/std-fire-policy.component';
import { WorkflowDetailsLfComponent } from './components/addons/workflow-details-lf/workflow-details-lf.component';
import { WorkflowDoiComponent } from './components/addons/workflow-doi/workflow-doi.component';
import { WorkflowDoiModuleComponent } from './components/addons/workflow-doi-module/workflow-doi-module.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DirectBusinessRoutingModule } from './direct-business.routing';
import { CommonProtoModule } from 'src/app/common/common.module';
import { DbPolicyEntryComponent } from './components/db-policy-entry/db-policy-entry.component';
import { PartyMasterListingComponent } from './components/party-master/party-master-listing/party-master-listing.component';
import { PartyMasterComponent } from './components/party-master/party-master/party-master.component';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CommonProtoModule,
    DirectBusinessRoutingModule
  ],
  declarations: [
    DbPolicyEntryComponent,
    DirectBusinessComponent,
    AvaiationPolicyComponent,
    AvaiationProposalComponent,
    BurgHouseBreakingPolicyComponent,
    BurglaryHouseBreakingPolicyComponent,
    ClaimEntryComponent,
    ClaimEntryListingComponent,
    ClaimEntryListingApplicationAcceptedComponent,
    ClaimEntryListingSendForApprovalComponent,
    ClaimEntryListingSendForPaymentComponent,
    ClaimEntryViewComponent,
    ClaimInvestigationSurveyorComponent,
    DbProposalListingComponent,
    ElectronicEquipPolicyComponent,
    ElectronicEquipmentPolicyComponent,
    MoneyInTransitPolicyComponent,
    MoneyInTransitProposalComponent,
    GeneratePolicyNoComponent,
    PartyMasterListingComponent,
    PartyMasterComponent,
    PolicyMasterListingComponent,
    PolicyMasterViewComponent,
    PolicyOfferViewComponent,
    PolicyPaymentComponent,
    PolicyPaymentScreenComponent,
    PolicyProposalSubmissionComponent,
    PolicyProposalOfferComponent,
    PolicyProposalLetterComponent,
    PolicyMasterComponent,
    StandardFirePolicyComponent,
    StdFirePolicyComponent,
    WorkflowDetailsLfComponent,
    WorkflowDoiComponent,
    WorkflowDoiModuleComponent
  ],
  providers:[DatePipe, DecimalPipe]
})
export class DirectBusinessModule { }
