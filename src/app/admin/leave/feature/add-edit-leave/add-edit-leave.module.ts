import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEditLeavePageRoutingModule } from './add-edit-leave-routing.module';

import { AddEditLeavePage } from './add-edit-leave.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddEditLeavePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddEditLeavePage]
})
export class AddEditLeavePageModule {}
