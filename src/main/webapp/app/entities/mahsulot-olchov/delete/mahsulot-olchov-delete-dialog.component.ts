import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IMahsulotOlchov } from '../mahsulot-olchov.model';
import { MahsulotOlchovService } from '../service/mahsulot-olchov.service';

@Component({
  templateUrl: './mahsulot-olchov-delete-dialog.component.html',
})
export class MahsulotOlchovDeleteDialogComponent {
  mahsulotOlchov?: IMahsulotOlchov;

  constructor(protected mahsulotOlchovService: MahsulotOlchovService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.mahsulotOlchovService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
