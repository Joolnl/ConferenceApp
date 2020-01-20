import { SearchService } from './../../services/search.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, takeUntil, map, tap, switchMap } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  githubPath = environment.github;

  destroy$ = new Subject<boolean>();

  searchResults$: Observable<any>;

  searchForm: FormGroup;

  get search(): AbstractControl {
    return this.searchForm.get('search');
  }

  constructor(private postsService: PostsService, private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchForm = this.createSearchForm();

    this.searchResults$ = this.search.valueChanges.pipe(
      debounceTime(400),
      takeUntil(this.destroy$),
      switchMap(searchvalue => this.postsService.getPosts(searchvalue))
    );

    this.searchService.searchObservable$
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => this.search.patchValue(value));
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
