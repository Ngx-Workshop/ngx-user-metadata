import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { NGX_USER_METADATA_CONFIG, authInterceptor } from 'ngx-user-metadata';
import { mockApiInterceptor } from './interceptors/mock-api.interceptor';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        mockApiInterceptor, // Mock API responses for demo
        authInterceptor, // Handle auth errors and redirects
      ])
    ),
    // Configure the ngx-user-metadata package to redirect to sign-in page for demo
    {
      provide: NGX_USER_METADATA_CONFIG,
      useValue: {
        redirectUrl: '/sign-in', // In demo, redirect to our own sign-in page
      },
    },
  ],
};
