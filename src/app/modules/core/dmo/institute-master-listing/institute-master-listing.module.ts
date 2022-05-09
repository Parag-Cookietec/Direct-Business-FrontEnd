import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstituteMasterListingComponent } from './institute-master-listing.component';
import { InstituteMasterComponent } from './institute-master-listing-add/institute-master-listing-add.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MastersService } from '../services/masters.service';


const routes: Routes = [{
  path: '',
  component: InstituteMasterListingComponent
}, {
  path: 'add',
  component: InstituteMasterComponent
}, {
  path: 'add/:id',
  component: InstituteMasterComponent
}];

@NgModule({
  declarations: [
    InstituteMasterListingComponent,
    InstituteMasterComponent
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
export class InstituteMasterListingModule { }
