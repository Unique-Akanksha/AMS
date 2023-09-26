import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  // },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule),
  },
  {
    path: 'employee',
    loadChildren: () => import('./pages/employee/employee.module').then( m => m.EmployeePageModule),
  },
  {
    path: 'add-edit-dep',
    loadChildren: () => import('./pages/add-edit-dep/add-edit-dep.module').then( m => m.AddEditDepPageModule),
  },
  {
    path: 'show-dep',
    loadChildren: () => import('./pages/show-dep/show-dep.module').then( m => m.ShowDepPageModule),
  },
  {
    path: 'add-edit-emp',
    loadChildren: () => import('./pages/add-edit-emp/add-edit-emp.module').then( m => m.AddEditEmpPageModule),
  },
  {
    path: 'show-emp',
    loadChildren: () => import('./pages/show-emp/show-emp.module').then( m => m.ShowEmpPageModule),
  },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then( m => m.PagesPageModule),
  },
  {
    path: 'show-project',
    loadChildren: () => import('./pages/show-project/show-project.module').then( m => m.ShowProjectPageModule),
  },
  {
    path: 'show-attendance',
    loadChildren: () => import('./pages/show-attendance/show-attendance.module').then( m => m.ShowAttendancePageModule),
  },
  {
    path: 'add-edit-project',
    loadChildren: () => import('./pages/add-edit-project/add-edit-project.module').then( m => m.AddEditProjectPageModule),
  },
  {
    path: 'check-in',
    loadChildren: () => import('./pages/check-in/check-in.module').then( m => m.CheckInPageModule)
  },
  {
    path: 'profile-emp',
    loadChildren: () => import('./pages/profile-emp/profile-emp.module').then( m => m.ProfileEmpPageModule)
  },
  {
    path: 'show-emp-attendance',
    loadChildren: () => import('./pages/show-emp-attendance/show-emp-attendance.module').then( m => m.ShowEmpAttendancePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
