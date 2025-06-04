import { Routes } from '@angular/router';
import { Dashboard } from './modules/dashboard/dashboard';

export const routes: Routes = [
  { path: '', component: login },
  { path: 'dashboard', component: Dashboard },
];
