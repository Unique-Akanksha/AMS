import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  // readonly addDepAPIUrl = "http://localhost/ionic/AttendanceManagementSystem/backend/department_Create.php";
  // readonly getDepListAPIUrl = "http://localhost/ionic/AttendanceManagementSystem/backend/department_read.php";
  // readonly deleteDepAPIUrl = "http://localhost/ionic/AttendanceManagementSystem/backend/department_Delete.php";
  // readonly updateDepAPIUrl = "http://localhost/ionic/AttendanceManagementSystem/backend/department_Update.php";

  readonly addDepAPIUrl = "https://demo101.websartech.com/AMS_APIS/backend/departmentAPI.php";
  readonly getDepListAPIUrl = "https://demo101.websartech.com/AMS_APIS/backend/departmentAPI.php";
  readonly deleteDepAPIUrl = "https://demo101.websartech.com/AMS_APIS/backend/departmentAPI.php";
  readonly updateDepAPIUrl = "https://demo101.websartech.com/AMS_APIS/backend/departmentAPI.php";

  // readonly addDepAPIUrl = "https://demo101.websartech.com/AMS_APIS/backend/department_Create.php";
  // readonly getDepListAPIUrl = "https://demo101.websartech.com/AMS_APIS/backend/department_read.php";
  // readonly deleteDepAPIUrl = "https://demo101.websartech.com/AMS_APIS/backend/department_Delete.php";
  // readonly updateDepAPIUrl = "https://demo101.websartech.com/AMS_APIS/backend/department_Update.php";
  constructor(private http:HttpClient) { }


  // addDepartment(val:any){
  //   this.http.post(this.addDepAPIUrl,val,{observe:'response'}).subscribe((result)=>{
  //   console.log("ex",result);
  //   })
  // }


  // addDepartment(val: any) {
  //   this.http.post(this.addDepAPIUrl, val, { observe: 'response' }).subscribe(
  //     (response) => {
  //         const responseBody = response.body as { message: string };
  //         if (responseBody) {
  //           const errorMessage = responseBody.message;
  //           console.log('Response : ' + errorMessage);
  //         }
  //     });
  // }

  
  getDepList(){
    return this.http.get<any[]>(this.getDepListAPIUrl);
  }

  getDepListByID(val:any){
    return this.http.get<any[]>(this.getDepListAPIUrl,val);
  }

  // Implement a function to get the department count.
  getDepartmentCount(): Observable<number> {
    const endpoint = `${this.getDepListAPIUrl}/your_endpoint_for_department_count`;

    return this.http.get<any[]>(endpoint).pipe(
      map((departments:any) => {
        // You can calculate the count based on the array's length.
        return departments.length;
      })
    );
  }

  deleteDepartment(val:any){
    const url = this.deleteDepAPIUrl;
    const data = { id: val };
    return this.http.delete(url, { body: data });
  }

  // updateDepartment(item: any): Observable<any> {
  //   const url = `${this.updateDepAPIUrl}`;
  //   return this.http.put<any>(url, item);
  // }

  addDepartment(val: any, successCallback: (message: string) => void, errorCallback: (error: any) => void): void {
    this.http.post(this.addDepAPIUrl, val, { observe: 'response' }).subscribe(
      (response) => {
        const responseBody = response.body as { message: string };
        if (responseBody) {
          const errorMessage = responseBody.message;
          // console.log('Response : ' + errorMessage);
          successCallback(errorMessage);
        } else {
          errorCallback('No message received');
        }
      }
    );
  }


  updateDepartment(data: any, successCallback: (message: string) => void, errorCallback: (error: any) => void): void {
    this.http.put(this.updateDepAPIUrl, data, { observe: 'response' }).subscribe(
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
