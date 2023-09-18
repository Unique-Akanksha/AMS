import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.page.html',
  styleUrls: ['./check-in.page.scss'],
})
export class CheckInPage implements OnInit {

  userName: string = "";
  userdesignation: string = "Frontend Developer";
  currentTime: Date = new Date();
  currentDate: Date = new Date();
  checkInTime: string = "";
  checkOutTime: string = "";
  totalHrsTime: string = "";
  showSecondPunchOutButton: boolean = true;
  showButton: boolean = true;

  constructor() {}

  ngOnInit() {

    const userJSON = localStorage.getItem('user');
    if (userJSON !== null) {
      const user = JSON.parse(userJSON);
      if (user.name) {
        this.userName = user.name;
        console.log("user", this.userName);
      } else {
        this.userName = ''; // Or some other default value
      }
    } else {
      this.userName = ''; // Or some other default value
    }


    
    // Initialize the date and time
    this.updateDateTime();

    // Update the date and time every second
    setInterval(() => {
      this.updateDateTime();
    }, 1000);
  }

  private updateDateTime() {
    this.currentTime = new Date();
    this.currentDate = new Date();
  }

  checkIn() {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();

    // Format the time as hh:mm:ss AM/PM
    this.checkInTime = this.formatTimeIn12HourClock(hours, minutes, seconds);
    this.showButton = false;
  }

  checkOut() {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
  
    // Format the current time as hh:mm:ss AM/PM
    this.checkOutTime = this.formatTimeIn12HourClock(hours, minutes, seconds);
    this.showButton = false;
  
    // Calculate the total hours by finding the difference
    this.calculateTotalHours();
  }
  
  calculateTotalHours() {
    if (this.checkInTime && this.checkOutTime) {
      const checkInTimeParts = this.checkInTime.split(':');
      const checkOutTimeParts = this.checkOutTime.split(':');
  
      // Check if both time parts arrays have the expected number of elements
      if (checkInTimeParts.length === 3 && checkOutTimeParts.length === 3) {
        // Parse check-in and check-out times
        const checkInHours = parseInt(checkInTimeParts[0]);
        const checkInMinutes = parseInt(checkInTimeParts[1]);
        const checkInSeconds = parseInt(checkInTimeParts[2]);
  
        const checkOutHours = parseInt(checkOutTimeParts[0]);
        const checkOutMinutes = parseInt(checkOutTimeParts[1]);
        const checkOutSeconds = parseInt(checkOutTimeParts[2]);
  
        // Calculate total hours, minutes, and seconds
        let totalHours = checkOutHours - checkInHours;
        let totalMinutes = checkOutMinutes - checkInMinutes;
        let totalSeconds = checkOutSeconds - checkInSeconds;
  
        // Handle borrowing minutes and seconds from hours if necessary
        if (totalSeconds < 0) {
          totalMinutes--;
          totalSeconds += 60;
        }
  
        if (totalMinutes < 0) {
          totalHours--;
          totalMinutes += 60;
        }
  
        // Store total hours, minutes, and seconds in separate variables
        const formattedTotalHours = this.formatTimeComponent(totalHours);
        const formattedTotalMinutes = this.formatTimeComponent(totalMinutes);
        const formattedTotalSeconds = this.formatTimeComponent(totalSeconds);
  
        // Set totalHrsTime as hours:minutes:seconds
        this.totalHrsTime = `${formattedTotalHours}:${formattedTotalMinutes}:${formattedTotalSeconds}`;
      } else {
        this.totalHrsTime = "Invalid Time Format"; // Handle the case of invalid time format
      }
    } else {
      // Handle the case where either checkInTime or checkOutTime is not set
      this.totalHrsTime = "N/A"; // You can set it to a suitable default value
    }
  }
  
  // Function to format time in a 12-hour clock format with AM/PM
  private formatTimeIn12HourClock(hours: number, minutes: number, seconds: number): string {
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert 0 to 12

    return `${formattedHours}:${this.formatTimeComponent(minutes)}:${this.formatTimeComponent(seconds)} ${ampm}`;
  }

  // Function to format time component (hours, minutes, or seconds) with leading zeros
  private formatTimeComponent(component: number): string {
    return component < 10 ? `0${component}` : component.toString();
  }

  showSecondPunchOut() {
    this.showSecondPunchOutButton = true;
  }
}
