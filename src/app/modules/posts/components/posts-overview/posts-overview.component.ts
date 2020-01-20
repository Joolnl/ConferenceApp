import { Component, OnInit, Input } from '@angular/core';
import { PostsService } from '../../../../services/posts.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-posts-overview',
  templateUrl: './posts-overview.component.html',
  styleUrls: ['./posts-overview.component.scss']
})
export class PostsOverviewComponent implements OnInit {
  posts$: Observable<any>;

  @Input() limit: number;

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.posts$ = this.postsService.getAllPosts(this.limit);
    this.posts$.subscribe(val => {
      console.log(val);
    });
  }
}
