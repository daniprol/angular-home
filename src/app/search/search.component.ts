import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  template: `
    <div>
      <input id="custom-search" type="text" (input)="onInputChange($event)" />
      app search works
    </div>
    <p>Value: {{ inputValue }}</p>
  `,
  styleUrl: './search.component.css',
})
export class SearchComponent {
  // @Output() inputChange = new EventEmitter<string>();

  inputValue: string = '';

  onInputChange(event: Event) {
    console.log('Event', event);
    const inputElement = event.target as HTMLInputElement;
    this.inputValue = inputElement.value;
  }
}
