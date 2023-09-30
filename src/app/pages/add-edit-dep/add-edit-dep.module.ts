import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEditDepPageRoutingModule } from './add-edit-dep-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddEditDepPage } from './add-edit-dep.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddEditDepPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [AddEditDepPage]
})
export class AddEditDepPageModule {}
