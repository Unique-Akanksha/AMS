import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-details-employee',
  templateUrl: './details-employee.page.html',
  styleUrls: ['./details-employee.page.scss'],
})
export class DetailsEmployeePage implements OnInit {

  dataToUpdate: any;
  isReadonly=true;
  EmpForm!:FormGroup;
  constructor(private modalCtrl:ModalController) { }
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
  ngOnInit() {
    this.EmpForm.patchValue({
      employee_id:this.dataToUpdate.employee_idid,
      first_name: this.dataToUpdate.first_name,
      middle_name: this.dataToUpdate.middle_name,
      last_name: this.dataToUpdate.last_name,
      email: this.dataToUpdate.email,
      hire_date:this.dataToUpdate.hire_date,
      department:this.dataToUpdate.department,
      position:this.dataToUpdate.position,
    });
  }

}
