import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Handle the request and potential errors
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Handle different error status codes
      switch (error.status) {
        case 401:
          // Unauthorized - token expired or invalid
          console.warn('Unauthorized request - redirecting to login');
          break;

        case 403:
          // Forbidden - user doesn't have permission
          console.warn('Forbidden request - insufficient permissions');
          break;

        case 0:
          // Network error or CORS issue
          console.error('Network error or server unavailable');
          break;

        case 500:
          // Server error
          console.error('Internal server error');
          break;

        default:
          console.error(`HTTP Error ${error.status}:`, error.message);
      }

      // Re-throw the error so components can handle it if needed
      return throwError(() => error);
    })
  );
};
