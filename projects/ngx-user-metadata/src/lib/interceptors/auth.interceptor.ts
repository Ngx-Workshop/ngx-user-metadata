import { DOCUMENT } from '@angular/common';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NgxUserMetadataService } from '../ngx-user-metadata.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const service = inject(NgxUserMetadataService);
  const doc = inject(DOCUMENT);

  // Handle the request and potential errors
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Handle different error status codes
      switch (error.status) {
        case 401:
          // Unauthorized - token expired or invalid
          console.warn('Unauthorized request - redirecting to login');
          redirectToLogin(service, doc);
          break;

        case 403:
          // Forbidden - user doesn't have permission
          console.warn('Forbidden request - redirecting to login');
          redirectToLogin(service, doc);
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

/**
 * Redirect to the configured login URL
 */
function redirectToLogin(
  service: NgxUserMetadataService,
  doc: Document,
  fallback: string = '/'
) {
  const href = doc?.defaultView?.location?.href ?? fallback;
  const redirect = encodeURIComponent(href);
  const baseRedirectUrl = service.getRedirectUrl();
  const loginUrl = baseRedirectUrl.includes('?')
    ? `${baseRedirectUrl}&redirect=${redirect}`
    : `${baseRedirectUrl}?redirect=${redirect}`;
  doc.defaultView?.location?.assign(loginUrl);
}
