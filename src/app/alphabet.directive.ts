import { Directive,HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAlphabet]'
})
export class AlphabetDirective {

  constructor() { }
  // key:any;
  // @HostListener('keydown', ['$event']) onKeydown(e: KeyboardEvent) {
  //     this.key = e.keyCode;
  //     // console.log(this.key);

  //     if ((this.key >= 15 && this.key <= 64) || (this.key >= 123) || (this.key >= 96 && this.key <= 105)) {

  //     //  if ((this.key < 64 || this.key > 90) && ( this.key < 96 || this.key  > 123 )) {
  //         e.preventDefault();
  //     }
  // }

  // @HostListener('input', ['$event'])
  // onInputChange(event: KeyboardEvent) {
  //   const input = event.target as HTMLInputElement;
  //   const sanitized = input.value.replace(/[^a-zA-Z]*/g, '');

  //   input.value = sanitized;
  // }
  
  @HostListener('paste', ['$event']) blockPaste(e: KeyboardEvent) {
    e.preventDefault();
  }

  @HostListener('copy', ['$event']) blockCopy(e: KeyboardEvent) {
    e.preventDefault();
  }

  @HostListener('cut', ['$event']) blockCut(e: KeyboardEvent) {
    e.preventDefault();
  }

 /* @HostListener('keydown', ['$event']) triggerEsc(e: KeyboardEvent) {
    alert(e);
    if(e.keyCode===27){
      console.log("local esc");
      alert("esc")
    }
  }*/

   @HostListener('keydown', ['$event'])
    public onKeydownHandler(e: KeyboardEvent): void {
    if(e.keyCode===13){
      alert("enter")
    }
    }

}
