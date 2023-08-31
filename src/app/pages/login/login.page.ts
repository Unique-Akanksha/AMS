import { Component, OnInit} from '@angular/core';
import { UserService } from 'src/app/dashboard/services/user/user.service';
import { Login } from 'src/app/datatype';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  authError:string="";

  constructor(private user:UserService, private fb: FormBuilder, private sessionService: SessionService) { 
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit() {
  }

  Login(){
    this.authError='';
    const sessionTimeoutMinutes = 30;

    if (this.loginForm.valid) {
      const formData: Login = this.loginForm.value;
      this.user.userLogin(formData);
      this.sessionService.startSession(formData, sessionTimeoutMinutes);
    }
    // this.user.userLogin(data);
    
    
    this.user.isLoginError.subscribe((isError)=>{
      if(isError){
        this.authError="Email or Password is not correct";
      }
    });
  }
}
