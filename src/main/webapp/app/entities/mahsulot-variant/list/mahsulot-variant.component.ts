import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMahsulotVariant } from '../mahsulot-variant.model';
import { MahsulotVariantService } from '../service/mahsulot-variant.service';
import { MahsulotVariantDeleteDialogComponent } from '../delete/mahsulot-variant-delete-dialog.component';

@Component({
  selector: 'jhi-mahsulot-variant',
  templateUrl: './mahsulot-variant.component.html',
})
export class MahsulotVariantComponent implements OnInit {
  mahsulotVariants?: IMahsulotVariant[];
  isLoading = false;

  constructor(protected mahsulotVariantService: MahsulotVariantService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.mahsulotVariantService.query().subscribe(
      (res: HttpResponse<IMahsulotVariant[]>) => {
        this.isLoading = false;
        this.mahsulotVariants = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IMahsulotVariant): number {
    return item.id!;
  }

  delete(mahsulotVariant: IMahsulotVariant): void {
    const modalRef = this.modalService.open(MahsulotVariantDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.mahsulotVariant = mahsulotVariant;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
