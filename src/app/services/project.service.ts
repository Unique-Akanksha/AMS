import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  apiURL = environment.apiURLserver;
  readonly ProjectAPIUrl = this.apiURL+"projectAPI.php";
    
  constructor(private http:HttpClient) { }

  addProject(val: any, successCallback: (message: string) => void, errorCallback: (error: any) => void): void {
    this.http.post(this.ProjectAPIUrl, val, { observe: 'response' }).subscribe(
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
    return this.http.get<any[]>(this.ProjectAPIUrl);
  }

  // Implement a function to get the department count.
  getProjectCount(): Observable<number> {
    const endpoint = `${this.ProjectAPIUrl}/your_endpoint_for_department_count`;
    return this.http.get<any[]>(endpoint).pipe(
      map((projects:any) => {
        return projects.length;
      })
    );
  }

  deleteProject(val:any){
    const url = this.ProjectAPIUrl;
    const data = { id: val };
    return this.http.delete(url, { body: data });
  }

  updateProject(data: any, successCallback: (message: string) => void, errorCallback: (error: any) => void): void {
    this.http.put(this.ProjectAPIUrl, data, { observe: 'response' }).subscribe(
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
