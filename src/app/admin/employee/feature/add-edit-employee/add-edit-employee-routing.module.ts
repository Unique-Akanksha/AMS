import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEditEmployeePage } from './add-edit-employee.page';

const routes: Routes = [
  {
    path: '',
    component: AddEditEmployeePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEditEmployeePageRoutingModule {}
