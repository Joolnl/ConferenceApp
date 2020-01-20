import { OverviewComponent } from './../../components/overview/overview.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PostsOverviewComponent } from './../posts/components/posts-overview/posts-overview.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConferencesOverviewComponent } from '../conferences/components/conferences-overview/conferences-overview.component';

@NgModule({
  declarations: [PostsOverviewComponent, OverviewComponent, ConferencesOverviewComponent],
  imports: [CommonModule, TranslateModule, RouterModule],
  exports: [OverviewComponent, PostsOverviewComponent, ConferencesOverviewComponent]
})
export class ComponentShareModule {}
