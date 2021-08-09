import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, NgForm, ValidationErrors, Validator} from "@angular/forms";

@Directive({
  selector: '[appSameValue]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: SameValueDirective,
      multi: true
    }
  ]
})
export class SameValueDirective implements Validator {

  @Input() appSameValue = "";
  @Input() secondPassValue!: string;

  constructor(private form:NgForm) { }

  validate(control: AbstractControl): ValidationErrors | null {
    const firstPasswordValue = this.form.controls[this.appSameValue]?.value;
    return control.value !== firstPasswordValue ? {
      firstPassValue: {
        [this.appSameValue]: firstPasswordValue,
        [this.secondPassValue]: control.value
      }
    } : null;
  }


}

