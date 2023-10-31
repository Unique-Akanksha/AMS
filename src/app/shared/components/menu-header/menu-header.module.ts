// menu-header.module.ts
import { NgModule } from '@angular/core';
import { MenuHeaderComponent } from './menu-header.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [MenuHeaderComponent],
  exports: [MenuHeaderComponent],
  imports:[IonicModule],
})
export class MenuHeaderModule {}
