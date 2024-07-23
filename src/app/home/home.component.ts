import { Component } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';
import { inject } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { SearchEmitterComponent } from '../search-emitter/search-emitter.component';

/* NgModule: container for components, directives, pipes and services
 * CommonModule is actually a small NgModule
 * /

/* Import CommonModule to be able to use angular directives like NgFor, NgIf, ...
 for components that are not standalone it MAY NOT BE necessary (depending on the NgModule configuration)
 but still good practice to be explicit
  */

/* The [property]="value" syntax is called "property binding"
 */

/* To loop over a list of items just create a component and add "*ngFor" property
 * WEIRD LOOP SYNTAX: "let item of itemList"
 */

/* Instead of treating the "search input" as a normal form (which would use FormControl, FormGroup, ReactiveFormsModules, ...)
 * we can just create a template variable #filter that will be added to the input element.
 * This template variable allows us to use a normal button (not a submit button) add pass the #filter value when the
 * onclick event is triggered.
 */

// We add a (keydown) event listener to the template. $event object contains information about the event that just happened
//
//
// NOTE: even though form the child component (app-search-emitter) we are emitting $event.target.value
// Here we pass to the function $event as argument which will be a "string" and not the entire event

@Component({
  selector: 'app-home',
  standalone: true,
  // Notice that we dont need to declare the "injected" dependencies
  // Everytimme you want to include a component in another one, you need to import it
  imports: [
    CommonModule,
    HousingLocationComponent,
    SearchComponent,
    SearchEmitterComponent,
  ],
  template: `
    <section>
      <input
        type="text"
        id="cityName"
        placeholder="Search by city..."
        #filter
        (keydown)="onKeyDown($event)"
      />
      <button type="button" class="primary" (click)="applyFilter(filter.value)">
        Search
      </button>
    </section>
    <app-search></app-search>
    <app-search-emitter
      (inputChange)="onSearchEmitterChange($event)"
    ></app-search-emitter>
    <p>Value from search emitter: {{ searchEmitterValue }}</p>
    <section class="results">
      <app-housing-location
        *ngFor="let housingItem of filteredLocationList"
        [housingLocation]="housingItem"
      />
    </section>
  `,
  // You can also pass inline CSS with styles: [`.class { }`]
  styleUrl: './home.component.css',
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = [];

  searchEmitterValue: string = '';

  // Inject the housing service so that it can be used during initialization
  housingService: HousingService = inject(HousingService);

  // To actually pass a string when using the [property]="value" syntax, you need to use the single quotes or interpolate with {{ }}
  // otherwise you need to use the name of

  pruebaString: string = 'Hello world!';

  // NOTE: you can pass this using templating system like: [nameOfTheChildProperty]="nameOfTheParentProperty"
  pruebaNumber: number = 1234;
  // This is a "property" of the HomeComponent, NOT AN INITIALIZED VARIABLE!
  //
  constructor() {
    this.housingLocationList = this.housingService.getAllHousingLocations();
    this.filteredLocationList = this.housingLocationList;
  }

  applyFilter(cityFilter: string) {
    console.log(`Filter value passed: ${cityFilter}`);

    if (!cityFilter) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }
    this.filteredLocationList = this.housingLocationList.filter((item) =>
      item?.city.toLowerCase().includes(cityFilter.toLowerCase()),
    );
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      const button = document.querySelector('button');
      if (button) {
        button.click();
      }
    }
  }

  onSearchEmitterChange(value: string) {
    console.log('Event from parent', typeof value, value);
    this.searchEmitterValue = value;
  }
}
