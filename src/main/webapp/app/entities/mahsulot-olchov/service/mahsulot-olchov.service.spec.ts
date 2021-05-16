import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IMahsulotOlchov, MahsulotOlchov } from '../mahsulot-olchov.model';

import { MahsulotOlchovService } from './mahsulot-olchov.service';

describe('Service Tests', () => {
  describe('MahsulotOlchov Service', () => {
    let service: MahsulotOlchovService;
    let httpMock: HttpTestingController;
    let elemDefault: IMahsulotOlchov;
    let expectedResult: IMahsulotOlchov | IMahsulotOlchov[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(MahsulotOlchovService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        nom: 'AAAAAAA',
        izoh: 'AAAAAAA',
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a MahsulotOlchov', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new MahsulotOlchov()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a MahsulotOlchov', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nom: 'BBBBBB',
            izoh: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a MahsulotOlchov', () => {
        const patchObject = Object.assign(
          {
            nom: 'BBBBBB',
            izoh: 'BBBBBB',
          },
          new MahsulotOlchov()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of MahsulotOlchov', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nom: 'BBBBBB',
            izoh: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a MahsulotOlchov', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addMahsulotOlchovToCollectionIfMissing', () => {
        it('should add a MahsulotOlchov to an empty array', () => {
          const mahsulotOlchov: IMahsulotOlchov = { id: 123 };
          expectedResult = service.addMahsulotOlchovToCollectionIfMissing([], mahsulotOlchov);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(mahsulotOlchov);
        });

        it('should not add a MahsulotOlchov to an array that contains it', () => {
          const mahsulotOlchov: IMahsulotOlchov = { id: 123 };
          const mahsulotOlchovCollection: IMahsulotOlchov[] = [
            {
              ...mahsulotOlchov,
            },
            { id: 456 },
          ];
          expectedResult = service.addMahsulotOlchovToCollectionIfMissing(mahsulotOlchovCollection, mahsulotOlchov);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a MahsulotOlchov to an array that doesn't contain it", () => {
          const mahsulotOlchov: IMahsulotOlchov = { id: 123 };
          const mahsulotOlchovCollection: IMahsulotOlchov[] = [{ id: 456 }];
          expectedResult = service.addMahsulotOlchovToCollectionIfMissing(mahsulotOlchovCollection, mahsulotOlchov);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(mahsulotOlchov);
        });

        it('should add only unique MahsulotOlchov to an array', () => {
          const mahsulotOlchovArray: IMahsulotOlchov[] = [{ id: 123 }, { id: 456 }, { id: 63318 }];
          const mahsulotOlchovCollection: IMahsulotOlchov[] = [{ id: 123 }];
          expectedResult = service.addMahsulotOlchovToCollectionIfMissing(mahsulotOlchovCollection, ...mahsulotOlchovArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const mahsulotOlchov: IMahsulotOlchov = { id: 123 };
          const mahsulotOlchov2: IMahsulotOlchov = { id: 456 };
          expectedResult = service.addMahsulotOlchovToCollectionIfMissing([], mahsulotOlchov, mahsulotOlchov2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(mahsulotOlchov);
          expect(expectedResult).toContain(mahsulotOlchov2);
        });

        it('should accept null and undefined values', () => {
          const mahsulotOlchov: IMahsulotOlchov = { id: 123 };
          expectedResult = service.addMahsulotOlchovToCollectionIfMissing([], null, mahsulotOlchov, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(mahsulotOlchov);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
