import { ConferencesService } from './../../../../services/conferences.service';
import { PostsService } from './../../../../services/posts.service';
import { Subject, Observable, forkJoin, of } from 'rxjs';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Component, OnInit, Renderer2, Inject, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Modal } from '../../classes/modal';
import { OVERLAY_TOKEN, OverlayToken } from '../../contracts/overlay';
import { debounceTime, takeUntil, switchMap, tap } from 'rxjs/operators';
import { Posts, Conferences } from 'src/app/contracts/markdown';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss']
})
export class SearchModalComponent extends Modal implements OnInit, OnDestroy {
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;

  form: FormGroup;
  destroy$ = new Subject<boolean>();
  searchResults$: Observable<SearchResult[]>;
  debounceTime = 400;
  showSearchResults = false;

  get search(): AbstractControl {
    return this.form.get('search');
  }

  constructor(
    protected renderer: Renderer2,
    @Inject(OVERLAY_TOKEN) protected overlay: OverlayToken,
    private postsService: PostsService,
    private confsService: ConferencesService
  ) {
    super(renderer, overlay);
  }

  ngOnInit() {
    this.searchInput.nativeElement.focus();
    this.form = this.createSearchForm();

    this.searchResults$ = this.search.valueChanges.pipe(
      debounceTime(this.debounceTime),
      takeUntil(this.destroy$),
      switchMap(searchvalue =>
        searchvalue
          ? forkJoin([
              this.postsService.getPosts(searchvalue).then(posts => {
                return { title: 'Posts', hits: posts, prefix: '/posts' };
              }),
              this.confsService.getConferences(searchvalue).then(confs => {
                return { title: 'Conferences', hits: confs, prefix: '/conferences' };
              })
            ])
          : of([])
      ),
      tap(() => {
        this.showSearchResults = true;
      })
    );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  createSearchForm(): FormGroup {
    return new FormGroup({
      search: new FormControl()
    });
  }
}

export interface SearchResult {
  title: string;
  hits: Posts[] | Conferences[];
  prefix: string;
}
