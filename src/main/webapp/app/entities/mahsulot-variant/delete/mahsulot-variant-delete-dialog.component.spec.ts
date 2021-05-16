jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { MahsulotVariantService } from '../service/mahsulot-variant.service';

import { MahsulotVariantDeleteDialogComponent } from './mahsulot-variant-delete-dialog.component';

describe('Component Tests', () => {
  describe('MahsulotVariant Management Delete Component', () => {
    let comp: MahsulotVariantDeleteDialogComponent;
    let fixture: ComponentFixture<MahsulotVariantDeleteDialogComponent>;
    let service: MahsulotVariantService;
    let mockActiveModal: NgbActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [MahsulotVariantDeleteDialogComponent],
        providers: [NgbActiveModal],
      })
        .overrideTemplate(MahsulotVariantDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MahsulotVariantDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(MahsulotVariantService);
      mockActiveModal = TestBed.inject(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.close).not.toHaveBeenCalled();
        expect(mockActiveModal.dismiss).toHaveBeenCalled();
      });
    });
  });
});
