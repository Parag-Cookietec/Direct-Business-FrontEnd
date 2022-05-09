import { AuthGuard } from './../../guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent
    },
   
    {
        path: 'pvu',
        loadChildren: () => import('./pvu/pvu.module').then((m) => m.PVUModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'edp',
        loadChildren: () => import('./edp/edp.module').then((m) => m.EdpModule),
        canActivate: [AuthGuard]
    },
    
    {
        path: 'lc',
        loadChildren: () => import('./letter-of-credit/letter-of-credit.module').then((m) => m.LetterOfCreditModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'dmo',
        loadChildren: () => import('./dmo/dmo.module').then((m) => m.DmoModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'e-pao',
        loadChildren: () => import('./e-pao/e-pao.module').then((m) => m.EPaoModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'doi',
        loadChildren: () => import('./direct-business/direct-business.module').then((m) => m.DirectBusinessModule),
        canActivate: [AuthGuard],
        resolve: []
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: []
})
export class CoreRoutingModule {}
