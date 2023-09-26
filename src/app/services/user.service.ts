import { Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Login, SignUp } from 'src/app/datatype';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmployeeService } from './employee.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggedInUser: any;
  apiURL = environment.apiURLserver;
  readonly roleAPIUrl = this.apiURL+"rolesAPI.php";

  isUserLoggedIn = new BehaviorSubject<boolean>(false);
  invalidUserAuth = new BehaviorSubject<boolean>(false);
  isLoginError = new BehaviorSubject<boolean>(false);

  private currentUser = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUser.asObservable();

  constructor(private http:HttpClient, private router:Router, private employeeService:EmployeeService) { 
  }

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

  //   http:// https://demo101.websartech.com/AMS_APIS/backend/employeeAPI.php
  userLogin(data:Login){

  this.http.get<SignUp[]>(`http://localhost/ionic/AttendanceManagementSystem/backend/employeeAPI.php?email=${data.email}&password=${data.password}`,{observe:'response'}).
    subscribe((result:any)=>{
      if(result && result.body?.length){
        
        const user = result.body[0];
        // console.log("User logged in :",user);
        this.loggedInUser = user;
        // console.log("User logged in :",this.loggedInUser);
        const userRole = user.role;


        localStorage.setItem('user',JSON.stringify(user));
        this.isUserLoggedIn.next(true);
        this.currentUser.next(user);

        // Role-based navigation
        if (userRole === " Super Admin ") {
          this.router.navigate(['/dashboard']);
        }
         else if (userRole === " Admin ") {
          this.router.navigate(['/dashboard']);
        }
        else if (userRole === " Manager ") {
          this.router.navigate(['/dashboard']);
        }
        else if (userRole === " Developer ") {
          this.router.navigate(['/dashboard']);
        }
        else if (userRole === " Employee ") {
          this.router.navigate(['/dashboard']);
        }
        else {
          this.router.navigate(['/login']);
        }
      
      }else{
        console.log("login failed");
        this.isLoginError.next(true);
      }
      this.getLoginUser();
    });
    
  }
  
  // Function to retrieve the logged-in user
  getLoginUser(): any {
    // console.log("getLoginUser", this.loggedInUser);
    return this.loggedInUser;
  }

  logout() {
    localStorage.removeItem('user');
    this.isUserLoggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
















