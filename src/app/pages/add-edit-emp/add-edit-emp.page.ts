import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ToastController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem'; // Updated import
import { Capacitor } from '@capacitor/core';


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
  imageUrl: string = 'assets/images/user.jpg'; // Set a default image path


  constructor(private toastController: ToastController, private departmentService: DepartmentService, private employeeService: EmployeeService, private fb: FormBuilder, private modalCtrl: ModalController) { }

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
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  closeModal(confirm: boolean) {
    if (confirm) {
      // Check if the form is valid
      if (this.empForm.valid) {
        const employeeData = this.empForm.value;

        // Add the image path to the employeeData object
        employeeData.userPhoto = this.imageUrl; // Add this line

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
    console.log("update function : ", dataToEdit);

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
      imagePath: formData.imagePath, // Set the imagePath
    };
    this.employeeService.addEmployee(
      employeeDataWithImage,
      async (message) => {
        console.log("Response: ", message);
        if (message === "employee already exists") {
          const toast = await this.toastController.create({
            message: 'employee already exists',
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
  }

  emailValidator(control: FormControl) {
    const email = control.value;
    if (email) {
      // Regular expression for email validation
      const emailRegex = /^[a-zA-Z._+-][a-zA-Z0-9._+-]*@[a-zA-Z.-]+\.[a-z]{2,10}$/;

      // Check if the email matches the regular expression
      if (!emailRegex.test(email)) {
        return { invalidEmail: true };
      }

      // Check if the email starts with a number
      if (/^\d/.test(email)) {
        return { startsWithNumber: true };
      }

      // Check if the email contains symbols other than "@" and "."
      if (/[!#$%^&*()_+{}\[\]:;<>,?~\\]/.test(email)) {
        return { containsInvalidSymbols: true };
      }
    }
    return null; // Valid email
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

      // Ensure Confirm Password field is required if it's empty.
      if (!confirmPasswordControl?.value) {
        confirmPasswordControl.setErrors({ required: true });
      }
    }
    return null;
  }

  async chooseFile() {
    const image = await Camera.getPhoto({
      quality: 100,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
    });

    if (image && image.webPath) {
      this.imageUrl = image.webPath;
    }
  }

  async uploadImage() {
    try {
      const fileUri = this.imageUrl;
  
      // Read the image file as a blob
      const response = await fetch(fileUri);
      const blob = await response.blob();
  
      // Generate a unique filename (e.g., based on a timestamp)
      const timestamp = new Date().getTime();
      const fileName = `user_photo_${timestamp}.jpg`;
  
      // Determine the data directory based on the platform (Android or iOS)
      const dataDirectory = Capacitor.isNativePlatform() ? Directory.Data : Directory.Documents;
  
      // Save the image blob to the app's data directory
      const savedImage = await Filesystem.writeFile({
        path: fileName,
        data: blob,
        directory: dataDirectory,
      });
  
      if (savedImage) {
        const imagePath = savedImage.uri; // Use the saved image path
  
        // Continue with other logic, such as saving imagePath to the database
        // and calling API to add/update the employee with the imagePath
  
        // ...
      }
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  }
  
}
