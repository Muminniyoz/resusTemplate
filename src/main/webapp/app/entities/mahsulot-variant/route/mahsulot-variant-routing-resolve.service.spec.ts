jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IMahsulotVariant, MahsulotVariant } from '../mahsulot-variant.model';
import { MahsulotVariantService } from '../service/mahsulot-variant.service';

import { MahsulotVariantRoutingResolveService } from './mahsulot-variant-routing-resolve.service';

describe('Service Tests', () => {
  describe('MahsulotVariant routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: MahsulotVariantRoutingResolveService;
    let service: MahsulotVariantService;
    let resultMahsulotVariant: IMahsulotVariant | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(MahsulotVariantRoutingResolveService);
      service = TestBed.inject(MahsulotVariantService);
      resultMahsulotVariant = undefined;
    });

    describe('resolve', () => {
      it('should return IMahsulotVariant returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultMahsulotVariant = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultMahsulotVariant).toEqual({ id: 123 });
      });

      it('should return new IMahsulotVariant if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultMahsulotVariant = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultMahsulotVariant).toEqual(new MahsulotVariant());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultMahsulotVariant = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultMahsulotVariant).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
