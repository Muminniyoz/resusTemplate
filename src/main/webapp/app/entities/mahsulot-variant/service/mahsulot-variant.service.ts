import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMahsulotVariant, getMahsulotVariantIdentifier } from '../mahsulot-variant.model';

export type EntityResponseType = HttpResponse<IMahsulotVariant>;
export type EntityArrayResponseType = HttpResponse<IMahsulotVariant[]>;

@Injectable({ providedIn: 'root' })
export class MahsulotVariantService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/mahsulot-variants');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(mahsulotVariant: IMahsulotVariant): Observable<EntityResponseType> {
    return this.http.post<IMahsulotVariant>(this.resourceUrl, mahsulotVariant, { observe: 'response' });
  }

  update(mahsulotVariant: IMahsulotVariant): Observable<EntityResponseType> {
    return this.http.put<IMahsulotVariant>(
      `${this.resourceUrl}/${getMahsulotVariantIdentifier(mahsulotVariant) as number}`,
      mahsulotVariant,
      { observe: 'response' }
    );
  }

  partialUpdate(mahsulotVariant: IMahsulotVariant): Observable<EntityResponseType> {
    return this.http.patch<IMahsulotVariant>(
      `${this.resourceUrl}/${getMahsulotVariantIdentifier(mahsulotVariant) as number}`,
      mahsulotVariant,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMahsulotVariant>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMahsulotVariant[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addMahsulotVariantToCollectionIfMissing(
    mahsulotVariantCollection: IMahsulotVariant[],
    ...mahsulotVariantsToCheck: (IMahsulotVariant | null | undefined)[]
  ): IMahsulotVariant[] {
    const mahsulotVariants: IMahsulotVariant[] = mahsulotVariantsToCheck.filter(isPresent);
    if (mahsulotVariants.length > 0) {
      const mahsulotVariantCollectionIdentifiers = mahsulotVariantCollection.map(
        mahsulotVariantItem => getMahsulotVariantIdentifier(mahsulotVariantItem)!
      );
      const mahsulotVariantsToAdd = mahsulotVariants.filter(mahsulotVariantItem => {
        const mahsulotVariantIdentifier = getMahsulotVariantIdentifier(mahsulotVariantItem);
        if (mahsulotVariantIdentifier == null || mahsulotVariantCollectionIdentifiers.includes(mahsulotVariantIdentifier)) {
          return false;
        }
        mahsulotVariantCollectionIdentifiers.push(mahsulotVariantIdentifier);
        return true;
      });
      return [...mahsulotVariantsToAdd, ...mahsulotVariantCollection];
    }
    return mahsulotVariantCollection;
  }
}
