import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlphabetOnlyDirective } from '../directive/alphabet-only.directive';

@NgModule({
  declarations: [AlphabetOnlyDirective],
  exports: [AlphabetOnlyDirective],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
