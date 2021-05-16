import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMahsulotOlchov } from '../mahsulot-olchov.model';
import { MahsulotOlchovService } from '../service/mahsulot-olchov.service';
import { MahsulotOlchovDeleteDialogComponent } from '../delete/mahsulot-olchov-delete-dialog.component';

@Component({
  selector: 'jhi-mahsulot-olchov',
  templateUrl: './mahsulot-olchov.component.html',
})
export class MahsulotOlchovComponent implements OnInit {
  mahsulotOlchovs?: IMahsulotOlchov[];
  isLoading = false;

  constructor(protected mahsulotOlchovService: MahsulotOlchovService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.mahsulotOlchovService.query().subscribe(
      (res: HttpResponse<IMahsulotOlchov[]>) => {
        this.isLoading = false;
        this.mahsulotOlchovs = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IMahsulotOlchov): number {
    return item.id!;
  }

  delete(mahsulotOlchov: IMahsulotOlchov): void {
    const modalRef = this.modalService.open(MahsulotOlchovDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.mahsulotOlchov = mahsulotOlchov;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
