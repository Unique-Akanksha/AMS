import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private readonly sessionTimeout = 30 * 60 * 1000; // 30 minutes in milliseconds
  private lastActivityTimestamp: number = 0;
  private timer: any;

  // BehaviorSubject to track the session state
  private sessionActiveSubject = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {
    this.startTimer();
  }

  // Start the session timer
  private startTimer() {
    this.lastActivityTimestamp = Date.now();
    this.timer = setInterval(() => {
      const currentTime = Date.now();
      if (currentTime - this.lastActivityTimestamp >= this.sessionTimeout) {
        this.logout();
      }
    }, 1000); // Check every second
  }

  // Method to reset the session timer
  public resetSessionTimer() {
    this.lastActivityTimestamp = Date.now();
  }

  // Method to check if the session is active
  public isSessionActive(): Observable<boolean> {
    return this.sessionActiveSubject.asObservable();
  }

  // Method to perform user logout
  public logout() {
    // Clear the session timer
    clearInterval(this.timer);

    // Perform logout logic here (e.g., clearing user data, navigating to login page)
    // For example, navigate to the login page
    this.router.navigate(['/login']);
  }

  // Method to get the last activity timestamp
  getLastActivityTimestamp(): number {
    return this.lastActivityTimestamp;
  }
}
