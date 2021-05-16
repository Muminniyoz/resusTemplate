import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { MahsulotOlchovComponent } from '../list/mahsulot-olchov.component';
import { MahsulotOlchovDetailComponent } from '../detail/mahsulot-olchov-detail.component';
import { MahsulotOlchovUpdateComponent } from '../update/mahsulot-olchov-update.component';
import { MahsulotOlchovRoutingResolveService } from './mahsulot-olchov-routing-resolve.service';

const mahsulotOlchovRoute: Routes = [
  {
    path: '',
    component: MahsulotOlchovComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MahsulotOlchovDetailComponent,
    resolve: {
      mahsulotOlchov: MahsulotOlchovRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MahsulotOlchovUpdateComponent,
    resolve: {
      mahsulotOlchov: MahsulotOlchovRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MahsulotOlchovUpdateComponent,
    resolve: {
      mahsulotOlchov: MahsulotOlchovRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(mahsulotOlchovRoute)],
  exports: [RouterModule],
})
export class MahsulotOlchovRoutingModule {}
