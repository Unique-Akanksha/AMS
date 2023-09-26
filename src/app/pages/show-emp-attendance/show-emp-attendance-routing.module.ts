import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowEmpAttendancePage } from './show-emp-attendance.page';

const routes: Routes = [
  {
    path: '',
    component: ShowEmpAttendancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowEmpAttendancePageRoutingModule {}
