import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-emitter',
  standalone: true,
  imports: [],
  template: `
    <div>
      <input id="search-emitter" type="text" (input)="onInputChange($event)" />
      Search with emitter
    </div>
  `,
  styleUrl: './search-emitter.component.css',
})
export class SearchEmitterComponent {
  @Output() inputChange = new EventEmitter<string>();

  inputValue: string = '';

  onInputChange(event: Event) {
    console.log('Event', event);
    const inputElement = event.target as HTMLInputElement;
    this.inputValue = inputElement.value;
    // This emitter allows us to update the Output value in the parent component as well
    this.inputChange.emit(this.inputValue);
  }
}
