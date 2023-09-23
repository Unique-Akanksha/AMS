import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileEmpPage } from './profile-emp.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileEmpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileEmpPageRoutingModule {}
