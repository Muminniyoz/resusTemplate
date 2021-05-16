jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { MahsulotService } from '../service/mahsulot.service';
import { IMahsulot, Mahsulot } from '../mahsulot.model';
import { IMahsulotOlchov } from 'app/entities/mahsulot-olchov/mahsulot-olchov.model';
import { MahsulotOlchovService } from 'app/entities/mahsulot-olchov/service/mahsulot-olchov.service';

import { MahsulotUpdateComponent } from './mahsulot-update.component';

describe('Component Tests', () => {
  describe('Mahsulot Management Update Component', () => {
    let comp: MahsulotUpdateComponent;
    let fixture: ComponentFixture<MahsulotUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let mahsulotService: MahsulotService;
    let mahsulotOlchovService: MahsulotOlchovService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [MahsulotUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(MahsulotUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MahsulotUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      mahsulotService = TestBed.inject(MahsulotService);
      mahsulotOlchovService = TestBed.inject(MahsulotOlchovService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call MahsulotOlchov query and add missing value', () => {
        const mahsulot: IMahsulot = { id: 456 };
        const mahsulotOlchov: IMahsulotOlchov = { id: 23802 };
        mahsulot.mahsulotOlchov = mahsulotOlchov;

        const mahsulotOlchovCollection: IMahsulotOlchov[] = [{ id: 62627 }];
        spyOn(mahsulotOlchovService, 'query').and.returnValue(of(new HttpResponse({ body: mahsulotOlchovCollection })));
        const additionalMahsulotOlchovs = [mahsulotOlchov];
        const expectedCollection: IMahsulotOlchov[] = [...additionalMahsulotOlchovs, ...mahsulotOlchovCollection];
        spyOn(mahsulotOlchovService, 'addMahsulotOlchovToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ mahsulot });
        comp.ngOnInit();

        expect(mahsulotOlchovService.query).toHaveBeenCalled();
        expect(mahsulotOlchovService.addMahsulotOlchovToCollectionIfMissing).toHaveBeenCalledWith(
          mahsulotOlchovCollection,
          ...additionalMahsulotOlchovs
        );
        expect(comp.mahsulotOlchovsSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const mahsulot: IMahsulot = { id: 456 };
        const mahsulotOlchov: IMahsulotOlchov = { id: 8646 };
        mahsulot.mahsulotOlchov = mahsulotOlchov;

        activatedRoute.data = of({ mahsulot });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(mahsulot));
        expect(comp.mahsulotOlchovsSharedCollection).toContain(mahsulotOlchov);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const mahsulot = { id: 123 };
        spyOn(mahsulotService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ mahsulot });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: mahsulot }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(mahsulotService.update).toHaveBeenCalledWith(mahsulot);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const mahsulot = new Mahsulot();
        spyOn(mahsulotService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ mahsulot });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: mahsulot }));
        saveSubject.complete();

        // THEN
        expect(mahsulotService.create).toHaveBeenCalledWith(mahsulot);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const mahsulot = { id: 123 };
        spyOn(mahsulotService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ mahsulot });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(mahsulotService.update).toHaveBeenCalledWith(mahsulot);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackMahsulotOlchovById', () => {
        it('Should return tracked MahsulotOlchov primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackMahsulotOlchovById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
