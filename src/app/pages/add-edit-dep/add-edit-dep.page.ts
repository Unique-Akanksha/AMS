import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from 'src/app/services/department.service';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-add-edit-dep',
  templateUrl: './add-edit-dep.page.html',
  styleUrls: ['./add-edit-dep.page.scss'],
})

export class AddEditDepPage implements OnInit {
  @Input() actionType: string = ''; // Input property to receive the action type ('add' or 'update')
  @Input() dataToUpdate: any; // Input property to receive data to update
  @Input() deptdata: any; // Input property to receive dept data
  depForm!: FormGroup;

  constructor( private toastController: ToastController,private departmentService: DepartmentService, private fb: FormBuilder, private modalCtrl: ModalController) {
  
  }

  ngOnInit() {
   
    this.depForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', [Validators.required]],
    });

    if (this.actionType === 'update' && this.dataToUpdate) {
      // Initialize form with data to update
      this.depForm.patchValue({
        name: this.dataToUpdate.name,
        description: this.dataToUpdate.description,
      });
    } else {
      // Initialize form with default values for add mode
      this.depForm.patchValue({
        name: '',
        description: '',
      });
    }
  }

  closeModal(confirm: boolean) {
    if (confirm) {
      // Check if the form is valid
      if (this.depForm.valid) {
        const departmentData = this.depForm.value;

        // Perform add or update logic here based on actionType
        if (this.actionType === 'update') {
          console.log("In update mode");
          // Update existing record with departmentData
          this.updateDepartment(departmentData);
        } else {
          console.log("In add mode");
          // Add new record with departmentData
          this.addDepartment(departmentData);
        }
      }
    }

    // Close the modal and pass data back to the parent component
    this.modalCtrl.dismiss({ role: confirm ? 'confirm' : 'cancel', data: { ...{id:this.dataToUpdate.department_id}, ...this.depForm.value} });

  }

  // updateDepartment(dataToEdit: any) {
  //   console.log("update function : ", dataToEdit);
  //   const dataToSet = {
  //     name: dataToEdit.name, // Set the name from your data
  //     description: dataToEdit.description, // Set the description from your data
  //   };
  //   this.depForm.patchValue(dataToSet);
  //   console.log("id for call service : ",this.dataToUpdate.department_id);
  //   dataToEdit.id = this.dataToUpdate.department_id;
  //   this.departmentService.updateDepartment(dataToEdit).subscribe((result) => {
  //     if (result) {
  //       console.log("result", result);
  //     }
  //   });
  // }

  async updateDepartment(dataToEdit: any) {
    console.log("update function: ", dataToEdit);

    // Create an object with the data you want to update
    const updatedData = {
      name: dataToEdit.name,
      description: dataToEdit.description,
      id: this.dataToUpdate.department_id // Include the department ID for the update
    };

    // Call the updateDepartment function from the service
    this.departmentService.updateDepartment(updatedData,
      async (message) => {
        console.log('Response: ', message);
        console.log('Message:', message);
        if (message === "Department already exists") {
          const toast = await this.toastController.create({
            message: 'Department already exists',
            duration: 3000,
            position: 'bottom',
            color: 'danger',
          });
          toast.present();
        } else {
          console.log('Response in else part : ', message);
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
        console.log("Response: ", message);
        if (message === "Department already exists") {
          const toast = await this.toastController.create({
            message: 'Department already exists',
            duration: 3000, // Duration in milliseconds (3 seconds in this case)
            position: 'bottom', // You can change the position (top, middle, bottom)
            color: 'danger', // You can specify a color (success, warning, danger, etc.)
          });
          toast.present();
        } else {
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
