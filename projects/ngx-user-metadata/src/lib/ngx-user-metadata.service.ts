import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { UserMetadataDto } from '@tmdjr/user-metadata-contracts';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  DEFAULT_CONFIG,
  NGX_USER_METADATA_CONFIG,
} from './config/ngx-user-metadata.config';

@Injectable({
  providedIn: 'root',
})
export class NgxUserMetadataService {
  private http = inject(HttpClient);
  private config =
    inject(NGX_USER_METADATA_CONFIG, { optional: true }) ?? DEFAULT_CONFIG;

  // Writable signals (kept private) + public readonly views
  private _userAuthenticated = signal(false);
  readonly userAuthenticated = this._userAuthenticated.asReadonly();

  private _userMetadata = signal<UserMetadataDto | null>(null);
  readonly userMetadata = this._userMetadata.asReadonly();

  // Optional convenience computed for consumers that want a single read
  readonly vm = computed(() => ({
    authenticated: this._userAuthenticated(),
    metadata: this._userMetadata(),
  }));

  /**
   * GET /api/auth/
   * Updates the `userAuthenticated` signal.
   * NOTE: We do **not** clear metadata here, since the app redirects on 401/403
   * to a different domain; keeping cached metadata avoids jitter during redirects.
   */
  fetchUserAuthenticatedStatus(): Observable<{ authenticated: boolean }> {
    return this.http
      .get<{ authenticated: boolean }>('/api/auth/')
      .pipe(
        tap(({ authenticated }) => this._userAuthenticated.set(authenticated))
      );
  }

  /**
   * GET /api/metadata/
   * Updates the `userMetadata` signal.
   */
  fetchUserMetadata(): Observable<UserMetadataDto> {
    return this.http
      .get<UserMetadataDto>('/api/metadata/')
      .pipe(tap((metadata) => this._userMetadata.set(metadata)));
  }

  /**
   * Cached fetch: If metadata already exists, return it without making a request.
   * Otherwise, fetch and cache it.
   */
  fetchUserMetadataIfNeeded(): Observable<UserMetadataDto | null> {
    const current = this._userMetadata();
    if (current) {
      return of(current);
    }
    return this.fetchUserMetadata();
  }

  /**
   * Explicit setters (handy for tests or external updates)
   */
  setAuthenticated(authenticated: boolean): void {
    this._userAuthenticated.set(authenticated);
    // Do not clear metadata here; cross-domain redirect will replace page state.
  }

  setUserMetadata(metadata: UserMetadataDto | null): void {
    this._userMetadata.set(metadata);
  }

  /** Force-refresh helpers */
  invalidateUserMetadata(): void {
    this._userMetadata.set(null);
  }

  /**
   * Get the configured redirect URL for authentication failures
   */
  getRedirectUrl(): string {
    return this.config.redirectUrl ?? DEFAULT_CONFIG.redirectUrl!;
  }
}
