import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { MahsulotOlchovService } from '../service/mahsulot-olchov.service';

import { MahsulotOlchovComponent } from './mahsulot-olchov.component';

describe('Component Tests', () => {
  describe('MahsulotOlchov Management Component', () => {
    let comp: MahsulotOlchovComponent;
    let fixture: ComponentFixture<MahsulotOlchovComponent>;
    let service: MahsulotOlchovService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [MahsulotOlchovComponent],
      })
        .overrideTemplate(MahsulotOlchovComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MahsulotOlchovComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(MahsulotOlchovService);

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
      expect(comp.mahsulotOlchovs?.[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
