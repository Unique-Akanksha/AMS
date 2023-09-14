import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder , Validator, Validators } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { EmployeeService } from 'src/app/services/employee.service';

interface IUser {
  name: string;
  des: string;

}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.page.html',
  styleUrls: ['./employee.page.scss'],
})

export class EmployeePage implements OnInit {
 
  empForm: FormGroup;
  EmployeeList : any=[];

  @ViewChild(IonModal)
  model!:IonModal;
  name:string|undefined;

  constructor(private employeeService: EmployeeService,private fb: FormBuilder,private _formBuilder: FormBuilder,) {
    

    this.empForm = this.fb.group({
      first_name:['',Validators.required],
      middle_name:["",],
      last_name:["",],
      email:['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],],
      hire_date:["",],
      department:["",],
      position:["",],
      password:["",],
      
    
    })

   
   }
   firstFormGroup = this._formBuilder.group({

     
    name: ['', Validators.required],
   
      

  })
  
   
  get f() { return this.empForm.controls; }
  
  get first_name() { return this.empForm.get('name')}
  get email(){
    return this.empForm.get('email');
  }

  ngOnInit() {
    this.refreshEmpList();
  }

  refreshEmpList(){
    this.employeeService.getEmpList().subscribe((data)=>{
      this.EmployeeList=data;
    });
  }

  // cancel(){
  //   this.model.dismiss(null,'cancel');
  // }

  savedata(){
    this.model.dismiss();
    // this.model.dismiss(this.name,'confirm');
    if(this.empForm.valid){
      this.employeeService.add_Employee(this.empForm.value);
      console.log("form data ts file :",this.empForm.value);
    } 
  }
  empinsert(){
  }

  // onWillDismiss(event:Event){
  //   // const ev = event as CustomEvent<OverlayEventDetail<string>>;
  //   // if(ev.detail.role === 'confirm'){
  //   //   if(this.empForm.valid){
  //   //     // console.log("form data ts file :",this.empForm.value);
  //   //     this.employeeService.add_Employee(this.empForm.value);
  //   //   } 
  //   // }
  // }
 
  deleteClick(item:any){
    console.log("id for delete:",item.employee_id)
    if(confirm("Are you sure to delete ?")){
      this.employeeService.delEmployee(item.employee_id).subscribe((data)=>{
        this.refreshEmpList();
      })
    }

  }
  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    // if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    if ((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122) ) {
      return false;
    }

    return true;

  }
}
// if ((this.key < 64 || this.key > 90) && ( this.key < 7 || this.key  > 9 )) {
//   event.preventDefault();
// }