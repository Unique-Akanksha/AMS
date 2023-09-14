import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEditDepPage } from './add-edit-dep.page';

const routes: Routes = [
  {
    path: '',
    component: AddEditDepPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEditDepPageRoutingModule {}
