import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowEmpAttendancePageRoutingModule } from './show-emp-attendance-routing.module';

import { ShowEmpAttendancePage } from './show-emp-attendance.page';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowEmpAttendancePageRoutingModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  declarations: [ShowEmpAttendancePage]
})
export class ShowEmpAttendancePageModule {}
