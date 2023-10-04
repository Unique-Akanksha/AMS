import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LeaveRequestsService } from 'src/app/services/leave-requests.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-leave-history',
  templateUrl: './leave-history.page.html',
  styleUrls: ['./leave-history.page.scss'],
})
export class LeaveHistoryPage implements OnInit {
  dataSource: any;
  filterdata: string = "";
  displayedColumns: string[] = [
    'leaveRequestID',
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
  

  constructor(private router:Router,private leaveRequestService:LeaveRequestsService,private userService:UserService) { }

  ngOnInit() {
    // get login user info from user service
    this.loggedInUser = this.userService.getLoginUser();
    this.employeeID = this.loggedInUser?.employee_id;

     // code for get user role 
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

   // Implement the logout function
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

}
