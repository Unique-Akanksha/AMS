import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEditProjectPage } from './add-edit-project.page';

const routes: Routes = [
  {
    path: '',
    component: AddEditProjectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEditProjectPageRoutingModule {}
