import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMahsulot, Mahsulot } from '../mahsulot.model';
import { MahsulotService } from '../service/mahsulot.service';

@Injectable({ providedIn: 'root' })
export class MahsulotRoutingResolveService implements Resolve<IMahsulot> {
  constructor(protected service: MahsulotService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMahsulot> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((mahsulot: HttpResponse<Mahsulot>) => {
          if (mahsulot.body) {
            return of(mahsulot.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Mahsulot());
  }
}
