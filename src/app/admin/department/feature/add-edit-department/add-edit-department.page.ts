import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from 'src/app/admin/department/data-access/department.service';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-edit-department',
  templateUrl: './add-edit-department.page.html',
  styleUrls: ['./add-edit-department.page.scss'],
})
export class AddEditDepartmentPage implements OnInit {

  @Input() actionType: string = ''; 
  @Input() dataToUpdate: any; 
  @Input() deptdata: any; 
  depForm!: FormGroup;

  constructor( private toastController: ToastController,private departmentService: DepartmentService, private fb: FormBuilder, private modalCtrl: ModalController) {
  
  }

  ngOnInit() {
   
    this.depForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', [Validators.required]],
    });

    if (this.actionType === 'update' && this.dataToUpdate) {
      this.depForm.patchValue({
        name: this.dataToUpdate.name,
        description: this.dataToUpdate.description,
      });
    } else {
      this.depForm.patchValue({
        name: '',
        description: '',
      });
    }
  }

  closeModal(confirm: boolean) {
    if (confirm) {
      if (this.depForm.valid) {
        const departmentData = this.depForm.value;

        if (this.actionType === 'update') {
          this.updateDepartment(departmentData);
        } else {
          this.addDepartment(departmentData);
        }
      }
    }

    this.modalCtrl.dismiss({ role: confirm ? 'confirm' : 'cancel', data: { ...{id:this.dataToUpdate.department_id}, ...this.depForm.value} });

  }

  async updateDepartment(dataToEdit: any) {
    console.log("update function: ", dataToEdit);

    const updatedData = {
      name: dataToEdit.name,
      description: dataToEdit.description,
      id: this.dataToUpdate.department_id 
    };

    this.departmentService.updateDepartment(updatedData,
      async (message) => {
        if (message === "Department already exists") {
          const toast = await this.toastController.create({
            message: 'Department already exists',
            duration: 3000,
            position: 'bottom',
            color: 'danger',
          });
          toast.present();
        } else {
          const toast = await this.toastController.create({
            message: 'Department updated successfully',
            duration: 3000,
            position: 'bottom',
            color: 'success',
          });
          toast.present();
          this.modalCtrl.dismiss();
        }

      },
      (error) => {
        console.log('Error: ' + error);
      }
    );
  }
  
  
  addDepartment(formData: any) {
    this.departmentService.addDepartment(
      formData,
      async (message) => {
        if (message === "Department already exists") {
          const toast = await this.toastController.create({
            message: 'Department already exists',
            duration: 3000, 
            position: 'bottom',
            color: 'danger', 
          });
          toast.present();
        } else {
          const toast = await this.toastController.create({
            message: 'Department inserted successfully',
            duration: 3000, 
            position: 'bottom',
            color: 'success', 
          });
          toast.present();
          this.modalCtrl.dismiss();
        }
      },
      (error) => {
        console.log('Error: ' + error);
      }
    );
    this.depForm.reset();
  }

  onPaste(event: ClipboardEvent): void {
    event.preventDefault(); 
  }

}
