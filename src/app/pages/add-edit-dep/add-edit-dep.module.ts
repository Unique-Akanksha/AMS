import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEditDepPageRoutingModule } from './add-edit-dep-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddEditDepPage } from './add-edit-dep.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddEditDepPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddEditDepPage]
})
export class AddEditDepPageModule {}
