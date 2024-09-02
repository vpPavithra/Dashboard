import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { MyBharatOrgPage } from '../my-bharat-org/my-bharat-org.page';
import { DashboardPage } from '../dashboard/dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'my-bharat-org',
        component: MyBharatOrgPage,
      },
      {
        path: 'dashboard',
        component: DashboardPage,
      },
      // {
      //   path: '',
      //   redirectTo: 'dashboard',
      //   pathMatch: 'full',
      // }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
