import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':id'
      }
    ]
  }
];

export const CONFERENCES_ROUTING = RouterModule.forChild(routes);
