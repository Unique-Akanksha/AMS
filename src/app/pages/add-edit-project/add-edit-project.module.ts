import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEditProjectPageRoutingModule } from './add-edit-project-routing.module';

import { AddEditProjectPage } from './add-edit-project.page';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { AlphabetOnlyDirective } from 'src/app/alphabet-only.directive';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddEditProjectPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [AddEditProjectPage,AlphabetOnlyDirective]
})
export class AddEditProjectPageModule {}
