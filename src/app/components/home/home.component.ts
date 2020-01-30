import { AppRoutesService } from './../../services/app-routes.service';
import { Observable } from 'rxjs';
import { TagService } from './../../services/tag.service';
import { Component, OnInit } from '@angular/core';
import { TagItems } from 'src/app/contracts/tags';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  popularTags$: Observable<TagItems>;
  posts$: Observable<any>;
  conferences$: Observable<any>;

  limit = 6;

  constructor(private tagService: TagService, private routes: AppRoutesService) {}

  ngOnInit() {
    this.popularTags$ = this.tagService.getPopularTags(25);

    this.posts$ = this.routes.getRoutes('posts', this.limit);
    this.conferences$ = this.routes.getRoutes('conferences', this.limit);
  }
}
