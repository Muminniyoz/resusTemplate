import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MahsulotDetailComponent } from './mahsulot-detail.component';

describe('Component Tests', () => {
  describe('Mahsulot Management Detail Component', () => {
    let comp: MahsulotDetailComponent;
    let fixture: ComponentFixture<MahsulotDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [MahsulotDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ mahsulot: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(MahsulotDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MahsulotDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load mahsulot on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.mahsulot).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
