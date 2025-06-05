import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Auth } from '../services/authService/auth';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);
  const authService = inject(Auth);

  if (req.url.includes('login')) {
    return next(req);
  }

  const authReq = req.clone({
    withCredentials: true 
  });

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.clearLoggedIn();
        router.navigate(['/login']);
        toastr.error('Session expired. Please login again.', 'Error');
      }
      
      const errorMsg = error.error?.message || 'An unexpected error occurred';
      if (errorMsg !== 'An unexpected error occurred') {
        toastr.error(errorMsg, 'Error');
      }
      
      return throwError(() => error);
    })
  );
};