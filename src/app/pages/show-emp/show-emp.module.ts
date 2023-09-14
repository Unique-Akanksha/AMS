import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowEmpPageRoutingModule } from './show-emp-routing.module';

import { ShowEmpPage } from './show-emp.page';
import {MatIconModule} from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowEmpPageRoutingModule,
    MatIconModule,
    MatTableModule
  ],
  declarations: [ShowEmpPage]
})
export class ShowEmpPageModule {}
