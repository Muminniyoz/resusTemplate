import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IMahsulot, Mahsulot } from '../mahsulot.model';
import { MahsulotService } from '../service/mahsulot.service';
import { IMahsulotOlchov } from 'app/entities/mahsulot-olchov/mahsulot-olchov.model';
import { MahsulotOlchovService } from 'app/entities/mahsulot-olchov/service/mahsulot-olchov.service';

@Component({
  selector: 'jhi-mahsulot-update',
  templateUrl: './mahsulot-update.component.html',
})
export class MahsulotUpdateComponent implements OnInit {
  isSaving = false;

  mahsulotOlchovsSharedCollection: IMahsulotOlchov[] = [];

  editForm = this.fb.group({
    id: [],
    nom: [null, [Validators.required]],
    tur: [],
    izoh: [],
    mahsulotOlchov: [],
  });

  constructor(
    protected mahsulotService: MahsulotService,
    protected mahsulotOlchovService: MahsulotOlchovService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ mahsulot }) => {
      this.updateForm(mahsulot);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const mahsulot = this.createFromForm();
    if (mahsulot.id !== undefined) {
      this.subscribeToSaveResponse(this.mahsulotService.update(mahsulot));
    } else {
      this.subscribeToSaveResponse(this.mahsulotService.create(mahsulot));
    }
  }

  trackMahsulotOlchovById(index: number, item: IMahsulotOlchov): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMahsulot>>): void {
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

  protected updateForm(mahsulot: IMahsulot): void {
    this.editForm.patchValue({
      id: mahsulot.id,
      nom: mahsulot.nom,
      tur: mahsulot.tur,
      izoh: mahsulot.izoh,
      mahsulotOlchov: mahsulot.mahsulotOlchov,
    });

    this.mahsulotOlchovsSharedCollection = this.mahsulotOlchovService.addMahsulotOlchovToCollectionIfMissing(
      this.mahsulotOlchovsSharedCollection,
      mahsulot.mahsulotOlchov
    );
  }

  protected loadRelationshipsOptions(): void {
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

  protected createFromForm(): IMahsulot {
    return {
      ...new Mahsulot(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      tur: this.editForm.get(['tur'])!.value,
      izoh: this.editForm.get(['izoh'])!.value,
      mahsulotOlchov: this.editForm.get(['mahsulotOlchov'])!.value,
    };
  }
}
