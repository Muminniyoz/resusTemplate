import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMahsulotVariant } from '../mahsulot-variant.model';

@Component({
  selector: 'jhi-mahsulot-variant-detail',
  templateUrl: './mahsulot-variant-detail.component.html',
})
export class MahsulotVariantDetailComponent implements OnInit {
  mahsulotVariant: IMahsulotVariant | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ mahsulotVariant }) => {
      this.mahsulotVariant = mahsulotVariant;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
