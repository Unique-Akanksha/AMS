import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { LeaveRequestsService } from 'src/app/services/leave-requests.service';

@Component({
  selector: 'app-approve-requests',
  templateUrl: './approve-requests.page.html',
  styleUrls: ['./approve-requests.page.scss'],
})
export class ApproveRequestsPage implements OnInit {
  @Input() actionType: string = '';
  @Input() dataToUpdate: any; 
  approveRequestForm!: FormGroup;

  constructor(private fb:FormBuilder, private leaveRequestService:LeaveRequestsService, private toastController: ToastController,private modalCtrl: ModalController) { }

  ngOnInit() {

    this.approveRequestForm = this.fb.group({
      employee_id: ['', Validators.required],
      leave_type: ['', [Validators.required]],
      start_date: ['', [Validators.required]],
      end_date: ['', [Validators.required]],
      reason: ['', [Validators.required]],
      status: ['', [Validators.required]],
      created_at: ['', [Validators.required]],
    });

    if (this.actionType === 'update' && this.dataToUpdate) {
      // Initialize form with data to update
      this.approveRequestForm.patchValue({
        employee_id: this.dataToUpdate.employee_id,
        leave_type: this.dataToUpdate.leave_type,
        start_date: this.dataToUpdate.start_date,
        end_date: this.dataToUpdate.end_date,
        reason: this.dataToUpdate.reason,
        status: this.dataToUpdate.status,
        created_at: this.dataToUpdate.created_at,
      });
    }
  }

  closeModal(confirm: boolean) {
    if (confirm) {
      // Check if the form is valid
      if (this.approveRequestForm.valid) {
        const approveRequestData = this.approveRequestForm.value;

        // Perform add or update logic here based on actionType
        if (this.actionType === 'update') {
          console.log("In update mode");
          this.updateLeaveRequest(approveRequestData);
        }
      }
    }

    // Close the modal and pass data back to the parent component
    this.modalCtrl.dismiss({ role: confirm ? 'confirm' : 'cancel', 'data':{...{id:this.dataToUpdate.leaveRequestID},...this.approveRequestForm.value}});
  }


  updateLeaveRequest(dataToEdit: any){
    // Create an object with the data you want to update
    const updatedData = {
      employee_id: dataToEdit.employee_id,
      // leave_type: dataToEdit.leave_type,
      start_date: dataToEdit.start_date,
      end_date: dataToEdit.end_date,
      // reason: dataToEdit.reason,
      status: dataToEdit.status,
      // created_at: dataToEdit.created_at,
      id: this.dataToUpdate.leaveRequestID // Include the attendance ID for the update
    };

    console.log("datatoedit :",dataToEdit);
    console.log("Update data: ",updatedData);
  
    // Call the updateDepartment function from the service
    
    this.leaveRequestService.updateLeaveRequest(updatedData,
      async (message:any) => {
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
      (error:any) => {
        console.log('Error: ' + error);
      }
    );
  }

}
