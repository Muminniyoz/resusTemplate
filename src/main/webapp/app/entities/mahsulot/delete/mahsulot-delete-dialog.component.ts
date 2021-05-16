import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IMahsulot } from '../mahsulot.model';
import { MahsulotService } from '../service/mahsulot.service';

@Component({
  templateUrl: './mahsulot-delete-dialog.component.html',
})
export class MahsulotDeleteDialogComponent {
  mahsulot?: IMahsulot;

  constructor(protected mahsulotService: MahsulotService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.mahsulotService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
