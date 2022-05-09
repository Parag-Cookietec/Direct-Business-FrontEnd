import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards';
import { SharedModule } from 'src/app/shared/shared.module';
import { InstituteChequePaidComponent } from './institution-cheque-paid.component';

const routes: Routes = [
  {
    path: '',
    component:InstituteChequePaidComponent
  },
  {
    path: 'memo-no-wise-details',
    loadChildren: () => import('./memo-no-wise-details/memo-no-wise-details.module').then(m => m.MemoNoWiseDetailModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  declarations:[InstituteChequePaidComponent],
  imports: [RouterModule.forChild(routes),SharedModule,CommonModule],
  exports: [RouterModule]
})
export class InstitutionChequePaidRoutingModule { }
