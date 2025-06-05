import { Routes } from '@angular/router';
import { Dashboard } from './modules/dashboard/dashboard';
import { Login } from './modules/login/login';
import { NotFound } from './modules/not-found/not-found';
import { authGuard } from './core/gaurds/auth-guard';

export const routes: Routes = [
  { 
    path: '', 
    component: Login 
  },
  { 
    path: 'dashboard', 
    component: Dashboard, 
    canActivate: [authGuard] 
  },
  {  
    path: '**', 
    component: NotFound 
  },
];
