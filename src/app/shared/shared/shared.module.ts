import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlphabetOnlyDirective } from '../directive/alphabet-only.directive';
import { NumberOnlyDirective } from '../directive/number-only.directive';

@NgModule({
  declarations: [AlphabetOnlyDirective,NumberOnlyDirective],
  exports: [AlphabetOnlyDirective,NumberOnlyDirective],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
