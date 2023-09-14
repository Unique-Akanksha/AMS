import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// dynamic-table.component.ts

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
})
export class DynamicTableComponent implements AfterViewInit {
  @Input() displayedColumns: string[] = [];
  @Input() dataSource: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
 @ViewChild(MatSort) sort!: MatSort;
 // dynamic-table.component.ts

 data: MatTableDataSource<any[]> = new MatTableDataSource<any[]>([]);


  ngAfterViewInit() {
    this.data = new MatTableDataSource(this.dataSource);
    this.data.paginator = this.paginator;
    this.data.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();

    if (this.data.paginator) {
      this.data.paginator.firstPage();
    }
  }
}
