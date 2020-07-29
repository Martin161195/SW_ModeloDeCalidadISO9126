import { Routes } from '@angular/router';
import { AdminLayoutComponent } from '@main/layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from '@main/layouts/auth/auth-layout.component';
import { AdminGuard } from '@providers/guards/admin.guard';
import { LoginGuard } from '@providers/guards/login.guard';

export const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      },
      {
        path: '',
        loadChildren: () => import('../main/views/admin/+dashboard/dashboard.module')
          .then(m => m.DashboardModule)
      }
    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'prefix'
      },
      {
        path: 'login',
        loadChildren: () => import('../main/views/auth/+login/login.module')
          .then(m => m.LoginModule)
      },
      {
        path: 'signin',
        loadChildren: () => import('../main/views/auth/+signin/signin.module')
          .then(m => m.SigninModule)
      },
      {
        path: 'verify-email',
        loadChildren: () => import('../main/views/auth/+verify-email/verify-email.module')
          .then(m => m.VerifyEmailModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
