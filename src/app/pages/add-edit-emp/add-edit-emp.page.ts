import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ToastController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Plugins, Capacitor } from '@capacitor/core';
import { Filesystem, FilesystemDirectory } from '@capacitor/filesystem';



@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.page.html',
  styleUrls: ['./add-edit-emp.page.scss'],
})
export class AddEditEmpPage implements OnInit {
  
  @Input() actionType: string = ''; // Input property to receive the action type ('add' or 'update')
  @Input() dataToUpdate: any; // Input property to receive data to update
  @Input() empdata: any; // Input property to receive dept data
  empForm!: FormGroup;
  departments: any[] = [];
  // imageUrl: string = 'assets/images/user.jpg'; // Set a default image path
  imageUrl: string | undefined = ''; // Set a default image path
  

  constructor(
    private toastController: ToastController,
    private departmentService: DepartmentService,
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.departmentService.getDepList().subscribe((departments) => {
      this.departments = departments;
    });

    this.empForm = this.fb.group({
      first_name: ['', Validators.required],
      middle_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, this.emailValidator]],
      hire_date: ['', [Validators.required]],
      department: ['', [Validators.required]],
      position: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      confirmPassword: ['', [Validators.required]],
    }, {
      validator: this.passwordMatchValidator
    });

    if (this.actionType === 'update' && this.dataToUpdate) {
      // Initialize form with data to update
      this.empForm.patchValue({
        first_name: this.dataToUpdate.first_name,
        middle_name: this.dataToUpdate.middle_name,
        last_name: this.dataToUpdate.last_name,
        email: this.dataToUpdate.email,
        hire_date: this.dataToUpdate.hire_date,
        department: this.dataToUpdate.department,
        position: this.dataToUpdate.position,
        password: this.dataToUpdate.password,
        confirmPassword: this.dataToUpdate.password,
      });
    } else {
      // Initialize form with default values for add mode
      this.empForm.patchValue({
        first_name: '',
        middle_name: '',
        last_name: '',
        email: '',
        hire_date: '',
        department: '',
        position: '',
        password: '',
        confirmPassword: '',
      });
    }
    this.requestStoragePermissions();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async closeModal(confirm: boolean) {
    if (confirm) {
      // Check if the form is valid
      if (this.empForm.valid) {
        const employeeData = this.empForm.value;

        // Add the image path to the employeeData object
        employeeData.userPhoto = this.imageUrl;

        // Perform add or update logic here based on actionType
        if (this.actionType === 'update') {
          this.updateEmployee(employeeData);
        } else {
          this.addEmployee(employeeData);
        }
      }
    }
    // Close the modal and pass data back to the parent component
    this.modalCtrl.dismiss({ role: confirm ? 'confirm' : 'cancel', 'data': { ...{ id: this.dataToUpdate.employee_id }, ...this.empForm.value } });
  }

  updateEmployee(dataToEdit: any) {

    // Create an object with the data you want to update
    const updatedData = {
      first_name: dataToEdit.first_name,
      middle_name: dataToEdit.middle_name,
      last_name: dataToEdit.last_name,
      email: dataToEdit.email,
      hire_date: dataToEdit.hire_date,
      department: dataToEdit.department,
      position: dataToEdit.position,
      password: dataToEdit.password,
      confirmPassword: dataToEdit.password,
      userPhoto:dataToEdit.userPhoto,
      id: this.dataToUpdate.employee_id
    };


    // Call the updateEmployee function from the service
    this.employeeService.updateEmployee(updatedData,
      async (message) => {
        console.log('Response: ', message);
        console.log('Message:', message);
        if (message === "employee already exists") {
          const toast = await this.toastController.create({
            message: 'Employee already exists',
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

  addEmployee(formData: any) {
    console.log('formData: ', formData);
    const employeeDataWithImage = {
      ...formData,
      imagePath: formData.imagePath,
    };
    this.employeeService.addEmployee(
      employeeDataWithImage,
      async (message) => {
        console.log("Response: ", message);
        if (message === "employee already exists") {
          const toast = await this.toastController.create({
            message: 'employee already exists',
            duration: 3000,
            position: 'bottom',
            color: 'danger',
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
  }

  emailValidator(control: FormControl) {
    const email = control.value;
    if (email) {
      const emailRegex = /^[a-zA-Z._+-][a-zA-Z0-9._+-]*@[a-zA-Z.-]+\.[a-z]{2,10}$/;

      if (!emailRegex.test(email)) {
        return { invalidEmail: true };
      }

      if (/^\d/.test(email)) {
        return { startsWithNumber: true };
      }

      if (/[!#$%^&*()_+{}\[\]:;<>,?~\\]/.test(email)) {
        return { containsInvalidSymbols: true };
      }
    }
    return null;
  }

  passwordMatchValidator(control: FormGroup): { [key: string]: any } | null {
    const passwordControl = control.get('password');
    const confirmPasswordControl = control.get('confirmPassword');

    if (passwordControl && confirmPasswordControl) {
      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        if (confirmPasswordControl.hasError('passwordMismatch')) {
          confirmPasswordControl.setErrors(null);
        }
      }

      if (!confirmPasswordControl?.value) {
        confirmPasswordControl.setErrors({ required: true });
      }
    }
    return null;
  }   

async requestStoragePermissions() {
  console.log('requestStoragePermissions');
  if (Capacitor.isNative) {
    try {
      const { state } = await Capacitor.Plugins['Permissions']['query']({ name: 'storage' });

      if (state === 'granted') {
        // Storage permissions already granted
        console.log('Storage permissions already granted');
      } else if (state === 'prompt') {
        // Request storage permissions
        const permissionResult = await Capacitor.Plugins['Permissions']['request']({ name: 'storage' });

        if (permissionResult.state === 'granted') {
          // Storage permissions granted
          console.log('Storage permissions granted');
        } else {
          // Storage permissions denied
          console.warn('Storage permissions denied');
        }
      } else {
        // Storage permissions denied
        console.warn('Storage permissions denied');
      }
    } catch (error) {
      // Handle errors
      console.error('Error requesting storage permissions:', error);
    }
  }
}

//take Photo
async onImageSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    this.imageUrl = imageUrl;

    // Save the selected image to the device's file system
    const imageFileName = 'selected_image.jpg';
    const imageData = await this.readFileAsBase64(file);
    await this.saveImageToFileSystem(imageData, imageFileName);
  }
}

async readFileAsBase64(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async saveImageToFileSystem(data: string, fileName: string): Promise<void> {
  try {
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: data,
      directory: FilesystemDirectory.Data, // Save to the device's data directory
    });
    console.log('Image saved to filesystem:', savedFile.uri);
  } catch (error) {
    console.error('Error saving image to filesystem:', error);
  }
}
  

}
