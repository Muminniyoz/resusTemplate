import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { MahsulotVariantComponent } from '../list/mahsulot-variant.component';
import { MahsulotVariantDetailComponent } from '../detail/mahsulot-variant-detail.component';
import { MahsulotVariantUpdateComponent } from '../update/mahsulot-variant-update.component';
import { MahsulotVariantRoutingResolveService } from './mahsulot-variant-routing-resolve.service';

const mahsulotVariantRoute: Routes = [
  {
    path: '',
    component: MahsulotVariantComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MahsulotVariantDetailComponent,
    resolve: {
      mahsulotVariant: MahsulotVariantRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MahsulotVariantUpdateComponent,
    resolve: {
      mahsulotVariant: MahsulotVariantRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MahsulotVariantUpdateComponent,
    resolve: {
      mahsulotVariant: MahsulotVariantRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(mahsulotVariantRoute)],
  exports: [RouterModule],
})
export class MahsulotVariantRoutingModule {}
