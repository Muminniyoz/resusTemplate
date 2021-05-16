jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IMahsulotOlchov, MahsulotOlchov } from '../mahsulot-olchov.model';
import { MahsulotOlchovService } from '../service/mahsulot-olchov.service';

import { MahsulotOlchovRoutingResolveService } from './mahsulot-olchov-routing-resolve.service';

describe('Service Tests', () => {
  describe('MahsulotOlchov routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: MahsulotOlchovRoutingResolveService;
    let service: MahsulotOlchovService;
    let resultMahsulotOlchov: IMahsulotOlchov | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(MahsulotOlchovRoutingResolveService);
      service = TestBed.inject(MahsulotOlchovService);
      resultMahsulotOlchov = undefined;
    });

    describe('resolve', () => {
      it('should return IMahsulotOlchov returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultMahsulotOlchov = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultMahsulotOlchov).toEqual({ id: 123 });
      });

      it('should return new IMahsulotOlchov if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultMahsulotOlchov = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultMahsulotOlchov).toEqual(new MahsulotOlchov());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultMahsulotOlchov = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultMahsulotOlchov).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
