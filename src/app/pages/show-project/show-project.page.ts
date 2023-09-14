import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { AddEditProjectPage } from '../add-edit-project/add-edit-project.page';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-show-project',
  templateUrl: './show-project.page.html',
  styleUrls: ['./show-project.page.scss'],
})
export class ShowProjectPage implements OnInit {
  
  isModalOpen = false;
  ProjectList: any = [];
  
  constructor(private projectService:ProjectService,private modalCtrl:ModalController) { }

  ngOnInit() {
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
      this.ProjectList = data;
    })
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
}
