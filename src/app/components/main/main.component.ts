import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, takeUntil, switchMap, tap } from 'rxjs/operators';
import { Subject, Observable, forkJoin, of } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';
import { ConferencesService } from 'src/app/services/conferences.service';
import { Conferences, Posts } from 'src/app/contracts/markdown';
import { trigger, state, transition, animate, style } from '@angular/animations';

export enum MenuState {
  In = 'in',
  Out = 'out'
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  // tslint:disable-next-line: no-host-metadata-property
  host: { '(window:resize)': 'setMobileNav($event)' },
  animations: [
    trigger('toggleNav', [
      state(MenuState.Out, style({
        height: '*'
      })),

      state(MenuState.In, style({
        height: '0px'
      })),

      transition('* <=> *', animate('300ms ease-in-out'))
    ])
  ]
})
export class MainComponent implements OnInit, OnDestroy {
  githubPath = environment.github;
  showSearchResults = true;

  destroy$ = new Subject<boolean>();

  searchResults$: Observable<SearchResult[]>;

  debounceTime = 400;

  searchForm: FormGroup;

  showNav = MenuState.In;

  get search(): AbstractControl {
    return this.searchForm.get('search');
  }

  get isMobile(): boolean {
    return (window.innerWidth >= 768) ? false : true;
  }

  constructor(private postsService: PostsService, private confsService: ConferencesService) { }

  ngOnInit(): void {
    this.searchForm = this.createSearchForm();

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

    this.setMobileNav();
  }

  setMobileNav(event?: any): void {
    if (!this.isMobile) {
      this.showNav = MenuState.Out;
    } else {
      this.showNav = MenuState.In;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  createSearchForm(): FormGroup {
    return new FormGroup({
      search: new FormControl()
    });
  }

  toggleNav(): void {
    this.showNav = (this.showNav === MenuState.Out) ? MenuState.In : MenuState.Out;
  }

  closeNav(): void {
    this.showNav = MenuState.In;
  }

}

export interface SearchResult {
  title: string;
  hits: Posts[] | Conferences[];
  prefix: string;
}
