import { InjectionToken } from '@angular/core';

export interface NgxUserMetadataConfig {
  /**
   * The URL to redirect to when authentication fails (401/403).
   * This can be a full URL to an external auth service or a relative path
   * within the same application for demo purposes.
   */
  redirectUrl?: string;
}

export const NGX_USER_METADATA_CONFIG =
  new InjectionToken<NgxUserMetadataConfig>('NgxUserMetadataConfig');

export const DEFAULT_CONFIG: NgxUserMetadataConfig = {
  redirectUrl: 'https://auth.ngx-workshop.io',
};
