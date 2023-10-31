import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LeaveService } from 'src/app/admin/leave/data-access/leave.service';
import { ApproveRequestsPage } from '../approve-requests/approve-requests.page';

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
    'leaveRequestID',
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

  constructor(private leaveRequestService: LeaveService, private modalCtrl:ModalController,private router: Router) { }

  ngOnInit() {
     // code for get user role 
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
      this.leaveRequestService.deleteLeaveRequest(item.leaveRequestID).subscribe(data => {
        this.refreshLeaveRequestsList();
      })
    }
  }

  // Implement the logout function
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

}
