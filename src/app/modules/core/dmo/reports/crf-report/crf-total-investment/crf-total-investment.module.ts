import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { CrfTotalInvestmentComponent } from './crf-total-investment.component';

const routes: Routes = [{
  path: '',
  component: CrfTotalInvestmentComponent
}];

@NgModule({
  declarations: [CrfTotalInvestmentComponent],
  imports: [
    SharedModule,
    NgxMatSelectSearchModule,    
    RouterModule.forChild(routes)
  ]
})
export class CrfTotalInvestmentModule { }
