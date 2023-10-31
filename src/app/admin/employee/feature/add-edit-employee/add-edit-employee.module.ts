import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEditEmployeePageRoutingModule } from './add-edit-employee-routing.module';

import { AddEditEmployeePage } from './add-edit-employee.page';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddEditEmployeePageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [AddEditEmployeePage]
})
export class AddEditEmployeePageModule {}
