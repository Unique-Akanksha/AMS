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

  // Add this function to upload an image
  uploadImage(file: File): Observable<{ imageUrl?: string }> {
    const formData: FormData = new FormData();
    formData.append('image', file, file.name);
  
    const uploadUrl = this.apiURL + 'uploadImage.php'; // Replace with the actual image upload endpoint
  
    const headers = new HttpHeaders();
    // Set any required headers for image upload, such as authorization headers
  
    return this.http.post(uploadUrl, formData, { headers }).pipe(
      map((response: any) => {
        // Return the image URL from the response
        return {
          imageUrl: response['imageUrl']
        };
      }),
      catchError((error) => {
        // Handle errors if the HTTP request fails
        console.error('Image upload error:', error);
        throw error; // Re-throw the error for further handling in the component
      })
    );
  }
  
}

