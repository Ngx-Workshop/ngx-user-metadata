import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgxUserMetadataService } from 'ngx-user-metadata';
import { MockAuthService } from '../services/mock-auth.service';

@Component({
  selector: 'app-sign-in',
  imports: [RouterLink],
  template: `
    <div class="container">
      <h1>Sign In</h1>
      <p>
        This is a demo sign-in page. Use the buttons below to simulate different
        authentication scenarios.
      </p>

      <div class="card">
        <h2>Authentication Status</h2>
        <p>
          <strong>Current Status:</strong>
          {{
            userMetadataService.userAuthenticated()
              ? 'Authenticated'
              : 'Not Authenticated'
          }}
        </p>
      </div>

      <div class="actions">
        <button (click)="signIn()" class="btn btn-success">
          ✅ Simulate Successful Sign In
        </button>
        <button (click)="signOut()" class="btn btn-danger">❌ Sign Out</button>
      </div>

      <div class="actions">
        <button (click)="simulateUnauthorized()" class="btn btn-warning">
          🚫 Simulate 401 (Unauthorized)
        </button>
        <button (click)="simulateForbidden()" class="btn btn-warning">
          🔒 Simulate 403 (Forbidden)
        </button>
      </div>

      <div class="navigation">
        <a routerLink="/" class="btn btn-link">← Back to Home</a>
        <a routerLink="/user-metadata" class="btn btn-link"
          >View User Metadata →</a
        >
      </div>

      <div class="note">
        <p><strong>How it works:</strong></p>
        <ul>
          <li>
            Click "Simulate Successful Sign In" to set authenticated status to
            true
          </li>
          <li>Click "Sign Out" to set authenticated status to false</li>
          <li>
            The 401/403 buttons will trigger the interceptor and demonstrate
            redirects
          </li>
          <li>
            Try accessing the User Metadata page while signed out to see the
            guard in action
          </li>
        </ul>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        max-width: 800px;
        margin: 2rem auto;
        padding: 2rem;
        font-family: system-ui, -apple-system, sans-serif;
      }

      .card {
        background: #f8f9fa;
        border-radius: 8px;
        padding: 1.5rem;
        margin: 2rem 0;
        border-left: 4px solid #17a2b8;
      }

      .actions {
        display: flex;
        gap: 1rem;
        margin: 1rem 0;
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

      .btn-success {
        background: #28a745;
        color: white;
      }

      .btn-success:hover {
        background: #218838;
      }

      .btn-danger {
        background: #dc3545;
        color: white;
      }

      .btn-danger:hover {
        background: #c82333;
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
        background: #d1ecf1;
        border: 1px solid #bee5eb;
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
    `,
  ],
})
export class SignInComponent {
  private router = inject(Router);
  protected userMetadataService = inject(NgxUserMetadataService);
  private mockAuthService = inject(MockAuthService);

  signIn() {
    this.userMetadataService.setAuthenticated(true);
    console.log('✅ User signed in successfully');
  }

  signOut() {
    this.userMetadataService.setAuthenticated(false);
    this.userMetadataService.setUserMetadata(null);
    console.log('❌ User signed out');
  }

  simulateUnauthorized() {
    this.mockAuthService.triggerUnauthorized().subscribe({
      error: (error: any) => console.log('🚫 401 error triggered:', error),
    });
  }

  simulateForbidden() {
    this.mockAuthService.triggerForbidden().subscribe({
      error: (error: any) => console.log('🔒 403 error triggered:', error),
    });
  }
}
