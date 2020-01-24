import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'conferences',
        loadChildren: () => import('./modules/conferences/conferences.module').then(m => m.ConferencesModule)
      },
      {
        path: 'posts',
        loadChildren: () => import('./modules/posts/posts.module').then(m => m.PostsModule)
      },
      {
        path: 'tags',
        loadChildren: () => import('./modules/tags/tags.module').then(m => m.TagsModule)
      }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
