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

  userSignUp(user:SignUp){
    this.http.post("http://localhost/ionic/AttendanceManagementSystem/backend/user_Create.php",user,{observe:'response'}).subscribe((result)=>{
      console.warn(result);
      if(result){
        // localStorage.setItem('user',JSON.stringify(result.body));
        this.router.navigate(['/login']);
      }
    })
  }

  userLogin(data:Login){
    this.http.get<SignUp[]>(`http://localhost/ionic/AttendanceManagementSystem/backend/user_read.php?email=${data.email}&password=${data.password}`,{observe:'response'}).
    subscribe((result:any)=>{
      if(result && result.body?.length){
        console.warn("User logged in");
        localStorage.setItem('user',JSON.stringify(result.body[0]));
        this.router.navigate(['/home']);
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
