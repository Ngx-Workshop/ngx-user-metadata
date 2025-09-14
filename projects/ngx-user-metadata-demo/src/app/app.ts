import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <h1>{{ title() }}</h1>
    <router-outlet></router-outlet>
  `,
  styles: [``],
})
export class App {
  protected readonly title = signal('ngx-user-metadata-demo');
}
