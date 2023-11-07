// src/app/app.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { environment } from '../environments/environment';
import { Platform } from '@ionic/angular';
import { FcmService } from './services/fcm/fcm.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  userRole = '';
  userRoleName = '';
  first_name = '';
  last_name = '';
  department = '';
  userPhoto: string = '';

  app: any; // Declare the 'app' variable
  analytics: any; // Declare the 'analytics' variable

  constructor(private router: Router, private platform: Platform, private fcm: FcmService) {
    this.platform.ready().then(() => {
      this.fcm.initPush();
    }).catch(e => {
      console.log('error fcm: ', e);
    });
    // Initialize Firebase using the configuration from environment.ts
    this.app = initializeApp(environment.firebaseConfig);
    this.analytics = getAnalytics(this.app);
  }
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
  ngOnInit() {
    // code for get user role 
    const userJson = localStorage.getItem('user');

    if (userJson) {
      const user = JSON.parse(userJson);
      const userRole = user.role;
      this.userRole = userRole;
      this.first_name = user.first_name;
      this.last_name = user.last_name;
      this.department = user.department;
      this.userPhoto = user.userPhoto;

    }


  }
}
