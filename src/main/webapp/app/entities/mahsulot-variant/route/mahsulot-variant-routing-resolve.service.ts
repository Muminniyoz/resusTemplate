import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMahsulotVariant, MahsulotVariant } from '../mahsulot-variant.model';
import { MahsulotVariantService } from '../service/mahsulot-variant.service';

@Injectable({ providedIn: 'root' })
export class MahsulotVariantRoutingResolveService implements Resolve<IMahsulotVariant> {
  constructor(protected service: MahsulotVariantService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMahsulotVariant> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((mahsulotVariant: HttpResponse<MahsulotVariant>) => {
          if (mahsulotVariant.body) {
            return of(mahsulotVariant.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new MahsulotVariant());
  }
}
