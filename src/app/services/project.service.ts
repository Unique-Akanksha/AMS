import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  // readonly addProjectAPIUrl = "http://localhost/ionic/AttendanceManagementSystem/backend/project_Create.php";
  // readonly getProjectListAPIUrl = "http://localhost/ionic/AttendanceManagementSystem/backend/project_read.php";
  // readonly deleteProjectAPIUrl = "http://localhost/ionic/AttendanceManagementSystem/backend/project_Delete.php";
  // readonly updateProjectAPIUrl = "http://localhost/ionic/AttendanceManagementSystem/backend/project_Update.php";

  readonly addProjectAPIUrl = "https://demo101.websartech.com/AMS_APIS/backend/projectAPI.php";
  readonly getProjectListAPIUrl = "https://demo101.websartech.com/AMS_APIS/backend/projectAPI.php";
  readonly deleteProjectAPIUrl = "https://demo101.websartech.com/AMS_APIS/backend/projectAPI.php";
  readonly updateProjectAPIUrl = "https://demo101.websartech.com/AMS_APIS/backend/projectAPI.php";
  
  // readonly addProjectAPIUrl = "https://demo101.websartech.com/AMS_APIS/backend/project_Create.php";
  // readonly getProjectListAPIUrl = "https://demo101.websartech.com/AMS_APIS/backend/project_read.php";
  // readonly deleteProjectAPIUrl = "https://demo101.websartech.com/AMS_APIS/backend/project_Delete.php";
  // readonly updateProjectAPIUrl = "https://demo101.websartech.com/AMS_APIS/backend/project_Update.php";

  constructor(private http:HttpClient) { }

  // addProject(val:any){
  //   this.http.post(this.addProjectAPIUrl,val,{observe:'response'}).subscribe((result)=>{
  //   console.warn(result);
  //   })
  // }

  addProject(val: any, successCallback: (message: string) => void, errorCallback: (error: any) => void): void {
    this.http.post(this.addProjectAPIUrl, val, { observe: 'response' }).subscribe(
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

  getProjectList(){
    return this.http.get<any[]>(this.getProjectListAPIUrl);
  }

  // Implement a function to get the department count.
  getProjectCount(): Observable<number> {
    const endpoint = `${this.getProjectListAPIUrl}/your_endpoint_for_department_count`;

    return this.http.get<any[]>(endpoint).pipe(
      map((projects:any) => {
        // You can calculate the count based on the array's length.
        return projects.length;
      })
    );
  }

  deleteProject(val:any){
    const url = this.deleteProjectAPIUrl;
    const data = { id: val };
    return this.http.delete(url, { body: data });
  }

  // updateProject(item: any): Observable<any> {
  //   const url = `${this.updateProjectAPIUrl}`;  
  //   return this.http.put<any>(url, item);
  // }



  updateProject(data: any, successCallback: (message: string) => void, errorCallback: (error: any) => void): void {
    this.http.put(this.updateProjectAPIUrl, data, { observe: 'response' }).subscribe(
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
