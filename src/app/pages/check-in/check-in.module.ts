import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckInPageRoutingModule } from './check-in-routing.module';

import { CheckInPage } from './check-in.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CheckInPageRoutingModule
  ],
  declarations: [CheckInPage]
})
export class CheckInPageModule {}
