import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  apiURL = environment.apiURLserver;
  readonly AttendanceAPIUrl = this.apiURL+"attendanceAPI.php";

  constructor(private http:HttpClient) { }

  addAttendance(val: any, successCallback: (message: string) => void, errorCallback: (error: any) => void): void {
    this.http.post(this.AttendanceAPIUrl, val, { observe: 'response' }).subscribe(
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

  getAttendanceList(){
    return this.http.get<any[]>(this.AttendanceAPIUrl);
  }

  // Implement a function to get the department count.
  getAttendanceCount(): Observable<number> {
    const endpoint = `${this.AttendanceAPIUrl}/your_endpoint_for_department_count`;

    return this.http.get<any[]>(endpoint).pipe(
      map((employees:any) => {
        return employees.length;
      })
    );
  }
  
  deleteAttendance(val:any){
    const url = this.AttendanceAPIUrl;
    const data = { id: val };
    return this.http.delete(url, { body: data });
  }

  updateAttendance(data: any, successCallback: (message: string) => void, errorCallback: (error: any) => void): void {
    this.http.put(this.AttendanceAPIUrl, data, { observe: 'response' }).subscribe(
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
