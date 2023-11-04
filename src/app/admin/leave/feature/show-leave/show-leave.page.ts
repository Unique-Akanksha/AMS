import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LeaveService } from 'src/app/admin/leave/data-access/leave.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-show-leave',
  templateUrl: './show-leave.page.html',
  styleUrls: ['./show-leave.page.scss'],
})
export class ShowLeavePage implements OnInit {

  dataSource: any;
  filterdata: string = "";
  displayedColumns: string[] = [
    // 'leaveRequestID',
    'employee_id',
    'leave_type',
    'start_date',
    'end_date',
    'reason',
    'status',
    'created_at'
  ];
  loggedInUser: any;
  employeeID: string = "";
  employee_id = 0;


  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  

  constructor(private router:Router,private leaveRequestService:LeaveService,private userService:UserService) { }

  ngOnInit() {
    this.loggedInUser = this.userService.getLoginUser();
    this.employeeID = this.loggedInUser?.employee_id;

     const userJson = localStorage.getItem('user');

     if (userJson) {
       const user = JSON.parse(userJson);
       this.employee_id = user.employee_id; 
     }

    this.refreshLeaveRequestsList();
  }

  refreshLeaveRequestsList() {
    console.log(" employee_id: " + this.employee_id);
    this.leaveRequestService.getAllLeaveRequestsByID(this.employee_id).subscribe((data:any) => {
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.sort = this.sort!;
      this.dataSource.paginator = this.paginator!;
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.filterdata = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
