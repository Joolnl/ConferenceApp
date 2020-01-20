import { ComponentShareModule } from './../component-share/component-share.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { POSTS_ROUTING } from './posts.routing';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { ComponentsModule } from '@scullyio/ng-lib';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [
    PostDetailComponent
  ],
  imports: [
    CommonModule,
    POSTS_ROUTING,
    ComponentsModule,
    SharedModule,
    ComponentShareModule
  ]
})
export class PostsModule {}
