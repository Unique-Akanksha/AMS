import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsEmployeePage } from './details-employee.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsEmployeePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsEmployeePageRoutingModule {}
