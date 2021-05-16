import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { MahsulotComponent } from '../list/mahsulot.component';
import { MahsulotDetailComponent } from '../detail/mahsulot-detail.component';
import { MahsulotUpdateComponent } from '../update/mahsulot-update.component';
import { MahsulotRoutingResolveService } from './mahsulot-routing-resolve.service';

const mahsulotRoute: Routes = [
  {
    path: '',
    component: MahsulotComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MahsulotDetailComponent,
    resolve: {
      mahsulot: MahsulotRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MahsulotUpdateComponent,
    resolve: {
      mahsulot: MahsulotRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MahsulotUpdateComponent,
    resolve: {
      mahsulot: MahsulotRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(mahsulotRoute)],
  exports: [RouterModule],
})
export class MahsulotRoutingModule {}
