import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';


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
  userRoleList: any[] = [];
  departments: any[] = [];
  imageUrl: string | undefined = ''; 
  tempImageUrl: string | undefined = ''; 
  private file: File | undefined;

  constructor(
    private toastController: ToastController,
    private departmentService: DepartmentService,
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.departmentService.getDepList().subscribe((departments) => {
      this.departments = departments;
    });
    
    this.refreshRolesList();

    this.empForm = this.fb.group({
      first_name: ['', Validators.required],
      middle_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, this.emailValidator]],
      hire_date: ['', [Validators.required]],
      role: ['', [Validators.required]],
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
        role: this.dataToUpdate.role,
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
        role: ''
      });
    }
  }

  refreshRolesList() {
    this.userService.getRolesList().subscribe((data) => {
      this.userRoleList = data;
    });
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
    console.log('userPhoto: ' + dataToEdit.userPhoto);

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
      role:dataToEdit.role,
      id: this.dataToUpdate.employee_id
    };

    console.log('emp userPhoto: ',updatedData.userPhoto);

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

  // Modify the addEmployee function to send the image to the server
  async addEmployee(formData: any) {
    console.log('formData: ', formData);
    console.log('Photo: ',formData.Photo);
    // const imageUrl = await this.onImageSelected(event); // Make sure to pass the event parameter if needed

    this.employeeService.addEmployee(
      formData,
      async (message) => {
        console.log('Response: ', message);
        if (message === 'employee already exists') {
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
    this.empForm.reset();
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


//take Photo
// onImageSelected(event: any) {
//   const file = event?.target?.files?.[0]; // Use optional chaining to handle undefined values
//   if (file) {
//     this.employeeService.uploadImage(file).subscribe(
//       (response: any) => {
//         // Handle the response, which may contain the image URL
//         this.imageUrl = response?.imageUrl; // Use optional chaining for response
//       },
//       (error) => {
//         // Handle HTTP request errors here
//         console.error('Image upload error:', error);
//         // You can display an error message or take other actions as needed
//       }
//     );
//   }
  
// }

onPaste(event: ClipboardEvent): void {
  event.preventDefault(); 
}

onImageSelected(event: any) {
  this.file = event.target.files[0];
  if (this.file) {
    this.tempImageUrl = URL.createObjectURL(this.file);
    
  }
}

openImageInput() {
  const inputElement = document.getElementById('imageInput') as HTMLInputElement;
  if (inputElement) {
    inputElement.click();
  }
}

uploadImage() {
  console.log('uploading image');
  const file = this.file;
  if (file) {
    this.employeeService.uploadImage(file).subscribe(
      (response: any) => {
        this.imageUrl = response?.imageUrl; 
      },
      (error) => {
        console.error('Image upload error:', error);
      }
    );
  }
}

}
