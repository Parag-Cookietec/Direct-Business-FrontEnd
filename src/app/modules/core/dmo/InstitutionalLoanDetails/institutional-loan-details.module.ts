import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstituteLetterDetailsComponent } from './institute-letter-details/institute-letter-details.component';
import { InstLetDetDPDetComponent } from './inst-let-det-dpdet/inst-let-det-dpdet.component';
import { ChkDeRecevdfrmInstComponent } from './chk-de-recevdfrm-inst/chk-de-recevdfrm-inst.component';
import { ChkDetFrPayPrncplorInstComponent } from './chk-det-fr-pay-prncplor-inst/chk-det-fr-pay-prncplor-inst.component';
import { MemoGenDetComponent } from './memo-gen-det/memo-gen-det.component';
import { InstituteLoanApprovedComponent } from './institute-loan-approved/institute-loan-approved.component';
import { DeleteMemorandumComponent } from './delete-memorandum/delete-memorandum.component';
import { UpdateInstLetDetComponent } from './update-inst-let-det/update-inst-let-det.component';
import { PaidChequeComponent } from './paid-cheque/paid-cheque.component';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InstitutionalLoanDetailsRoutingModule } from './InstitutionalLoanDetailsRoutingModule';
import { MaterialModule } from 'src/app/shared/material.module';
import { CommonProtoModule } from 'src/app/common/common.module';
import { InstitutionalloandetailsService } from '../../../services/dmo/institutionalloandetails.service';
import { AddDetOrLonMgmtComponent } from './add-det-or-lon-mgmt/add-det-or-lon-mgmt.component';
import { InstLoanRecevedAddComponent } from './inst-let-det-dpdet/inst-loan-receved-add/inst-loan-receved-add.component';



@NgModule({
  declarations: [InstituteLetterDetailsComponent,
    InstLetDetDPDetComponent,
    ChkDeRecevdfrmInstComponent,
    MemoGenDetComponent,
    ChkDetFrPayPrncplorInstComponent,
    PaidChequeComponent,
    InstituteLoanApprovedComponent,
    UpdateInstLetDetComponent,
    DeleteMemorandumComponent,
    AddDetOrLonMgmtComponent,
    InstLoanRecevedAddComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    CommonProtoModule,
    InstitutionalLoanDetailsRoutingModule
  ],
  providers: [InstitutionalloandetailsService] 
})
export class InstitutionalLoanDetailsModule { }
