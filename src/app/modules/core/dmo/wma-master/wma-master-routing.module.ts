import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'wma-master-add',
      loadChildren: () => import('./wma-master/wma-master-view.module').then(m => m.WmaMasterViewModule),
      canActivate: [AuthGuard]
    },
    {
      path: '',
      loadChildren: () => import('./wma-master-lisitng/wma-master-lisitng.module').then(m => m.WmaMasterLisitngModule),
      canActivate: [AuthGuard]
    }
  ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes),SharedModule,CommonModule],
  exports: [RouterModule]
})
export class WmaMasterRoutingModule { }
