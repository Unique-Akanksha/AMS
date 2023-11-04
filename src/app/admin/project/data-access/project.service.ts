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

  getProjectCount(): Observable<number> {
    const endpoint = `${this.ProjectAPIUrl}`;
    return this.http.get<any[]>(endpoint).pipe(
      map((projects:any) => {
        return projects.length;
      })
    );
  }

  deleteProject(val: any, successCallback: (message: string) => void, errorCallback: (error: any) => void): void {
    const url = this.ProjectAPIUrl;
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
