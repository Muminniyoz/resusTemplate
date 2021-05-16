import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IMahsulotVariant, MahsulotVariant } from '../mahsulot-variant.model';
import { MahsulotVariantService } from '../service/mahsulot-variant.service';
import { IMahsulot } from 'app/entities/mahsulot/mahsulot.model';
import { MahsulotService } from 'app/entities/mahsulot/service/mahsulot.service';
import { IMahsulotOlchov } from 'app/entities/mahsulot-olchov/mahsulot-olchov.model';
import { MahsulotOlchovService } from 'app/entities/mahsulot-olchov/service/mahsulot-olchov.service';

@Component({
  selector: 'jhi-mahsulot-variant-update',
  templateUrl: './mahsulot-variant-update.component.html',
})
export class MahsulotVariantUpdateComponent implements OnInit {
  isSaving = false;

  mahsulotsSharedCollection: IMahsulot[] = [];
  mahsulotOlchovsSharedCollection: IMahsulotOlchov[] = [];

  editForm = this.fb.group({
    id: [],
    nom: [],
    izoh: [],
    mahsulot: [],
    mahsulotOlchov: [],
  });

  constructor(
    protected mahsulotVariantService: MahsulotVariantService,
    protected mahsulotService: MahsulotService,
    protected mahsulotOlchovService: MahsulotOlchovService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ mahsulotVariant }) => {
      this.updateForm(mahsulotVariant);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const mahsulotVariant = this.createFromForm();
    if (mahsulotVariant.id !== undefined) {
      this.subscribeToSaveResponse(this.mahsulotVariantService.update(mahsulotVariant));
    } else {
      this.subscribeToSaveResponse(this.mahsulotVariantService.create(mahsulotVariant));
    }
  }

  trackMahsulotById(index: number, item: IMahsulot): number {
    return item.id!;
  }

  trackMahsulotOlchovById(index: number, item: IMahsulotOlchov): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMahsulotVariant>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(mahsulotVariant: IMahsulotVariant): void {
    this.editForm.patchValue({
      id: mahsulotVariant.id,
      nom: mahsulotVariant.nom,
      izoh: mahsulotVariant.izoh,
      mahsulot: mahsulotVariant.mahsulot,
      mahsulotOlchov: mahsulotVariant.mahsulotOlchov,
    });

    this.mahsulotsSharedCollection = this.mahsulotService.addMahsulotToCollectionIfMissing(
      this.mahsulotsSharedCollection,
      mahsulotVariant.mahsulot
    );
    this.mahsulotOlchovsSharedCollection = this.mahsulotOlchovService.addMahsulotOlchovToCollectionIfMissing(
      this.mahsulotOlchovsSharedCollection,
      mahsulotVariant.mahsulotOlchov
    );
  }

  protected loadRelationshipsOptions(): void {
    this.mahsulotService
      .query()
      .pipe(map((res: HttpResponse<IMahsulot[]>) => res.body ?? []))
      .pipe(
        map((mahsulots: IMahsulot[]) =>
          this.mahsulotService.addMahsulotToCollectionIfMissing(mahsulots, this.editForm.get('mahsulot')!.value)
        )
      )
      .subscribe((mahsulots: IMahsulot[]) => (this.mahsulotsSharedCollection = mahsulots));

    this.mahsulotOlchovService
      .query()
      .pipe(map((res: HttpResponse<IMahsulotOlchov[]>) => res.body ?? []))
      .pipe(
        map((mahsulotOlchovs: IMahsulotOlchov[]) =>
          this.mahsulotOlchovService.addMahsulotOlchovToCollectionIfMissing(mahsulotOlchovs, this.editForm.get('mahsulotOlchov')!.value)
        )
      )
      .subscribe((mahsulotOlchovs: IMahsulotOlchov[]) => (this.mahsulotOlchovsSharedCollection = mahsulotOlchovs));
  }

  protected createFromForm(): IMahsulotVariant {
    return {
      ...new MahsulotVariant(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      izoh: this.editForm.get(['izoh'])!.value,
      mahsulot: this.editForm.get(['mahsulot'])!.value,
      mahsulotOlchov: this.editForm.get(['mahsulotOlchov'])!.value,
    };
  }
}
