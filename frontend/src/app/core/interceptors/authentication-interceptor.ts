import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);
  const router = inject(Router);

  const modifiedReq = req.clone({ withCredentials: true });

  return next(modifiedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log(error, 'error');

      if (error.status === 401) {
        const errorMessage =
          error.error?.message || 'Authentication failed. Please login again.';
        
        toastr.error(errorMessage, 'Authentication Error');

        localStorage.removeItem('isLoggedIn');
        router.navigate(['/login']);
      }
      else if (error.status === 403) {
        const errorMessage =
          error.error?.message || 'Access denied. Please login again.';
        
        toastr.error(errorMessage, 'Access Denied');

        localStorage.removeItem('isLoggedIn');
        router.navigate(['/login']);
      }
      else if (error.status === 404) {
        const errorMessage = error.error?.message || 'Resource not found.';
        
        toastr.warning(errorMessage, 'Not Found');
      }
      else if (error.status >= 500) {
        toastr.error('Server error occurred. Please try again later.', 'Server Error');
      }
      else if (error.status === 400) {
        const errorMessage =
          error.error?.message || 'Invalid request. Please check your input.';
        
        toastr.warning(errorMessage, 'Invalid Request');
      }

      return throwError(() => error);
    })
  );
};