import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators'; 
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  apiURL = environment.apiURLserver;
  readonly DepartmentAPIUrl = this.apiURL+"departmentAPI.php";

  constructor(private http:HttpClient) { }

  getDepList(){
    return this.http.get<any[]>(this.DepartmentAPIUrl);
  }

  getDepListByID(val:any){
    return this.http.get<any[]>(this.DepartmentAPIUrl,val);
  }

  // Implement a function to get the department count.
  getDepartmentCount(): Observable<number> {
    const endpoint = `${this.DepartmentAPIUrl}/your_endpoint_for_department_count`;

    return this.http.get<any[]>(endpoint).pipe(
      map((departments:any) => {
        return departments.length;
      })
    );
  }

  deleteDepartment(val:any){
    const url = this.DepartmentAPIUrl;
    const data = { id: val };
    return this.http.delete(url, { body: data });
  }

  addDepartment(val: any, successCallback: (message: string) => void, errorCallback: (error: any) => void): void {
    this.http.post(this.DepartmentAPIUrl, val, { observe: 'response' }).subscribe(
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

  updateDepartment(data: any, successCallback: (message: string) => void, errorCallback: (error: any) => void): void {
    this.http.put(this.DepartmentAPIUrl, data, { observe: 'response' }).subscribe(
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
