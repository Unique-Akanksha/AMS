import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-emp',
  templateUrl: './profile-emp.page.html',
  styleUrls: ['./profile-emp.page.scss'],
})
export class ProfileEmpPage implements OnInit {

  constructor() { }
  first_name : string ='';
  middle_name : string ='';
  last_name : string ='';
  email : string ='';
  hire_date : string = '';
  department : string = '';
  role : string = '';
  position : string = '';

 
  ngOnInit() {
     // code for get user role 
     const userJson = localStorage.getItem('user');

     if (userJson){
       const user = JSON.parse(userJson);
       this.first_name = user.first_name;
       this.middle_name = user.middle_name;
       this.last_name = user.last_name;
       this.email = user.email;
       this.hire_date = user.hire_date;
       this.department = user.department;
       this.role = user.role;
       this.position = user.position;
     }
  }

}
