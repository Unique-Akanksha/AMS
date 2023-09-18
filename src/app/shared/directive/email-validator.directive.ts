import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, Validator } from '@angular/forms';

@Directive({
  selector: '[appEmailValidator][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailValidatorDirective,
      multi: true,
    },
  ],
})
export class EmailValidatorDirective implements Validator {
  validate(control: AbstractControl): { [key: string]: any } | null {
    // Regular expression for email validation
    const emailRegex = /^[a-zA-Z._%+-][a-zA-Z0-9._%+-]*@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/;

    if (control.value && !emailRegex.test(control.value)) {
      return { invalidEmail: true };
    }

    return null;
  }
}
