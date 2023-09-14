import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AttendanceService } from 'src/app/services/attendance.service';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProjectService } from 'src/app/services/project.service';
import { IonRefresher } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  departmentCount:number=0;
  projectCount:number=0;
  employeeCount:number=0;
  attendanceCount:number=0;

  constructor(private departmentService:DepartmentService, private projectService:ProjectService,private employeeService:EmployeeService,private attendanceService:AttendanceService,private router: Router) { }

  ngOnInit() {
   this.FatchData();
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.FatchData();
      event.target.complete();
    }, 2000);
  }

  FatchData(){
     // Fetch data from the service and update counts
     this.departmentService.getDepartmentCount().subscribe((count) => {
      this.departmentCount = count;
    });

    this.projectService.getProjectCount().subscribe((count) => {
      this.projectCount = count;
    });

    this.employeeService.getEmployeeCount().subscribe((count) => {
      this.employeeCount = count;
    });

    this.attendanceService.getAttendanceCount().subscribe((count) => {
      this.attendanceCount = count;
    });
  }


  // Implement the logout function
  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }
}
