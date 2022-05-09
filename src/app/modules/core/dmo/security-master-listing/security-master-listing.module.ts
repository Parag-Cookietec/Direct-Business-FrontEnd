import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityMasterListingComponent } from './security-master-listing.component';
import { SecurityNameMasterComponent } from './security-master-add/security-master-add.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MastersService } from '../services/masters.service';


const routes: Routes = [{
  path: '',
  component: SecurityMasterListingComponent
}, {
  path: 'add',
  component: SecurityNameMasterComponent
}, {
  path: 'add/:id',
  component: SecurityNameMasterComponent
}];

@NgModule({
  declarations: [
    SecurityMasterListingComponent,
    SecurityNameMasterComponent
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
export class SecurityMasterListingModule { }
