import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PostsOverviewComponent } from './../posts/components/posts-overview/posts-overview.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [PostsOverviewComponent],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule
  ],
  exports: [
    PostsOverviewComponent
  ]
})
export class ComponentShareModule { }
