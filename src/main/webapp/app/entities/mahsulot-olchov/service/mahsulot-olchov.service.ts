import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMahsulotOlchov, getMahsulotOlchovIdentifier } from '../mahsulot-olchov.model';

export type EntityResponseType = HttpResponse<IMahsulotOlchov>;
export type EntityArrayResponseType = HttpResponse<IMahsulotOlchov[]>;

@Injectable({ providedIn: 'root' })
export class MahsulotOlchovService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/mahsulot-olchovs');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(mahsulotOlchov: IMahsulotOlchov): Observable<EntityResponseType> {
    return this.http.post<IMahsulotOlchov>(this.resourceUrl, mahsulotOlchov, { observe: 'response' });
  }

  update(mahsulotOlchov: IMahsulotOlchov): Observable<EntityResponseType> {
    return this.http.put<IMahsulotOlchov>(`${this.resourceUrl}/${getMahsulotOlchovIdentifier(mahsulotOlchov) as number}`, mahsulotOlchov, {
      observe: 'response',
    });
  }

  partialUpdate(mahsulotOlchov: IMahsulotOlchov): Observable<EntityResponseType> {
    return this.http.patch<IMahsulotOlchov>(
      `${this.resourceUrl}/${getMahsulotOlchovIdentifier(mahsulotOlchov) as number}`,
      mahsulotOlchov,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMahsulotOlchov>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMahsulotOlchov[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addMahsulotOlchovToCollectionIfMissing(
    mahsulotOlchovCollection: IMahsulotOlchov[],
    ...mahsulotOlchovsToCheck: (IMahsulotOlchov | null | undefined)[]
  ): IMahsulotOlchov[] {
    const mahsulotOlchovs: IMahsulotOlchov[] = mahsulotOlchovsToCheck.filter(isPresent);
    if (mahsulotOlchovs.length > 0) {
      const mahsulotOlchovCollectionIdentifiers = mahsulotOlchovCollection.map(
        mahsulotOlchovItem => getMahsulotOlchovIdentifier(mahsulotOlchovItem)!
      );
      const mahsulotOlchovsToAdd = mahsulotOlchovs.filter(mahsulotOlchovItem => {
        const mahsulotOlchovIdentifier = getMahsulotOlchovIdentifier(mahsulotOlchovItem);
        if (mahsulotOlchovIdentifier == null || mahsulotOlchovCollectionIdentifiers.includes(mahsulotOlchovIdentifier)) {
          return false;
        }
        mahsulotOlchovCollectionIdentifiers.push(mahsulotOlchovIdentifier);
        return true;
      });
      return [...mahsulotOlchovsToAdd, ...mahsulotOlchovCollection];
    }
    return mahsulotOlchovCollection;
  }
}
