import { Component, OnInit} from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Login } from 'src/app/shared/data-access/login';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
      email: ['', [Validators.required, Validators.email, this.emailValidator]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit() {
  }

  emailValidator(control: FormControl) {
  const email = control.value;
  if (email) {
    // Regular expression for email validation
    const emailRegex = /^[a-z._+-][a-z0-9._+-]*@[a-z.-]+\.[a-z]{2,10}$/;

    // Check if the email matches the regular expression
    if (!emailRegex.test(email)) {
      return { invalidEmail: true };
    }
  }
  return null; // Valid email
}


  

  Login(){
    this.authError='';
    const sessionTimeoutMinutes = 30;

    if (this.loginForm.valid) {
      const formData: Login = this.loginForm.value;
      this.user.userLogin(formData);
    }
    // this.user.userLogin(data);
    
    
    this.user.isLoginError.subscribe((isError)=>{
      if(isError){
        this.authError="Email or Password is not correct";
      }
    });
  }


  // Triggered when user interacts with the application
  onUserActivity() {
    // Reset the session timer
    this.sessionService.resetSessionTimer();
  }
}
