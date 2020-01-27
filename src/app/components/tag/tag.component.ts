import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import * as urlSlug from 'url-slug';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
  content = '';
  imagePath = '';

  image$: Observable<string>;

  @Input() tag: string;

  @HostListener('click') onClick() {
    this.router.navigate(['/tags', urlSlug(this.tag)]);
  }

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    const formattedTag = this.tag.toLowerCase().trim().replace(/\s/g, '');

    this.imagePath = `/assets/devicon/${formattedTag}.svg`.replace(' ', '');
    this.image$ = this.getIcon();
  }

  getIcon(): Observable<string> {
    /* This Url will be used as fallback */
    const url = `/assets/devicon/hashtag.svg`;

    return this.http
      .get(this.imagePath, { observe: 'response', responseType: 'blob' })
      .pipe(
        catchError(() => of({ url })),
        map(item => item.url)
      );
  }

}
