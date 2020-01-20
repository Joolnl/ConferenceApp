import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, takeUntil, switchMap, tap } from 'rxjs/operators';
import { Subject, Observable, concat, merge, forkJoin } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';
import { ConferencesService } from 'src/app/services/conferences.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  githubPath = environment.github;

  destroy$ = new Subject<boolean>();

  searchResults$: Observable<SearchResult[]>;

  searchForm: FormGroup;

  get search(): AbstractControl {
    return this.searchForm.get('search');
  }

  constructor(private postsService: PostsService, private confsService: ConferencesService) {}

  ngOnInit(): void {
    this.searchForm = this.createSearchForm();

    this.searchResults$ = this.search.valueChanges.pipe(
      debounceTime(400),
      takeUntil(this.destroy$),
      switchMap(searchvalue =>
        forkJoin(
          this.postsService.getPosts(searchvalue).then(posts => {
            return { title: 'Posts', hits: posts, prefix: '/posts' };
          }),
          this.confsService.getConferences(searchvalue).then(confs => {
            return { title: 'Confrences', hits: confs, prefix: '/conferences' };
          })
        )
      )
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  createSearchForm() {
    return new FormGroup({
      search: new FormControl()
    });
  }
}

export interface SearchResult {
  title: string;
  hits: any[];
  prefix: string;
}
