import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEditLeavePage } from './add-edit-leave.page';

const routes: Routes = [
  {
    path: '',
    component: AddEditLeavePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEditLeavePageRoutingModule {}
