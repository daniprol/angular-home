import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';

@Component({
  // Name of the component in the HTML templates
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, RouterModule],
  // templateUrl: './app.component.html',
  // Notice the "['/']" value when binding the router link to the anchor tag
  template: `
    <main>
      <a [routerLink]="['/']">
        <header class="brand-name">
          <img src="assets/logo.svg" alt="Angular logo" aria-hidden="true" />
        </header>
      </a>
      <section>
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title: string = 'what is this title?';

  constructor() {
    console.log('AppComponent constructor');
    const value: string = this.otherMethod();

    console.log('value', value);
  }

  // Type otherMethod() correctly
  otherMethod(): string {
    console.log('AppComponent otherMethod');
    return 'asdf';
  }
}
