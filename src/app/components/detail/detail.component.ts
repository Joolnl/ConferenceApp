import { environment } from 'src/environments/environment';
import { SearchService } from './../../services/search.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { Router, ActivatedRoute } from '@angular/router';
import { map, tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetailComponent implements OnInit {
  routeContent$: Observable<ScullyRoute>;
  currentUrl$: Observable<string>;

  editOnGitHubBaseUrl = environment.github_markdown;

  constructor(
    private route: ScullyRoutesService,
    private activatedRoute: ActivatedRoute,
    private searchService: SearchService,
    public router: Router
  ) {}

  ngOnInit() {
    this.routeContent$ = this.activatedRoute.params.pipe(
      switchMap(() =>
        this.route.available$.pipe(
          map(routes => routes.find(url => url.route === this.router.url)),
          map(item => {
            if (item.tags) {
              if (Array.isArray(item.tags)) {
                item.tags = item.tags.map(tag => {
                  return tag.trim().toLowerCase();
                });
              } else {
                item.tags = item.tags.split(',').map(tag => {
                  return tag.trim().toLowerCase();
                });
              }
            }
            return item;
          }),
          tap(() => this.route.reload())
        )
      )
    );
  }

  searchTag(value: string) {
    this.searchService.search(value);
    window.scroll(0, 0);
  }
}
