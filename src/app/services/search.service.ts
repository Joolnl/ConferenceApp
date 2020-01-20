import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchObservable: Subject<string> = new Subject<string>();

  constructor() {}

  get searchObservable$() {
    return this.searchObservable.asObservable();
  }

  search(value: string): void {
    this.searchObservable.next(value);
  }
}
