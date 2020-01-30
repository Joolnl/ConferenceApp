import { ConferencesService } from './../../../../services/conferences.service';
import { PostsService } from './../../../../services/posts.service';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject, Observable, from } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as urlSlug from 'url-slug';
import { Conferences, Posts } from 'src/app/contracts/markdown';

@Component({
  selector: 'app-tags-overview',
  templateUrl: './tags-overview.component.html',
  styleUrls: ['./tags-overview.component.scss']
})
export class TagsOverviewComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();
  posts$: Observable<Posts[]>;
  conferences$: Observable<Conferences[]>;

  tag = '';

  constructor(
    private activatedRoute: ActivatedRoute,
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

          this.posts$ = from(this.postsService.getPostsByTag(tag));
          this.conferences$ = from(this.conferencesService.getConferencesByTag(tag));
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
