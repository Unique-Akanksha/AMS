import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAlphabetOnly]'
})
export class AlphabetOnlyDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInput(event: Event) {
    const inputElement = this.el.nativeElement as HTMLInputElement;
    const regex = /^[a-zA-Z]*$/; // Regular expression to allow only alphabetic characters

    const inputValue = inputElement.value;
    if (!regex.test(inputValue)) {
      inputElement.value = inputValue.replace(/[^a-zA-Z]*/g, '');
    }
  }
}
