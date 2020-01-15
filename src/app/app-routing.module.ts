import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MainComponent } from './components/main/main.component';


const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'conferences',
                loadChildren: () => import('./modules/conferences/conferences.module').then(m => m.ConferencesModule)
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
export class AppRoutingModule {
}
