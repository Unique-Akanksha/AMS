import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AddEditEmployeePage } from 'src/app/admin/employee/feature/add-edit-employee/add-edit-employee.page';
import { EmployeeService } from 'src/app/admin/employee/data-access/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-show-employee',
  templateUrl: './show-employee.page.html',
  styleUrls: ['./show-employee.page.scss'],
})
export class ShowEmployeePage implements OnInit {
  public students$!: Observable<any[]>;
  searchKey = '';

  loginUser = '';
  dataSource: any;
   
  filterdata :string= "";
  displayedColumns: string[] = [
    // 'employee_id',
    'userPhoto',
    'first_name',
    'middle_name',
    'last_name',
    'email',
    'hire_date',
    'department',
    'position',
    'role',
    'action',
  ];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(
    private employeeService: EmployeeService,
    private modalCtrl: ModalController,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    // code for get user role 
    const userJson = localStorage.getItem('user');

    if (userJson){
      const user = JSON.parse(userJson);
      const userRole = user.role;
      this.loginUser = userRole;
    }
    
    this.refreshEmpList();
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.refreshEmpList();
      event.target.complete();
    }, 2000);
  }


  refreshEmpList() {
    this.employeeService.getEmpList().subscribe((data) => {
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
      component: AddEditEmployeePage,
      componentProps: {
        actionType: actionType,
        dataToUpdate: dataToUpdate,
      },
    });

    modal.onDidDismiss().then((data) => {
      this.refreshEmpList();
    });
    return await modal.present();
  }

  // deleteClick(item: any) {
  //   if (confirm('Are you sure??')) {
  //     this.employeeService
  //       .deleteEmployee(item.employee_id)
  //       .subscribe((data) => {
  //         this.refreshEmpList();
  //       });
  //   }
  // }


  deleteClick(item: any) {
    if (confirm("Are you sure??")) {
      this.employeeService.deleteEmployee(item.employee_id, 
        (message: string) => {
          console.log("Response: ", message);
  
          if (message === "Employee deleted successfully.") {
            this.showSuccessToast("Employee deleted successfully.");
          } else {
            this.showErrorToast("An error occurred");
          }
  
          this.refreshEmpList();
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
