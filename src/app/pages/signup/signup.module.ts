import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupPageRoutingModule } from './signup-routing.module';

import { SignupPage } from './signup.page';
import { ReactiveFormsModule } from '@angular/forms';
import { AlphabetOnlyDirective } from 'src/app/shared/directive/alphabet-only.directive';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { EmailValidatorDirective } from 'src/app/shared/directive/email-validator.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [SignupPage,EmailValidatorDirective]
})
export class SignupPageModule {}
