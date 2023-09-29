import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAlphabetOnly]'
})

export class AlphabetOnlyDirective {
  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    const inputElement = this.el.nativeElement as HTMLInputElement;
    const inputValue = inputElement.value;
    const key = event.key;

    // Allow alphabetic characters and space
    if (!(/[a-zA-Z\s]/.test(key))) {
      event.preventDefault();
    }
  }
}
