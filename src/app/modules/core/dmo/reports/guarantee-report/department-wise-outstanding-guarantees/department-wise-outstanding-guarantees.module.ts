import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentWiseOutstandingGuaranteesComponent } from './department-wise-outstanding-guarantees.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

const routes: Routes = [{
  path: '',
  component: DepartmentWiseOutstandingGuaranteesComponent
}];

@NgModule({
  declarations: [
    DepartmentWiseOutstandingGuaranteesComponent
  ],
  imports: [
    SharedModule,
    NgxMatSelectSearchModule,
    RouterModule.forChild(routes)
  ]
})
export class DepartmentWiseOutstandingGuaranteesModule { }
