import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  userRole = '';
  userRoleName='';
  first_name='';
  last_name='';
  department='';
  userPhoto : string = '';
  constructor(private router:Router) {}
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
  ngOnInit() {
    // code for get user role 
    const userJson = localStorage.getItem('user');

    if (userJson){
      const user = JSON.parse(userJson);
      const userRole = user.role;
      this.userRole = userRole;
      this.first_name=user.first_name;
      this.last_name=user.last_name;
      this.department=user.department;
      this.userPhoto = user.userPhoto;
            
    }

 
}
}
