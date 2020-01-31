import { map } from 'rxjs/operators';
import { ScullyRoutesService, ScullyRoute } from '@scullyio/ng-lib';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { sortByDate } from '../helpers/sort';
import { Markdown } from '../contracts/markdown';

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

  getRoutesByMarkdown(markdown: Markdown[], prefix: string): Observable<ScullyRoute[]> {
    const baseNames = markdown.map(md => `/${prefix}/${md.basename}`);

    return this.scullyRoutes.allRoutes$.pipe(
      map(routes => routes.filter(route => baseNames.includes(route.route)))
    );
  }

}
