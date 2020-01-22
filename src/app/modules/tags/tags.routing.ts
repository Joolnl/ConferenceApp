import { TagsOverviewComponent } from './components/tags-overview/tags-overview.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':tag',
        component: TagsOverviewComponent
      }
    ]
  }
];

export const TAGS_ROUTING = RouterModule.forChild(routes);
