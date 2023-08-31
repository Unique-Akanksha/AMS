import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor() {
    // Check if user is already logged in when the service is initialized
    this.checkLoginStatus();
  }

  startSession(userData: any, sessionTimeoutMinutes: number) {
    localStorage.setItem('userData', JSON.stringify(userData));
    this.isLoggedInSubject.next(true);

    // Set session timeout timer
    timer(sessionTimeoutMinutes * 60 * 1000).subscribe(() => {
      this.endSession();
    });
  }

  endSession() {
    localStorage.removeItem('userData');
    this.isLoggedInSubject.next(false);
  }

  private checkLoginStatus() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      this.isLoggedInSubject.next(true);
    }
  }

  isLoggedIn() {
    return this.isLoggedInSubject.value;
  }
}
