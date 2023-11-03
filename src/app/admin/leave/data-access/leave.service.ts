import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators'; 
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  apiURL = environment.apiURLserver;
  readonly LeaveRequestsAPIUrl = this.apiURL+"leaveRequestsAPI.php";

  constructor(private http:HttpClient) { }

  getAllLeaveRequests(){
    return this.http.get<any[]>(this.LeaveRequestsAPIUrl);
  }
 
  getAllLeaveRequestsByID(employee_id:any){
    const url = `${this.LeaveRequestsAPIUrl}?employee_id=${employee_id}`;
    return this.http.get<any[]>(url);
  }


  getAllLeaveRequestsCount(): Observable<number> {
    const endpoint = `${this.LeaveRequestsAPIUrl}`;

    return this.http.get<any[]>(endpoint).pipe(
      map((leaveRequests:any) => {
        return leaveRequests.length;
      })
    );
  }

  // deleteLeaveRequest(val:any){
  //   const url = this.LeaveRequestsAPIUrl;
  //   const data = { id: val };
  //   return this.http.delete(url, { body: data });
  // }

  deleteLeaveRequest(val: any, successCallback: (message: string) => void, errorCallback: (error: any) => void): void {
    const url = this.LeaveRequestsAPIUrl;
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
        // Handle HTTP error here
        errorCallback(error);
      }
    );
  }

  createLeaveRequest(val: any, successCallback: (message: string) => void, errorCallback: (error: any) => void): void {
    this.http.post(this.LeaveRequestsAPIUrl, val, { observe: 'response' }).subscribe(
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

  updateLeaveRequest(data: any, successCallback: (message: string) => void, errorCallback: (error: any) => void): void {
    this.http.put(this.LeaveRequestsAPIUrl, data, { observe: 'response' }).subscribe(
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
