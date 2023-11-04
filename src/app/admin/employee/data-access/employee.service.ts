import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

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

  getEmployeeCount(): Observable<number> {
    const endpoint = `${this.EmployeeAPIUrl}`;

    return this.http.get<any[]>(endpoint).pipe(
      map((employees:any) => {
        return employees.length;
      })
    );
  }

  deleteEmployee(val: any, successCallback: (message: string) => void, errorCallback: (error: any) => void): void {
    const url = this.EmployeeAPIUrl;
    const data = { id: val };
  
    this.http.delete(url, { body: data }).subscribe(
      (response) => {
        const responseBody = response as { message: string };
        if (responseBody) {
          const errorMessage = responseBody.message;
          successCallback(errorMessage);
        } else {
          errorCallback('No message received');
        }
      },
      (error) => {
        errorCallback(error);
      }
    );
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


  uploadImage(file: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('image', file, file.name);

    const uploadUrl = this.apiURL + 'uploadImage.php'; 

    const headers = new HttpHeaders();

    return this.http.post(uploadUrl, formData, { headers, responseType: 'text' }).pipe(
      map((imageUrl: string) => {
        return imageUrl;
      }),
      catchError((error) => {
        console.error('Image upload error:', error);
        throw error; 
      })
    );
  }
  
}

