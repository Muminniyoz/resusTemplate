import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMahsulot, getMahsulotIdentifier } from '../mahsulot.model';

export type EntityResponseType = HttpResponse<IMahsulot>;
export type EntityArrayResponseType = HttpResponse<IMahsulot[]>;

@Injectable({ providedIn: 'root' })
export class MahsulotService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/mahsulots');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(mahsulot: IMahsulot): Observable<EntityResponseType> {
    return this.http.post<IMahsulot>(this.resourceUrl, mahsulot, { observe: 'response' });
  }

  update(mahsulot: IMahsulot): Observable<EntityResponseType> {
    return this.http.put<IMahsulot>(`${this.resourceUrl}/${getMahsulotIdentifier(mahsulot) as number}`, mahsulot, { observe: 'response' });
  }

  partialUpdate(mahsulot: IMahsulot): Observable<EntityResponseType> {
    return this.http.patch<IMahsulot>(`${this.resourceUrl}/${getMahsulotIdentifier(mahsulot) as number}`, mahsulot, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMahsulot>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMahsulot[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addMahsulotToCollectionIfMissing(mahsulotCollection: IMahsulot[], ...mahsulotsToCheck: (IMahsulot | null | undefined)[]): IMahsulot[] {
    const mahsulots: IMahsulot[] = mahsulotsToCheck.filter(isPresent);
    if (mahsulots.length > 0) {
      const mahsulotCollectionIdentifiers = mahsulotCollection.map(mahsulotItem => getMahsulotIdentifier(mahsulotItem)!);
      const mahsulotsToAdd = mahsulots.filter(mahsulotItem => {
        const mahsulotIdentifier = getMahsulotIdentifier(mahsulotItem);
        if (mahsulotIdentifier == null || mahsulotCollectionIdentifiers.includes(mahsulotIdentifier)) {
          return false;
        }
        mahsulotCollectionIdentifiers.push(mahsulotIdentifier);
        return true;
      });
      return [...mahsulotsToAdd, ...mahsulotCollection];
    }
    return mahsulotCollection;
  }
}
