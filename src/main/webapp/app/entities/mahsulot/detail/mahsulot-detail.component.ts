import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMahsulot } from '../mahsulot.model';

@Component({
  selector: 'jhi-mahsulot-detail',
  templateUrl: './mahsulot-detail.component.html',
})
export class MahsulotDetailComponent implements OnInit {
  mahsulot: IMahsulot | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ mahsulot }) => {
      this.mahsulot = mahsulot;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
