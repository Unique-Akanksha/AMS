import { Component, OnInit, Input } from '@angular/core';
import { DepartmentService } from 'src/app/services/department.service';
import { ModalController } from '@ionic/angular';
import { AddEditDepPage } from '../add-edit-dep/add-edit-dep.page';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.page.html',
  styleUrls: ['./show-dep.page.scss'],
})
export class ShowDepPage implements OnInit {
  
  isModalOpen = false;
  DepartmentList: any = [];

  constructor(private departmentService: DepartmentService, private modalCtrl: ModalController) { }

  ngOnInit() {
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
      this.DepartmentList = data;
    });
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
}
