import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsEmployeePageRoutingModule } from './details-employee-routing.module';

import { DetailsEmployeePage } from './details-employee.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsEmployeePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DetailsEmployeePage]
})
export class DetailsEmployeePageModule {}
