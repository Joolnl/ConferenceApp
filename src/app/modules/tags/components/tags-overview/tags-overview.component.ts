import { ScullyRoute } from '@scullyio/ng-lib';
import { ConferencesService } from './../../../../services/conferences.service';
import { PostsService } from './../../../../services/posts.service';
import { takeUntil, tap, switchMap } from 'rxjs/operators';
import { Subject, Observable, from } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as urlSlug from 'url-slug';
import { AppRoutesService } from 'src/app/services/app-routes.service';

@Component({
  selector: 'app-tags-overview',
  templateUrl: './tags-overview.component.html',
  styleUrls: ['./tags-overview.component.scss']
})
export class TagsOverviewComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();
  posts$: Observable<ScullyRoute[]>;
  conferences$: Observable<ScullyRoute[]>;

  tag = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private appRoutesService: AppRoutesService,
    private postsService: PostsService,
    private conferencesService: ConferencesService
  ) {}

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        takeUntil(this.destroy$),
        tap(params => {
          const { tag } = params;
          this.tag = this.revertSlug(tag);

          this.posts$ = from(this.postsService.getPostsByTag(tag)).pipe(
            switchMap(posts => this.appRoutesService.getRoutesByMarkdown(posts, 'posts'))
          );

          this.conferences$ = from(this.conferencesService.getConferencesByTag(tag)).pipe(
            switchMap(conferences => this.appRoutesService.getRoutesByMarkdown(conferences, 'conferences'))
          );
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  revertSlug(value: string): string {
    return urlSlug.revert(value);
  }
}
