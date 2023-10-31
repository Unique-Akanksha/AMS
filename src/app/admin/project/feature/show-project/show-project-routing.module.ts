import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowProjectPage } from './show-project.page';

const routes: Routes = [
  {
    path: '',
    component: ShowProjectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowProjectPageRoutingModule {}
