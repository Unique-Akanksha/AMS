import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowLeavePage } from './show-leave.page';

const routes: Routes = [
  {
    path: '',
    component: ShowLeavePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowLeavePageRoutingModule {}
