import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule)
  },
  {
    path: 'my-bharat-org',
    loadChildren: () => import('./my-bharat-org/my-bharat-org.module').then(m => m.MyBharatOrgPageModule)
  },
  {
    path: 'join-org',
    loadChildren: () => import('./join-org/join-org.module').then( m => m.JoinOrgPageModule)
  },
  {
    path: 'create-org',
    loadChildren: () => import('./create-org/create-org.module').then( m => m.CreateOrgPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
