import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NgxUserMetadataService {
  httpClient = inject(HttpClient);
  userAuthenticated = new BehaviorSubject(false);
  userAuthenticatedSignal = signal(false);
  userAuthenticated$ = this.userAuthenticated.asObservable();

  fetchUserAuthenticatedStatusAndMetadata() {
    return this.httpClient
      .get<{ authenticated: boolean }>('/api/user/authenticated')
      .pipe(
        tap(({ authenticated }) => {
          this.userAuthenticated.next(authenticated);
          this.userAuthenticatedSignal.set(authenticated);
        }),
        switchMap(() => this.httpClient.get('/api/user/name'))
      );
  }
}
