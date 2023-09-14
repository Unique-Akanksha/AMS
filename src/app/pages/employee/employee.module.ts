import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployeePageRoutingModule } from './employee-routing.module';

import { EmployeePage } from './employee.page';
import { ReactiveFormsModule } from '@angular/forms';
import { AlphabetDirective } from 'src/app/alphabet.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployeePageRoutingModule,
    ReactiveFormsModule,
    
  ],
  declarations: [EmployeePage, AlphabetDirective]
})
export class EmployeePageModule {}
