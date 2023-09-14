import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowAttendancePage } from './show-attendance.page';

const routes: Routes = [
  {
    path: '',
    component: ShowAttendancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowAttendancePageRoutingModule {}
