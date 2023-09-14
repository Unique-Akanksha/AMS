import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AttendanceService } from 'src/app/services/attendance.service';
import { AddEditAttendancePage } from '../add-edit-attendance/add-edit-attendance.page';


@Component({
  selector: 'app-show-attendance',
  templateUrl: './show-attendance.page.html',
  styleUrls: ['./show-attendance.page.scss'],
})
export class ShowAttendancePage implements OnInit {
  isModalOpen = false;
  AttendanceList: any = [];

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
      this.AttendanceList = data;
    })
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
