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
    redirectTo: '/login',
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
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then( m => m.PagesPageModule),
    canActivate: [AuthGuard]
  },
 
  {
    path: 'check-in',
    loadChildren: () => import('./pages/check-in/check-in.module').then( m => m.CheckInPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile-emp',
    loadChildren: () => import('./pages/profile-emp/profile-emp.module').then( m => m.ProfileEmpPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'show-emp-attendance',
    loadChildren: () => import('./pages/show-emp-attendance/show-emp-attendance.module').then( m => m.ShowEmpAttendancePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'page-not-found',
    loadChildren: () => import('./pages/page-not-found/page-not-found.module').then( m => m.PageNotFoundPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin-leave-history',
    loadChildren: () => import('./pages/admin-leave-history/admin-leave-history.module').then( m => m.AdminLeaveHistoryPageModule)
  },
  {
    path: 'approve-requests',
    loadChildren: () => import('./pages/approve-requests/approve-requests.module').then( m => m.ApproveRequestsPageModule)
  },
  
  {
    path: 'add-edit-department',
    loadChildren: () => import('./admin/department/feature/add-edit-department/add-edit-department.module').then( m => m.AddEditDepartmentPageModule)
  },
  {
    path: 'show-department',
    loadChildren: () => import('./admin/department/feature/show-department/show-department.module').then( m => m.ShowDepartmentPageModule)
  },
  {
    path: 'add-edit-project',
    loadChildren: () => import('./admin/project/feature/add-edit-project/add-edit-project.module').then( m => m.AddEditProjectPageModule)
  },
  {
    path: 'show-project',
    loadChildren: () => import('./admin/project/feature/show-project/show-project.module').then( m => m.ShowProjectPageModule)
  },
  {
    path: 'add-edit-employee',
    loadChildren: () => import('./admin/employee/feature/add-edit-employee/add-edit-employee.module').then( m => m.AddEditEmployeePageModule)
  },
  {
    path: 'show-employee',
    loadChildren: () => import('./admin/employee/feature/show-employee/show-employee.module').then( m => m.ShowEmployeePageModule)
  },
  {
    path: 'add-edit-attendance',
    loadChildren: () => import('./admin/attendance/feature/add-edit-attendance/add-edit-attendance.module').then( m => m.AddEditAttendancePageModule)
  },
  {
    path: 'show-attendance',
    loadChildren: () => import('./admin/attendance/feature/show-attendance/show-attendance.module').then( m => m.ShowAttendancePageModule)
  },
  {
    path: 'add-edit-leave',
    loadChildren: () => import('./admin/leave/feature/add-edit-leave/add-edit-leave.module').then( m => m.AddEditLeavePageModule)
  },
  {
    path: 'show-leave',
    loadChildren: () => import('./admin/leave/feature/show-leave/show-leave.module').then( m => m.ShowLeavePageModule)
  },
  {
    path: '**',
    redirectTo: 'page-not-found',
    pathMatch: 'full'
  },  {
    path: 'details-employee',
    loadChildren: () => import('./admin/employee/feature/details-employee/details-employee.module').then( m => m.DetailsEmployeePageModule)
  },


  

 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
