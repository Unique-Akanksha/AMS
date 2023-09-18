
//  allow only alphabets in input


import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
    selector: '[appAlphabetOnly]'
})

export class AlphabetOnlyDirective {
    key:any;
    @HostListener('keydown', ['$event']) onKeydown(event: KeyboardEvent) {
        this.key = event.keyCode;
        // console.log(this.key);

        // if ((this.key >= 15 && this.key <= 64) || (this.key >= 123) || (this.key >= 96 && this.key <= 105)) {

         if ((this.key < 64 || this.key > 90) && ( this.key < 7 || this.key  > 9 )) {
            event.preventDefault();
        }
    }
}
