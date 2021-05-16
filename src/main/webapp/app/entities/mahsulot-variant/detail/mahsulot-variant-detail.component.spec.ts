import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MahsulotVariantDetailComponent } from './mahsulot-variant-detail.component';

describe('Component Tests', () => {
  describe('MahsulotVariant Management Detail Component', () => {
    let comp: MahsulotVariantDetailComponent;
    let fixture: ComponentFixture<MahsulotVariantDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [MahsulotVariantDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ mahsulotVariant: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(MahsulotVariantDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MahsulotVariantDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load mahsulotVariant on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.mahsulotVariant).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
