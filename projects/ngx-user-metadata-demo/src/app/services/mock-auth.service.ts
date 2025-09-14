import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MockAuthService {
  private http = inject(HttpClient);

  /**
   * Trigger a 401 Unauthorized response to test the interceptor
   */
  triggerUnauthorized(): Observable<any> {
    return this.http.get('/api/mock/401');
  }

  /**
   * Trigger a 403 Forbidden response to test the interceptor
   */
  triggerForbidden(): Observable<any> {
    return this.http.get('/api/mock/403');
  }

  /**
   * Trigger a 500 Server Error response to test error handling
   */
  triggerServerError(): Observable<any> {
    return this.http.get('/api/mock/500');
  }
}
