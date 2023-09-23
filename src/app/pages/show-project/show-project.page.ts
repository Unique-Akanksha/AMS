import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { AddEditProjectPage } from '../add-edit-project/add-edit-project.page';
import { ModalController } from '@ionic/angular';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';


@Component({
  selector: 'app-show-project',
  templateUrl: './show-project.page.html',
  styleUrls: ['./show-project.page.scss'],
})
export class ShowProjectPage implements OnInit {
  loginUser = '';
  isModalOpen = false;
  ProjectList: any = [];
  dataSource: any;
   
  filterdata :string= "";
  displayedColumns: string[] = [
    'project_id',
    'name',
    'description',
    'start_date',
    'end_date',
    'action',
  ];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private projectService:ProjectService,private modalCtrl:ModalController,private router: Router) { }

  ngOnInit() {
    // code for get user role 
    const userJson = localStorage.getItem('user');

    if (userJson){
      const user = JSON.parse(userJson);
      const userRole = user.role;
      this.loginUser = userRole;
    }

    this.refreshProjectList();
  }
  
  handleRefresh(event: any) {
    setTimeout(() => {
      this.refreshProjectList();
      event.target.complete();
    }, 2000);
  }

  refreshProjectList() {
    this.projectService.getProjectList().subscribe((data) => {
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
      component: AddEditProjectPage,
      componentProps: {
        actionType: actionType,
        dataToUpdate: dataToUpdate
      },
    });

    modal.onDidDismiss().then((data) => {
      this.refreshProjectList();
    });
    return await modal.present();
  }

  deleteClick(item: any) {
    if (confirm("Are you sure??")) {
      this.projectService.deleteProject(item.project_id).subscribe(data => {
        this.refreshProjectList();
      })
    }
  }

   // Implement the logout function
   logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

}
