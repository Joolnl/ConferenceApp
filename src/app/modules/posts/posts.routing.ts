import { RouterModule, Routes } from '@angular/router';
import { PostsOverviewComponent } from './components/posts-overview/posts-overview.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PostsOverviewComponent
      }
    ]
  }
];

export const POSTS_ROUTING = RouterModule.forChild(routes);
