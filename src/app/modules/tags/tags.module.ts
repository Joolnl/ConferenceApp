import { SharedModule } from './../shared.module';
import { ComponentShareModule } from './../component-share/component-share.module';
import { TAGS_ROUTING } from './tags.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsOverviewComponent } from './components/tags-overview/tags-overview.component';

@NgModule({
  declarations: [TagsOverviewComponent],
  imports: [CommonModule, TAGS_ROUTING, ComponentShareModule, SharedModule]
})
export class TagsModule {}
