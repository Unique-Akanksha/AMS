import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { LeaveService } from 'src/app/admin/leave/data-access/leave.service';
import { ApproveRequestsPage } from 'src/app/pages/approve-requests/approve-requests.page';


@Component({
  selector: 'app-admin-leave-history',
  templateUrl: './admin-leave-history.page.html',
  styleUrls: ['./admin-leave-history.page.scss'],
})
export class AdminLeaveHistoryPage implements OnInit {
  loginUser = '';
  dataSource: any;
  filterdata :string= "";
  displayedColumns: string[] = [
    'employee_id',
    'leave_type',
    'start_date',
    'end_date',
    'reason',
    'status',
    'created_at',
    'action',
  ];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private toastController: ToastController,private leaveRequestService: LeaveService, private modalCtrl:ModalController,private router: Router) { }

  ngOnInit() {
     const userJson = localStorage.getItem('user');

     if (userJson){
       const user = JSON.parse(userJson);
       const userRole = user.role;
       this.loginUser = userRole;
     }
     this.refreshLeaveRequestsList();
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.refreshLeaveRequestsList();
      event.target.complete();
    }, 2000);
  }

  refreshLeaveRequestsList() {
    this.leaveRequestService.getAllLeaveRequests().subscribe((data) => {
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.sort = this.sort!;
      this.dataSource.paginator = this.paginator!;
    })
  }
  

  async openModal(dataToUpdate: any) {
    let actionType = dataToUpdate ? 'update' : 'add';
    const modal = await this.modalCtrl.create({
      component: ApproveRequestsPage,
      componentProps: {
        actionType: actionType,
        dataToUpdate: dataToUpdate
      },
      cssClass: 'my-custom-modal my-custom-modal-css', // Use both classes
      backdropDismiss: false,
      animated: true,
      keyboardClose: true,
      showBackdrop: true,
    });

    modal.onDidDismiss().then((data) => {
      this.refreshLeaveRequestsList();
    });
    return await modal.present();
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

  deleteClick(item: any) {
    if (confirm("Are you sure??")) {
      this.leaveRequestService.deleteLeaveRequest(item.leaveRequestID, 
        (message: string) => {
          console.log("Response: ", message);
  
          if (message === "LeaveRequest deleted successfully") {
            this.showSuccessToast("LeaveRequest deleted successfully");
          } else {
            this.showErrorToast("An error occurred");
          }
  
          this.refreshLeaveRequestsList();
        },
        (error: any) => {
          console.error("Error: ", error);
          this.showErrorToast("An error occurred");
        }
      );
    }
  }
  
  showSuccessToast(message: string) {
    this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      color: 'success'
    }).then((toast) => {
      toast.present();
    });
  }
  
  showErrorToast(message: string) {
    this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      color: 'danger'
    }).then((toast) => {
      toast.present();
    });
  }
}
