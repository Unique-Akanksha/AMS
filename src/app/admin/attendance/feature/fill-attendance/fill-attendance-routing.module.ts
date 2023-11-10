import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FillAttendancePage } from './fill-attendance.page';

const routes: Routes = [
  {
    path: '',
    component: FillAttendancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FillAttendancePageRoutingModule {}
