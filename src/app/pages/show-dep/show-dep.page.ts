import { Component, OnInit, Input,ViewChild } from '@angular/core';
import { DepartmentService } from 'src/app/services/department.service';
import { ModalController } from '@ionic/angular';
import { AddEditDepPage } from '../add-edit-dep/add-edit-dep.page';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';


@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.page.html',
  styleUrls: ['./show-dep.page.scss'],
})
export class ShowDepPage implements OnInit {
  loginUser = '';
  
  isModalOpen = false;
  DepartmentList: any = [];
  dataSource: any;
   
  filterdata :string= "";
  displayedColumns: string[] = [
    'department_id',
    'name',
    'description',
    'action',
  ];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private departmentService: DepartmentService, private modalCtrl: ModalController,private router: Router) { }

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
      component: AddEditDepPage,
      componentProps: {
        actionType: actionType,
        dataToUpdate: dataToUpdate
      },
    });

    modal.onDidDismiss().then((data) => {
      this.refreshDepList();
    });
    return await modal.present();
  }

  deleteClick(item: any) {
    if (confirm("Are you sure??")) {
      this.departmentService.deleteDepartment(item.department_id).subscribe(() => {
        this.refreshDepList();
      });
    }
  }

  // Implement the logout function
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

}
