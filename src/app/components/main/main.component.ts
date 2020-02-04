import { SearchModalComponent, SearchResult } from './../../modules/modal/components/search-modal/search-modal.component';
import { ModalService } from './../../modules/modal/services/modal.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Subject, Observable } from 'rxjs';
import { trigger, state, transition, animate, style } from '@angular/animations';
import { FormGroup, AbstractControl, FormControl } from '@angular/forms';

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
      state(
        MenuState.Out,
        style({
          height: '*'
        })
      ),

      state(
        MenuState.In,
        style({
          height: '0px'
        })
      ),

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
    return window.innerWidth >= 768 ? false : true;
  }

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
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
    this.showNav = this.showNav === MenuState.Out ? MenuState.In : MenuState.Out;
  }

  closeNav(): void {
    this.showNav = MenuState.In;
  }

  openModal() {
    this.modalService.createModal(SearchModalComponent);

    if (this.isMobile) {
      this.closeNav();
    }
  }
}
