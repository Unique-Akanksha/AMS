import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowAttendancePageRoutingModule } from './show-attendance-routing.module';
import {MatIconModule} from '@angular/material/icon';
import { ShowAttendancePage } from './show-attendance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowAttendancePageRoutingModule,MatIconModule
  ],
  declarations: [ShowAttendancePage]
})
export class ShowAttendancePageModule {}
