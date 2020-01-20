import { RouterModule, Routes } from '@angular/router';
import { PostsOverviewComponent } from './components/posts-overview/posts-overview.component';
import { DetailComponent } from 'src/app/components/detail/detail.component';

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
        component: DetailComponent
      }
    ]
  }
];

export const POSTS_ROUTING = RouterModule.forChild(routes);
