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
    private toastController: ToastController,
    private _dialog: MatDialog
  ) {
    const staticEmployees: any[] = [
      {
        id: 1,
        name: 'Rahul',
        role: 'Super Admin',
        email: 'rahul@test.com',
        contact: '9876543210',
        gender: 'Male', 
        dob: '1995-01-01', 
        imageUrl: 'assets/images/rahul.jpg' 
      },
      {
        id: 2,
        name: 'Vishal',
        role: 'Employee',
        email: 'vishal@test.com',
        contact: '9876543210',
        gender: 'Male', 
        dob: '1995-01-01', 
        imageUrl: 'assets/images/vishal.jpg' 
      },
    ];
    this.employees$ = of(staticEmployees);
  }

  ngOnInit() {
    // code for get user role 
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
  
  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  //   console.log(filterValue);
  //   this.filterdata = filterValue;

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

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

  // public deleteStudent(savedStudent: any): void {
  //   this._dialog.open(DeleteDialogComponent, { data: { type: "Employee", name: savedStudent.name } }).afterClosed().subscribe(result => {
  //     if (result === "cancel" || result === undefined) {
  //       console.log("canceling delete operation!");
  //     } else {
  //       console.log("deleted successfully!!");
  //     }
  //   });
  // }

  public viewEmployee(savedStudent: any): void {
   
  }

  // public editStudent(savedStudent: any): void {
    
  // }

}
