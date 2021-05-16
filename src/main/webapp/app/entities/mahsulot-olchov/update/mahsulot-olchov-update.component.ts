import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IMahsulotOlchov, MahsulotOlchov } from '../mahsulot-olchov.model';
import { MahsulotOlchovService } from '../service/mahsulot-olchov.service';

@Component({
  selector: 'jhi-mahsulot-olchov-update',
  templateUrl: './mahsulot-olchov-update.component.html',
})
export class MahsulotOlchovUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nom: [null, [Validators.required]],
    izoh: [],
  });

  constructor(
    protected mahsulotOlchovService: MahsulotOlchovService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ mahsulotOlchov }) => {
      this.updateForm(mahsulotOlchov);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const mahsulotOlchov = this.createFromForm();
    if (mahsulotOlchov.id !== undefined) {
      this.subscribeToSaveResponse(this.mahsulotOlchovService.update(mahsulotOlchov));
    } else {
      this.subscribeToSaveResponse(this.mahsulotOlchovService.create(mahsulotOlchov));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMahsulotOlchov>>): void {
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

  protected updateForm(mahsulotOlchov: IMahsulotOlchov): void {
    this.editForm.patchValue({
      id: mahsulotOlchov.id,
      nom: mahsulotOlchov.nom,
      izoh: mahsulotOlchov.izoh,
    });
  }

  protected createFromForm(): IMahsulotOlchov {
    return {
      ...new MahsulotOlchov(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      izoh: this.editForm.get(['izoh'])!.value,
    };
  }
}
