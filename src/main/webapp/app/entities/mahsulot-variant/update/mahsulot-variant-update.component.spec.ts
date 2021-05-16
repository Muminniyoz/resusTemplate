jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { MahsulotVariantService } from '../service/mahsulot-variant.service';
import { IMahsulotVariant, MahsulotVariant } from '../mahsulot-variant.model';
import { IMahsulot } from 'app/entities/mahsulot/mahsulot.model';
import { MahsulotService } from 'app/entities/mahsulot/service/mahsulot.service';
import { IMahsulotOlchov } from 'app/entities/mahsulot-olchov/mahsulot-olchov.model';
import { MahsulotOlchovService } from 'app/entities/mahsulot-olchov/service/mahsulot-olchov.service';

import { MahsulotVariantUpdateComponent } from './mahsulot-variant-update.component';

describe('Component Tests', () => {
  describe('MahsulotVariant Management Update Component', () => {
    let comp: MahsulotVariantUpdateComponent;
    let fixture: ComponentFixture<MahsulotVariantUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let mahsulotVariantService: MahsulotVariantService;
    let mahsulotService: MahsulotService;
    let mahsulotOlchovService: MahsulotOlchovService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [MahsulotVariantUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(MahsulotVariantUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MahsulotVariantUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      mahsulotVariantService = TestBed.inject(MahsulotVariantService);
      mahsulotService = TestBed.inject(MahsulotService);
      mahsulotOlchovService = TestBed.inject(MahsulotOlchovService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call Mahsulot query and add missing value', () => {
        const mahsulotVariant: IMahsulotVariant = { id: 456 };
        const mahsulot: IMahsulot = { id: 63300 };
        mahsulotVariant.mahsulot = mahsulot;

        const mahsulotCollection: IMahsulot[] = [{ id: 93119 }];
        spyOn(mahsulotService, 'query').and.returnValue(of(new HttpResponse({ body: mahsulotCollection })));
        const additionalMahsulots = [mahsulot];
        const expectedCollection: IMahsulot[] = [...additionalMahsulots, ...mahsulotCollection];
        spyOn(mahsulotService, 'addMahsulotToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ mahsulotVariant });
        comp.ngOnInit();

        expect(mahsulotService.query).toHaveBeenCalled();
        expect(mahsulotService.addMahsulotToCollectionIfMissing).toHaveBeenCalledWith(mahsulotCollection, ...additionalMahsulots);
        expect(comp.mahsulotsSharedCollection).toEqual(expectedCollection);
      });

      it('Should call MahsulotOlchov query and add missing value', () => {
        const mahsulotVariant: IMahsulotVariant = { id: 456 };
        const mahsulotOlchov: IMahsulotOlchov = { id: 33350 };
        mahsulotVariant.mahsulotOlchov = mahsulotOlchov;

        const mahsulotOlchovCollection: IMahsulotOlchov[] = [{ id: 7323 }];
        spyOn(mahsulotOlchovService, 'query').and.returnValue(of(new HttpResponse({ body: mahsulotOlchovCollection })));
        const additionalMahsulotOlchovs = [mahsulotOlchov];
        const expectedCollection: IMahsulotOlchov[] = [...additionalMahsulotOlchovs, ...mahsulotOlchovCollection];
        spyOn(mahsulotOlchovService, 'addMahsulotOlchovToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ mahsulotVariant });
        comp.ngOnInit();

        expect(mahsulotOlchovService.query).toHaveBeenCalled();
        expect(mahsulotOlchovService.addMahsulotOlchovToCollectionIfMissing).toHaveBeenCalledWith(
          mahsulotOlchovCollection,
          ...additionalMahsulotOlchovs
        );
        expect(comp.mahsulotOlchovsSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const mahsulotVariant: IMahsulotVariant = { id: 456 };
        const mahsulot: IMahsulot = { id: 53882 };
        mahsulotVariant.mahsulot = mahsulot;
        const mahsulotOlchov: IMahsulotOlchov = { id: 70125 };
        mahsulotVariant.mahsulotOlchov = mahsulotOlchov;

        activatedRoute.data = of({ mahsulotVariant });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(mahsulotVariant));
        expect(comp.mahsulotsSharedCollection).toContain(mahsulot);
        expect(comp.mahsulotOlchovsSharedCollection).toContain(mahsulotOlchov);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const mahsulotVariant = { id: 123 };
        spyOn(mahsulotVariantService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ mahsulotVariant });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: mahsulotVariant }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(mahsulotVariantService.update).toHaveBeenCalledWith(mahsulotVariant);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const mahsulotVariant = new MahsulotVariant();
        spyOn(mahsulotVariantService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ mahsulotVariant });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: mahsulotVariant }));
        saveSubject.complete();

        // THEN
        expect(mahsulotVariantService.create).toHaveBeenCalledWith(mahsulotVariant);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const mahsulotVariant = { id: 123 };
        spyOn(mahsulotVariantService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ mahsulotVariant });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(mahsulotVariantService.update).toHaveBeenCalledWith(mahsulotVariant);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackMahsulotById', () => {
        it('Should return tracked Mahsulot primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackMahsulotById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

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
