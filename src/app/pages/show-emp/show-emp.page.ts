import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddEditEmpPage } from '../add-edit-emp/add-edit-emp.page';
import { EmployeeService } from 'src/app/services/employee.service';


@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.page.html',
  styleUrls: ['./show-emp.page.scss'],
})
export class ShowEmpPage implements OnInit {
  modelOutput: string = '';
  ModalTitle: string = '';
  EmployeeList: any = [];
  dataSource:any;
  displayedColumns: string[] = ['employee_id', 'first_name', 'middle_name',  'last_name', 'email','hire_date', 'department', 'position', 'action' ];

  constructor(private employeeService: EmployeeService, private modalCtrl: ModalController) { }

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
      this.EmployeeList = data;
      this.dataSource = data;
    })
  }

  async openModal(dataToUpdate: any) {
    let actionType = dataToUpdate ? 'update' : 'add';

    const modal = await this.modalCtrl.create({
      component: AddEditEmpPage,
      componentProps: {
        actionType: actionType,
        dataToUpdate: dataToUpdate
      },
    });

    modal.onDidDismiss().then((data) => {
      this.refreshEmpList();
    });
    return await modal.present();
  }

  
  deleteClick(item: any) {
    if (confirm("Are you sure??")) {
      this.employeeService.deleteEmployee(item.employee_id).subscribe(data => {
        this.refreshEmpList();
      })
    }
  }
}
