import { Component, OnInit,ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AttendanceService } from 'src/app/services/attendance.service';
import { AddEditAttendancePage } from '../add-edit-attendance/add-edit-attendance.page';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';




@Component({
  selector: 'app-show-attendance',
  templateUrl: './show-attendance.page.html',
  styleUrls: ['./show-attendance.page.scss'],
})
export class ShowAttendancePage implements OnInit {
  isModalOpen = false;
  AttendanceList: any = [];
  dataSource: any;
   
  filterdata :string= "";
  displayedColumns: string[] = [
    'attendance_id',
    'employee',
    'date',
    'status',
    'action',
  ];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private attendanceService:AttendanceService,private modalCtrl:ModalController) { }

  ngOnInit() {
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
      this.attendanceService.deleteAttendance(item.attendance_id).subscribe(data => {
        this.refreshAttendanceList();
      })
    }
  }

}
