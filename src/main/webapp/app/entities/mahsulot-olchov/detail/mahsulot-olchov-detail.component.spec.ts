import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MahsulotOlchovDetailComponent } from './mahsulot-olchov-detail.component';

describe('Component Tests', () => {
  describe('MahsulotOlchov Management Detail Component', () => {
    let comp: MahsulotOlchovDetailComponent;
    let fixture: ComponentFixture<MahsulotOlchovDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [MahsulotOlchovDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ mahsulotOlchov: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(MahsulotOlchovDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MahsulotOlchovDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load mahsulotOlchov on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.mahsulotOlchov).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
