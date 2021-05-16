import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { MahsulotComponent } from './list/mahsulot.component';
import { MahsulotDetailComponent } from './detail/mahsulot-detail.component';
import { MahsulotUpdateComponent } from './update/mahsulot-update.component';
import { MahsulotDeleteDialogComponent } from './delete/mahsulot-delete-dialog.component';
import { MahsulotRoutingModule } from './route/mahsulot-routing.module';

@NgModule({
  imports: [SharedModule, MahsulotRoutingModule],
  declarations: [MahsulotComponent, MahsulotDetailComponent, MahsulotUpdateComponent, MahsulotDeleteDialogComponent],
  entryComponents: [MahsulotDeleteDialogComponent],
})
export class MahsulotModule {}
