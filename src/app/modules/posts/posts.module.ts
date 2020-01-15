import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsOverviewComponent } from './components/posts-overview/posts-overview.component';
import { POSTS_ROUTING } from './posts.routing';

@NgModule({
  declarations: [PostsOverviewComponent],
  imports: [CommonModule, POSTS_ROUTING]
})
export class PostsModule {}
