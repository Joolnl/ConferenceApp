import { AppRoutesService } from './../../../../services/app-routes.service';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-posts-overview',
  templateUrl: './posts-overview.component.html',
  styleUrls: ['./posts-overview.component.scss']
})
export class PostsOverviewComponent implements OnInit {
  posts$: Observable<any>;

  @Input() limit: number;

  constructor(private routes: AppRoutesService) {}

  ngOnInit() {
    this.posts$ = this.routes.getRoutes('posts', this.limit);
  }
}
