import { TagComponent } from './../../components/tag/tag.component';
import { OverviewComponent } from './../../components/overview/overview.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PostsOverviewComponent } from './../posts/components/posts-overview/posts-overview.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConferencesOverviewComponent } from '../conferences/components/conferences-overview/conferences-overview.component';
import { DetailComponent } from 'src/app/components/detail/detail.component';
import { ComponentsModule } from '@scullyio/ng-lib';
import { HeadingComponent } from 'src/app/components/heading/heading.component';

const COMPONENTS = [
  TagComponent,
  DetailComponent,
  OverviewComponent,
  ConferencesOverviewComponent,
  PostsOverviewComponent,
  HeadingComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, TranslateModule, RouterModule, ComponentsModule],
  exports: [ComponentsModule, ...COMPONENTS]
})
export class ComponentShareModule {}
