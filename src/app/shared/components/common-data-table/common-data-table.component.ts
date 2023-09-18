import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-common-data-table',
  templateUrl: './common-data-table.component.html',
  styleUrls: ['./common-data-table.component.scss']
})
export class CommonDataTableComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() displayedColumns: string[] = [];

  dataSource!: MatTableDataSource<any>; // Add '!' to indicate it will be initialized

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    // Initialize the dataSource in the constructor
    this.dataSource = new MatTableDataSource<any>([]);
  }
  

  ngOnInit() {
    this.dataSource.data = this.data;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    console.log(this.data);
    console.log(this.displayedColumns);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
  
}
