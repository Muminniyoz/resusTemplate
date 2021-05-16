import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMahsulotOlchov } from '../mahsulot-olchov.model';

@Component({
  selector: 'jhi-mahsulot-olchov-detail',
  templateUrl: './mahsulot-olchov-detail.component.html',
})
export class MahsulotOlchovDetailComponent implements OnInit {
  mahsulotOlchov: IMahsulotOlchov | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ mahsulotOlchov }) => {
      this.mahsulotOlchov = mahsulotOlchov;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
