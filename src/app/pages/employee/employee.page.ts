import { Component, OnInit,Input,ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.page.html',
  styleUrls: ['./employee.page.scss'],
})
export class EmployeePage implements OnInit {
  EmployeeList :any=[];
  ModalTitle:string='';
  ActivateAddEditEmpComp:boolean=false;
  @Input() emp: any;

  EmployeeIdFilter:string='';
  FirstNameFilter:string='';
  MiddleNameFilter:string='';
  LastNameFilter:string='';
  EmailFilter:string='';
  HireDateFilter:string='';
  DepartmentFilter:string='';
  PositionFilter:string='';


  EmployeeListWithoutFilter:any=[];

  constructor(private employeeService:EmployeeService) { }

  ngOnInit() {
    this.refreshEmpList();
  }

  refreshEmpList(){
    this.employeeService.getEmpList().subscribe((data)=>{
      this.EmployeeList=data;
      console.warn("emp list : ",this.EmployeeList);
      this.EmployeeListWithoutFilter=data;
    })
  }

  addClick(){
    this.emp={
      EmployeeId:0,
      EmployeeName:"",
      Department:"",
      DateOfJoining:"",
      PhotoFileName:"anonymous.png"
    }
    this.ModalTitle="Add Employee";
    this.ActivateAddEditEmpComp=true;
}

closeClick(){
  this.ActivateAddEditEmpComp=false;
  this.refreshEmpList();
}

editClick(item:any){
  this.emp=item;
  this.ModalTitle="Edit Employee";
  this.ActivateAddEditEmpComp=true;
}

deleteClick(item:any){
  console.log("deleteClick : ",item.employee_id);
  if(confirm("Are you sure??")){
    this.employeeService.deleteEmployee(item.employee_id).subscribe(data=>{
      this.refreshEmpList();
    });
  }
}

FilterFn(){
  
  var EmployeeIdFilter = this.EmployeeIdFilter;
  var FirstNameFilter = this.FirstNameFilter;
  var MiddleNameFilter = this.MiddleNameFilter;
  var LastNameFilter =this.LastNameFilter;
  var EmailFilter =this.EmailFilter;
  var HireDateFilter =this.HireDateFilter;
  var DepartmentFilter =this.DepartmentFilter;
  var PositionFilter =this.PositionFilter;


  this.EmployeeList =this.EmployeeListWithoutFilter.filter(function(el:any){
  
    return el.employee_id.toString().toLowerCase().includes(EmployeeIdFilter.toString().trim().toLowerCase())&&
    el.first_name.toString().toLowerCase().includes(FirstNameFilter.toString().trim().toLowerCase())&&
    el.middle_name.toString().toLowerCase.includes(MiddleNameFilter.toString().trim().toLowerCase())&&
    el.last_name.toString().toLowerCase.includes(LastNameFilter.toString().trim().toLowerCase())&&
    el.email.toString().toLowerCase.includes(EmailFilter.toString().trim().toLowerCase())&&
    el.hire_date.toString().toLowerCase.includes(HireDateFilter.toString().trim().toLowerCase())&&
    el.department.toString().toLowerCase.includes(DepartmentFilter.toString().trim().toLowerCase())&&
    el.position.toString().toLowerCase.includes(PositionFilter.toString().trim().toLowerCase())
  });
}

sortResult(prop:any,asc:any){
  this.EmployeeList = this.EmployeeListWithoutFilter.sort(function(a:any,b:any){
   if(asc){
     return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1:0);
   }else{
     return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1:0);
   }
  })
 }

}
