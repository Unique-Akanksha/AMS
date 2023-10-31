import { Component, OnInit,ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AttendanceService } from 'src/app/admin/attendance/data-access/attendance.service';
import { AddEditAttendancePage } from 'src/app/admin/attendance/feature/add-edit-attendance/add-edit-attendance.page';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';




@Component({
  selector: 'app-show-attendance',
  templateUrl: './show-attendance.page.html',
  styleUrls: ['./show-attendance.page.scss'],
})
export class ShowAttendancePage implements OnInit {
  loginUser = '';
  isModalOpen = false;
  AttendanceList: any = [];
  dataSource: any;
   
  filterdata :string= "";
  displayedColumns: string[] = [
    'attendanceID',
    'employeeName',
    'employeeDept',
    'currentTime',
    'currentDate',
    'currentLocation',
    'projectList',
    'checkInTime',
    'checkOutTime',
    'totalHrsTime',
    'action',
  ];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private attendanceService:AttendanceService,private modalCtrl:ModalController,private router: Router) { }

  ngOnInit() {
    // code for get user role 
    const userJson = localStorage.getItem('user');

    if (userJson){
      const user = JSON.parse(userJson);
      const userRole = user.role;
      this.loginUser = userRole;
    }
    this.refreshAttendanceList();
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.refreshAttendanceList();
      event.target.complete();
    }, 2000);
  }

  refreshAttendanceList() {
    this.attendanceService.getAttendanceList().subscribe((data) => {
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.sort = this.sort!;
      this.dataSource.paginator = this.paginator!;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(filterValue);
    this.filterdata = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async openModal(dataToUpdate: any) {
    let actionType = dataToUpdate ? 'update' : 'add';
    const modal = await this.modalCtrl.create({
      component: AddEditAttendancePage,
      componentProps: {
        actionType: actionType,
        dataToUpdate: dataToUpdate
      },
    });

    modal.onDidDismiss().then((data) => {
      this.refreshAttendanceList();
    });
    return await modal.present();
  }

  deleteClick(item: any) {
    if (confirm("Are you sure??")) {
      this.attendanceService.deleteAttendance(item.attendanceID).subscribe(data => {
        this.refreshAttendanceList();
      })
    }
  }

  // Implement the logout function
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

}
