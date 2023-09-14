import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  readonly insertAPIUrl = "http://localhost/ionic/AttendanceManagementSystem/backend/employee_Create.php";
  readonly readDataAPIUrl = "http://localhost/ionic/AttendanceManagementSystem/backend/employee_read.php";
  readonly deldDataAPIUrl = "http://localhost/ionic/AttendanceManagementSystem/backend/employee_Delete.php";

  constructor(private http: HttpClient) { }

  add_Employee(data:any){
    console.log("Data in employee service file : ",data);
    this.http.post(this.insertAPIUrl,data,{observe:'response'}).subscribe((result)=>{
      console.log(result);
    })
  }

  getEmpList():Observable<any[]>{
    return this.http.get<any[]>(this.readDataAPIUrl);
  }
 
  delEmployee(val:any){
   const url = this.deldDataAPIUrl;
   const data = {id : val};
   console.log("in service:",data);
   
   return this.http.delete(url,{body:data});
   

  }

}
