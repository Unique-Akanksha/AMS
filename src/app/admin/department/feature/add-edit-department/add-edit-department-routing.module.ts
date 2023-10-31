import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEditDepartmentPage } from './add-edit-department.page';

const routes: Routes = [
  {
    path: '',
    component: AddEditDepartmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEditDepartmentPageRoutingModule {}
