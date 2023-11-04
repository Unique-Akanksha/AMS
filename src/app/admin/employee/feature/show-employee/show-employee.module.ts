import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowEmployeePageRoutingModule } from './show-employee-routing.module';

import { ShowEmployeePage } from './show-employee.page';
import {MatIconModule} from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FilterModule } from 'src/app/shared/pipes/filter/filter.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowEmployeePageRoutingModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    FilterModule,
    MatButtonModule,
    MatDialogModule
  ],
  declarations: [ShowEmployeePage]
})
export class ShowEmployeePageModule {}
