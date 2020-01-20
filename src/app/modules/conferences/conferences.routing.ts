import { RouterModule, Routes } from '@angular/router';
import { ConferencesOverviewComponent } from './components/conferences-overview/conferences-overview.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ConferencesOverviewComponent
      }
    ]
  }
];

export const CONFERENCES_ROUTING = RouterModule.forChild(routes);
