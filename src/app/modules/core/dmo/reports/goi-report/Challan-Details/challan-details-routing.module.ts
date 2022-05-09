import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChallanDetailsComponent } from './Challan-Details.component';

const routes: Routes = [
  {
    path: '',
    component:ChallanDetailsComponent
  },
  {
    path: 'Challan-No-Wise',
    loadChildren: () => import('./Challan-No-Wise/Challan-No-Wise.module').then(m => m.ChallanNoWiseModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations:[ChallanDetailsComponent],
  imports: [RouterModule.forChild(routes),SharedModule,CommonModule],
  exports: [RouterModule]
})
export class ChallanDetailsRoutingModule { }
