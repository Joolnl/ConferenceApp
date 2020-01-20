import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { ScullyRoutesService, ScullyRoute } from '@scullyio/ng-lib';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostDetailComponent implements OnInit {
  routeContent$: Observable<ScullyRoute>;

  testSubject = new Subject<number>();

  constructor(private route: ScullyRoutesService, private router: Router, private activatedRoute: ActivatedRoute, private cd : ChangeDetectorRef) {}

  ngOnInit() {

    this.activatedRoute.params.subscribe(_ => {
      console.log('test');
      this.cd.detectChanges();
      this.testSubject.next(1);
      
      let currentRoute = this.router.url;
      this.routeContent$ = this.route.available$.pipe(
        map(a => a.find(url => url.route === currentRoute)),
        map(item => {
          if (item.tags) {
            item.tags = item.tags.split(',').map(item => {
              return item.trim().toLowerCase();
            });
          }
          return item;
        })
      );
    })


  }
}
