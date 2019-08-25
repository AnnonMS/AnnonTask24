


import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';


export function inArrayValidator(allowedValues: string[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const { value } = control;
    const changetolower = allowedValues.map((item) => item.toLowerCase());
    const testvalue = value && changetolower.includes((value as string).toLowerCase());
    return testvalue ? null : { inArrayValidator: { value } };
  };
}

@Directive({
  selector: '[appInputInArray]',
  providers: [{ provide: NG_VALIDATORS, useExisting: InputInArrayDirective, multi: true }]
})

export class InputInArrayDirective implements Validator {
  @Input('appInputInArray') inputInArray: string[];

  validate(control: AbstractControl): { [key: string]: any } | null {
    return this.inputInArray ? inArrayValidator(this.inputInArray)(control) : null;
  }
}

