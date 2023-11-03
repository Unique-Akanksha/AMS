import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AttendanceService } from 'src/app/admin/attendance/data-access/attendance.service';
import { DepartmentService } from 'src/app/admin/department/data-access/department.service';
import { EmployeeService } from 'src/app/admin/employee/data-access/employee.service';
import { ProjectService } from 'src/app/admin/project/data-access/project.service';
import { Subscription,timer} from 'rxjs';
import { SessionService } from 'src/app/services/session.service';
import { LeaveService } from 'src/app/admin/leave/data-access/leave.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  isMenuButtonVisible = true; 
  departmentCount:number=0;
  projectCount:number=0;
  employeeCount:number=0;
  attendanceCount:number=0;
  leaveCount:number=0;

  userRole = '';
  userRoleName = '';
  


  private sessionSubscription!: Subscription;
  remainingSessionTime: number = 0;
  sessionTimeout: number = 600 * 60 * 1000; // 30 minutes in milliseconds

  constructor(private sessionService: SessionService,private departmentService:DepartmentService, private projectService:ProjectService,private employeeService:EmployeeService,private attendanceService:AttendanceService, private leaveRequestService:LeaveService,private router: Router) {

  }

  ngOnInit() {
    // code for get user role 
    const userJson = localStorage.getItem('user');

    if (userJson){
      const user = JSON.parse(userJson);
      const userRole = user.role;
      this.userRole = userRole;

      if(userRole === '1'){
        this.userRoleName = 'Super Admin';
      }
      else if(userRole === '2'){
        this.userRoleName = 'Admin';
      }
      else if(userRole === '3')
      {
        this.userRoleName = 'Manager';
      }
      else if(userRole === '4')
      {
        this.userRoleName = 'Developer';
      }
      else{
        this.userRoleName = 'Employee';
      }
    }

    
   this.FatchData();

   // Subscribe to the session timer
   this.sessionSubscription = timer(0, 1000).subscribe(() => {
    const currentTime = Date.now();
    const elapsedTime = currentTime - this.sessionService.getLastActivityTimestamp();
    this.remainingSessionTime = Math.max(0, this.sessionTimeout - elapsedTime);

    // Check if the remaining session time is zero, and perform logout if needed
    if (this.remainingSessionTime === 0) {
      this.logout();
    }
  });
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

    this.leaveRequestService.getAllLeaveRequestsCount().subscribe((count) => {
      this.leaveCount = count;
    });
  }


  // Implement the logout function
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    // Unsubscribe from the session timer when the component is destroyed
    if (this.sessionSubscription) {
      this.sessionSubscription.unsubscribe();
    }
  }

  // Triggered when user interacts with the dashboard
  onUserActivity() {
    // Reset the session timer
    this.sessionService.resetSessionTimer();
  }

  // Format the remaining time as HH:MM:SS
  formatTime(milliseconds: number): string {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    const formattedHours = this.padZero(hours);
    const formattedMinutes = this.padZero(minutes);
    const formattedSeconds = this.padZero(seconds);

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  // Add a zero padding function for single digits
  padZero(num: number): string {
    return num < 10 ? `0${num}` : num.toString();
  }

}
