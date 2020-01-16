import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsOverviewComponent } from './components/posts-overview/posts-overview.component';
import { POSTS_ROUTING } from './posts.routing';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { ComponentsModule } from '@scullyio/ng-lib';
import { SharedModule } from '../shared.module';

const COMPONENTS = [PostsOverviewComponent];

@NgModule({
  declarations: [...COMPONENTS, PostDetailComponent],
  imports: [CommonModule, POSTS_ROUTING, ComponentsModule, SharedModule],
  exports: [...COMPONENTS]
})
export class PostsModule {}
