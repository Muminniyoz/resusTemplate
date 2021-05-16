import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IMahsulotVariant } from '../mahsulot-variant.model';
import { MahsulotVariantService } from '../service/mahsulot-variant.service';

@Component({
  templateUrl: './mahsulot-variant-delete-dialog.component.html',
})
export class MahsulotVariantDeleteDialogComponent {
  mahsulotVariant?: IMahsulotVariant;

  constructor(protected mahsulotVariantService: MahsulotVariantService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.mahsulotVariantService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
