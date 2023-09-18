import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  // readonly addAttendanceAPIUrl = "http://localhost/ionic/AttendanceManagementSystem/backend/attendance_Create.php";
  // readonly getAttendanceListAPIUrl = "http://localhost/ionic/AttendanceManagementSystem/backend/attendance_read.php";
  // readonly deleteAttendanceAPIUrl = "http://localhost/ionic/AttendanceManagementSystem/backend/attendance_Delete.php";
  // readonly updateAttendanceAPIUrl = "http://localhost/ionic/AttendanceManagementSystem/backend/attendance_Update.php";

  readonly addAttendanceAPIUrl = "http://localhost/ionic/AttendanceManagementSystem/backend/attendanceAPI.php";
  readonly getAttendanceListAPIUrl = "http://localhost/ionic/AttendanceManagementSystem/backend/attendanceAPI.php";
  readonly deleteAttendanceAPIUrl = "http://localhost/ionic/AttendanceManagementSystem/backend/attendanceAPI.php";
  readonly updateAttendanceAPIUrl = "http://localhost/ionic/AttendanceManagementSystem/backend/attendanceAPI.php";
 
  // readonly addAttendanceAPIUrl = "https://demo101.websartech.com/AMS_APIS/backend/attendance_Create.php";
  // readonly getAttendanceListAPIUrl = "https://demo101.websartech.com/AMS_APIS/backend/attendance_read.php";
  // readonly deleteAttendanceAPIUrl = "https://demo101.websartech.com/AMS_APIS/backend/attendance_Delete.php";
  // readonly updateAttendanceAPIUrl = "https://demo101.websartech.com/AMS_APIS/backend/attendance_Update.php";

  // readonly addAttendanceAPIUrl = "https://demo101.websartech.com/AMS_APIS/backend/attendanceAPI.php";
  // readonly getAttendanceListAPIUrl = "https://demo101.websartech.com/AMS_APIS/backend/attendanceAPI.php";
  // readonly deleteAttendanceAPIUrl = "https://demo101.websartech.com/AMS_APIS/backend/attendanceAPI.php";
  // readonly updateAttendanceAPIUrl = "https://demo101.websartech.com/AMS_APIS/backend/attendanceAPI.php";

  
   constructor(private http:HttpClient) { }

  addAttendance(val: any, successCallback: (message: string) => void, errorCallback: (error: any) => void): void {
    this.http.post(this.addAttendanceAPIUrl, val, { observe: 'response' }).subscribe(
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
    return this.http.get<any[]>(this.getAttendanceListAPIUrl);
  }

  // Implement a function to get the department count.
  getAttendanceCount(): Observable<number> {
    const endpoint = `${this.getAttendanceListAPIUrl}/your_endpoint_for_department_count`;

    return this.http.get<any[]>(endpoint).pipe(
      map((employees:any) => {
        return employees.length;
      })
    );
  }
  
  deleteAttendance(val:any){
    const url = this.deleteAttendanceAPIUrl;
    const data = { id: val };
    return this.http.delete(url, { body: data });
  }

  updateAttendance(data: any, successCallback: (message: string) => void, errorCallback: (error: any) => void): void {
    this.http.put(this.updateAttendanceAPIUrl, data, { observe: 'response' }).subscribe(
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
