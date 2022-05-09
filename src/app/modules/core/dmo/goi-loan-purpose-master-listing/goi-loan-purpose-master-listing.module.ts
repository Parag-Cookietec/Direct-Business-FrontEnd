import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoiLoanPurposeMasterListingComponent } from './goi-loan-purpose-master-listing.component';
import { GoiLoanPurposeMasterComponent } from './goi-loan-purpose-master-add/goi-loan-purpose-master-add.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MastersService } from '../services/masters.service';


const routes: Routes = [{
  path: '',
  component: GoiLoanPurposeMasterListingComponent
}, {
  path: 'add',
  component: GoiLoanPurposeMasterComponent
}, {
  path: 'add/:id',
  component: GoiLoanPurposeMasterComponent
}];

@NgModule({
  declarations: [
    GoiLoanPurposeMasterListingComponent,
    GoiLoanPurposeMasterComponent
  ],
  imports: [
    SharedModule,
    NgxMatSelectSearchModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    MastersService
  ]
})
export class GoiLoanPurposeMasterListingModule { }
