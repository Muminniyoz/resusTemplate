jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IMahsulot, Mahsulot } from '../mahsulot.model';
import { MahsulotService } from '../service/mahsulot.service';

import { MahsulotRoutingResolveService } from './mahsulot-routing-resolve.service';

describe('Service Tests', () => {
  describe('Mahsulot routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: MahsulotRoutingResolveService;
    let service: MahsulotService;
    let resultMahsulot: IMahsulot | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(MahsulotRoutingResolveService);
      service = TestBed.inject(MahsulotService);
      resultMahsulot = undefined;
    });

    describe('resolve', () => {
      it('should return IMahsulot returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultMahsulot = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultMahsulot).toEqual({ id: 123 });
      });

      it('should return new IMahsulot if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultMahsulot = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultMahsulot).toEqual(new Mahsulot());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultMahsulot = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultMahsulot).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
