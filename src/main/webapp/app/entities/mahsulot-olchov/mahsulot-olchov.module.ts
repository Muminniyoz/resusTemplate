import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { MahsulotOlchovComponent } from './list/mahsulot-olchov.component';
import { MahsulotOlchovDetailComponent } from './detail/mahsulot-olchov-detail.component';
import { MahsulotOlchovUpdateComponent } from './update/mahsulot-olchov-update.component';
import { MahsulotOlchovDeleteDialogComponent } from './delete/mahsulot-olchov-delete-dialog.component';
import { MahsulotOlchovRoutingModule } from './route/mahsulot-olchov-routing.module';

@NgModule({
  imports: [SharedModule, MahsulotOlchovRoutingModule],
  declarations: [
    MahsulotOlchovComponent,
    MahsulotOlchovDetailComponent,
    MahsulotOlchovUpdateComponent,
    MahsulotOlchovDeleteDialogComponent,
  ],
  entryComponents: [MahsulotOlchovDeleteDialogComponent],
})
export class MahsulotOlchovModule {}
