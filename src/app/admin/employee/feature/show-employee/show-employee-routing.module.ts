import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowEmployeePage } from './show-employee.page';

const routes: Routes = [
  {
    path: '',
    component: ShowEmployeePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowEmployeePageRoutingModule {}
