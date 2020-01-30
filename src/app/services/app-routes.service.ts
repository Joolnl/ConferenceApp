import { map } from 'rxjs/operators';
import { ScullyRoutesService, ScullyRoute } from '@scullyio/ng-lib';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { sortByDate } from '../helpers/sort';

@Injectable({
  providedIn: 'root'
})
export class AppRoutesService {

  constructor(private scullyRoutes: ScullyRoutesService) { }

  getRoutes(filter?: string, limit?: number, offset = 0): Observable<ScullyRoute[]> {
    return this.scullyRoutes.allRoutes$.pipe(
      map(routes => (filter) ? routes.filter(items => items.route.includes(`${filter}/`)) : routes),
      map(routes => routes.sort(sortByDate)),
      map(routes => (limit) ? routes.slice(offset, limit) : routes)
    );
  }

}
