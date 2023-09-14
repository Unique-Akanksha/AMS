import { Component, OnInit } from '@angular/core';
// import { UserService } from 'src/app/dashboard/services/user/user.service';
import { SignUp } from 'src/app/datatype';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

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
  
  // signUp(){
  //   if (this.signupForm.valid) {
  //     const formData: SignUp = this.signupForm.value;
  //     this.user.userSignUp(formData);
  //   }
  //   this.user.userSignUp(data);
  // }

  signUp() {
    if (this.signupForm.valid) {
      const formData: SignUp = this.signupForm.value;
  
      // Call the userSignUp method and handle success and error callbacks
      this.user.userSignUp(
        formData,
        (message: string) => {
          // Handle success, e.g., show a success message or navigate to login
          console.log('Success: ', message);
          // You can add code here to show a success message to the user or navigate to the login page
          // Example: this.router.navigate(['/login']);
        },
        (error: any) => {
          // Handle error, e.g., show an error message
          console.error('Error: ', error);
          // You can add code here to show an error message to the user
        }
      );
    }
  }
  
  
}

