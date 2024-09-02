import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JoinOrgPage } from './join-org.page';

const routes: Routes = [
  {
    path: '',
    component: JoinOrgPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JoinOrgPageRoutingModule {}
