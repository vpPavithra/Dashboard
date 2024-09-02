import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JoinOrgPageRoutingModule } from './join-org-routing.module';

import { JoinOrgPage } from './join-org.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JoinOrgPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [JoinOrgPage]
})
export class JoinOrgPageModule { }
