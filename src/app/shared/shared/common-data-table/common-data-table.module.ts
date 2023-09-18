import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonDataTableComponent } from '../../components/common-data-table/common-data-table.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [CommonDataTableComponent],
  exports: [CommonDataTableComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule
  ]
})
export class CommonDataTableModule { }