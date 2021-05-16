import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MahsulotTur } from 'app/entities/enumerations/mahsulot-tur.model';
import { IMahsulot, Mahsulot } from '../mahsulot.model';

import { MahsulotService } from './mahsulot.service';

describe('Service Tests', () => {
  describe('Mahsulot Service', () => {
    let service: MahsulotService;
    let httpMock: HttpTestingController;
    let elemDefault: IMahsulot;
    let expectedResult: IMahsulot | IMahsulot[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(MahsulotService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        nom: 'AAAAAAA',
        tur: MahsulotTur.DOIMIY,
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

      it('should create a Mahsulot', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Mahsulot()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Mahsulot', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nom: 'BBBBBB',
            tur: 'BBBBBB',
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

      it('should partial update a Mahsulot', () => {
        const patchObject = Object.assign(
          {
            tur: 'BBBBBB',
            izoh: 'BBBBBB',
          },
          new Mahsulot()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Mahsulot', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            nom: 'BBBBBB',
            tur: 'BBBBBB',
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

      it('should delete a Mahsulot', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addMahsulotToCollectionIfMissing', () => {
        it('should add a Mahsulot to an empty array', () => {
          const mahsulot: IMahsulot = { id: 123 };
          expectedResult = service.addMahsulotToCollectionIfMissing([], mahsulot);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(mahsulot);
        });

        it('should not add a Mahsulot to an array that contains it', () => {
          const mahsulot: IMahsulot = { id: 123 };
          const mahsulotCollection: IMahsulot[] = [
            {
              ...mahsulot,
            },
            { id: 456 },
          ];
          expectedResult = service.addMahsulotToCollectionIfMissing(mahsulotCollection, mahsulot);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Mahsulot to an array that doesn't contain it", () => {
          const mahsulot: IMahsulot = { id: 123 };
          const mahsulotCollection: IMahsulot[] = [{ id: 456 }];
          expectedResult = service.addMahsulotToCollectionIfMissing(mahsulotCollection, mahsulot);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(mahsulot);
        });

        it('should add only unique Mahsulot to an array', () => {
          const mahsulotArray: IMahsulot[] = [{ id: 123 }, { id: 456 }, { id: 7580 }];
          const mahsulotCollection: IMahsulot[] = [{ id: 123 }];
          expectedResult = service.addMahsulotToCollectionIfMissing(mahsulotCollection, ...mahsulotArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const mahsulot: IMahsulot = { id: 123 };
          const mahsulot2: IMahsulot = { id: 456 };
          expectedResult = service.addMahsulotToCollectionIfMissing([], mahsulot, mahsulot2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(mahsulot);
          expect(expectedResult).toContain(mahsulot2);
        });

        it('should accept null and undefined values', () => {
          const mahsulot: IMahsulot = { id: 123 };
          expectedResult = service.addMahsulotToCollectionIfMissing([], null, mahsulot, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(mahsulot);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
