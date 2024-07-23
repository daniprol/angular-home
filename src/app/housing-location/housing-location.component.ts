import { Component, Input } from '@angular/core';
import { HousingLocation } from '../housinglocation';
import { RouterLink, RouterOutlet } from '@angular/router';

/* Input allows you to share data between components (props???)
 * The direction is from parent to child component
 * Here we are receiving the data (housingLocation) from the parent HomeComponent
 */

@Component({
  selector: 'app-housing-location',
  standalone: true,
  // NOTE: RouterLink lets you bind [routerLink] in anchor tags
  // WHY IS THE RouterOutlet EVEN NEEDED HERE?
  imports: [RouterLink, RouterOutlet],
  // template: `
  //   <p>
  //     housing-location works! firstProperty: {{ firstProperty }},
  //     secondProperty: {{ secondProperty }}
  //
  //     typesecondProperty: {{ typeSecondProperty() + 'other_stuff' }}
  //     <br />
  //     thirdProperty: {{ thirdProperty }}
  //     <br />
  //     typethirdProperty: {{ typeThirdProperty() }}
  //   </p>
  //
  //   <div>House name: {{ housingLocation.id }}</div>
  // `,
  //
  // Notice we are using [src] for data binding to pass a class property as value and also sanitize the possible input.
  template: `
    <section class="listing">
      <img
        class="listing-photo"
        [src]="housingLocation.photo"
        alt="Exterior of {{ housingLocation.name }}"
        crossorigin
      />
      <h2 class="listing-heading">{{ housingLocation.name }}</h2>
      <p class="listing-location">
        {{ housingLocation.city }}, {{ housingLocation.state }}
      </p>
      <a [routerLink]="['/details', housingLocation.id]">Learn more</a>
    </section>
  `,
  styleUrl: './housing-location.component.css',
})
export class HousingLocationComponent {
  // Input() expects an input, but because in this case THERE IS NO DEFAULT VALUE TO PASS, so typescript will complain
  // Example of default value: Input() value: number = 0;
  // We use "!" (non-null assertion operator) to tell the compiler that the value of this property will not be null or undefined
  @Input() housingLocation!: HousingLocation;

  // If its required why do we need to set a default value? Answer: because the default value is not the same as the required value
  // @Input({ required: false }) firstProperty: number = 0;
  // Input decorators are recorded at compile time and cannot be generated dynamically at run time
  // @Input({ alias: 'sndProp' }) secondProperty: string = 'random';

  // @Input({
  //   transform: parseString,
  // })
  // thirdProperty!: number;

  // typeSecondProperty() {
  //   return typeof this.secondProperty;
  // }
  //
  // typeThirdProperty() {
  //   return typeof this.thirdProperty;
  // }
}

function parseString(val: string) {
  return Number(val);
}
// function addOne(val: number | undefined) {
//   return val === undefined ? -1 : val + 1;
// }
