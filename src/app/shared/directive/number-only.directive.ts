import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumberOnly]'
})
export class NumberOnlyDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInput(event: Event) {
    const inputElement = this.el.nativeElement as HTMLInputElement;
    const regex = /^[0-9]*$/; // Regular expression to allow only numeric characters

    const inputValue = inputElement.value;
    if (!regex.test(inputValue)) {
      inputElement.value = inputValue.replace(/[^0-9]*/g, '');
    }
  }
}
