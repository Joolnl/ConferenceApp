import { ComponentShareModule } from './../component-share/component-share.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CONFERENCES_ROUTING } from './conferences.routing';

@NgModule({
  declarations: [],
  imports: [CommonModule, CONFERENCES_ROUTING, ComponentShareModule]
})
export class ConferencesModule {}
