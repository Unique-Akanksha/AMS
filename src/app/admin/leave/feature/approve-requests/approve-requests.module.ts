import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApproveRequestsPageRoutingModule } from './approve-requests-routing.module';

import { ApproveRequestsPage } from './approve-requests.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApproveRequestsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ApproveRequestsPage]
})
export class ApproveRequestsPageModule {}
