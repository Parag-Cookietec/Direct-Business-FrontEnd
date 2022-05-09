import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { BlockLoanConsolidationComponent } from './block-loan-consolidation.component';

const routes: Routes = [{
  path: '',
  component: BlockLoanConsolidationComponent
}];


@NgModule({
  declarations: [BlockLoanConsolidationComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class BlockLoanConsolidationModule { }
