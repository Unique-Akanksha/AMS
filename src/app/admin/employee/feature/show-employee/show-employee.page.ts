import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AddEditEmployeePage } from 'src/app/admin/employee/feature/add-edit-employee/add-edit-employee.page';
import { EmployeeService } from 'src/app/admin/employee/data-access/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/shared/ui/delete-dialog/delete-dialog.component';
import { DetailsEmployeePage } from '../details-employee/details-employee.page';

@Component({
  selector: 'app-show-employee',
  templateUrl: './show-employee.page.html',
  styleUrls: ['./show-employee.page.scss'],
})
export class ShowEmployeePage implements OnInit {
  employees$: Observable<any[]>;
  searchKey!: string;
  
  loginUser = '';
  dataSource: any;
   
  filterdata :string= "";
  displayedColumns: string[] = [
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
    private toastController: ToastController,
    private _dialog: MatDialog
  ) {
    const staticEmployees: any[] = [
    ];
    this.employees$ = of(staticEmployees);
  }

  ngOnInit() {
    const userJson = localStorage.getItem('user');

    if (userJson){
      const user = JSON.parse(userJson);
      const userRole = user.role;
      this.loginUser = userRole;
      if(userRole === '1'){

      }
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
      this.employees$ = of(data); 
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.sort = this.sort!;
      this.dataSource.paginator = this.paginator!;
    });
  }

  async openModal(actionType: 'add' | 'update' | 'view', dataToUpdate: any) {
    let modalComponent;
  
    switch (actionType) {
      case 'add':
        modalComponent = AddEditEmployeePage;
        break;
      case 'update':
        modalComponent = AddEditEmployeePage; 
        break;
      case 'view':
        modalComponent = DetailsEmployeePage;
        break;
      default:
        return;
    }
  
    const modal = await this.modalCtrl.create({
      component: modalComponent,
      componentProps: {
        actionType: actionType,
        dataToUpdate: dataToUpdate, 
      },
    });
  
    modal.onDidDismiss().then(() => {
      if (actionType !== 'view') {
        this.refreshEmpList(); 
      }
    });
  
    return await modal.present();
  }
    
  

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

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchKey = filterValue;
  }

  

}
