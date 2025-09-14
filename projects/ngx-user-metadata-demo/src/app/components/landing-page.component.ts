import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [RouterLink],
  template: `
    <div class="container">
      <h1>NGX User Metadata Demo</h1>
      <p>
        This demo showcases the functionality of the
        <code>ngx-user-metadata</code> package.
      </p>

      <div class="card">
        <h2>Features Demonstrated</h2>
        <ul>
          <li>🔐 Authentication guard that protects routes</li>
          <li>📊 User metadata service with reactive signals</li>
          <li>🔄 HTTP interceptor for handling auth errors</li>
          <li>🔀 Configurable redirect URLs for different environments</li>
        </ul>
      </div>

      <div class="actions">
        <a routerLink="/sign-in" class="btn btn-primary">Sign In</a>
        <a routerLink="/user-metadata" class="btn btn-secondary"
          >View User Metadata (Protected)</a
        >
      </div>

      <div class="note">
        <p>
          <strong>Note:</strong> In this demo, the redirect URL is configured to
          redirect back to the sign-in page. In a real application, this would
          redirect to an external authentication service.
        </p>
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
        border-left: 4px solid #007bff;
      }

      .actions {
        display: flex;
        gap: 1rem;
        margin: 2rem 0;
      }

      .btn {
        padding: 0.75rem 1.5rem;
        text-decoration: none;
        border-radius: 4px;
        font-weight: 500;
        transition: all 0.2s;
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

      .note {
        background: #fff3cd;
        border: 1px solid #ffeaa7;
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
export class LandingPageComponent {}
