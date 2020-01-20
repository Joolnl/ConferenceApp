import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../../../services/posts.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-posts-overview',
  templateUrl: './posts-overview.component.html',
  styleUrls: ['./posts-overview.component.scss']
})
export class PostsOverviewComponent implements OnInit {
  posts$: Observable<any>;

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.posts$ = this.postsService.getAllPosts();
  }
}