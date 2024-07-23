import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article>
      <img
        class="listing-photo"
        [src]="housingLocation?.photo"
        alt="Exterior photo of {{ housingLocation?.name }}"
        crossorigin="anonymous"
      />
      <section class="listing-description">
        <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
        <p class="listing-location">
          {{ housingLocation?.city }}, {{ housingLocation?.state }}
        </p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units available: {{ housingLocation?.availableUnits }}</li>
          <li>Does it have WiFi? {{ housingLocation?.wifi }}</li>
          <li>Does it have laundry? {{ housingLocation?.laundry }}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here!</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First name:</label>
          <input
            type="text"
            id="first-name"
            placeholder="Enter your name"
            formControlName="firstName"
          />

          <label for="last-name">Last name:</label>
          <input type="text" id="last-name" formControlName="lastName" />

          <label for="email">Email:</label>
          <input type="text" id="email" formControlName="email" />

          <button type="submit" class="primary">Apply now</button>
        </form>
      </section>
    </article>
  `,
  styleUrl: './details.component.css',
  // NOTE: see the [formGroup] and (submit) binded properties
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService: HousingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  constructor() {
    // NOTE: no need to set housingLocationId as class property if we do not use it outside of the constructor
    // this.housingLocationId = Number(this.route.snapshot.params['id']);
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingLocation =
      this.housingService.getHousingLocationById(housingLocationId);
  }

  submitApplication() {
    // NOTE: because the form could return null, we use the "nullish coalescing operator" (??) to assign '' if the value is "null".
    // Notice that this always requires the properties to exist! (unlike when using optional chaining)
    // Optional chaining will always return "undefined" it the property doesnt exist, so we cant assign a default value like here.
    // You can always combine both: const firstName = this.applyForm?.value?.firstName ?? 'Unknown';
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
    );
  }
}
