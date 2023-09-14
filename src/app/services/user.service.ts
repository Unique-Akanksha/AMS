import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(user: any, successCallback: (message: string) => void, errorCallback: (error: any) => void): void {
    // Modify the URL to match your server's endpoint
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
}
