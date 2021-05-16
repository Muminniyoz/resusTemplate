import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMahsulotOlchov, MahsulotOlchov } from '../mahsulot-olchov.model';
import { MahsulotOlchovService } from '../service/mahsulot-olchov.service';

@Injectable({ providedIn: 'root' })
export class MahsulotOlchovRoutingResolveService implements Resolve<IMahsulotOlchov> {
  constructor(protected service: MahsulotOlchovService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMahsulotOlchov> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((mahsulotOlchov: HttpResponse<MahsulotOlchov>) => {
          if (mahsulotOlchov.body) {
            return of(mahsulotOlchov.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new MahsulotOlchov());
  }
}
