import { RouterModule, Routes } from '@angular/router';
import { PostsOverviewComponent } from './components/posts-overview/posts-overview.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PostsOverviewComponent
      },
      {
        path: ':slug',
        component: PostDetailComponent
      }
    ]
  }
];

export const POSTS_ROUTING = RouterModule.forChild(routes);
