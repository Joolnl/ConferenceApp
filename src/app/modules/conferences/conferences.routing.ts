import { DetailComponent } from 'src/app/components/detail/detail.component';
import { RouterModule, Routes } from '@angular/router';
import { ConferencesOverviewComponent } from './components/conferences-overview/conferences-overview.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ConferencesOverviewComponent
      },
      {
        path: ':slug',
        component: DetailComponent
      }
    ]
  }
];

export const CONFERENCES_ROUTING = RouterModule.forChild(routes);
