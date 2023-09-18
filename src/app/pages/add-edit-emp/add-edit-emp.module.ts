import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AddEditEmpPageRoutingModule } from './add-edit-emp-routing.module';

import { AddEditEmpPage } from './add-edit-emp.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddEditEmpPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [AddEditEmpPage]
})
export class AddEditEmpPageModule {}
