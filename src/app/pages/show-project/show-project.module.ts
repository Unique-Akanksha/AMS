import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowProjectPageRoutingModule } from './show-project-routing.module';

import { ShowProjectPage } from './show-project.page';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowProjectPageRoutingModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  declarations: [ShowProjectPage]
})
export class ShowProjectPageModule {}
