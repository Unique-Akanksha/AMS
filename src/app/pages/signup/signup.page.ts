import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/dashboard/services/user/user.service';
import { SignUp } from 'src/app/datatype';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm: FormGroup;

  constructor(private user:UserService, private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
   }

  ngOnInit() {
  }
  
  signUp(){
    if (this.signupForm.valid) {
      const formData: SignUp = this.signupForm.value;
      this.user.userSignUp(formData);
    }
    // this.user.userSignUp(data);
  }
  
}

