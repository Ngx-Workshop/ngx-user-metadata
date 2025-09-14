import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

export const mockApiInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  // Mock API endpoints for demo purposes
  if (req.url.includes('/api/mock/401')) {
    return throwError(
      () =>
        new HttpErrorResponse({
          status: 401,
          statusText: 'Unauthorized',
          error: { message: 'Authentication required' },
        })
    ).pipe(delay(300));
  }

  if (req.url.includes('/api/mock/403')) {
    return throwError(
      () =>
        new HttpErrorResponse({
          status: 403,
          statusText: 'Forbidden',
          error: { message: 'Access denied' },
        })
    ).pipe(delay(300));
  }

  if (req.url.includes('/api/mock/500')) {
    return throwError(
      () =>
        new HttpErrorResponse({
          status: 500,
          statusText: 'Internal Server Error',
          error: { message: 'Server error occurred' },
        })
    ).pipe(delay(300));
  }

  if (req.url.includes('/api/auth/')) {
    // Mock authentication status endpoint
    return of(
      new HttpResponse({
        status: 200,
        body: { authenticated: true },
      })
    ).pipe(delay(300));
  }

  if (req.url.includes('/api/metadata/')) {
    // Mock user metadata endpoint
    const mockMetadata = {
      _id: '507f1f77bcf86cd799439011',
      uuid: 'uuid-12345-demo',
      __v: 1,
      username: 'api-demo-user',
      email: 'api-demo@example.com',
      firstName: 'API',
      lastName: 'Demo User',
      roles: ['user', 'api-demo'],
      permissions: ['read', 'write', 'delete'],
      lastLogin: new Date().toISOString(),
      createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      preferences: {
        theme: 'dark',
        language: 'en',
        notifications: true,
        timezone: 'UTC',
      },
    };

    return of(
      new HttpResponse({
        status: 200,
        body: mockMetadata,
      })
    ).pipe(delay(500));
  }

  // For all other requests, continue with the normal flow
  return next(req);
};
