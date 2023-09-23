import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileEmpPageRoutingModule } from './profile-emp-routing.module';

import { ProfileEmpPage } from './profile-emp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileEmpPageRoutingModule
  ],
  declarations: [ProfileEmpPage]
})
export class ProfileEmpPageModule {}
