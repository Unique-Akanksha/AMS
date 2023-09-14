import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEditAttendancePage } from './add-edit-attendance.page';

const routes: Routes = [
  {
    path: '',
    component: AddEditAttendancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEditAttendancePageRoutingModule {}
