import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AttendanceService } from 'src/app/services/attendance.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-edit-attendance',
  templateUrl: './add-edit-attendance.page.html',
  styleUrls: ['./add-edit-attendance.page.scss'],
})
export class AddEditAttendancePage implements OnInit {
  @Input() actionType: string = ''; // Input property to receive the action type ('add' or 'update')
  @Input() dataToUpdate: any; // Input property to receive data to update
  @Input() attendancedata: any; // Input property to receive dept data
  attendanceForm!: FormGroup;
  employees: any[] = [];

  constructor( private toastController: ToastController,private employeeService:EmployeeService,private attendanceService: AttendanceService, private fb: FormBuilder, private modalCtrl: ModalController) { }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  ngOnInit() {

    this.employeeService.getEmpList().subscribe((employees) => {
      this.employees = employees;
      console.log("emp list :",this.employees);
    });

    this.attendanceForm = this.fb.group({
      employee: ['', Validators.required],
      date: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });

    if (this.actionType === 'update' && this.dataToUpdate) {
      // Initialize form with data to update
      this.attendanceForm.patchValue({
        employee: this.dataToUpdate.employee,
        date: this.dataToUpdate.date,
        status: this.dataToUpdate.status
      });
    } else {
      // Initialize form with default values for add mode
      this.attendanceForm.patchValue({
        employee: '',
        date: '',
        status: ''
      });
    }
  }

  closeModal(confirm: boolean) {
    if (confirm) {
      // Check if the form is valid
      if (this.attendanceForm.valid) {
        const attendanceData = this.attendanceForm.value;

        // Perform add or update logic here based on actionType
        if (this.actionType === 'update') {
          console.log("In update mode");
          // Update existing record with attendanceData
          this.updateAttendance(attendanceData);
        } else {
          console.log("In add mode");
          // Add new record with attendanceData
          this.addAttendance(attendanceData);
        }
      }
    }

    // Close the modal and pass data back to the parent component
    this.modalCtrl.dismiss({ role: confirm ? 'confirm' : 'cancel', 'data':{...{id:this.dataToUpdate.attendance_id},...this.attendanceForm.value}});
  }

  updateAttendance(dataToEdit: any) {
    console.log("update function : ", dataToEdit);
  
    // Create an object with the data you want to update
    const updatedData = {
      employee: dataToEdit.employee,
      date: dataToEdit.date,
      status: dataToEdit.status,
      id: this.dataToUpdate.attendance_id // Include the attendance ID for the update
    };
  
    // Call the updateDepartment function from the service
    this.attendanceService.updateAttendance(updatedData,
      async (message) => {
        console.log('Response: ', message);
        console.log('Message:', message);
        if (message === "Attendance already exists") {
          const toast = await this.toastController.create({
            message: 'Attendance already exists',
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
  


  // addAttendance(formData: any) {
  //   this.attendanceService.addAttendance(formData);
  // }

  // addAttendance(formData: any) {
  //   this.attendanceService.addAttendance(formData,
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

  addAttendance(formData: any) {
    this.attendanceService.addAttendance(
      formData,
      async (message) => {
        console.log("Response: ", message);
        if (message === "Attendance already exists") {
          const toast = await this.toastController.create({
            message: 'Attendance already exists',
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
