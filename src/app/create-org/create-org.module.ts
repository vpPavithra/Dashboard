import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateOrgPageRoutingModule } from './create-org-routing.module';

import { CreateOrgPage } from './create-org.page';
import { ComponentsModule } from 'src/app/modules/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateOrgPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [CreateOrgPage]
})
export class CreateOrgPageModule { }
