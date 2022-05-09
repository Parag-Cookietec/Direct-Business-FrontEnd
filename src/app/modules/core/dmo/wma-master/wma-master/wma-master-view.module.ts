import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { WmaMasterComponent } from './wma-master.component';

const routes: Routes = [{
  path: '',
  component: WmaMasterComponent
}];


@NgModule({
  declarations: [WmaMasterComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class WmaMasterViewModule { }
