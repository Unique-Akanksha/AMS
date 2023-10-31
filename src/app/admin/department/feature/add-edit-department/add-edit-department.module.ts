import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEditDepartmentPageRoutingModule } from './add-edit-department-routing.module';

import { AddEditDepartmentPage } from './add-edit-department.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddEditDepartmentPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [AddEditDepartmentPage]
})
export class AddEditDepartmentPageModule {}
