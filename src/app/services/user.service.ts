import { Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Login } from '../shared/data-access/login';
import { SignUp } from '../shared/data-access/signup';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmployeeService } from '../admin/employee/data-access/employee.service';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggedInUser: any;
  apiURL = environment.apiURLserver;
  readonly roleAPIUrl = this.apiURL+"rolesAPI.php";
  readonly EmployeeAPIUrl = this.apiURL+"employeeAPI2.php";
  

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
    // const signUpUrl = 'http://localhost/ionic/AttendanceManagementSystem/backend/user_Create.php';
    
    //   this.http.post(signUpUrl, user, { observe: 'response' }).subscribe((result) => {
    //   const responseBody = result.body as { message: string };
    //   if (responseBody) {
    //     const successMessage = responseBody.message;
    //     console.warn(successMessage);
    //     successCallback(successMessage);
    //     this.router.navigate(['/login']);
    //   } else {
    //     const errorMessage = 'No message received';
    //     console.error(errorMessage);
    //     errorCallback(errorMessage);
    //   }
    // });
  }

  userLogin(data:Login){
  this.http.get<SignUp[]>(`${this.EmployeeAPIUrl}?email=${data.email}&password=${data.password}`,{observe:'response'}).
    subscribe((result:any)=>{
      if(result && result.body?.length){
        const user = result.body[0];
        this.loggedInUser = user;
        const userRole = user.role;
        localStorage.setItem('user',JSON.stringify(user));
        this.isUserLoggedIn.next(true);
        this.currentUser.next(user);

        if (userRole === "1") {
          this.router.navigate(['/dashboard']);
        }
         else if (userRole === "2") {
          this.router.navigate(['/dashboard']);
        }
        else if (userRole === "3") {
          this.router.navigate(['/dashboard']);
        }
        else if (userRole === "4") {
          this.router.navigate(['/dashboard']);
        }
        else if (userRole === "5") {
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
    return this.loggedInUser;
  }

  logout() {
    localStorage.removeItem('user');
    this.isUserLoggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
















