import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { MahsulotVariantService } from '../service/mahsulot-variant.service';

import { MahsulotVariantComponent } from './mahsulot-variant.component';

describe('Component Tests', () => {
  describe('MahsulotVariant Management Component', () => {
    let comp: MahsulotVariantComponent;
    let fixture: ComponentFixture<MahsulotVariantComponent>;
    let service: MahsulotVariantService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [MahsulotVariantComponent],
      })
        .overrideTemplate(MahsulotVariantComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MahsulotVariantComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(MahsulotVariantService);

      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [{ id: 123 }],
            headers,
          })
        )
      );
    });

    it('Should call load all on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.mahsulotVariants?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
