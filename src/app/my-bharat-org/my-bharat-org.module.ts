import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyBharatOrgPageRoutingModule } from './my-bharat-org-routing.module';

import { MyBharatOrgPage } from './my-bharat-org.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MyBharatOrgPageRoutingModule
  ],
  declarations: [MyBharatOrgPage]
})
export class MyBharatOrgPageModule { }
