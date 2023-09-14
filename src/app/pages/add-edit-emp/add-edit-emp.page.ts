import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ToastController } from '@ionic/angular';

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

  constructor( private toastController: ToastController,private departmentService:DepartmentService ,private employeeService: EmployeeService,private fb: FormBuilder, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.departmentService.getDepList().subscribe((departments) => {
      this.departments = departments;
      console.log("dept list :",this.departments);
    });

    this.empForm = this.fb.group({
      first_name: ['', Validators.required],
      middle_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.email]],
      hire_date: ['', [Validators.required]],
      department: ['', [Validators.required]],
      position: ['', [Validators.required]],
      password: ['', [Validators.required,Validators.minLength(3)]],
      confirmPassword: ['', [Validators.required, this.passwordMatchValidator]],
      // employeePhoto: [null,[Validators.required]] ,
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
        // employeePhoto: this.dataToUpdate.employeePhoto,
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
        confirmPassword:'',
        // employeePhoto:''
      });
    }
  }

  passwordMatchValidator(control: FormGroup) {
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
  


  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  closeModal(confirm: boolean) {
    if (confirm) {
      // Check if the form is valid
      if (this.empForm.valid) {
        const employeeData = this.empForm.value;

        // Perform add or update logic here based on actionType
        if (this.actionType === 'update') {
          console.log("In updateEmployee mode");
          // Update existing record with departmentData
          this.updateEmployee(employeeData);
        } else {
          console.log("In addEmployee mode");
          // Add new record with departmentData
          this.addEmployee(employeeData);
        }
      }
    }

    // Close the modal and pass data back to the parent component
    this.modalCtrl.dismiss({ role: confirm ? 'confirm' : 'cancel', 'data':{...{id:this.dataToUpdate.employee_id},...this.empForm.value }});
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
      id: this.dataToUpdate.employee_id // Include the employee ID for the update
    };

    // Call the updateEmployee function from the service
    this.employeeService.updateEmployee(updatedData,
      async (message) => {
        console.log('Response: ', message);
        console.log('Message:', message);
        if (message === "Employee with the same email already exists") {
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


  // addEmployee(formData: any) {
  //   console.log("addEmployee", formData);
  //   this.employeeService.addEmployee(formData);
  // }

  // addEmployee(formData: any) {
  //   this.employeeService.addEmployee(formData,
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


  addEmployee(formData: any) {
    this.employeeService.addEmployee(
      formData,
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
}
