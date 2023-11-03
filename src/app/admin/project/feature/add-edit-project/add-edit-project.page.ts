import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ProjectService } from 'src/app/admin/project/data-access/project.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-edit-project',
  templateUrl: './add-edit-project.page.html',
  styleUrls: ['./add-edit-project.page.scss'],
})
export class AddEditProjectPage implements OnInit {

  @Input() actionType: string = ''; // Input property to receive the action type ('add' or 'update')
  @Input() dataToUpdate: any; // Input property to receive data to update
  @Input() projectdata: any; // Input property to receive dept data
  projectForm!: FormGroup;

  constructor( private toastController: ToastController,private projectService: ProjectService, private fb: FormBuilder, private modalCtrl: ModalController) { }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  ngOnInit() {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', [Validators.required]],
      start_date: ['', [Validators.required]],
      end_date: ['', [Validators.required]],
    });

    if (this.actionType === 'update' && this.dataToUpdate) {
      // Initialize form with data to update
      this.projectForm.patchValue({
        name: this.dataToUpdate.name,
        description: this.dataToUpdate.description,
        start_date: this.dataToUpdate.start_date,
        end_date: this.dataToUpdate.end_date
      });
    } else {
      // Initialize form with default values for add mode
      this.projectForm.patchValue({
        name: '',
        description: '',
        start_date: '',
        end_date: ''
      });
    }
  }


  closeModal(confirm: boolean) {
    if (confirm) {
      // Check if the form is valid
      if (this.projectForm.valid) {
        const projectData = this.projectForm.value;

        // Perform add or update logic here based on actionType
        if (this.actionType === 'update') {
          console.log("In update mode");
          // Update existing record with projectData
          this.updateProject(projectData);
        } else {
          console.log("In add mode");
          // Add new record with projectData
          this.addProject(projectData);
        }
      }
    }

     // Close the modal and pass data back to the parent component
    this.modalCtrl.dismiss({ role: confirm ? 'confirm' : 'cancel', 'data':{...{id:this.dataToUpdate.project_id},...this.projectForm.value}});
  }

  updateProject(dataToEdit: any) {
    console.log("update function : ", dataToEdit);

    // Create an object with the data you want to update
    const updatedData = {
      name: dataToEdit.name,
      description: dataToEdit.description,
      start_date: dataToEdit.start_date,
      end_date: dataToEdit.end_date,
      id: this.dataToUpdate.project_id // Include the project ID for the update
    };

    // Call the updateProject function from the service
    this.projectService.updateProject(updatedData,
      async (message) => {
        console.log('Response: ', message);
        console.log('Message:', message);
        if (message === "Project already exists") {
          const toast = await this.toastController.create({
            message: 'Project already exists',
            duration: 3000,
            position: 'bottom',
            color: 'danger',
          });
          toast.present();
        } else {
          const toast = await this.toastController.create({
            message: 'Project updated successfully',
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

  // addProject(formData: any) {
  //   this.projectService.addProject(formData);
  // }

  // addProject(formData: any) {
  //   this.projectService.addProject(formData,
  //     (message) => {
  //       console.log("Success: ", message);
  //       this.errorMessage = message; // Set errorMessage in the modal
  //     },
  //     (error) => {
  //       console.log('Error: ' + error);
  //       this.errorMessage = error; // Set errorMessage in the modal
  //     }
  //   );
  // }

  addProject(formData: any) {
    this.projectService.addProject(
      formData,
      async (message) => {
        console.log("Response: ", message);
        if (message === "Project already exists") {
          const toast = await this.toastController.create({
            message: 'Project already exists',
            duration: 3000, 
            position: 'bottom', 
            color: 'danger', 
          });
          toast.present();
        } else {
          const toast = await this.toastController.create({
            message: 'Project created successfully',
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
    this.projectForm.reset();
  }
  
  onPaste(event: ClipboardEvent): void {
    event.preventDefault(); 
  }


}
