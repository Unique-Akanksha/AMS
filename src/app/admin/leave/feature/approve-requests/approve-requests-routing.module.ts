import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApproveRequestsPage } from './approve-requests.page';

const routes: Routes = [
  {
    path: '',
    component: ApproveRequestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApproveRequestsPageRoutingModule {}
