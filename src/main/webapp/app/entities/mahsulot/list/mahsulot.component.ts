import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMahsulot } from '../mahsulot.model';
import { MahsulotService } from '../service/mahsulot.service';
import { MahsulotDeleteDialogComponent } from '../delete/mahsulot-delete-dialog.component';

@Component({
  selector: 'jhi-mahsulot',
  templateUrl: './mahsulot.component.html',
})
export class MahsulotComponent implements OnInit {
  mahsulots?: IMahsulot[];
  isLoading = false;

  constructor(protected mahsulotService: MahsulotService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.mahsulotService.query().subscribe(
      (res: HttpResponse<IMahsulot[]>) => {
        this.isLoading = false;
        this.mahsulots = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IMahsulot): number {
    return item.id!;
  }

  delete(mahsulot: IMahsulot): void {
    const modalRef = this.modalService.open(MahsulotDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.mahsulot = mahsulot;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
