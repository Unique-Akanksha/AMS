import { Injectable,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Login, SignUp } from 'src/app/datatype';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  isUserLoggedIn = new BehaviorSubject<boolean>(false)
  invalidUserAuth =new EventEmitter<boolean>(false)
  isLoginError = new EventEmitter<boolean>(false)

  constructor(private http:HttpClient, private router:Router) { }

  userSignUp(user: any, successCallback: (message: string) => void, errorCallback: (error: any) => void): void {
    // Modify the URL to match your server's endpoint

    const signUpUrl = 'https://demo101.websartech.com/AMS_APIS/backend/user_Create.php';
    // const signUpUrl = 'http://localhost/ionic/AttendanceManagementSystem/backend/user_Create.php';



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

  // http://localhost/ionic/AttendanceManagementSystem/backend/user_read.php
  userLogin(data:Login){
    this.http.get<SignUp[]>(`https://demo101.websartech.com/AMS_APIS/backend/user_read.php?email=${data.email}&password=${data.password}`,{observe:'response'}).
    subscribe((result:any)=>{
      if(result && result.body?.length){
        console.warn("User logged in");
        localStorage.setItem('user',JSON.stringify(result.body[0]));
        this.router.navigate(['/dashboard']);
      }else{
        console.warn("login failed");
        this.isLoginError.emit(true);
      }
    });
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']); 
  }
}
















