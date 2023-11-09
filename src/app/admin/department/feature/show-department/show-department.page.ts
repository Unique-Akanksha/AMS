import { Component, OnInit, Input,ViewChild } from '@angular/core';
import { DepartmentService } from 'src/app/admin/department/data-access/department.service';
import { ModalController, ToastController } from '@ionic/angular';
import { AddEditDepartmentPage } from 'src/app/admin/department/feature/add-edit-department/add-edit-department.page';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';


@Component({
  selector: 'app-show-department',
  templateUrl: './show-department.page.html',
  styleUrls: ['./show-department.page.scss'],
})
export class ShowDepartmentPage implements OnInit {

  loginUser = '';
  
  isModalOpen = false;
  DepartmentList: any = [];
  dataSource: any;
   
  filterdata :string= "";
  displayedColumns: string[] = [
    // 'department_id',
    'name',
    'description',
    'action',
  ];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private toastController: ToastController,private departmentService: DepartmentService, private modalCtrl: ModalController,private router: Router) { }

  ngOnInit() {
    // code for get user role 
    const userJson = localStorage.getItem('user');

    if (userJson){
      const user = JSON.parse(userJson);
      const userRole = user.role;
      this.loginUser = userRole;
    }
    
    this.refreshDepList();
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.refreshDepList();
      event.target.complete();
    }, 2000);
  }

  refreshDepList() {
    this.departmentService.getDepList().subscribe((data) => {
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.sort = this.sort!;
      this.dataSource.paginator = this.paginator!;
    });
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
      component: AddEditDepartmentPage,
      componentProps: {
        actionType: actionType,
        dataToUpdate: dataToUpdate,
      },
      cssClass: 'my-custom-modal my-custom-modal-css', // Use both classes
      backdropDismiss: false,
      animated: true,
      keyboardClose: true,
      showBackdrop: true,

    });

    modal.onDidDismiss().then((data) => {
      this.refreshDepList();
    });
    return await modal.present();
  }

  // deleteClick(item: any) {
  //   if (confirm("Are you sure??")) {
  //     this.departmentService.deleteDepartment(item.department_id).subscribe(() => {
  //       this.refreshDepList();
  //     });
  //   }
  // }


  deleteClick(item: any) {
    if (confirm("Are you sure??")) {
      this.departmentService.deleteDepartment(item.department_id, 
        (message: string) => {
          console.log("Response: ", message);
  
          if (message === "Department deleted successfully") {
            this.showSuccessToast("Department deleted successfully");
          } else {
            this.showErrorToast("An error occurred");
          }
  
          this.refreshDepList();
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

  // Implement the logout function
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

}
