import { ScullyRoute } from '@scullyio/ng-lib';
import { AppRoutesService } from './../../services/app-routes.service';
import { Observable } from 'rxjs';
import { TagService } from './../../services/tag.service';
import { Component } from '@angular/core';
import { TagItems } from 'src/app/contracts/tags';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  popularTags$: Observable<TagItems>;
  posts$: Observable<ScullyRoute[]>;
  conferences$: Observable<ScullyRoute[]>;

  limit = 6;

  constructor(private tagService: TagService, private routes: AppRoutesService) {
    this.popularTags$ = this.tagService.getPopularTags(25);

    this.posts$ = this.routes.getRoutes('posts', this.limit);
    this.conferences$ = this.routes.getRoutes('conferences', this.limit);
  }

}
