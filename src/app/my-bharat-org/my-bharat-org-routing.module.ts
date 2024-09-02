import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyBharatOrgPage } from './my-bharat-org.page';

const routes: Routes = [
  {
    path: '',
    component: MyBharatOrgPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyBharatOrgPageRoutingModule {}
