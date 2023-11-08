import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { MatIconModule } from '@angular/material/icon';
import { ChartComponent } from 'src/app/shared/components/chart/chart.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    MatIconModule
  ],
  declarations: [DashboardPage,ChartComponent]
})
export class DashboardPageModule {}
