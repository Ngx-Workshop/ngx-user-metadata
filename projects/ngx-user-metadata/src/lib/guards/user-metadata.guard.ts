import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { NgxUserMetadataService } from '../ngx-user-metadata.service';

/**
 * Redirect the browser to the configured auth URL with a `redirect` back param.
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

/**
 * Shared logic used by both CanActivate and CanMatch guards.
 */
function ensureAuthenticated$() {
  const service = inject(NgxUserMetadataService);
  const doc = inject(DOCUMENT);

  return service.fetchUserAuthenticatedStatus().pipe(
    map((authenticated) => {
      if (authenticated) return true;
      redirectToLogin(service, doc);
      return false;
    }),
    catchError(() => {
      redirectToLogin(service, doc);
      return of(false);
    })
  );
}

/**
 * Guard that ensures the user is authenticated (route activation).
 */
export const userAuthenticatedGuard: CanActivateFn = () =>
  ensureAuthenticated$();

/**
 * Guard that ensures the user is authenticated (route matching for lazy routes).
 */
export const userAuthenticatedMatchGuard: CanMatchFn = () =>
  ensureAuthenticated$();
