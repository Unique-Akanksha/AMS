import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/admin/employee/data-access/employee.service';
import { Plugins } from '@capacitor/core';
const { Filesystem } = Plugins;
import * as CapacitorCore from '@capacitor/core';


@Component({
  selector: 'app-profile-emp',
  templateUrl: './profile-emp.page.html',
  styleUrls: ['./profile-emp.page.scss'],
})
export class ProfileEmpPage implements OnInit {

  first_name : string ='';
  middle_name : string ='';
  last_name : string ='';
  email : string ='';
  hire_date : string = '';
  department : string = '';
  role : string = '';
  position : string = '';
  userPhoto : string = '';

  constructor(private router: Router, private employeeService: EmployeeService) { }
  
 
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
       this.position = user.position;
       this.userPhoto = user.userPhoto;
       console.log("Image path: ",this.userPhoto);

       if(user.role === '1'){
        this.role = 'Super Admin';
       }
       else if(user.role === '5'){
        this.role = 'Employee'
       }
       else if(user.role === '2'){}
       else if(user.role === '2'){}
       else if(user.role === '2'){}
       else if(user.role === '2'){}
     }
  }

  // Implement the logout function
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }


//   async downloadAndSaveImage() {
//     const filename = 'uploads/651ac74b29723_TrentBoult.jpg'; // Replace with the actual filename
//     try {
//         const imageBlob = await this.employeeService.getImageFromAPI(filename);
//          // Define the path where you want to save the image in the assets directory
//       const path = 'assets/img/image.jpg';

//       // Write the image data to the assets directory
//       await CapacitorCore.Filesystem.writeFile({
//         path,
//         data: imageBlob,
//         directory: CapacitorCore.FilesystemDirectory.Assets,
//     });

//       console.log('Image downloaded and saved successfully');
//     } catch (error) {
//         console.error('Error downloading and saving image', error);
//     }
// }

}
