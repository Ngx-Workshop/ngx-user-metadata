import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgxUserMetadataService } from 'ngx-user-metadata';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <div class="container">
        <h1 class="title">{{ title() }}</h1>
        <nav class="nav">
          <a
            routerLink="/"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
            >Home</a
          >
          <a routerLink="/sign-in" routerLinkActive="active">Sign In</a>
          <a routerLink="/user-metadata" routerLinkActive="active"
            >User Metadata</a
          >
        </nav>
        <div class="status">
          <span
            class="status-indicator"
            [class.authenticated]="userMetadataService.userAuthenticated()"
          >
            {{ userMetadataService.userAuthenticated() ? '🟢' : '🔴' }}
            {{
              userMetadataService.userAuthenticated()
                ? 'Authenticated'
                : 'Not Authenticated'
            }}
          </span>
        </div>
      </div>
    </header>
    <main class="main">
      <router-outlet></router-outlet>
    </main>
    <footer class="footer">
      <div class="container">
        <p>
          &copy; 2025 NGX User Metadata Demo - Showcasing the ngx-user-metadata
          package
        </p>
      </div>
    </footer>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        font-family: system-ui, -apple-system, sans-serif;
      }

      .header {
        background: #343a40;
        color: white;
        padding: 1rem 0;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 1rem;
      }

      .title {
        margin: 0;
        font-size: 1.5rem;
        font-weight: 600;
      }

      .nav {
        display: flex;
        gap: 2rem;
      }

      .nav a {
        color: #adb5bd;
        text-decoration: none;
        font-weight: 500;
        transition: color 0.2s;
      }

      .nav a:hover,
      .nav a.active {
        color: white;
      }

      .status {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .status-indicator {
        font-size: 0.9rem;
        font-weight: 500;
        color: #ffc107;
      }

      .status-indicator.authenticated {
        color: #28a745;
      }

      .main {
        flex: 1;
        background: #f8f9fa;
      }

      .footer {
        background: #e9ecef;
        padding: 1rem 0;
        text-align: center;
        color: #6c757d;
        border-top: 1px solid #dee2e6;
      }

      .footer p {
        margin: 0;
        font-size: 0.9rem;
      }

      @media (max-width: 768px) {
        .container {
          flex-direction: column;
          text-align: center;
        }

        .nav {
          order: 3;
        }

        .status {
          order: 2;
        }
      }
    `,
  ],
})
export class App {
  protected readonly title = signal('NGX User Metadata Demo');
  protected userMetadataService = inject(NgxUserMetadataService);
}
