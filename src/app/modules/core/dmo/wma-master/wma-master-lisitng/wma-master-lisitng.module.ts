import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { WmaMasterLisitngComponent } from './wma-master-lisitng.component';



const routes: Routes = [{
  path: '',
  component: WmaMasterLisitngComponent
}];


@NgModule({
  declarations: [WmaMasterLisitngComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class WmaMasterLisitngModule { }
