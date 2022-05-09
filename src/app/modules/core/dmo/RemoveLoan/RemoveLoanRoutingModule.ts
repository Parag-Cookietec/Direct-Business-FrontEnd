import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RemoveLoan } from 'src/app/models/dmo/dmo';
import { RemoveLoanComponent } from './remove-loan/remove-loan.component';

const routes: Routes = [
  { path: '', component:RemoveLoanComponent} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RemoveLoanRoutingModule { }
