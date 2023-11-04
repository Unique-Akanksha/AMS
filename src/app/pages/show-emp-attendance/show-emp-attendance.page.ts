import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AttendanceService } from 'src/app/admin/attendance/data-access/attendance.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-show-emp-attendance',
  templateUrl: './show-emp-attendance.page.html',
  styleUrls: ['./show-emp-attendance.page.scss'],
})
export class ShowEmpAttendancePage implements OnInit {
  loggedInUser: any;
  userName: string = "";
  lastName: string = "";
  employeeName: string = "";

  loginUser = '';
  dataSource: any;
  filterdata: string = "";
  displayedColumns: string[] = [
    // 'attendanceID',
    'employeeName',
    'employeeDept',
    'currentTime',
    'currentDate',
    'currentLocation',
    'projectList',
    'checkInTime',
    'checkOutTime',
    'totalHrsTime',
  ];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private router: Router, private attendanceService: AttendanceService, private userService: UserService) { }

  ngOnInit() {
    // get login user info from user service
    this.loggedInUser = this.userService.getLoginUser();
    this.userName = this.loggedInUser?.first_name;
    this.lastName = this.loggedInUser?.last_name;
    this.employeeName = (this.userName ?? '') + ' ' + (this.lastName ?? '');





    // code for get user role 
    const userJson = localStorage.getItem('user');

    if (userJson) {
      const user = JSON.parse(userJson);
      const userRole = user.role;
      this.loginUser = userRole;
      this.userName = user.first_name;
      this.lastName = user.last_name;
      this.employeeName = this.userName + ' ' + this.lastName;

    }

    this.refreshEmpList();
  }

  refreshEmpList() {
    this.attendanceService.getAttendanceListByLoginUser(this.employeeName).subscribe((data) => {
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
