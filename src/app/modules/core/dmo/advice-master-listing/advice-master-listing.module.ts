import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdviceMasterListingComponent } from './advice-master-listing.component';
import { AdviceMasterAddComponent } from './advice-master-add/advice-master-add.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MastersService } from '../services/masters.service';


const routes: Routes = [{
  path: '',
  component: AdviceMasterListingComponent
}, {
  path: 'add',
  component: AdviceMasterAddComponent
}, {
  path: 'add/:id',
  component: AdviceMasterAddComponent
}];

@NgModule({
  declarations: [
    AdviceMasterListingComponent,
    AdviceMasterAddComponent
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
export class AdviceMasterListingModule { }
