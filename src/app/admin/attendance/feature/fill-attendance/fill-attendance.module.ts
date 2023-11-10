import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FillAttendancePageRoutingModule } from './fill-attendance-routing.module';

import { FillAttendancePage } from './fill-attendance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FillAttendancePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FillAttendancePage]
})
export class FillAttendancePageModule {}
