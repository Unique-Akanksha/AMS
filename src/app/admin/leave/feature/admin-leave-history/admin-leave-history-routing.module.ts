import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminLeaveHistoryPage } from './admin-leave-history.page';

const routes: Routes = [
  {
    path: '',
    component: AdminLeaveHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminLeaveHistoryPageRoutingModule {}
