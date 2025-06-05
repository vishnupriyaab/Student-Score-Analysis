import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/authService/auth';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);
  const toastr = inject(ToastrService);

  if (authService.isLoggedIn()) {
    console.log("111")
    return true;
  } else {
    console.log("222")
    toastr.warning('Please login to access this page', 'Access Denied');
    router.navigate(['/']);
    return false;
  }
};
