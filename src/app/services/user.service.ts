import { Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Login, SignUp } from 'src/app/datatype';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiURL = environment.apiURLserver;
  readonly roleAPIUrl = this.apiURL+"rolesAPI.php";

  isUserLoggedIn = new BehaviorSubject<boolean>(false);
  invalidUserAuth = new BehaviorSubject<boolean>(false);
  isLoginError = new BehaviorSubject<boolean>(false);

  constructor(private http:HttpClient, private router:Router) { }

  getRolesList(){
    return this.http.get<any[]>(this.roleAPIUrl);
  }

  userSignUp(user: any, successCallback: (message: string) => void, errorCallback: (error: any) => void): void {

    // const signUpUrl = 'https://demo101.websartech.com/AMS_APIS/backend/user_Create.php';
    const signUpUrl = 'http://localhost/ionic/AttendanceManagementSystem/backend/user_Create.php';
    
    // Perform the registration without checking if the user already exists
    this.http.post(signUpUrl, user, { observe: 'response' }).subscribe((result) => {
      const responseBody = result.body as { message: string };
      if (responseBody) {
        const successMessage = responseBody.message;
        console.warn(successMessage);
        successCallback(successMessage);
        // Registration successful, navigate to login page
        this.router.navigate(['/login']);
      } else {
        const errorMessage = 'No message received';
        console.error(errorMessage);
        errorCallback(errorMessage);
      }
    });
  }

  //  https://demo101.websartech.com/AMS_APIS/backend/user_read.php
  userLogin(data:Login){

    this.http.get<SignUp[]>(`http://localhost/ionic/AttendanceManagementSystem/backend/user_read.php?email=${data.email}&password=${data.password}`,{observe:'response'}).
    subscribe((result:any)=>{
      if(result && result.body?.length){
        console.log("User logged in");
        const user = result.body[0];
        // Fetch the user's role from your API or database here
        this.fetchUserRole(user.id).subscribe((roleResult: any) => {
          if (roleResult && roleResult.role) {
            user.role = roleResult.role; // Assign the role to the user
          } else {
            user.role = null; // Set role to null if not found
          }

        localStorage.setItem('user',JSON.stringify(user));
        this.isUserLoggedIn.next(true);
        this.router.navigate(['/dashboard']);
      });
      }else{
        console.log("login failed");
        this.isLoginError.next(true);
      }
    });
  }

  fetchUserRole(userId: number): Observable<{ role: string }> {
    // Make an HTTP GET request to fetch the user's role based on their ID
    const url = `${this.roleAPIUrl}?userId=${userId}`;
  
    return this.http.get<{ role: string }>(url);
  }
  

  logout() {
    localStorage.removeItem('user');
    this.isUserLoggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
















