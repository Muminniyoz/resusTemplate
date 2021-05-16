import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { MahsulotVariantComponent } from './list/mahsulot-variant.component';
import { MahsulotVariantDetailComponent } from './detail/mahsulot-variant-detail.component';
import { MahsulotVariantUpdateComponent } from './update/mahsulot-variant-update.component';
import { MahsulotVariantDeleteDialogComponent } from './delete/mahsulot-variant-delete-dialog.component';
import { MahsulotVariantRoutingModule } from './route/mahsulot-variant-routing.module';

@NgModule({
  imports: [SharedModule, MahsulotVariantRoutingModule],
  declarations: [
    MahsulotVariantComponent,
    MahsulotVariantDetailComponent,
    MahsulotVariantUpdateComponent,
    MahsulotVariantDeleteDialogComponent,
  ],
  entryComponents: [MahsulotVariantDeleteDialogComponent],
})
export class MahsulotVariantModule {}
