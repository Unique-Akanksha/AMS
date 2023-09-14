import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowDepPage } from './show-dep.page';

const routes: Routes = [
  {
    path: '',
    component: ShowDepPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowDepPageRoutingModule {}
