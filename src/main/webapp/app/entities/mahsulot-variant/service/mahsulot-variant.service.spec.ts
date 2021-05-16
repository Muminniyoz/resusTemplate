import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IMahsulotVariant, MahsulotVariant } from '../mahsulot-variant.model';

import { MahsulotVariantService } from './mahsulot-variant.service';

describe('Service Tests', () => {
  describe('MahsulotVariant Service', () => {
    let service: MahsulotVariantService;
    let httpMock: HttpTestingController;
    let elemDefault: IMahsulotVariant;
    let expectedResult: IMahsulotVariant | IMahsulotVariant[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(MahsulotVariantService);
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

      it('should create a MahsulotVariant', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new MahsulotVariant()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a MahsulotVariant', () => {
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

      it('should partial update a MahsulotVariant', () => {
        const patchObject = Object.assign(
          {
            nom: 'BBBBBB',
            izoh: 'BBBBBB',
          },
          new MahsulotVariant()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of MahsulotVariant', () => {
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

      it('should delete a MahsulotVariant', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addMahsulotVariantToCollectionIfMissing', () => {
        it('should add a MahsulotVariant to an empty array', () => {
          const mahsulotVariant: IMahsulotVariant = { id: 123 };
          expectedResult = service.addMahsulotVariantToCollectionIfMissing([], mahsulotVariant);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(mahsulotVariant);
        });

        it('should not add a MahsulotVariant to an array that contains it', () => {
          const mahsulotVariant: IMahsulotVariant = { id: 123 };
          const mahsulotVariantCollection: IMahsulotVariant[] = [
            {
              ...mahsulotVariant,
            },
            { id: 456 },
          ];
          expectedResult = service.addMahsulotVariantToCollectionIfMissing(mahsulotVariantCollection, mahsulotVariant);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a MahsulotVariant to an array that doesn't contain it", () => {
          const mahsulotVariant: IMahsulotVariant = { id: 123 };
          const mahsulotVariantCollection: IMahsulotVariant[] = [{ id: 456 }];
          expectedResult = service.addMahsulotVariantToCollectionIfMissing(mahsulotVariantCollection, mahsulotVariant);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(mahsulotVariant);
        });

        it('should add only unique MahsulotVariant to an array', () => {
          const mahsulotVariantArray: IMahsulotVariant[] = [{ id: 123 }, { id: 456 }, { id: 34789 }];
          const mahsulotVariantCollection: IMahsulotVariant[] = [{ id: 123 }];
          expectedResult = service.addMahsulotVariantToCollectionIfMissing(mahsulotVariantCollection, ...mahsulotVariantArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const mahsulotVariant: IMahsulotVariant = { id: 123 };
          const mahsulotVariant2: IMahsulotVariant = { id: 456 };
          expectedResult = service.addMahsulotVariantToCollectionIfMissing([], mahsulotVariant, mahsulotVariant2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(mahsulotVariant);
          expect(expectedResult).toContain(mahsulotVariant2);
        });

        it('should accept null and undefined values', () => {
          const mahsulotVariant: IMahsulotVariant = { id: 123 };
          expectedResult = service.addMahsulotVariantToCollectionIfMissing([], null, mahsulotVariant, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(mahsulotVariant);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
