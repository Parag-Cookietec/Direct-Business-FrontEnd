import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NetIssuanceofGuaranteesComponent } from './net-issuance-of-guarantees.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

const routes: Routes = [{
  path: '',
  component: NetIssuanceofGuaranteesComponent
}];

@NgModule({
  declarations: [
    NetIssuanceofGuaranteesComponent
  ],
  imports: [
    SharedModule,
    NgxMatSelectSearchModule,
    RouterModule.forChild(routes)
  ]
})
export class NetIssuanceofGuaranteesModule { }
