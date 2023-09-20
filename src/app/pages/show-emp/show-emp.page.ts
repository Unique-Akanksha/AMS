import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddEditEmpPage } from '../add-edit-emp/add-edit-emp.page';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.page.html',
  styleUrls: ['./show-emp.page.scss'],
})
export class ShowEmpPage implements OnInit {

  dataSource: any;
   
  filterdata :string= "";
  displayedColumns: string[] = [
    'employee_id',
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
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
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
      component: AddEditEmpPage,
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
    if (confirm('Are you sure??')) {
      this.employeeService
        .deleteEmployee(item.employee_id)
        .subscribe((data) => {
          this.refreshEmpList();
        });
    }
  }
}
