import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JoinOrgPageRoutingModule } from './join-org-routing.module';

import { JoinOrgPage } from './join-org.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JoinOrgPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [JoinOrgPage]
})
export class JoinOrgPageModule { }
