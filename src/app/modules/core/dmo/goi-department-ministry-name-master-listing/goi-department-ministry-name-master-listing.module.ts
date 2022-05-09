import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoiDepartmentMinistryNameMasterComponent } from './goi-department-ministry-name-master-listing.component';
import { GOIDepartmentMinistryNameMasterAddComponent } from './goi-department-ministry-name-master-add/goi-department-ministry-name-master-add.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MastersService } from '../services/masters.service';


const routes: Routes = [{
  path: '',
  component: GoiDepartmentMinistryNameMasterComponent
}, {
  path: 'add',
  component: GOIDepartmentMinistryNameMasterAddComponent
}, {
  path: 'add/:id',
  component: GOIDepartmentMinistryNameMasterAddComponent
}];

@NgModule({
  declarations: [
    GoiDepartmentMinistryNameMasterComponent,
    GOIDepartmentMinistryNameMasterAddComponent
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
export class GoiDepartmentMinistryNameMasterModule { }
