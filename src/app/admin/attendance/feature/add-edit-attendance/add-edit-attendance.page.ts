import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AttendanceService } from 'src/app/admin/attendance/data-access/attendance.service';
import { EmployeeService } from 'src/app/admin/employee/data-access/employee.service';
import { ToastController } from '@ionic/angular';
import { DepartmentService } from 'src/app/admin/department/data-access/department.service';

@Component({
  selector: 'app-add-edit-attendance',
  templateUrl: './add-edit-attendance.page.html',
  styleUrls: ['./add-edit-attendance.page.scss'],
})
export class AddEditAttendancePage implements OnInit {
  @Input() actionType: string = '';
  @Input() dataToUpdate: any; 
  attendanceForm!: FormGroup;
  employees: any[] = [];
  departments: any[] = [];
  selectedTime : any;
  totalHrsTime: string =''; 


  constructor(private departmentService: DepartmentService,private toastController: ToastController,private employeeService:EmployeeService,private attendanceService: AttendanceService, private fb: FormBuilder, private modalCtrl: ModalController) { }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  ngOnInit() {

    this.departmentService.getDepList().subscribe((departments) => {
      this.departments = departments;
    });

    this.employeeService.getEmpList().subscribe((employees) => {
      this.employees = employees;
    });

    this.attendanceForm = this.fb.group({
      employeeName: ['', Validators.required],
      employeeDept: ['', Validators.required],
      currentTime: ['', Validators.required],
      currentDate: ['', Validators.required],
      currentLocation: ['', Validators.required],
      projectList: ['', Validators.required],
      checkInTime: ['', Validators.required],
      checkOutTime: ['', [
        Validators.required, // Makes the field required
        Validators.pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/), // Validates HH:MM:SS format
      ]],  
      totalHrsTime: ['', Validators.required],
    });

    if (this.actionType === 'update' && this.dataToUpdate) {
      this.attendanceForm.patchValue({
        employeeName: this.dataToUpdate.employeeName,
        employeeDept: this.dataToUpdate.employeeDept,
        currentTime: this.dataToUpdate.currentTime,
        currentDate: this.dataToUpdate.currentDate,
        currentLocation: this.dataToUpdate.currentLocation,
        projectList: this.dataToUpdate.projectList,
        checkInTime: this.dataToUpdate.checkInTime,
        checkOutTime: this.dataToUpdate.checkOutTime,
        totalHrsTime: this.dataToUpdate.totalHrsTime,
        
      });
    }
  }

  closeModal(confirm: boolean) {
    if (confirm) {
      if (this.attendanceForm.valid) {
        const attendanceData = this.attendanceForm.value;

        if (this.actionType === 'update') {
          console.log("In update mode");
          this.updateAttendance(attendanceData);
        }
      }
    }

    this.modalCtrl.dismiss({ role: confirm ? 'confirm' : 'cancel', 'data':{...{id:this.dataToUpdate.attendanceID},...this.attendanceForm.value}});
  }

  updateAttendance(dataToEdit: any) {  
    const totalHours = this.calculateTotalHours(dataToEdit.checkInTime, dataToEdit.checkOutTime);

    const updatedData = {
      checkOutTime: dataToEdit.checkOutTime, 
      totalHrsTime: totalHours,
      id: this.dataToUpdate.attendanceID 
    };
  
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
          const toast = await this.toastController.create({
            message: 'Attendance updated successfully',
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
  

  calculateTotalHours(checkInTime: string, checkOutTime: string) {
    if (checkInTime && checkOutTime) {
      const checkInTimeParts = checkInTime.split(':');
      const checkOutTimeParts = checkOutTime.split(':');
  
      // Check if both time parts arrays have the expected number of elements
      if (checkInTimeParts.length === 3 && checkOutTimeParts.length === 3) {
        // Parse check-in and check-out times
        const checkInHours = parseInt(checkInTimeParts[0]);
        const checkInMinutes = parseInt(checkInTimeParts[1]);
        const checkInSeconds = parseInt(checkInTimeParts[2]);
  
        const checkOutHours = parseInt(checkOutTimeParts[0]);
        const checkOutMinutes = parseInt(checkOutTimeParts[1]);
        const checkOutSeconds = parseInt(checkOutTimeParts[2]);
  
        // Calculate total hours, minutes, and seconds
        let totalHours = checkOutHours - checkInHours;
        let totalMinutes = checkOutMinutes - checkInMinutes;
        let totalSeconds = checkOutSeconds - checkInSeconds;
  
        // Handle borrowing minutes and seconds from hours if necessary
        if (totalSeconds < 0) {
          totalMinutes--;
          totalSeconds += 60;
        }
  
        if (totalMinutes < 0) {
          totalHours--;
          totalMinutes += 60;
        }
  
        // Store total hours, minutes, and seconds in separate variables
        const formattedTotalHours = this.formatTimeComponent(totalHours);
        const formattedTotalMinutes = this.formatTimeComponent(totalMinutes);
        const formattedTotalSeconds = this.formatTimeComponent(totalSeconds);
  
        // Set totalHrsTime as hours:minutes:seconds
        this.totalHrsTime = `${formattedTotalHours}:${formattedTotalMinutes}:${formattedTotalSeconds}`;
      } else {
        this.totalHrsTime = "Invalid Time Format"; // Handle the case of invalid time format
      }
    } else {
      // Handle the case where either checkInTime or checkOutTime is not set
      this.totalHrsTime = "N/A"; // You can set it to a suitable default value
    }
    return this.totalHrsTime;
  }
  
  // Function to format time component (hours, minutes, or seconds) with leading zeros
  private formatTimeComponent(component: number): string {
    return component < 10 ? `0${component}` : component.toString();
  }
  
}
