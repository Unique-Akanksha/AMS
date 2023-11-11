import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-details-employee',
  templateUrl: './details-employee.page.html',
  styleUrls: ['./details-employee.page.scss'],
})
export class DetailsEmployeePage implements OnInit {

  @Input() actionType: string = ''; 
  @Input() dataToUpdate: any; 

  isReadonly=true;
  empForm!:FormGroup;
  tempImageUrl: string | undefined = ''; 
  role: string | undefined = ''; 
  constructor(private modalCtrl:ModalController,private fb: FormBuilder) { }
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
  ngOnInit() {
    this.empForm = this.fb.group({
      first_name: [''],
      middle_name: [''],
      last_name: [''],
      email: [''],
      hire_date: [''],
      role: [''],
      department: [''],
      position: [''],
      password: [''],
      confirmPassword: [''],
    });

    if (this.actionType === 'view' && this.dataToUpdate) {
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
        userPhoto: this.dataToUpdate.userPhoto, 
      });
      this.tempImageUrl = this.dataToUpdate.userPhoto;
    } 

    console.log("temp image path :",this.tempImageUrl);
    console.log("emp form : ",this.empForm);
  }

  async closeModal(confirm: boolean){
    this.modalCtrl.dismiss(null, 'cancel');
  }

}
