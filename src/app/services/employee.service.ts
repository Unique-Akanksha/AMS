import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  // readonly addEmpAPIUrl = "http://localhost/ionic/AttendanceManagementSystem/backend/employee_Create.php";
  // readonly getEmpListAPIUrl = "http://localhost/ionic/AttendanceManagementSystem/backend/employee_read.php";
  // readonly deleteEmpAPIUrl = "http://localhost/ionic/AttendanceManagementSystem/backend/employee_Delete.php";
  // readonly updateEmpAPIUrl = "http://localhost/ionic/AttendanceManagementSystem/backend/employee_Update.php";
 
  
  readonly addEmpAPIUrl = "https://demo101.websartech.com/AMS_APIS/backend/employeeAPI.php";
  readonly getEmpListAPIUrl = "https://demo101.websartech.com/AMS_APIS/backend/employeeAPI.php";
  readonly deleteEmpAPIUrl = "https://demo101.websartech.com/AMS_APIS/backend/employeeAPI.php";
  readonly updateEmpAPIUrl = "https://demo101.websartech.com/AMS_APIS/backend/employeeAPI.php";
  
  constructor(private http:HttpClient) { }


  // addEmployee(val:any){
  //   console.log("In employee service",val);
  //   this.http.post(this.addEmpAPIUrl,val,{observe:'response'}).subscribe((result)=>{
  //   console.warn(result);
  //   })
  // }


  addEmployee(val: any, successCallback: (message: string) => void, errorCallback: (error: any) => void): void {
    this.http.post(this.addEmpAPIUrl, val, { observe: 'response' }).subscribe(
      (response) => {
        const responseBody = response.body as { message: string };
        if (responseBody) {
          const errorMessage = responseBody.message;
          console.log('Response : ' + errorMessage);
          successCallback(errorMessage);
        } else {
          errorCallback('No message received');
        }
      }
    );
  }

  getEmpList(){
    return this.http.get<any[]>(this.getEmpListAPIUrl);
  }

  // Implement a function to get the department count.
  getEmployeeCount(): Observable<number> {
    const endpoint = `${this.getEmpListAPIUrl}/your_endpoint_for_department_count`;

    return this.http.get<any[]>(endpoint).pipe(
      map((employees:any) => {
        // You can calculate the count based on the array's length.
        return employees.length;
      })
    );
  }

  deleteEmployee(val:any){
    const url = this.deleteEmpAPIUrl;
    const data = { id: val };
    return this.http.delete(url, { body: data });
  }

  // updateEmployee(item: any): Observable<any> {
  //   console.log("In employee update Service ",item);
  //   const url = `${this.updateEmpAPIUrl}`;
  //   return this.http.put<any>(url, item);
  // }


  updateEmployee(data: any, successCallback: (message: string) => void, errorCallback: (error: any) => void): void {
    this.http.put(this.updateEmpAPIUrl, data, { observe: 'response' }).subscribe(
      (response) => {
        const responseBody = response.body as { message: string };
        if (responseBody) {
          const errorMessage = responseBody.message;
          successCallback(errorMessage);
        } else {
          errorCallback('No message received');
        }
      }
    );
  }
  
}