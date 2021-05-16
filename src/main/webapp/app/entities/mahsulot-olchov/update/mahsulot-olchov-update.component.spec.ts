jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { MahsulotOlchovService } from '../service/mahsulot-olchov.service';
import { IMahsulotOlchov, MahsulotOlchov } from '../mahsulot-olchov.model';

import { MahsulotOlchovUpdateComponent } from './mahsulot-olchov-update.component';

describe('Component Tests', () => {
  describe('MahsulotOlchov Management Update Component', () => {
    let comp: MahsulotOlchovUpdateComponent;
    let fixture: ComponentFixture<MahsulotOlchovUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let mahsulotOlchovService: MahsulotOlchovService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [MahsulotOlchovUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(MahsulotOlchovUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MahsulotOlchovUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      mahsulotOlchovService = TestBed.inject(MahsulotOlchovService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const mahsulotOlchov: IMahsulotOlchov = { id: 456 };

        activatedRoute.data = of({ mahsulotOlchov });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(mahsulotOlchov));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const mahsulotOlchov = { id: 123 };
        spyOn(mahsulotOlchovService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ mahsulotOlchov });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: mahsulotOlchov }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(mahsulotOlchovService.update).toHaveBeenCalledWith(mahsulotOlchov);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const mahsulotOlchov = new MahsulotOlchov();
        spyOn(mahsulotOlchovService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ mahsulotOlchov });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: mahsulotOlchov }));
        saveSubject.complete();

        // THEN
        expect(mahsulotOlchovService.create).toHaveBeenCalledWith(mahsulotOlchov);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const mahsulotOlchov = { id: 123 };
        spyOn(mahsulotOlchovService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ mahsulotOlchov });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(mahsulotOlchovService.update).toHaveBeenCalledWith(mahsulotOlchov);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
