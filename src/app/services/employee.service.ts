import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  apiURL = environment.apiURLserver;
  readonly EmployeeAPIUrl = this.apiURL+"employeeAPI.php";
  
  constructor(private http:HttpClient) { }

  addEmployee(val: any, successCallback: (message: string) => void, errorCallback: (error: any) => void): void {
    this.http.post(this.EmployeeAPIUrl, val, { observe: 'response' }).subscribe(
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
    return this.http.get<any[]>(this.EmployeeAPIUrl);
  }

  // Implement a function to get the department count.
  getEmployeeCount(): Observable<number> {
    const endpoint = `${this.EmployeeAPIUrl}`;

    return this.http.get<any[]>(endpoint).pipe(
      map((employees:any) => {
        // You can calculate the count based on the array's length.
        return employees.length;
      })
    );
  }

  deleteEmployee(val:any){
    const url = this.EmployeeAPIUrl;
    const data = { id: val };
    return this.http.delete(url, { body: data });
  }

  updateEmployee(data: any, successCallback: (message: string) => void, errorCallback: (error: any) => void): void {
    this.http.put(this.EmployeeAPIUrl, data, { observe: 'response' }).subscribe(
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

