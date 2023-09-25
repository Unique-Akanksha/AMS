import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Geolocation } from '@capacitor/geolocation';
import { ToastController } from '@ionic/angular';
import { ProjectService } from 'src/app/services/project.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AttendanceService } from 'src/app/services/attendance.service';


@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.page.html',
  styleUrls: ['./check-in.page.scss'],
})
export class CheckInPage implements OnInit {
  ProjectList: any[] = [];
  attendanceForm!: FormGroup;
  projectSubscription: Subscription | undefined;
  showSecondPunchOutButton: boolean = true;
  showButton: boolean = true;
  showImg: boolean = true;
  EmployeeList: any = [];
  
  userName: string = "";
  lastName: string = "";
  department: string = "";
  currentTime: Date = new Date();
  currentDate: Date = new Date();
  coordinatesMessage: string = '';
  emp_project: string = "";
  checkInTime: string = "";
  checkOutTime: string = "";
  totalHrsTime: string = "";

  
  
  constructor(private employeeService: EmployeeService, private renderer: Renderer2, private el: ElementRef, private toastController: ToastController, private projectService: ProjectService, private fb: FormBuilder, private attendanceService: AttendanceService) {

    this.projectService.getProjectList().subscribe((data) => {
      this.ProjectList = data;
    })

    this.employeeService.getEmpList().subscribe((data) => {
      this.EmployeeList = data;
    })

    this.attendanceForm = this.fb.group({
      project: [''], // Initialize with an empty string or any default value
    });
  }

  ngOnInit() {

    // Subscribe to the 'project' form control's valueChanges observable
    this.projectSubscription = this.attendanceForm.get('project')?.valueChanges.subscribe((data) => {
      this.emp_project = data;
      console.log('Selected Project Changed:', this.emp_project);
    });

    this.attendanceForm = this.fb.group({
      project: ['', Validators.required],
    });

    // get current location
    this.getCurrentLocation();

    const userJSON = localStorage.getItem('user');
    if (userJSON !== null) {
      const user = JSON.parse(userJSON);
      this.userName = user.first_name;
      this.lastName = user.last_name;
      this.department = user.department;
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

    const myTimeout = setTimeout(this.showthanksImg, 2000);


    // add attedance to the database 
    const dataToStore = {
      employeeName: this.userName + " " +this.lastName,
      employeeDept: this.department,
      currentTime:  this.currentTime,
      currentDate:  this.currentTime,
      currentLocation: this.coordinatesMessage,
      projectList: this.emp_project,
      checkInTime: this.checkInTime,
      checkOutTime: this.checkOutTime,
      totalHrsTime: this.totalHrsTime
    };
  
    console.log("dataToStore : ",dataToStore);
    // Send data to the server
    this.attendanceService.addAttendance(
      dataToStore,
      async (message) => {
        console.log("Response: ", message);
        if (message === "Attendance already exists") {
          const toast = await this.toastController.create({
            message: 'Attendance already exists',
            duration: 3000, // Duration in milliseconds (3 seconds in this case)
            position: 'bottom', // You can change the position (top, middle, bottom)
            color: 'danger', // You can specify a color (success, warning, danger, etc.)
          });
          toast.present();
        }
      },
      (error) => {
        console.log('Error: ' + error);
      }
    );

  }

  showthanksImg() {

    const elementToHidee = document.getElementById('elementId2');

    // Check if the element exists before attempting to hide it
    if (elementToHidee) {
      // Set the style.display property to "none" to hide the element
      elementToHidee.innerText = 'Succssfully Punch Out';

    }

    // Get a reference to the HTML element you want to hide
    const elementToHide = document.getElementById('elementId');

    // Check if the element exists before attempting to hide it
    if (elementToHide) {
      // Set the style.display property to "none" to hide the element
      elementToHide.style.display = 'none';

    }

    const Thanksimg = document.getElementById('Thanks_img');

    // Check if the element exists before attempting to hide it
    if (Thanksimg) {
      // Set the style.display property to "none" to hide the element
      Thanksimg.style.display = 'block';
    }
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

  async getCurrentLocation() {
    try {
      const position = await Geolocation.getCurrentPosition();
      const coordinates: GeolocationPosition = {
        coords: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          altitude: position.coords.altitude || null,
          accuracy: position.coords.accuracy,
          altitudeAccuracy: position.coords.altitudeAccuracy || null,
          heading: position.coords.heading || null,
          speed: position.coords.speed || null,
        },
        timestamp: position.timestamp,
      };
      // Update the message to display the coordinates.
      this.coordinatesMessage = `Current coordinates: Latitude ${coordinates.coords.latitude}, Longitude ${coordinates.coords.longitude}`;
    }

    catch (error) {
      console.error('Geolocation error:', error);
      if (error instanceof GeolocationPositionError) {
        this.presentErrorToast(error.message);
      }
    }
  }

  async presentErrorToast(errorMessage: string) {
    const toast = await this.toastController.create({
      message: errorMessage,
      duration: 3000, // Display for 3 seconds
      color: 'danger', // Set the color to red for error
      position: 'bottom' // You can change the position as needed
    });
    toast.present();
  }

}
