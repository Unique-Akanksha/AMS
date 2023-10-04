import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { LeaveRequestsService } from 'src/app/services/leave-requests.service';

@Component({
  selector: 'app-leave-requests',
  templateUrl: './leave-requests.page.html',
  styleUrls: ['./leave-requests.page.scss'],
})
export class LeaveRequestsPage implements OnInit {
  
  leaveRequestForm!: FormGroup;
  loginEmployeeName = '';
  loginEmployeeID = 0;


  constructor(private fb:FormBuilder, private leaveRequestService:LeaveRequestsService, private toastController: ToastController) { }

  ngOnInit() {
    this.leaveRequestForm = this.fb.group({
      employee_id: ['', Validators.required],
      leave_type: ['', [Validators.required]],
      start_date: ['', [Validators.required]],
      end_date: ['', [Validators.required]],
      reason: ['', [Validators.required]],
      created_at: ['', [Validators.required]],
    });

    const userJson = localStorage.getItem('user');

     if (userJson){
       const user = JSON.parse(userJson);
       this.loginEmployeeID = user.employee_id;
       this.loginEmployeeName = user.first_name + ' ' + user.last_name;
     }

     this.leaveRequestForm.patchValue({
      employee_id: this.loginEmployeeName
    });
  }

  applyLeave(){
    const leaveRequestsData = this.leaveRequestForm.value;
    console.log("Leave data : ",leaveRequestsData);
    leaveRequestsData.employee_id = this.loginEmployeeID;
    leaveRequestsData.status = 'Requested';
    
    this.leaveRequestService.createLeaveRequest(
      leaveRequestsData,
      async (message) => {
        console.log("Response: ", message);
        if (message === "LeaveRequest already exists") {
          const toast = await this.toastController.create({
            message: "LeaveRequest already exists",
            duration: 3000, // Duration in milliseconds (3 seconds in this case)
            position: 'bottom', // You can change the position (top, middle, bottom)
            color: 'danger', // You can specify a color (success, warning, danger, etc.)
          });
          toast.present();
        }
      },
      (error) => {
        console.log('Error: ' + error);
      }
    );
  }
}
