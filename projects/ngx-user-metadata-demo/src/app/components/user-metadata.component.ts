import { JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxUserMetadataService } from 'ngx-user-metadata';

@Component({
  selector: 'app-user-metadata',
  imports: [RouterLink, JsonPipe],
  template: `
    <div class="container">
      <h1>User Metadata</h1>
      <p>
        This page is protected by the <code>userAuthenticatedGuard</code> and
        displays user metadata using the service.
      </p>

      <div class="status-card">
        <h2>Authentication Status</h2>
        <div
          class="status"
          [class.authenticated]="userMetadataService.userAuthenticated()"
        >
          {{
            userMetadataService.userAuthenticated()
              ? '✅ Authenticated'
              : '❌ Not Authenticated'
          }}
        </div>
      </div>

      <div class="metadata-card">
        <h2>User Metadata</h2>
        @if (userMetadataService.userMetadata()) {
        <div class="metadata-content">
          <pre>{{ userMetadataService.userMetadata() | json }}</pre>
        </div>
        } @else {
        <div class="no-metadata">
          <p>No user metadata available.</p>
          <button (click)="loadMetadata()" class="btn btn-primary">
            Load User Metadata
          </button>
        </div>
        }
      </div>

      <div class="vm-card">
        <h2>Combined View Model</h2>
        <p>
          The service provides a convenient computed signal that combines
          authentication status and metadata:
        </p>
        <div class="vm-content">
          <pre>{{ userMetadataService.vm() | json }}</pre>
        </div>
      </div>

      <div class="actions">
        <button (click)="refreshMetadata()" class="btn btn-secondary">
          🔄 Refresh Metadata
        </button>
        <button (click)="clearMetadata()" class="btn btn-warning">
          🗑️ Clear Metadata
        </button>
        <button (click)="loadMetadata()" class="btn btn-primary">
          📊 Load Sample Metadata
        </button>
      </div>

      <div class="navigation">
        <a routerLink="/" class="btn btn-link">← Back to Home</a>
        <a routerLink="/sign-in" class="btn btn-link">Sign In Page →</a>
      </div>

      <div class="note">
        <p><strong>How it works:</strong></p>
        <ul>
          <li>This page is protected by <code>userAuthenticatedGuard</code></li>
          <li>
            If you're not authenticated, the guard will redirect you to sign-in
          </li>
          <li>
            The service uses Angular signals for reactive state management
          </li>
          <li>
            All data is reactive and updates automatically when the underlying
            signals change
          </li>
        </ul>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        max-width: 1000px;
        margin: 2rem auto;
        padding: 2rem;
        font-family: system-ui, -apple-system, sans-serif;
      }

      .status-card,
      .metadata-card,
      .vm-card {
        background: #f8f9fa;
        border-radius: 8px;
        padding: 1.5rem;
        margin: 2rem 0;
        border-left: 4px solid #6c757d;
      }

      .metadata-card {
        border-left-color: #17a2b8;
      }

      .vm-card {
        border-left-color: #6f42c1;
      }

      .status {
        font-size: 1.2rem;
        font-weight: 600;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        background: #f8d7da;
        color: #721c24;
      }

      .status.authenticated {
        background: #d4edda;
        color: #155724;
      }

      .metadata-content,
      .vm-content {
        background: #ffffff;
        border: 1px solid #dee2e6;
        border-radius: 4px;
        padding: 1rem;
        overflow-x: auto;
      }

      .no-metadata {
        text-align: center;
        padding: 2rem;
        color: #6c757d;
      }

      pre {
        margin: 0;
        font-family: 'Courier New', monospace;
        font-size: 0.9rem;
        line-height: 1.4;
      }

      .actions {
        display: flex;
        gap: 1rem;
        margin: 2rem 0;
        flex-wrap: wrap;
      }

      .navigation {
        display: flex;
        justify-content: space-between;
        margin: 2rem 0;
      }

      .btn {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 4px;
        font-weight: 500;
        cursor: pointer;
        text-decoration: none;
        transition: all 0.2s;
        display: inline-block;
      }

      .btn-primary {
        background: #007bff;
        color: white;
      }

      .btn-primary:hover {
        background: #0056b3;
      }

      .btn-secondary {
        background: #6c757d;
        color: white;
      }

      .btn-secondary:hover {
        background: #545b62;
      }

      .btn-warning {
        background: #ffc107;
        color: #212529;
      }

      .btn-warning:hover {
        background: #e0a800;
      }

      .btn-link {
        background: transparent;
        color: #007bff;
        text-decoration: underline;
      }

      .btn-link:hover {
        color: #0056b3;
      }

      .note {
        background: #e2e3e5;
        border: 1px solid #d6d8db;
        border-radius: 4px;
        padding: 1rem;
        margin: 2rem 0;
      }

      ul {
        margin: 0;
        padding-left: 1.5rem;
      }

      li {
        margin: 0.5rem 0;
      }

      code {
        background: #e9ecef;
        padding: 0.25rem 0.5rem;
        border-radius: 3px;
        font-family: 'Courier New', monospace;
      }
    `,
  ],
})
export class UserMetadataComponent implements OnInit {
  protected userMetadataService = inject(NgxUserMetadataService);

  ngOnInit() {
    // Load metadata if the user is authenticated but we don't have metadata yet
    if (
      this.userMetadataService.userAuthenticated() &&
      !this.userMetadataService.userMetadata()
    ) {
      this.loadMetadata();
    }
  }

  loadMetadata() {
    // Simulate loading user metadata with sample data
    const sampleMetadata = {
      _id: '12345',
      uuid: 'uuid-demo-12345',
      __v: 1,
      username: 'demo-user',
      email: 'demo@example.com',
      firstName: 'Demo',
      lastName: 'User',
      roles: ['user', 'demo'],
      permissions: ['read', 'write'],
      lastLogin: new Date().toISOString(),
      preferences: {
        theme: 'light',
        language: 'en',
        notifications: true,
      },
    };

    this.userMetadataService.setUserMetadata(sampleMetadata);
    console.log('📊 Sample metadata loaded');
  }

  refreshMetadata() {
    // In a real app, this would make an HTTP request
    // For demo purposes, we'll just update the timestamp
    const currentMetadata = this.userMetadataService.userMetadata();
    if (currentMetadata) {
      const updatedMetadata = {
        ...currentMetadata,
        lastLogin: new Date().toISOString(),
        refreshedAt: new Date().toISOString(),
      };
      this.userMetadataService.setUserMetadata(updatedMetadata);
      console.log('🔄 Metadata refreshed');
    } else {
      console.log('No metadata to refresh. Loading sample data...');
      this.loadMetadata();
    }
  }

  clearMetadata() {
    this.userMetadataService.setUserMetadata(null);
    console.log('🗑️ Metadata cleared');
  }
}
