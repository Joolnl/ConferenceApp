import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

    githubPath = environment.github;

    destroy$ = new Subject<boolean>();

    searchForm: FormGroup;

    get search(): AbstractControl {
        return this.searchForm.get('search');
    }

    constructor() {
    }

    ngOnInit(): void {
        this.searchForm = this.createSearchForm();
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

    onSearch() {
        this.search.valueChanges.pipe(
            debounceTime(400),
            takeUntil(this.destroy$)
        ).subscribe(value => {
            // TODO implement search method here
        });
    }

}
