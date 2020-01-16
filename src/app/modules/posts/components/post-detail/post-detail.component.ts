import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ScullyRoutesService, ScullyRoute } from '@scullyio/ng-lib';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostDetailComponent implements OnInit {
  routeContent$: Observable<ScullyRoute>

  constructor(private route: ScullyRoutesService, private router: Router) { }

  ngOnInit() {
    let currentRoute = this.router.url;
    this.routeContent$ = this.route.available$.pipe(
      map(a =>
        a.find(url => url.route === currentRoute)
      ),
      map(item => {
        if (item.tags) {
          item.tags = item.tags.split(',').map((item) => {
                return item.trim().toLowerCase();
              })
        }
        return item;
      })
    );
  }
}
