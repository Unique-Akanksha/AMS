import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEditAttendancePageRoutingModule } from './add-edit-attendance-routing.module';

import { AddEditAttendancePage } from './add-edit-attendance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddEditAttendancePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddEditAttendancePage]
})
export class AddEditAttendancePageModule {}
