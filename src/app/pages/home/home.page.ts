import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/dashboard/services/user/user.service';
import { SessionService } from 'src/app/services/session.service';
import { Observable, Subscription, timer } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  remainingTime: number = 0; // Remaining time in seconds
  private sessionSubscription: Subscription | undefined;

  constructor(private user: UserService, private sessionService: SessionService) {
    this.sessionService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn) {
        // Start the session countdown timer
        this.startSessionTimer();
      } else {
        // Clear the session countdown timer
        this.clearSessionTimer();
      }
    });
  }

  formatTime(timeInSeconds: number): string {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;
  }

  padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  ngOnDestroy() {
    this.clearSessionTimer();
  }

  private startSessionTimer() {
    const sessionTimeoutMinutes = 30; // Set your desired session timeout
    const sessionTimeoutSeconds = sessionTimeoutMinutes * 60;

    this.sessionSubscription = timer(0, 1000)
      .pipe(
        takeWhile(() => this.remainingTime < sessionTimeoutSeconds),
        map(() => {
          this.remainingTime += 1;
          return sessionTimeoutSeconds - this.remainingTime;
        })
      )
      .subscribe(remainingTime => {
        this.remainingTime = remainingTime;
        // if (remainingTime <= 0) {
        //   alert('Your session has expired. You will be logged out.');
        //   this.logout(); 
        // }
      });
  }

  private clearSessionTimer() {
    if (this.sessionSubscription) {
      this.sessionSubscription.unsubscribe();
    }
  }

  ngOnInit() {
    if (!this.isLoggedIn) {
      // Redirect to login page or show a message
    }
  }

  logout() {
    this.user.logout();
  }


}
