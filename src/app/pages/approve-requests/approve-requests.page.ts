import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { LeaveService } from 'src/app/admin/leave/data-access/leave.service';

@Component({
  selector: 'app-approve-requests',
  templateUrl: './approve-requests.page.html',
  styleUrls: ['./approve-requests.page.scss'],
})
export class ApproveRequestsPage implements OnInit {
  @Input() actionType: string = '';
  @Input() dataToUpdate: any; 
  approveRequestForm!: FormGroup;

  constructor(private fb:FormBuilder, private leaveRequestService:LeaveService, private toastController: ToastController,private modalCtrl: ModalController) { }

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
      if (this.approveRequestForm.valid) {
        const approveRequestData = this.approveRequestForm.value;

        if (this.actionType === 'update') {
          this.updateLeaveRequest(approveRequestData);
        }
      }
    }

    this.modalCtrl.dismiss({ role: confirm ? 'confirm' : 'cancel', 'data':{...{id:this.dataToUpdate.leaveRequestID},...this.approveRequestForm.value}});
  }


  updateLeaveRequest(dataToEdit: any){
    const updatedData = {
      employee_id: dataToEdit.employee_id,
      start_date: dataToEdit.start_date,
      end_date: dataToEdit.end_date,
      status: dataToEdit.status,
      id: this.dataToUpdate.leaveRequestID
    };
    
    this.leaveRequestService.updateLeaveRequest(updatedData,
      async (message:any) => {
        if (message === "LeaveRequest already exists") {
          const toast = await this.toastController.create({
            message: 'LeaveRequest already exists',
            duration: 3000,
            position: 'bottom',
            color: 'danger',
          });
          toast.present();
        } else {
          const toast = await this.toastController.create({
            message: 'LeaveRequest updated successfully',
            duration: 3000,
            position: 'bottom',
            color: 'Success',
          });
          toast.present();
          this.modalCtrl.dismiss();
        }
      },
      (error:any) => {
        console.log('Error: ' + error);
      }
    );
  }

}
